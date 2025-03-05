import csv
import math
import networkx as nx
import matplotlib.pyplot as plt
import json
import os
import numpy as np
import random
import time
from typing import Dict, List, Tuple, Set, Optional

# Create outputs directory if it doesn't exist
os.makedirs("data/outputs", exist_ok=True)


def read_graph_from_csv(file_path: str) -> nx.Graph:
    """
    Read a graph from a CSV file.
    
    Args:
        file_path: Path to the CSV file
        
    Returns:
        A NetworkX Graph object
    """
    G = nx.Graph()
    
    with open(file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            from_node = int(row['From'])
            to_node = int(row['To'])
            cost = float(row['Cost'])
            
            # Add nodes if they don't exist
            if from_node not in G:
                G.add_node(from_node)
            if to_node not in G:
                G.add_node(to_node)
            
            # Add edge with cost as weight
            G.add_edge(from_node, to_node, weight=cost)
    
    return G


def ensure_complete_graph(G: nx.Graph) -> nx.Graph:
    """
    Ensure the graph is complete by adding missing edges using shortest paths.
    
    Args:
        G: Input graph
        
    Returns:
        A complete graph
    """
    complete_G = G.copy()
    nodes = list(complete_G.nodes())
    
    # Calculate shortest paths between all pairs of nodes
    shortest_paths = dict(nx.all_pairs_dijkstra_path_length(G))
    
    # Add edges for any missing connections
    for i in range(len(nodes)):
        for j in range(i+1, len(nodes)):
            u, v = nodes[i], nodes[j]
            if not complete_G.has_edge(u, v):
                if u in shortest_paths and v in shortest_paths[u]:
                    # Add edge with weight equal to shortest path length
                    complete_G.add_edge(u, v, weight=shortest_paths[u][v])
                else:
                    # If no path exists, add a high-weight edge
                    complete_G.add_edge(u, v, weight=float('inf'))
    
    return complete_G


def find_minimum_spanning_tree(G: nx.Graph) -> nx.Graph:
    """
    Find a minimum spanning tree of the graph.
    
    Args:
        G: Input graph
        
    Returns:
        A minimum spanning tree as a NetworkX Graph
    """
    return nx.minimum_spanning_tree(G, weight='weight')


def find_odd_degree_vertices(G: nx.Graph) -> List[int]:
    """
    Find vertices with odd degree in the graph.
    
    Args:
        G: Input graph
        
    Returns:
        List of vertices with odd degree
    """
    return [node for node in G.nodes() if G.degree(node) % 2 == 1]


def minimum_weight_perfect_matching(G: nx.Graph, odd_vertices: List[int]) -> List[Tuple[int, int]]:
    """
    Find a minimum weight perfect matching for the odd degree vertices.
    
    Args:
        G: Input graph
        odd_vertices: List of vertices with odd degree
        
    Returns:
        List of edges in the matching
    """
    # Create a complete subgraph of odd-degree vertices
    subgraph = nx.Graph()
    for i, u in enumerate(odd_vertices):
        for j, v in enumerate(odd_vertices):
            if i < j:  # Avoid duplicate edges
                # Get the weight from the original graph
                if G.has_edge(u, v):
                    weight = G[u][v]['weight']
                else:
                    # If no direct edge, use shortest path weight
                    try:
                        weight = nx.shortest_path_length(G, u, v, weight='weight')
                    except nx.NetworkXNoPath:
                        weight = float('inf')
                subgraph.add_edge(u, v, weight=weight)
    
    # Find minimum weight matching
    matching = nx.algorithms.matching.min_weight_matching(subgraph)
    return list(matching)


def combine_graphs(G1: nx.Graph, edges: List[Tuple[int, int]]) -> nx.MultiGraph:
    """
    Combine the edges of G1 with the given list of edges.
    
    Args:
        G1: First graph
        edges: List of edges to add
        
    Returns:
        A multigraph containing all edges
    """
    combined = nx.MultiGraph()
    
    # Add edges from G1
    for u, v, data in G1.edges(data=True):
        combined.add_edge(u, v, weight=data.get('weight', 1.0))
    
    # Add edges from the matching
    for u, v in edges:
        # Correctly get the weight from G1 if the edge exists
        if G1.has_edge(u, v):
            weight = G1[u][v]['weight']
        else:
            # Default weight if edge doesn't exist
            weight = 1.0
        combined.add_edge(u, v, weight=weight)
    
    return combined


def find_eulerian_circuit(G: nx.MultiGraph) -> List[int]:
    """
    Find an Eulerian circuit in the graph.
    
    Args:
        G: Input multigraph
        
    Returns:
        List of vertices in the Eulerian circuit
    """
    try:
        euler_circuit = list(nx.eulerian_circuit(G))
        return [u for u, v in euler_circuit]
    except nx.NetworkXError:
        # If no Eulerian circuit exists, try to find a path
        print("No Eulerian circuit found. Falling back to alternative method.")
        nodes = list(G.nodes())
        if not nodes:
            return []
        
        # Start from an arbitrary node
        path = [nodes[0]]
        current = nodes[0]
        
        # Simple greedy algorithm to find a path
        visited_edges = set()
        while True:
            neighbors = list(G.neighbors(current))
            if not neighbors:
                break
            
            # Find unvisited edge
            next_node = None
            for neighbor in neighbors:
                edge_key = tuple(sorted([current, neighbor]))
                if edge_key not in visited_edges:
                    next_node = neighbor
                    visited_edges.add(edge_key)
                    break
            
            if next_node is None:
                break
            
            path.append(next_node)
            current = next_node
        
        return path


def shortcut_eulerian_to_hamiltonian(euler_circuit: List[int]) -> List[int]:
    """
    Shortcut an Eulerian circuit to get a Hamiltonian cycle (TSP tour).
    
    Args:
        euler_circuit: List of vertices in the Eulerian circuit
        
    Returns:
        List of vertices in the Hamiltonian cycle
    """
    visited = set()
    tsp_tour = []
    
    for vertex in euler_circuit:
        if vertex not in visited:
            visited.add(vertex)
            tsp_tour.append(vertex)
    
    # Complete the cycle
    if tsp_tour and tsp_tour[0] != tsp_tour[-1]:
        tsp_tour.append(tsp_tour[0])
    
    return tsp_tour


def calculate_tour_cost(G: nx.Graph, tour: List[int]) -> float:
    """
    Calculate the total cost of a tour.
    
    Args:
        G: Input graph
        tour: List of vertices in the tour
        
    Returns:
        Total cost of the tour
    """
    total_cost = 0.0
    for i in range(len(tour) - 1):
        u, v = tour[i], tour[i + 1]
        if G.has_edge(u, v):
            total_cost += G[u][v]['weight']
        else:
            # If edge doesn't exist directly, use shortest path
            try:
                total_cost += nx.shortest_path_length(G, u, v, weight='weight')
            except nx.NetworkXNoPath:
                total_cost += float('inf')
    
    return total_cost


def lin_kernighan_heuristic(G: nx.Graph, initial_tour: List[int], max_iterations: int = 100) -> Tuple[List[int], float]:
    """
    Apply a basic Lin-Kernighan heuristic to improve a TSP tour.
    This is used as a subroutine in the Chained Lin-Kernighan algorithm.
    
    Args:
        G: Input graph
        initial_tour: Initial TSP tour
        max_iterations: Maximum number of iterations to perform
        
    Returns:
        Tuple containing (improved TSP tour, tour cost)
    """
    # Make a copy of the initial tour
    best_tour = initial_tour.copy()
    
    # Remove the last vertex if it's the same as the first (to work with open paths)
    if best_tour[0] == best_tour[-1] and len(best_tour) > 1:
        best_tour = best_tour[:-1]
    
    # Initialize variables
    current_tour = best_tour.copy()
    best_cost = calculate_tour_cost(G, best_tour + [best_tour[0]])
    current_cost = best_cost
    num_nodes = len(current_tour)
    
    # Edge cache for faster lookups
    edge_cache = {}
    def get_edge_weight(u, v):
        if (u, v) in edge_cache:
            return edge_cache[(u, v)]
        elif (v, u) in edge_cache:
            return edge_cache[(v, u)]
        
        if G.has_edge(u, v):
            weight = G[u][v]['weight']
        else:
            try:
                weight = nx.shortest_path_length(G, u, v, weight='weight')
            except nx.NetworkXNoPath:
                weight = float('inf')
        
        edge_cache[(u, v)] = weight
        return weight
    
    # Helper function to perform a 2-opt move
    def two_opt_move(tour, i, j):
        """Perform a 2-opt move: reverse the segment tour[i:j+1]"""
        new_tour = tour.copy()
        new_tour[i:j+1] = reversed(tour[i:j+1])
        return new_tour
    
    # Main LK algorithm - focused on 2-opt moves for simplicity and speed
    for iteration in range(max_iterations):
        improved = False
        
        # Try all possible 2-opt moves
        edges = list(range(num_nodes))
        random.shuffle(edges)  # Randomize edge selection
        
        for i in edges:
            if improved:
                break
                
            i_next = (i + 1) % num_nodes
            
            for j in range(i + 2, num_nodes):
                if j - i == num_nodes - 1:
                    continue  # Skip moves that would break the cycle
                
                j_next = (j + 1) % num_nodes
                
                # Calculate the change in cost
                current_edges_cost = (
                    get_edge_weight(current_tour[i], current_tour[i_next]) + 
                    get_edge_weight(current_tour[j], current_tour[j_next])
                )
                new_edges_cost = (
                    get_edge_weight(current_tour[i], current_tour[j]) + 
                    get_edge_weight(current_tour[i_next], current_tour[j_next])
                )
                
                if new_edges_cost < current_edges_cost:
                    # Perform the 2-opt move
                    current_tour = two_opt_move(current_tour, i_next, j)
                    current_cost -= (current_edges_cost - new_edges_cost)
                    improved = True
                    break
        
        # If no improvement was found, we're at a local optimum
        if not improved:
            break
        
        # Update best tour if current is better
        if current_cost < best_cost:
            best_tour = current_tour.copy()
            best_cost = current_cost
    
    # Make sure the tour is a cycle (first node = last node)
    if best_tour[0] != best_tour[-1]:
        best_tour.append(best_tour[0])
    
    return best_tour, best_cost


def double_bridge_kick(tour: List[int]) -> List[int]:
    """
    Perform a 4-opt move known as double-bridge move.
    This is effective at escaping local optima and cannot be easily reversed
    by 2-opt or 3-opt moves.
    
    Args:
        tour: Current tour to perturb
        
    Returns:
        A perturbed tour
    """
    n = len(tour)
    if n < 8:  # Need at least 8 nodes for a meaningful double-bridge
        return tour.copy()
        
    # Remove the last node if it's the same as the first
    if tour[0] == tour[-1]:
        tour = tour[:-1]
        n -= 1
    
    # Pick 4 distinct points
    points = sorted(random.sample(range(1, n), 4))
    i1, i2, i3, i4 = points
    
    # Create a new tour by reconnecting segments in a different way
    new_tour = (tour[:i1] + 
               tour[i3:i4] + 
               tour[i2:i3] + 
               tour[i1:i2] + 
               tour[i4:])
    
    return new_tour


def chained_lin_kernighan(G: nx.Graph, initial_tour: List[int], num_chains: int = 10, max_non_improving: int = 5) -> Tuple[List[int], float]:
    """
    Implement the Chained Lin-Kernighan algorithm.
    This repeatedly applies a kick perturbation followed by LK optimization.
    
    Args:
        G: Input graph
        initial_tour: Initial TSP tour (typically from Christofides)
        num_chains: Maximum number of chains to perform
        max_non_improving: Maximum number of non-improving chains before stopping
        
    Returns:
        Tuple containing (best tour found, tour cost)
    """
    # Start with initial tour from Christofides
    best_tour = initial_tour.copy()
    # Remove last node if it's a cycle
    if best_tour[0] == best_tour[-1] and len(best_tour) > 1:
        best_tour = best_tour[:-1]
        
    best_cost = calculate_tour_cost(G, best_tour + [best_tour[0]])
    
    current_tour = best_tour.copy()
    current_cost = best_cost
    
    print(f"Starting Chained LK with initial cost: {best_cost}")
    
    start_time = time.time()
    max_time = 30  # Time limit in seconds
    non_improving_chains = 0
    
    # Main chained LK loop
    for chain in range(num_chains):
        if time.time() - start_time > max_time:
            print(f"Time limit reached after {chain} chains")
            break
            
        if non_improving_chains >= max_non_improving:
            print(f"Stopping after {non_improving_chains} non-improving chains")
            break
        
        # Perturb the current solution using double-bridge kick
        perturbed_tour = double_bridge_kick(current_tour)
        
        # Apply LK to the perturbed solution
        optimized_tour, optimized_cost = lin_kernighan_heuristic(G, perturbed_tour)
        
        # If this chain found a better solution
        if optimized_cost < best_cost:
            improvement = best_cost - optimized_cost
            best_tour = optimized_tour.copy()
            best_cost = optimized_cost
            current_tour = optimized_tour[:-1] if optimized_tour[0] == optimized_tour[-1] else optimized_tour.copy()
            current_cost = best_cost
            non_improving_chains = 0  # Reset counter
            
            print(f"Chain {chain}: Found better tour with cost {best_cost} (improved by {improvement:.2f})")
        else:
            # Accept the move anyway with some probability (similar to simulated annealing)
            if optimized_cost < current_cost:
                current_tour = optimized_tour[:-1] if optimized_tour[0] == optimized_tour[-1] else optimized_tour.copy()
                current_cost = optimized_cost
                print(f"Chain {chain}: Accepted non-best tour with cost {current_cost}")
            
            non_improving_chains += 1
            print(f"Chain {chain}: No improvement to best tour (non-improving chains: {non_improving_chains})")
    
    # Ensure the tour is a cycle
    if best_tour[0] != best_tour[-1]:
        best_tour.append(best_tour[0])
    
    total_time = time.time() - start_time
    print(f"Chained LK completed in {total_time:.2f} seconds")
    print(f"Initial cost: {calculate_tour_cost(G, initial_tour)}, Final cost: {best_cost}")
    return best_tour, best_cost


def christofides_algorithm(G: nx.Graph) -> Tuple[List[int], float]:
    """
    Implement Christofides algorithm for TSP.
    
    Args:
        G: Input graph
        
    Returns:
        Tuple containing (TSP tour, tour cost)
    """
    # Ensure we have a complete graph
    complete_G = ensure_complete_graph(G)
    
    # Step 1: Find a minimum spanning tree
    mst = find_minimum_spanning_tree(complete_G)
    
    # Step 2: Find vertices with odd degree
    odd_vertices = find_odd_degree_vertices(mst)
    
    # Step 3: Find minimum weight perfect matching
    matching = minimum_weight_perfect_matching(complete_G, odd_vertices)
    
    # Step 4: Combine matching with MST
    combined_graph = combine_graphs(mst, matching)
    
    # Step 5: Find an Eulerian circuit
    euler_circuit = find_eulerian_circuit(combined_graph)
    
    # Step 6: Shortcut to get a Hamiltonian cycle (TSP tour)
    tsp_tour = shortcut_eulerian_to_hamiltonian(euler_circuit)
    
    # Calculate the cost of the tour
    tour_cost = calculate_tour_cost(G, tsp_tour)
    
    return tsp_tour, tour_cost


def christofides_with_lk(G: nx.Graph) -> Tuple[List[int], float, List[int], float]:
    """
    Apply Christofides algorithm followed by Chained Lin-Kernighan heuristic.
    
    Args:
        G: Input graph
        
    Returns:
        Tuple containing (Christofides tour, Christofides cost, Chained LK tour, Chained LK cost)
    """
    # Get initial tour using Christofides
    print("Running Christofides algorithm...")
    christofides_tour, christofides_cost = christofides_algorithm(G)
    
    # Improve the tour using Chained Lin-Kernighan heuristic
    print("\nRunning Chained Lin-Kernighan heuristic to improve tour...")
    lk_tour, lk_cost = chained_lin_kernighan(G, christofides_tour)
    
    return christofides_tour, christofides_cost, lk_tour, lk_cost


def visualize_tour(G: nx.Graph, tour: List[int], title: str):
    """
    Visualize a tour on a graph.
    
    Args:
        G: Input graph
        tour: List of vertices in the tour
        title: Title for the plot
    """
    plt.figure(figsize=(12, 8))
    
    # Create a position dictionary for nodes (using spring layout)
    pos = nx.spring_layout(G, seed=42)
    
    # Draw the original graph
    nx.draw_networkx_nodes(G, pos, node_size=500, node_color='lightblue')
    nx.draw_networkx_labels(G, pos, font_weight='bold')
    nx.draw_networkx_edges(G, pos, width=1.0, alpha=0.5)
    
    # Highlight the tour edges
    tour_edges = [(tour[i], tour[i+1]) for i in range(len(tour)-1)]
    nx.draw_networkx_edges(G, pos, edgelist=tour_edges, width=2.0, edge_color='r')
    
    plt.title(title)
    plt.axis('off')
    plt.tight_layout()
    
    # Save to data/outputs directory with a more standardized filename
    output_path = f"data/outputs/{title.replace(' ', '_')}.png"
    plt.savefig(output_path)
    plt.close()
    
    print(f"Visualization saved to {output_path}")


def save_tour_to_json(tour: List[int], cost: float, filename: str):
    """
    Save tour data to a JSON file.
    
    Args:
        tour: List of vertices in the tour
        cost: Total cost of the tour
        filename: Output filename
    """
    data = {
        "tour": tour,
        "cost": cost,
        "tour_length": len(tour),
        "is_cycle": tour[0] == tour[-1] if tour else False
    }
    
    output_path = f"data/outputs/{filename}.json"
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Tour data saved to {output_path}")


def save_tour_to_csv(tour: List[int], cost: float, filename: str):
    """
    Save tour data to a CSV file.
    
    Args:
        tour: List of vertices in the tour
        cost: Total cost of the tour
        filename: Output filename
    """
    output_path = f"data/outputs/{filename}.csv"
    
    with open(output_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Step", "Node", "Next Node"])
        
        for i in range(len(tour) - 1):
            writer.writerow([i, tour[i], tour[i+1]])
            
        # Add a footer row with the total cost
        writer.writerow(["", "", ""])
        writer.writerow(["Total Cost", cost, ""])
    
    print(f"Tour steps saved to {output_path}")


def main():
    # File paths
    sparse_file = "data/inputs/sparse_world.csv"
    full_file = "data/inputs/full_world.csv"
    
    # Process sparse world
    print("Processing sparse_world.csv...")
    sparse_graph = read_graph_from_csv(sparse_file)
    sparse_christofides_tour, sparse_christofides_cost, sparse_lk_tour, sparse_lk_cost = christofides_with_lk(sparse_graph)
    
    print(f"Sparse World Tour (Christofides): {sparse_christofides_tour}")
    print(f"Sparse World Tour Cost (Christofides): {sparse_christofides_cost}")
    print(f"Sparse World Tour (Christofides + Chained LK): {sparse_lk_tour}")
    print(f"Sparse World Tour Cost (Christofides + Chained LK): {sparse_lk_cost}")
    print(f"Improvement: {sparse_christofides_cost - sparse_lk_cost} ({100 * (sparse_christofides_cost - sparse_lk_cost) / sparse_christofides_cost:.2f}%)")
    
    # Save outputs for sparse world
    visualize_tour(sparse_graph, sparse_christofides_tour, "Sparse World Tour (Christofides)")
    save_tour_to_json(sparse_christofides_tour, sparse_christofides_cost, "sparse_world_tour_christofides")
    save_tour_to_csv(sparse_christofides_tour, sparse_christofides_cost, "sparse_world_tour_christofides")
    
    visualize_tour(sparse_graph, sparse_lk_tour, "Sparse World Tour (Christofides + Chained LK)")
    save_tour_to_json(sparse_lk_tour, sparse_lk_cost, "sparse_world_tour_chained_lk")
    save_tour_to_csv(sparse_lk_tour, sparse_lk_cost, "sparse_world_tour_chained_lk")
    
    # Process full world
    print("\nProcessing full_world.csv...")
    full_graph = read_graph_from_csv(full_file)
    full_christofides_tour, full_christofides_cost, full_lk_tour, full_lk_cost = christofides_with_lk(full_graph)
    
    print(f"Full World Tour (Christofides): {full_christofides_tour}")
    print(f"Full World Tour Cost (Christofides): {full_christofides_cost}")
    print(f"Full World Tour (Christofides + Chained LK): {full_lk_tour}")
    print(f"Full World Tour Cost (Christofides + Chained LK): {full_lk_cost}")
    print(f"Improvement: {full_christofides_cost - full_lk_cost} ({100 * (full_christofides_cost - full_lk_cost) / full_christofides_cost:.2f}%)")
    
    # Save outputs for full world
    visualize_tour(full_graph, full_christofides_tour, "Full World Tour (Christofides)")
    save_tour_to_json(full_christofides_tour, full_christofides_cost, "full_world_tour_christofides")
    save_tour_to_csv(full_christofides_tour, full_christofides_cost, "full_world_tour_christofides")
    
    visualize_tour(full_graph, full_lk_tour, "Full World Tour (Christofides + Chained LK)")
    save_tour_to_json(full_lk_tour, full_lk_cost, "full_world_tour_chained_lk")
    save_tour_to_csv(full_lk_tour, full_lk_cost, "full_world_tour_chained_lk")


if __name__ == "__main__":
    main()
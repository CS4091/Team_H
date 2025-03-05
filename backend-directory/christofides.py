import csv
import math
import networkx as nx
import matplotlib.pyplot as plt
import json
import os
from typing import Dict, List, Tuple, Set

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
    sparse_tour, sparse_cost = christofides_algorithm(sparse_graph)
    print(f"Sparse World Tour: {sparse_tour}")
    print(f"Sparse World Tour Cost: {sparse_cost}")
    
    # Save outputs for sparse world
    visualize_tour(sparse_graph, sparse_tour, "Sparse World Tour")
    save_tour_to_json(sparse_tour, sparse_cost, "sparse_world_tour")
    save_tour_to_csv(sparse_tour, sparse_cost, "sparse_world_tour")
    
    # Process full world
    print("\nProcessing full_world.csv...")
    full_graph = read_graph_from_csv(full_file)
    full_tour, full_cost = christofides_algorithm(full_graph)
    print(f"Full World Tour: {full_tour}")
    print(f"Full World Tour Cost: {full_cost}")
    
    # Save outputs for full world
    visualize_tour(full_graph, full_tour, "Full World Tour")
    save_tour_to_json(full_tour, full_cost, "full_world_tour")
    save_tour_to_csv(full_tour, full_cost, "full_world_tour")


if __name__ == "__main__":
    main()
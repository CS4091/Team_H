import csv
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import os
import pandas as pd
import random
random.seed(42)
np.random.seed(42)
from christofides import visualize_tour, calculate_tour_cost, save_tour_to_csv, save_tour_to_json

def read_graph_from_csv(file_path: str):
    """
    Read a graph from a CSV file and create a cost lookup dictionary.
    
    Args:
        file_path: Path to the CSV file
        
    Returns:
        A tuple containing:
            - NetworkX Graph object
            - Dictionary for cost lookup
    """
    G = nx.Graph()
    cost_lookup = {}

    with open(file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            from_node = int(row['From'])
            to_node = int(row['To'])
            cost = float(row['Cost'])
            if cost == 0.0:
                cost += 0.001

            G.add_edge(from_node, to_node, weight=cost)
            cost_lookup[(from_node, to_node)] = cost
            cost_lookup[(to_node, from_node)] = cost  # Ensure bidirectional lookup
    
    return G, cost_lookup

# def visualize_tour(G, tour, title):
#     """
#     Visualize a tour on a graph.
    
#     Args:
#         G: Input graph
#         tour: List of vertices in the tour
#         title: Title for the plot
#     """
#     plt.figure(figsize=(12, 8))
    
#     # Create a position dictionary for nodes (using spring layout)
#     pos = nx.spring_layout(G, seed=42)
    
#     # Draw the original graph
#     nx.draw_networkx_nodes(G, pos, node_size=500, node_color='lightblue')
#     nx.draw_networkx_labels(G, pos, font_weight='bold')
#     nx.draw_networkx_edges(G, pos, width=1.0, alpha=0.5)
    
#     # Highlight the tour edges
#     tour_edges = [(tour[i], tour[i+1]) for i in range(len(tour)-1)]
#     nx.draw_networkx_edges(G, pos, edgelist=tour_edges, width=2.0, edge_color='r')
    
#     plt.title(title)
#     plt.axis('off')
#     plt.tight_layout()
    
#     # Save to data/outputs directory with a more standardized filename
#     plt.show()



# csv_file = "full_world.csv"
# G, cost_lookup = read_graph_from_csv(csv_file)
# G2, c1 = read_graph_from_csv("sparse_world.csv")

class AntColony:
    def __init__(self, graph, num_ants, cost_lookup, evaporation_rate, alpha, beta, iterations):
        self.num_ants = num_ants
        self.cost_lookup = cost_lookup
        self.evaporation_rate = evaporation_rate
        self.alpha = alpha
        self.beta = beta
        self.iterations = iterations
        self.nodes = list(graph.nodes)
        self.Q = 10
        self.best_tour = []
        self.best_length = np.inf
        self.graph = graph

        self.pheromones = {}
        for edge in cost_lookup:
            self.pheromones[edge] = 1

    def choose_next_city(self, unvisited, current_city):
        numerator = []
        for next_city in unvisited:
            # if (current_city, next_city) in self.pheromones:
            tau = self.pheromones[(current_city, next_city)]
            n = self.cost_lookup[(current_city, next_city)]
            numerator.append((tau**self.alpha) * (n**self.beta))
        denominator = sum(numerator)
        probability  = [num/denominator for num in numerator]
        # print(len(unvisited), len(probability))
        try:
            return np.random.choice(unvisited, p=probability) # randomly selects one of the nodes based on the probability distribution we built
        except ValueError as e:
            print(f"Error: {e}")
            print(f"Here is unvisited: {unvisited}")
    
    def construct_solutions(self):
        paths = []
        for ant in range(self.num_ants):
            # start_city = random.choice(self.nodes) # choosing a random city
            start_city = self.nodes[0]
            path = [start_city]
            visited = {start_city} # keeps track of the ones that have been visited
            # unvisited = list(self.graph.neighbors(start_city)) 
            unvisited = list(self.nodes) # all the unvisited nodes
            unvisited.remove(start_city)
            # print(f"Start city: {start_city}")
            # print(f"Start city: {start_city}")
            while len(visited) < len(self.nodes) and len(unvisited) > 0:
            # while unvisited:
                neighbors = set(self.graph.neighbors(path[-1])) # all the neighbors of the current node 
                valid_moves = list(neighbors.intersection(set(unvisited)))
                # print(f"Current city {path[-1]}, valid moves: {valid_moves}")
                # print("Before deciding next city: ")
                # print(f"Valid moves: {valid_moves}")
                # print(f"Unvisited: {unvisited}")
                # print(f"Path: {path}")
                # print(f"Visited: {visited}")

                next_city = self.choose_next_city(valid_moves, path[-1])
                path.append(next_city)
                unvisited.remove(next_city)
                visited.add(next_city)
            
            path.append(start_city)
            #     print(f"next city: {next_city}")
            #     print()

            # print("-------------------")

            paths.append(path)
            # cur_tour_length = calculate_tour_cost(G, path)
            # if cur_tour_length < best_length:
            #     best_length = cur_tour_length
            #     best_path = path
        
        return paths

    def evalute_solutions(self, ant_paths, ant_paths_edges):
        edge_qualities = {}
        for i in range(len(ant_paths)):
            cur_tour_cost = calculate_tour_cost(self.graph, ant_paths[i])
            quality = self.Q/cur_tour_cost
            for edge in ant_paths_edges[i]:
                edge_qualities[edge] = edge_qualities.get(edge, 0) + quality
            if cur_tour_cost < self.best_length:
                self.best_tour = ant_paths[i]
                self.best_length = cur_tour_cost
        return edge_qualities
    
    
    def update_pheromones(self, path_qualities):
        for p in self.pheromones: # p is an edge
            self.pheromones[p] = ((1-self.evaporation_rate) * self.pheromones[p]) #evaporate pheromones
            # print(path_qualities.keys())
            try: 
                self.pheromones[p] = self.pheromones[p] + path_qualities[p] # deposit pheromones
            except KeyError as e:
                try: 
                    self.pheromones[p] = self.pheromones[p] + path_qualities[(p[1], p[0])]
                except KeyError as f:
                    # print(f)
                    pass
        
    
    def run(self):
        for i in range(self.iterations):
            ant_paths = self.construct_solutions()
            ant_paths_edges = []
            for path in ant_paths:
                edges = [(path[i], path[i + 1]) for i in range(len(path) - 1)]
                ant_paths_edges.append(edges)
            path_qualities = self.evalute_solutions(ant_paths, ant_paths_edges) # returns a dict that corresponds to the sum of the quality of that edge for all the ants
            self.update_pheromones(path_qualities) # updates the pheromones
        
        return self.best_tour, self.best_length


def run_aco(file_path, evaporation_rate=0.9, alpha=1, beta=1, iterations=100, num_ants = 100):
    G, cost_lookup = read_graph_from_csv(file_path)

    aco = AntColony(G, num_ants=num_ants, cost_lookup=cost_lookup, evaporation_rate=evaporation_rate, alpha=alpha, beta=beta, iterations=iterations)
    best_tour, best_cost = aco.run()
    return best_tour, best_cost
    # print(f"Best tour: {best_tour} \n Best length: {best_cost}")
    # visualize_tour(G, best_tour, title="ACO_path")
    # # save_tour_to_json(tour=best_tour, cost=best_cost, filename="ACO_JSON_TOUR")
    # save_tour_to_csv(tour=best_tour, cost=best_cost, filename="ACO_CSV_TOUR")

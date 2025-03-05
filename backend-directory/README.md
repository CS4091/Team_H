# Christofides Algorithm Implementation

This project implements the Christofides algorithm for approximating solutions to the Traveling Salesman Problem (TSP). The algorithm guarantees a solution that is at most 1.5 times the optimal solution for metric TSPs.

## Overview

The Christofides algorithm follows these steps:
1. Build a complete graph from the input data
2. Compute a minimum spanning tree (MST)
3. Find vertices with odd degrees in the MST
4. Compute a minimum-weight perfect matching of odd-degree vertices
5. Combine the MST and matching to form an Eulerian circuit
6. Shortcut the Eulerian circuit to form a Hamiltonian cycle (TSP tour)

## Requirements

- Python 3.7+
- NetworkX
- Matplotlib
- NumPy

Install the dependencies with:
```
pip install -r requirements.txt
```

## Usage

The implementation processes two CSV files:
- `generatedfiles/sparse_world.csv`: A sparse graph with varying edge weights
- `generatedfiles/full_world.csv`: A complete graph with uniform edge weights

To run the algorithm:
```
python christofides.py
```

The program will output:
- The TSP tour for each dataset
- The total cost of each tour
- Visualizations of the tours saved as PNG files

## CSV Format

Input CSV files should have the following format:
```
From,To,Cost
0,1,10.0
0,2,15.0
...
```

Where:
- `From`: Source node (integer)
- `To`: Destination node (integer)
- `Cost`: Edge weight/distance (float)

## Output

The algorithm produces:
- Terminal output showing the computed tours and their costs
- Visualization images of the tours showing the original graph with highlighted tour edges 
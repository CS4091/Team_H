# Christofides Algorithm for TSP Optimization

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
- Pandas
- Java Runtime Environment (for PlantUML visualization)
- Graphviz (optional, for PlantUML rendering)

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install required Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. For the route generation visualization (optional):
   - On Ubuntu/Debian: `sudo apt install graphviz`
   - On macOS: `brew install graphviz`
   - On Windows: Download and install from [Graphviz website](https://graphviz.org/download/)

## Project Structure

```
.
├── christofides.py              # Main implementation of Christofides algorithm
├── aircraft_routing_problem_generator.py  # Generates test routing problems
├── routegen.sh                  # Shell script to generate route data and visualizations
├── requirements.txt             # Python dependencies
├── data/                        # Directory for input/output data
│   ├── inputs/                  # Input graph data
│   │   ├── full_world.csv       # Complete graph with uniform edge weights
│   │   ├── sparse_world.csv     # Sparse graph with varying edge weights
│   │   └── *.png                # Visualizations of input graphs
│   ├── outputs/                 # Algorithm output data and visualizations of TSP tours
│   └── plantuml-1.2025.1.jar    # PlantUML JAR for graph visualization
└── README.md                    # This file
```

## Usage

### Generating Test Data

To generate new test data (full and sparse world graphs):

```
./routegen.sh
```

This script will:
1. Create necessary directories if they don't exist
2. Run the problem generator to create CSV files
3. Generate PlantUML diagrams and convert them to PNG visualizations

### Running the Christofides Algorithm

To solve the TSP for the generated graphs:

```
python christofides.py
```

The program will:
1. Read both the sparse and full world graphs
2. Apply the Christofides algorithm to find TSP tours
3. Output the tour sequences and their total costs to the terminal
4. Save visualizations of the tours as PNG files
5. Save the tour data in JSON and CSV formats in the `data/outputs/` directory

### Input Data Format

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

### Output Files

The algorithm produces:
- Terminal output showing the computed tours and their costs
- PNG visualizations of the tours showing the original graph with highlighted tour edges
- JSON and CSV files in `data/outputs/` containing the tour data

## Customization

You can modify the graph generation parameters in `aircraft_routing_problem_generator.py`:
- For full world: Change the number of nodes
- For sparse world: Adjust node count, connectivity ratio, and cost ranges

## Backend Contributors

@AIWithShrey
@mdv314

# Christofides Algorithm with Chained Lin-Kernighan for TSP Optimization

This project implements the Christofides algorithm for approximating solutions to the Traveling Salesman Problem (TSP), enhanced with the Chained Lin-Kernighan (Chained LK) heuristic for further optimization. The Christofides algorithm guarantees a solution that is at most 1.5 times the optimal solution for metric TSPs, while the Chained LK heuristic significantly improves upon this initial solution.

## Overview

### Christofides Algorithm
The Christofides algorithm follows these steps:
1. Build a complete graph from the input data
2. Compute a minimum spanning tree (MST)
3. Find vertices with odd degrees in the MST
4. Compute a minimum-weight perfect matching of odd-degree vertices
5. Combine the MST and matching to form an Eulerian circuit
6. Shortcut the Eulerian circuit to form a Hamiltonian cycle (TSP tour)

### Chained Lin-Kernighan Heuristic
The Chained Lin-Kernighan enhancement uses a two-phase approach:
1. **Basic LK Phase**: Uses 2-opt moves to find local improvements to a tour
2. **Chaining Phase**: Applies a series of "double-bridge kicks" (4-opt moves) followed by LK optimization to escape local optima

This implementation:
- Starts with the Christofides solution as the initial tour
- Applies a sequence of perturbations and local optimizations
- Uses an acceptance criterion to escape local optima
- Implements early termination when improvements stagnate
- Typically achieves 10-20% improvement over the Christofides solution

## Requirements

- Python 3.7+
- NetworkX
- Matplotlib
- NumPy
- Pandas
- FastAPI and Uvicorn (for API endpoints)
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
├── christofides.py              # Main implementation of Christofides and Chained LK algorithms
├── aircraft_routing_problem_generator.py  # Generates test routing problems
├── routegen.sh                  # Shell script to generate route data and visualizations
├── requirements.txt             # Python dependencies
├── api/                         # FastAPI application
│   ├── app.py                   # Main API endpoints
│   └── static.py                # Static file server for serving results
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

### Running the API Server

To start the FastAPI server:

```
uvicorn api.app:app --host 0.0.0.0 --port 5000 --reload
```

Or simply use Docker:

```
docker-compose up
```

### API Endpoints

The following API endpoints are available:

- **GET /api/health** - Health check endpoint
- **POST /api/solve** - Upload a CSV file to solve the TSP problem
- **GET /api/results** - Get a list of all solution results
- **GET /api/results/{result_id}** - Get details for a specific result
- **GET /api/examples** - Get a list of example problems
- **GET /data/outputs/{filename}** - Get a specific output file (images, CSVs, etc.)
- **GET /data/inputs/{filename}** - Get a specific input file

### Interactive Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

### Generating Test Data

To generate new test data (full and sparse world graphs):

```
./routegen.sh
```

This script will:
1. Create necessary directories if they don't exist
2. Run the problem generator to create CSV files
3. Generate PlantUML diagrams and convert them to PNG visualizations

### Running the Algorithm

To solve the TSP for the generated graphs:

```
python christofides.py
```

The program will:
1. Read both the sparse and full world graphs
2. Apply the Christofides algorithm to find initial TSP tours
3. Improve these tours using the Chained Lin-Kernighan heuristic
4. Output both the Christofides and Chained LK tour sequences and costs
5. Show the percentage improvement achieved by Chained LK
6. Save visualizations of both tours as PNG files
7. Save the tour data in JSON and CSV formats in the `data/outputs/` directory

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
- Terminal output showing the computed tours, their costs, and improvement percentages
- Separate PNG visualizations for both Christofides and Chained LK tours
- JSON and CSV files for both solution types in `data/outputs/`:
  - `*_christofides.json/csv`: Original Christofides solutions
  - `*_chained_lk.json/csv`: Improved solutions from Chained LK

## Algorithm Details

### Lin-Kernighan Heuristic
The Lin-Kernighan heuristic is a powerful local search method that dynamically determines how many and which edges to swap to improve a tour. Our implementation uses a simplified version focused on efficient 2-opt moves.

### Chained Lin-Kernighan
The chaining mechanism:
1. Performs a "double-bridge kick" - a 4-opt move that cannot be undone by 2-opt moves
2. Applies LK optimization to the perturbed solution
3. Accepts improvements to the best solution unconditionally
4. Can also accept non-improving moves to escape local optima
5. Continues until improvement stagnates or a time limit is reached

## Customization

- Modify algorithm parameters in `christofides.py`:
  - `num_chains`: Number of chains to attempt in Chained LK
  - `max_non_improving`: How many non-improving chains before termination
  - `max_iterations`: Maximum number of iterations for basic LK

- Modify graph generation parameters in `aircraft_routing_problem_generator.py`:
  - For full world: Change the number of nodes
  - For sparse world: Adjust node count, connectivity ratio, and cost ranges

## Backend Contributors

@AIWithShrey
@mdv314

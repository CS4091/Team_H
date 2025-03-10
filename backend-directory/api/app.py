from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import sys

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import from the christofides module
from christofides import (
    read_graph_from_csv, 
    ensure_complete_graph,
    christofides_algorithm,
    calculate_tour_cost,
    save_tour_to_json,
    save_tour_to_csv,
    visualize_tour
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Simple health check endpoint
    """
    return jsonify({"status": "healthy"})

@app.route('/api/solve', methods=['POST'])
def solve_tsp():
    """
    Submit a TSP problem for solving.
    Input: CSV content as string or file upload
    Output: Solution details including tour and cost
    """
    if 'file' in request.files:
        file = request.files['file']
        # Save temporarily
        temp_path = "data/inputs/temp_input.csv"
        file.save(temp_path)
        
        # Process the file
        G = read_graph_from_csv(temp_path)
        G = ensure_complete_graph(G)
        
        # Run the algorithm
        tour = christofides_algorithm(G)
        cost = calculate_tour_cost(G, tour)
        
        # Save results
        output_prefix = "data/outputs/api_result"
        json_path = f"{output_prefix}.json"
        csv_path = f"{output_prefix}.csv"
        img_path = f"{output_prefix}.png"
        
        save_tour_to_json(tour, cost, json_path)
        save_tour_to_csv(tour, cost, csv_path)
        visualize_tour(G, tour, "API TSP Solution", img_path)
        
        return jsonify({
            "tour": tour,
            "cost": cost,
            "visualization_path": "/data/outputs/api_result.png",
            "json_path": "/data/outputs/api_result.json",
            "csv_path": "/data/outputs/api_result.csv"
        })
    
    return jsonify({"error": "No file provided"}), 400

@app.route('/api/results', methods=['GET'])
def get_results():
    """
    Get a list of available results
    """
    results = []
    outputs_dir = "data/outputs"
    
    for filename in os.listdir(outputs_dir):
        if filename.endswith(".json"):
            file_path = os.path.join(outputs_dir, filename)
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                    results.append({
                        "name": filename.replace(".json", ""),
                        "cost": data.get("cost", 0),
                        "nodes": len(data.get("tour", [])),
                        "created": os.path.getctime(file_path)
                    })
            except:
                continue
    
    return jsonify(results)

@app.route('/api/results/<result_id>', methods=['GET'])
def get_result_details(result_id):
    """
    Get details for a specific result
    """
    json_path = f"data/outputs/{result_id}.json"
    
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            data = json.load(f)
            # Add paths to related files
            data["visualization_path"] = f"/data/outputs/{result_id}.png"
            data["csv_path"] = f"/data/outputs/{result_id}.csv"
            return jsonify(data)
    
    return jsonify({"error": "Result not found"}), 404

@app.route('/api/examples', methods=['GET'])
def get_examples():
    """
    Get a list of example problems
    """
    examples = []
    inputs_dir = "data/inputs"
    
    for filename in os.listdir(inputs_dir):
        if filename.endswith(".csv"):
            file_path = os.path.join(inputs_dir, filename)
            examples.append({
                "name": filename.replace(".csv", ""),
                "path": f"/data/inputs/{filename}",
                "size": os.path.getsize(file_path),
                "created": os.path.getctime(file_path)
            })
    
    return jsonify(examples)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 
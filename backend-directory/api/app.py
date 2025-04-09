import base64
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from typing import List, Dict, Any, Optional
import os
import json
import sys
# from datetime import datetime

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

# Import the static file server
from .static import static_app

app = FastAPI(title="Aircraft Routing API", description="API for solving aircraft routing problems")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You might want to restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static file server
app.mount("/data", static_app)

@app.get("/api/health")
def health_check():
    """
    Simple health check endpoint
    """
    return {"status": "healthy"}

@app.post("/api/solve")
async def solve_tsp(file: UploadFile = File(...)):
    """
    Submit a TSP problem for solving.
    """
    try:
        # Save temporarily
        temp_path = "data/inputs/temp_input.csv"
        os.makedirs(os.path.dirname(temp_path), exist_ok=True)
        with open(temp_path, "wb") as temp_file:
          try:
              content = await file.read()
              temp_file.write(content)
          except Exception as e:
              raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")
        
        # Process the file
        G = read_graph_from_csv(temp_path)
        G = ensure_complete_graph(G)
        
        # Run the algorithm
        tour = christofides_algorithm(G)
        cost = calculate_tour_cost(G, tour[0])
        
        # Save results
        output_prefix = "data/outputs/api_result"
        json_path = f"{output_prefix}.json"
        csv_path = f"{output_prefix}.csv"
        img_path = f"{output_prefix}.png"
        
        save_tour_to_json(tour[0], cost, json_path)
        print("after save tour to json")
        save_tour_to_csv(tour[0], cost, csv_path)
        visualize_tour(G, tour[0], "API TSP Solution")
        
        json_path = "data/outputs/api_result.json"
        with open(json_path, 'r') as f:
            json_data = json.load(f)

        pngFilename = "data/outputs/API_TSP_Solution.png"
        with open(pngFilename, "rb") as f:
            data = f.read()
        encoded_image = base64.b64encode(data).decode("utf-8")
        
        
        
        return {
            "image_data": encoded_image,
            "json_data": json_data,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

@app.get("/api/results")
def get_results():
    """
    Get a list of available results
    """
    results = []
    outputs_dir = "data/outputs"
    
    if not os.path.exists(outputs_dir):
        return []
    
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
    
    return results

@app.get("/api/results/{result_id}")
def get_result_details(result_id: str):
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
            return data
    
    raise HTTPException(status_code=404, detail="Result not found")

@app.get("/api/examples")
def get_examples():
    """
    Get a list of example problems
    """
    examples = []
    inputs_dir = "data/inputs"
    
    if not os.path.exists(inputs_dir):
        return []
    
    for filename in os.listdir(inputs_dir):
        if filename.endswith(".csv"):
            file_path = os.path.join(inputs_dir, filename)
            examples.append({
                "name": filename.replace(".csv", ""),
                "path": f"/data/inputs/{filename}",
                "size": os.path.getsize(file_path),
                "created": os.path.getctime(file_path)
            })
    
    return examples

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True) 
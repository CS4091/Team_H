import base64
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi import Body, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from typing import List, Dict, Any, Optional
import os
import json
import sys
import math
# from datetime import datetime
from karney.geodesic import distance
import os, math, requests, polyline, base64
from urllib.parse import urlencode
import time
from dotenv import load_dotenv
load_dotenv()
from supabase import create_client, Client
from typing import List



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
import ant_colony
import csv

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


# async def solve_tsp(file: UploadFile = File(...)):
#     """
#     Submit a TSP problem for solving.
#     """
#     try:
#         # Save temporarily
#         temp_path = "data/inputs/temp_input.csv"
#         os.makedirs(os.path.dirname(temp_path), exist_ok=True)
#         with open(temp_path, "wb") as temp_file:
#           try:
#               content = await file.read()
#               temp_file.write(content)
#           except Exception as e:
#               raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")
        
#         # Process the file
#         G = read_graph_from_csv(temp_path)
#         G = ensure_complete_graph(G)
        
#         # Run the algorithm
#         tour = christofides_algorithm(G)
#         cost = calculate_tour_cost(G, tour[0])
        
#         # Save results
#         output_prefix = "data/outputs/api_result"
#         json_path = f"{output_prefix}.json"
#         csv_path = f"{output_prefix}.csv"
#         img_path = f"{output_prefix}.png"
        
#         save_tour_to_json(tour[0], cost, json_path)
#         print("after save tour to json")
#         save_tour_to_csv(tour[0], cost, csv_path)
#         visualize_tour(G, tour[0], "API TSP Solution")
        
#         json_path = "data/outputs/api_result.json"
#         with open(json_path, 'r') as f:
#             json_data = json.load(f)

#         pngFilename = "data/outputs/API_TSP_Solution.png"
#         with open(pngFilename, "rb") as f:
#             data = f.read()
#         encoded_image = base64.b64encode(data).decode("utf-8")
        
        
        
#         return {
#             "image_data": encoded_image,
#             "json_data": json_data,
#         }
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")
# final function for the route generation

@app.post("/api/solve")
# async def solve_tsp(lat, long):
async def solve_tsp(lat: List[float] = Body(...), long: List[float] = Body(...)):
    """ Submit a tsp problem for solving with Christofides + Chained LK or Ant colony optimization
    Inputs:
        lat : List of latitude coordinates as floats
        long : List of longitude coordinates as floats
    Outputs:
        JSON of the results 
    """
    def compute_geodesic_distance(lat1, lon1, lat2, lon2):
        # distance returns (s12, azi1, azi2)
        s12, azi1, azi2 = distance(lat1, lon1, lat2, lon2,
                                    degrees=True)
        return (s12/1000)
    
    try:
        coords = [(lat[i], long[i]) for i in range(len(lat))]
        
        keys = {}
        for i in range(len(coords)):
            keys[i] = coords[i]

        coords_csv = []
        for i in range(len(keys)):
            lat1, lon1 = keys[i]
            for j in range(i+1, len(keys)):
                lat2, lon2 = keys[j]
                d = compute_geodesic_distance(lat1, lon1, lat2, lon2)
                coords_csv.append([i, j, d])
        
        header = ['From', 'To', 'Cost']
        with open('real_world.csv', 'w') as f:
            write = csv.writer(f)
            write.writerow(header)
            write.writerows(coords_csv)
        
        G = read_graph_from_csv('real_world.csv')
        G = ensure_complete_graph(G)
        chris_tour = christofides_algorithm(G)
        chris_cost = calculate_tour_cost(G, chris_tour[0])
        ant_tour, ant_cost = ant_colony.run_aco(file_path="real_world.csv",alpha=0.1, beta=0.05, evaporation_rate=0.1, iterations=250, num_ants=250)
        ant_tour = [int(x) for x in ant_tour]

        print(f"Algorithm used: {"Christofides" if chris_cost < ant_cost else "Ant Colony optimization"}")

        tour = chris_tour[0] if chris_cost < ant_cost else ant_tour
        cost = chris_cost if chris_cost < ant_cost else ant_cost

        output_prefix = "data/outputs/api_result"
        json_path = f"{output_prefix}.json"
        csv_path = f"{output_prefix}.csv"
        img_path = f"{output_prefix}.png"

        save_tour_to_json(tour, cost, json_path)
        print("after save tour to json")
        save_tour_to_csv(tour, cost, csv_path)
        visualize_tour(G, tour, "API TSP Solution")
        
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

# final function for thumbnail stuff
@app.post("/api/gen_thumbnail")
def gen_route_thumbnail(lat: List[float] = Body(...), long: List[float] = Body(...)):
    """ Generates route thumbnail given a list of longitudes and latitudes
    Parameters:
        lat : List of latitude coordinates as floats
        long : List of longitude coordinates as floats
    Output:
        url: Public url of the image after uploading to supabase
    """
    coords = [(lat[i], long[i]) for i in range(len(lat))]
    
    def bearing(a, b):
        lat1, lon1 = map(math.radians, a)
        lat2, lon2 = map(math.radians, b)
        dlon = lon2 - lon1
        x = math.sin(dlon) * math.cos(lat2)
        y = math.cos(lat1)*math.sin(lat2) - math.sin(lat1)*math.cos(lat2)*math.cos(dlon)
        return (math.degrees(math.atan2(x, y)) + 360) % 360

    # pick your “plane” index
    i = 1
    lat, lng = coords[i]
    angle = bearing(coords[i], coords[i+1]) if i < len(coords)-1 else 0

    API_KEY = os.getenv("MAPS_API_KEY")

    # encode your route
    encoded_route = polyline.encode(coords)

    params = {
    "size":    "400x300",
    "scale": 2,
    "maptype": "roadmap",
    "key":     API_KEY,
    "path":    f"weight:4|color:0xff0000ff|enc:{encoded_route}",
    #   "markers": f"icon:https://goo.gl/5y3S82%7CCanberra+ACT|{lat:.6f},{lng:.6f}"
    }

    url = "https://maps.googleapis.com/maps/api/staticmap?" + urlencode(params)
    print(url)
    resp = requests.get(url)
    resp.raise_for_status()

    resp = requests.get(url)

    # make path
    file_name = "route_thumbnail" + f"_{time.time()}" + ".png"

    if not resp.ok:
        print("Failed to fetch map:")
        print(" • HTTP status:", resp.status_code)
        print(" • Response headers:", resp.headers)
        print(" • Response body:", resp.text)   # often contains an error message in plain text or JSON
    else:
        # success path
        with open(file_name, "wb") as f:
            f.write(resp.content)
        print("Saved route3.png")
    
    key: str = os.getenv("SUPABASE_KEY")
    url: str = os.getenv("SUPABASE_URL")
    supabase: Client = create_client(url, key)
    
    # upload to supabase
    with open(file_name, "rb") as f:
        response = (
            supabase.storage
            .from_("images")
            .upload(
                file=f,
                path=file_name,
                file_options={"cache-control": "3600", "upsert": "true"}
            )
        )

        # get public url
        public_url = supabase.storage.from_("images").get_public_url(file_name)
    
    return public_url



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
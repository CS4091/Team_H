from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
from pathlib import Path

# Create the static file app that will be mounted to the main app
static_app = FastAPI()

# Check if the directory exists to prevent errors at startup
data_dir = Path("data")
outputs_dir = data_dir / "outputs"
inputs_dir = data_dir / "inputs"

os.makedirs(outputs_dir, exist_ok=True)
os.makedirs(inputs_dir, exist_ok=True)

@static_app.get("/outputs/{filename:path}")
async def get_output_file(filename: str):
    """
    Serve files from the outputs directory
    """
    file_path = outputs_dir / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

@static_app.get("/inputs/{filename:path}")
async def get_input_file(filename: str):
    """
    Serve files from the inputs directory
    """
    file_path = inputs_dir / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path) 
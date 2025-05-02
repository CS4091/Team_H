import os, requests, polyline
from urllib.parse import urlencode

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY", "YOUR_KEY")

coords = [
    (40.7128, -74.0060),
    (41.8781, -87.6298),
    (39.7392, -104.9903),
    (47.6062, -122.3321)
]

# encode into a compact string
encoded = polyline.encode(coords)

params = {
    "size": "800x600",
    "maptype": "roadmap",
    "key": API_KEY,
    # use enc: to signal an encoded polyline
    "path": "weight:4|color:0xff0000ff|enc:" + encoded
}

url = "https://maps.googleapis.com/maps/api/staticmap?" + urlencode(params)
resp = requests.get(url)
resp.raise_for_status()
with open("route_enc.png", "wb") as f:
    f.write(resp.content)

print("Saved route_enc.png")

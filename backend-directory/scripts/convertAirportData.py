#!/usr/bin/env python3
import csv
import json

def csv_to_json(csv_path: str, json_path: str) -> None:
    """
    Read the CSV at `csv_path` and write a JSON array to `json_path`.
    Each row becomes an object with keys:
      country_code, region_name, iata, icao, airport, latitude, longitude
    """
    data = []
    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # convert latitude/longitude to floats
            row['latitude']  = float(row['latitude'])
            row['longitude'] = float(row['longitude'])
            data.append(row)

    with open(json_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(data, jsonfile, ensure_ascii=False, indent=2)
        print(f"Wrote {len(data)} records to {json_path}")

if __name__ == "__main__":
    csv_path, json_path = 'iata-icao.csv', 'airports.json'
    csv_to_json(csv_path, json_path)

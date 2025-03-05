#!/bin/bash
# sudo apt install graphviz 
if [ ! -d "./data/inputs" ]; then
  mkdir data/inputs
fi
python3 aircraft_routing_problem_generator.py
java -jar data/plantuml-1.2025.1.jar ./data/inputs/full_world.puml ./data/inputs/sparse_world.puml
rm ./data/inputs/full_world.puml ./data/inputs/sparse_world.puml
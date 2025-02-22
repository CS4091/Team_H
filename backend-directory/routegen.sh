#!/bin/bash
# sudo apt install graphviz 
python3 aircraft_routing_problem_generator.py
java -jar plantuml-1.2025.1.jar ./generatedfiles/full_world.puml ./generatedfiles/sparse_world.puml
rm ./generatedfiles/full_world.puml ./generatedfiles/sparse_world.puml
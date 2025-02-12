#!/bin/bash

# Verzeichnis mit den JSON-Dateien
JSON_DIR="./json_files"


curl -X POST "http://localhost:3000/api/register" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"username": "demo", "password": "1234", "full_name": "demo", "email": "demo@demo.de"}'

# Login und Token speichern
TOKEN=$(curl -s -X POST "http://localhost:3000/api/token" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"username": "demo", "password": "1234"}' | grep -o '"token":"[^"]*"' | sed 's/"token":"//;s/"//')


curl -X POST "http://localhost:3000/api/collections/upload" \
     -H "Accept: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @"$JSON_DIR/collections_ml.json"

# Item 1 upload
curl -X POST "http://localhost:3000/api/items/upload" \
     -H "Accept: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @"$JSON_DIR/item_landcover.json"

# Item 2 upload
curl -X POST "http://localhost:3000/api/items/upload" \
     -H "Accept: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @"$JSON_DIR/item_satlas.json"

# Item 3 upload
curl -X POST "http://localhost:3000/api/items/upload" \
     -H "Accept: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @"$JSON_DIR/item_waters.json"

echo "Import abgeschlossen."
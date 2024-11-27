#!/bin/bash

# Database connection parameters
DB_NAME="stac_db"    
DB_USER="stac_user"        
DB_PASSWORD="stac_password" 
DB_HOST="postgres"     
DB_PORT="5432"             

# Check if SQL file argument is provided
if [[ -z "$1" ]]; then
  echo "Usage: $0 <path_to_sql_file>"
  exit 1
fi

SQL_FILE="$1"

# Check if the specified SQL file exists
if [[ ! -f "$SQL_FILE" ]]; then
  echo "Error: SQL file '$SQL_FILE' not found."
  exit 1
fi

# Load the SQL file into the PostgreSQL container
cat "$SQL_FILE" | docker exec -i "$DB_HOST" psql -U "$DB_USER" -d "$DB_NAME"

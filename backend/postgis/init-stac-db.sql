-- Aktiviert die PostGIS-Erweiterungen
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE EXTENSION IF NOT EXISTS postgis_topology;

CREATE TABLE IF NOT EXISTS collections (
    type TEXT NOT NULL,
    stac_version TEXT NOT NULL,
    stac_extensions TEXT [],
    collection_id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT NOT NULL,
    keywords TEXT [],
    license TEXT,
    providers JSONB,
    extent JSONB NOT NULL,
    summaries JSONB,
    links JSONB [] NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    type TEXT NOT NULL,
    stac_version TEXT NOT NULL,
    stac_extensions TEXT [],
    item_id TEXT NOT NULL UNIQUE,
    collection_id TEXT REFERENCES collections(collection_id) ON DELETE CASCADE,
    geometry GEOMETRY(Point, 4326) NOT NULL,
    bbox FLOAT8 [],
    assets JSONB NOT NULL,
    links JSONB [] NOT NULL,
    PRIMARY KEY(collection_id, item_id)
);

CREATE TABLE IF NOT EXISTS properties (
    item_id TEXT REFERENCES items(item_id) ON DELETE CASCADE,
    collection_id TEXT REFERENCES collections(collection_id),
    description TEXT,
    datetime TIMESTAMP WITH TIME ZONE,
    mlm_name TEXT NOT NULL,
    mlm_tasks TEXT [] NOT NULL,
    mlm_architecture TEXT NOT NULL,
    mlm_framework TEXT,
    mlm_framework_version TEXT,
    mlm_memory_size INTEGER,
    mlm_total_parameters INTEGER, 
    mlm_pretrained BOOLEAN,
    mlm_pretrained_source TEXT,
    mlm_batch_size_suggestion INTEGER,
    mlm_accelerator TEXT,
    mlm_accelerator_constrained BOOLEAN,
    mlm_accelerator_summary TEXT,
    mlm_accelerator_count INTEGER,
    mlm_input JSONB,
    mlm_output JSONB,
    mlm_hyperparameters JSONB,
    PRIMARY KEY (collection_id, item_id)
);
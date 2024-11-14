-- Aktiviert die PostGIS-Erweiterungen
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE EXTENSION IF NOT EXISTS postgis_topology;

CREATE TABLE IF NOT EXISTS collections (
    type TEXT NOT NULL,
    stac_version TEXT NOT NULL,
    stac_extensions TEXT [],
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT NOT NULL,
    license TEXT,
    extent JSONB NOT NULL,
    summaries JSONB,
    links JSONB [] NOT NULL
);

CREATE TABLE IF NOT EXISTS providers (
    id TEXT REFERENCES collections(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    PRIMARY KEY(id, provider)
);

CREATE VIEW providers_view AS
    SELECT provider, COUNT(*) FROM providers GROUP BY provider ORDER BY COUNT(*);

CREATE TABLE IF NOT EXISTS keywords (
    id TEXT REFERENCES collections(id) ON DELETE CASCADE,
    keyword TEXT NOT NULL,
    PRIMARY KEY(id, keyword)
);

CREATE VIEW keywords_view AS
    SELECT keyword, COUNT(*) FROM keywords GROUP BY keyword ORDER BY COUNT(*);

CREATE TABLE IF NOT EXISTS items (
    type TEXT NOT NULL,
    stac_version TEXT NOT NULL,
    stac_extensions TEXT [],
    id TEXT NOT NULL UNIQUE,
    collection TEXT REFERENCES collections(id) ON DELETE CASCADE,
    geometry GEOMETRY(Point, 4326) NOT NULL,
    bbox FLOAT8 [],
    assets JSONB NOT NULL,
    links JSONB [] NOT NULL,
    PRIMARY KEY(collection, id)
);

CREATE TABLE IF NOT EXISTS properties (
    id TEXT REFERENCES items(id) ON DELETE CASCADE,
    collection TEXT REFERENCES collections(id),
    description TEXT,
    datetime TIMESTAMP WITH TIME ZONE,
    "mlm:name" TEXT NOT NULL,
    "mlm:architecture" TEXT NOT NULL,
    "mlm:framework" TEXT,
    "mlm:framework_version" TEXT,
    "mlm:memory_size" INTEGER,
    "mlm:total_parameters" INTEGER,
    "mlm:pretrained" BOOLEAN,
    "mlm:pretrained_source" TEXT,
    "mlm:batch_size_suggestion" INTEGER,
    "mlm:accelerator" TEXT,
    "mlm:accelerator_constrained" BOOLEAN,
    "mlm:accelerator_summary" TEXT,
    "mlm:accelerator_count" INTEGER,
    "mlm:input" JSONB,
    "mlm:output" JSONB,
    "mlm:hyperparameters" JSONB,
    PRIMARY KEY (collection, id)
);

CREATE TABLE IF NOT EXISTS mlm_tasks(
    id TEXT REFERENCES items(id) ON DELETE CASCADE,
    collection TEXT REFERENCES collections(id),
    task TEXT NOT NULL,
    PRIMARY KEY(collection, id, task)
);

CREATE VIEW mlm_tasks_view AS
    SELECT task, COUNT(*) FROM mlm_tasks GROUP BY task ORDER BY COUNT(*);
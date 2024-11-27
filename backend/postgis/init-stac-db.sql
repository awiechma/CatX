CREATE TABLE IF NOT EXISTS collections (
    type TEXT NOT NULL,
    stac_version TEXT NOT NULL,
    stac_extensions TEXT [],
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT NOT NULL,
    license TEXT,
    extent JSONB NOT NULL,
    item_assets JSONB,
    summaries JSONB,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CREATION_USER TEXT NOT NULL,
    UPDATE_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UPDATE_USER TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS providers (
    id TEXT REFERENCES collections(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CREATION_USER TEXT NOT NULL,
    UPDATE_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UPDATE_USER TEXT NOT NULL,
    PRIMARY KEY(id, provider)
);

CREATE VIEW providers_view AS
SELECT
    provider,
    COUNT(*)
FROM
    providers
GROUP BY
    provider
ORDER BY
    COUNT(*);

CREATE TABLE IF NOT EXISTS keywords (
    id TEXT REFERENCES collections(id) ON DELETE CASCADE,
    keyword TEXT NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CREATION_USER TEXT NOT NULL,
    UPDATE_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UPDATE_USER TEXT NOT NULL,
    PRIMARY KEY(id, keyword)
);

CREATE VIEW keywords_view AS
SELECT
    keyword,
    COUNT(*)
FROM
    keywords
GROUP BY
    keyword
ORDER BY
    COUNT(*);

CREATE TABLE IF NOT EXISTS items (
    type TEXT NOT NULL,
    stac_version TEXT NOT NULL,
    stac_extensions TEXT [],
    id TEXT NOT NULL UNIQUE,
    collection TEXT REFERENCES collections(id) ON DELETE CASCADE,
    geometry JSONB NOT NULL,
    bbox FLOAT8 [],
    assets JSONB NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CREATION_USER TEXT NOT NULL,
    UPDATE_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UPDATE_USER TEXT NOT NULL,
    PRIMARY KEY(collection, id)
);

CREATE TABLE IF NOT EXISTS properties (
    id TEXT REFERENCES items(id) ON DELETE CASCADE,
    collection TEXT REFERENCES collections(id),
    description TEXT,
    datetime TIMESTAMP WITH TIME ZONE,
    start_datetime TIMESTAMP WITH TIME ZONE,
    end_datetime TIMESTAMP WITH TIME ZONE,
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
    "mlm:input" JSONB [],
    "mlm:output" JSONB [],
    "mlm:hyperparameters" JSONB [],
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CREATION_USER TEXT NOT NULL,
    UPDATE_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UPDATE_USER TEXT NOT NULL,
    PRIMARY KEY (collection, id)
);

CREATE TABLE IF NOT EXISTS mlm_tasks(
    id TEXT REFERENCES items(id) ON DELETE CASCADE,
    collection TEXT REFERENCES collections(id),
    task TEXT NOT NULL,
    CREATION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CREATION_USER TEXT NOT NULL,
    UPDATE_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UPDATE_USER TEXT NOT NULL,
    PRIMARY KEY(collection, id, task)
);

CREATE VIEW mlm_tasks_view AS
SELECT
    task,
    COUNT(*)
FROM
    mlm_tasks
GROUP BY
    task
ORDER BY
    COUNT(*);

CREATE VIEW collections_complete_view AS
SELECT
    c.stac_version,
    c.stac_extensions,
    c.type,
    c.id,
    c.title,
    c.description,
    c.license,
    c.extent,
    c.item_assets,
    c.summaries,
    (
        SELECT
            ARRAY_AGG(k.keyword)
        FROM
            keywords k
        WHERE
            c.id = k.id
    ) AS keywords,
    (
        SELECT
            ARRAY_AGG(p.provider)
        FROM
            providers p
        WHERE
            c.id = p.id
    ) AS providers,
    jsonb_agg(
        jsonb_build_object(
            'href',
            CONCAT('/api/items/', i.id),
            'rel',
            'item'
        )
    ) || jsonb_build_object(
        'href',
        CONCAT('/api/collections/', c.id),
        'rel',
        'self'
    ) AS links
FROM
    collections c
    LEFT JOIN items i ON c.id = i.collection
GROUP BY
    c.stac_version,
    c.stac_extensions,
    c.type,
    c.id,
    c.title,
    c.description,
    c.license,
    c.extent,
    c.item_assets,
    c.summaries;

CREATE VIEW items_complete_view AS
SELECT
    i.stac_version,
    i.stac_extensions,
    i.type,
    i.id,
    i.collection,
    i.geometry,
    i.bbox,
    jsonb_strip_nulls(
        jsonb_agg(
            jsonb_build_object(
                'description',
                p.description,
                'datetime',
                p.datetime,
                'start_datetime',
                p.start_datetime,
                'end_datetime',
                p.end_datetime,
                'mlm:name',
                p."mlm:name",
                'mlm:tasks',
                (
                    SELECT
                        jsonb_agg(t.task)
                    FROM
                        mlm_tasks t
                    WHERE
                        i.collection = t.collection
                        AND i.id = t.id
                ),
                'mlm:architecture',
                p."mlm:architecture",
                'mlm:framework',
                p."mlm:framework",
                'mlm:framework_version',
                p."mlm:framework_version",
                'mlm:memory_size',
                p."mlm:memory_size",
                'mlm:total_parameters',
                p."mlm:total_parameters",
                'mlm:pretrained',
                p."mlm:pretrained",
                'mlm:pretrained_source',
                p."mlm:pretrained_source",
                'mlm:batch_size_suggestion',
                p."mlm:batch_size_suggestion",
                'mlm:accelerator',
                p."mlm:accelerator",
                'mlm:accelerator_constrained',
                p."mlm:accelerator_constrained",
                'mlm:accelerator_summary',
                p."mlm:accelerator_summary",
                'mlm:accelerator_count',
                p."mlm:accelerator_count",
                'mlm:input',
                p."mlm:input",
                'mlm:output',
                p."mlm:output",
                'mlm:hyperparameters',
                p."mlm:hyperparameters"
            )
        )
    ) AS properties,
    i.assets,
    jsonb_agg(
        jsonb_build_object(
            'href',
            CONCAT('/api/items/', i.id),
            'rel',
            'self'
        )
    ) || jsonb_build_object(
        'href',
        CONCAT('/api/collections/', i.collection),
        'rel',
        'collection'
    ) AS links
FROM
    items i
    LEFT JOIN properties p ON i.collection = p.collection
    AND i.id = p.id
GROUP BY
    i.stac_version,
    i.stac_extensions,
    i.type,
    i.id,
    i.collection,
    i.geometry,
    i.bbox,
    i.assets;
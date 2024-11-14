-- Insert data into collections
INSERT INTO collections (type, stac_version, stac_extensions, id, title, description, license, extent, summaries, links)
VALUES
('collection', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-collection-1', 'Machine Learning Models Collection 1', 
 'A collection of machine learning models for various tasks.', 'CC BY 4.0', 
 '{"spatial": {"bbox": [[-180, -90, 180, 90]]}, "temporal": {"interval": [["2020-01-01T00:00:00Z", "2024-01-01T00:00:00Z"]]}}', 
 '{"model_count": 10}', ARRAY[ JSONB('{"rel": "self", "href": "/collections/mlm-collection-1"}') ]),
('collection', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-collection-2', 'Machine Learning Models Collection 2', 
 'Another collection of machine learning models focusing on image processing.', 'CC BY 4.0', 
 '{"spatial": {"bbox": [[-90, -45, 90, 45]]}, "temporal": {"interval": [["2021-01-01T00:00:00Z", "2024-01-01T00:00:00Z"]]}}', 
 '{"model_count": 15}', ARRAY[ JSONB('{"rel": "self", "href": "/collections/mlm-collection-2"}') ]);

-- Insert data into providers
INSERT INTO providers (id, provider)
VALUES
('mlm-collection-1', 'Provider A'),
('mlm-collection-1', 'Provider B'),
('mlm-collection-2', 'Provider C');

-- Insert data into keywords
INSERT INTO keywords (id, keyword)
VALUES
('mlm-collection-1', 'machine learning'),
('mlm-collection-1', 'deep learning'),
('mlm-collection-1', 'natural language processing'),
('mlm-collection-2', 'computer vision'),
('mlm-collection-2', 'image segmentation'),
('mlm-collection-2', 'object detection');

-- Insert data into items
INSERT INTO items (type, stac_version, stac_extensions, id, collection, geometry, bbox, assets, links)
VALUES
('item', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-item-1', 'mlm-collection-1', 
 ST_SetSRID(ST_MakePoint(-100, 40), 4326), 
 ARRAY[-100.0, 39.0, -99.0, 41.0], 
 '{"model_file": {"href": "http://example.com/models/model1.h5", "type": "application/x-hdf5"}}', 
 ARRAY[ JSONB('{"rel": "self", "href": "/items/mlm-item-1"}') ]),
('item', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-item-2', 'mlm-collection-1', 
 ST_SetSRID(ST_MakePoint(-101, 41), 4326), 
 ARRAY[-101.0, 40.0, -100.0, 42.0], 
 '{"model_file": {"href": "http://example.com/models/model2.h5", "type": "application/x-hdf5"}}', 
 ARRAY[ JSONB('{"rel": "self", "href": "/items/mlm-item-2"}') ]),
('item', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-item-3', 'mlm-collection-2', 
 ST_SetSRID(ST_MakePoint(-85, 35), 4326), 
 ARRAY[-86.0, 34.0, -84.0, 36.0], 
 '{"model_file": {"href": "http://example.com/models/model3.h5", "type": "application/x-hdf5"}}', 
 ARRAY[ JSONB('{"rel": "self", "href": "/items/mlm-item-3"}') ]);

-- Insert data into properties
INSERT INTO properties (id, collection, description, datetime, "mlm:name", "mlm:architecture", "mlm:framework", 
 "mlm:framework_version", "mlm:memory_size", "mlm:total_parameters", "mlm:pretrained", "mlm:pretrained_source", 
 "mlm:batch_size_suggestion", "mlm:accelerator", "mlm:accelerator_constrained", "mlm:accelerator_summary", 
 "mlm:accelerator_count", "mlm:input", "mlm:output", "mlm:hyperparameters")
VALUES
('mlm-item-1', 'mlm-collection-1', 'A model for sentiment analysis.', '2023-01-01T12:00:00Z', 
 'Sentiment Model', 'Transformer', 'TensorFlow', '2.4.1', 16384, 110000000, TRUE, 
 'https://example.com/pretrained/sentiment_model', 32, 'GPU', FALSE, 
 'NVIDIA V100', 1, '{"text": "input text"}', '{"label": "positive"}', 
 '{"learning_rate": 0.0001, "epochs": 5}'),
('mlm-item-2', 'mlm-collection-1', 'A model for image classification.', '2023-02-01T12:00:00Z', 
 'Image Classification Model', 'CNN', 'PyTorch', '1.9.0', 8192, 16000000, TRUE, 
 'https://example.com/pretrained/image_classification_model', 16, 'TPU', TRUE, 
 'TPU v2', 2, '{"image": "input image"}', '{"class": "cat"}', 
 '{"learning_rate": 0.001, "epochs": 10}'),
('mlm-item-3', 'mlm-collection-2', 'A model for object detection.', '2023-03-01T12:00:00Z', 
 'Object Detection Model', 'YOLO', 'Keras', '2.3.1', 12288, 50000000, TRUE, 
 'https://example.com/pretrained/object_detection_model', 24, 'TPU', FALSE, 
 'TPU v3', 2, '{"image": "input image"}', '{"boxes": [{"class": "car", "confidence": 0.98}]}', 
 '{"learning_rate": 0.0005, "epochs": 20}');

-- Insert data into "mlm:tasks
INSERT INTO mlm_tasks (id, collection, task)
VALUES
('mlm-item-1', 'mlm-collection-1', 'sentiment analysis'),
('mlm-item-2', 'mlm-collection-1', 'image classification'),
('mlm-item-3', 'mlm-collection-2', 'object detection');
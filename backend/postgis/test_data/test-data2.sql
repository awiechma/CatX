-- Insert more data into collections
INSERT INTO collections (type, stac_version, stac_extensions, collection_id, title, description, license, extent, summaries, links)
VALUES
('collection', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-collection-3', 'Machine Learning Models Collection 3', 
 'A collection focused on NLP and language generation models.', 'CC BY-SA 4.0', 
 '{"spatial": {"bbox": [[-120, -50, 120, 50]]}, "temporal": {"interval": [["2022-01-01T00:00:00Z", "2024-12-31T00:00:00Z"]]}}', 
 '{"model_count": 20}', ARRAY[ JSONB('{"rel": "self", "href": "/collections/mlm-collection-3"}') ]),
('collection', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-collection-4', 'Machine Learning Models Collection 4', 
 'Collection of time series analysis models for forecasting.', 'MIT', 
 '{"spatial": {"bbox": [[-75, -35, 75, 35]]}, "temporal": {"interval": [["2021-06-01T00:00:00Z", "2025-01-01T00:00:00Z"]]}}', 
 '{"model_count": 12}', ARRAY[ JSONB('{"rel": "self", "href": "/collections/mlm-collection-4"}') ]);

-- Insert more data into items
INSERT INTO items (type, stac_version, stac_extensions, item_id, collection_id, geometry, bbox, assets, links)
VALUES
('item', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-item-4', 'mlm-collection-3', 
 ST_SetSRID(ST_MakePoint(-90, 30), 4326), 
 ARRAY[-91.0, 29.0, -89.0, 31.0], 
 '{"model_file": {"href": "http://example.com/models/model4.h5", "type": "application/x-hdf5"}}', 
 ARRAY[ JSONB('{"rel": "self", "href": "/items/mlm-item-4"}') ]),
('item', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-item-5', 'mlm-collection-3', 
 ST_SetSRID(ST_MakePoint(-80, 25), 4326), 
 ARRAY[-81.0, 24.0, -79.0, 26.0], 
 '{"model_file": {"href": "http://example.com/models/model5.h5", "type": "application/x-hdf5"}}', 
 ARRAY[ JSONB('{"rel": "self", "href": "/items/mlm-item-5"}') ]),
('item', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-item-6', 'mlm-collection-4', 
 ST_SetSRID(ST_MakePoint(-70, 20), 4326), 
 ARRAY[-71.0, 19.0, -69.0, 21.0], 
 '{"model_file": {"href": "http://example.com/models/model6.h5", "type": "application/x-hdf5"}}', 
 ARRAY[ JSONB('{"rel": "self", "href": "/items/mlm-item-6"}') ]),
('item', '1.0.0', ARRAY['stac', 'mlm'], 'mlm-item-7', 'mlm-collection-4', 
 ST_SetSRID(ST_MakePoint(-60, 15), 4326), 
 ARRAY[-61.0, 14.0, -59.0, 16.0], 
 '{"model_file": {"href": "http://example.com/models/model7.h5", "type": "application/x-hdf5"}}', 
 ARRAY[ JSONB('{"rel": "self", "href": "/items/mlm-item-7"}') ]);

-- Insert more data into properties
INSERT INTO properties (item_id, collection_id, description, datetime, mlm_name, mlm_architecture, mlm_framework, 
 mlm_framework_version, mlm_memory_size, mlm_total_parameters, mlm_pretrained, mlm_pretrained_source, 
 mlm_batch_size_suggestion, mlm_accelerator, mlm_accelerator_constrained, mlm_accelerator_summary, 
 mlm_accelerator_count, mlm_input, mlm_output, mlm_hyperparameters)
VALUES
('mlm-item-4', 'mlm-collection-3', 'A model for text summarization.', '2023-04-01T12:00:00Z', 
 'Summarization Model', 'Transformer', 'Hugging Face', '4.8.2', 20480, 150000000, TRUE, 
 'https://example.com/pretrained/summarization_model', 16, 'TPU', TRUE, 
 'TPU v4', 2, '{"text": "input text"}', '{"summary": "short summary"}', 
 '{"learning_rate": 0.00005, "epochs": 4}'),
('mlm-item-5', 'mlm-collection-3', 'A model for language translation.', '2023-05-01T12:00:00Z', 
 'Translation Model', 'Seq2Seq', 'TensorFlow', '2.5.0', 16384, 120000000, TRUE, 
 'https://example.com/pretrained/translation_model', 32, 'GPU', FALSE, 
 'NVIDIA A100', 4, '{"text": "input text"}', '{"translation": "translated text"}', 
 '{"learning_rate": 0.0002, "epochs": 6}'),
('mlm-item-6', 'mlm-collection-4', 'A model for time series forecasting.', '2023-06-01T12:00:00Z', 
 'Forecast Model', 'LSTM', 'PyTorch', '1.8.0', 8192, 25000000, TRUE, 
 'https://example.com/pretrained/forecast_model', 64, 'TPU', TRUE, 
 'TPU v3', 3, '{"series": "input time series"}', '{"forecast": "future data"}', 
 '{"learning_rate": 0.0003, "epochs": 8}'),
('mlm-item-7', 'mlm-collection-4', 'A model for anomaly detection in time series.', '2023-07-01T12:00:00Z', 
 'Anomaly Detection Model', 'Autoencoder', 'Keras', '2.4.3', 4096, 30000000, TRUE, 
 'https://example.com/pretrained/anomaly_detection_model', 8, 'GPU', FALSE, 
 'NVIDIA T4', 1, '{"series": "input time series"}', '{"anomaly_score": 0.8}', 
 '{"learning_rate": 0.0001, "epochs": 15}');

-- Insert more data into mlm_tasks
INSERT INTO mlm_tasks (item_id, collection_id, task)
VALUES
('mlm-item-4', 'mlm-collection-3', 'text summarization'),
('mlm-item-5', 'mlm-collection-3', 'language translation'),
('mlm-item-6', 'mlm-collection-4', 'time series forecasting'),
('mlm-item-7', 'mlm-collection-4', 'anomaly detection');

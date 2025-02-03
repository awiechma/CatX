# STAC-kompatible PostgreSQL-Datenbank

Diese Datenbank ist für die Speicherung von STAC-Daten (SpatioTemporal Asset Catalog) konzipiert und nutzt PostGIS für die Verarbeitung geografischer Daten. Die Datenbank enthält die folgenden Tabellen: `collections`, `providers`, `keywords`, `items`, `properties`, `mlm_tasks` und `users`.

## Tabellenübersicht

### 1. `collections`

Die Tabelle `collections` speichert Informationen über verschiedene Sammlungen von Satellitenbildern.

| Spalte            | Datentyp                | Beschreibung                                                        |
|-------------------|------------------------|--------------------------------------------------------------------|
| `type`            | TEXT                   | Der Typ der Sammlung (z.B. "collection").                          |
| `stac_version`    | TEXT                   | Die Version des STAC-Schemas.                                     |
| `stac_extensions`  | TEXT[]                 | Eine Liste der verwendeten STAC-Erweiterungen.                     |
| `collection_id`   | TEXT                   | Die eindeutige ID der Sammlung (Primärschlüssel).                  |
| `title`           | TEXT                   | Der Titel der Sammlung.                                            |
| `description`     | TEXT                   | Eine Beschreibung der Sammlung.                                    |
| `license`         | TEXT                   | Die Lizenz, unter der die Daten bereitgestellt werden.            |
| `extent`          | JSONB                  | Der räumliche und zeitliche Umfang der Sammlung.                   |
| `summaries`       | JSONB                  | Zusammenfassende Informationen über die Sammlung.                  |
| `links`           | JSONB[]                | Eine Liste von Links zu weiteren Ressourcen.                       |

### 2. `providers`

Die Tabelle `providers` speichert Informationen über die Anbieter von Daten in den Sammlungen.

| Spalte            | Datentyp                | Beschreibung                                                        |
|-------------------|------------------------|--------------------------------------------------------------------|
| `collection_id`   | TEXT                   | Die ID der Sammlung (Fremdschlüssel).                             |
| `provider`        | TEXT                   | Der Name des Anbieters der Daten.                                  |
| PRIMARY KEY       | (collection_id, provider) | Kombinierter Primärschlüssel für Sammlung und Anbieter.            |

### 3. `keywords`

Die Tabelle `keywords` speichert Schlüsselwörter, die die Sammlungen beschreiben.

| Spalte            | Datentyp                | Beschreibung                                                        |
|-------------------|------------------------|--------------------------------------------------------------------|
| `collection_id`   | TEXT                   | Die ID der Sammlung (Fremdschlüssel).                             |
| `keyword`         | TEXT                   | Das Schlüsselwort.                                                |
| PRIMARY KEY       | (collection_id, keyword) | Kombinierter Primärschlüssel für Sammlung und Schlüsselwort.       |

### 4. `items`

Die Tabelle `items` speichert Informationen über individuelle Elemente in den Sammlungen.

| Spalte            | Datentyp                | Beschreibung                                                        |
|-------------------|------------------------|--------------------------------------------------------------------|
| `type`            | TEXT                   | Der Typ des Elements (z.B. "feature").                             |
| `stac_version`    | TEXT                   | Die Version des STAC-Schemas.                                     |
| `stac_extensions`  | TEXT[]                 | Eine Liste der verwendeten STAC-Erweiterungen.                     |
| `item_id`        | TEXT                   | Die eindeutige ID des Elements (Primärschlüssel).                  |
| `collection_id`   | TEXT                   | Die ID der Sammlung, zu der dieses Element gehört (Fremdschlüssel).|
| `geometry`        | GEOMETRY(Point, 4326)  | Der geografische Punkt des Elements.                               |
| `bbox`            | FLOAT8[]               | Die Bounding Box des Elements.                                     |
| `assets`          | JSONB                  | Informationen über die verfügbaren Assets (z.B. Bilddateien).      |
| `links`           | JSONB[]                | Eine Liste von Links zu weiteren Ressourcen für das Element.       |

### 5. `properties`

Die Tabelle `properties` speichert zusätzliche Eigenschaften und Metadaten zu den Elementen.

| Spalte                     | Datentyp                | Beschreibung                                                        |
|----------------------------|------------------------|--------------------------------------------------------------------|
| `item_id`                  | TEXT                   | Die ID des Elements (Fremdschlüssel).                             |
| `collection_id`            | TEXT                   | Die ID der Sammlung, zu der dieses Element gehört (Fremdschlüssel).|
| `description`              | TEXT                   | Eine Beschreibung des Elements.                                    |
| `datetime`                 | TIMESTAMP WITH TIME ZONE | Der Zeitstempel des Elements.                                      |
| `mlm_name`                 | TEXT                   | Der Name des maschinellen Lernmodells (MLM).                       |
| `mlm_architecture`         | TEXT                   | Die Architektur des Modells (z.B. CNN, RNN).                       |
| `mlm_framework`            | TEXT                   | Das Framework, in dem das Modell implementiert ist (z.B. TensorFlow, PyTorch). |
| `mlm_framework_version`    | TEXT                   | Die Version des verwendeten Frameworks.                             |
| `mlm_memory_size`          | INTEGER                | Die Größe des Speichers, der vom Modell verwendet wird (in MB).    |
| `mlm_total_parameters`     | INTEGER                | Die Gesamtzahl der Parameter im Modell.                             |
| `mlm_pretrained`           | BOOLEAN                | Gibt an, ob das Modell vortrainiert ist oder nicht.                |
| `mlm_pretrained_source`    | TEXT                   | Die Quelle des vortrainierten Modells, falls zutreffend.          |
| `mlm_batch_size_suggestion`| INTEGER                | Eine empfohlene Batch-Größe für das Modell.                        |
| `mlm_accelerator`          | TEXT                   | Der verwendete Beschleuniger (z.B. GPU, TPU).                      |
| `mlm_accelerator_constrained` | BOOLEAN             | Gibt an, ob der Beschleuniger Einschränkungen unterliegt.          |
| `mlm_accelerator_summary`  | TEXT                   | Zusammenfassung der Beschleunigertypen und -konfigurationen.      |
| `mlm_accelerator_count`    | INTEGER                | Anzahl der verwendeten Beschleuniger.                               |
| `mlm_input`                | JSONB                  | Informationen zu den Eingaben des Modells.                        |
| `mlm_output`               | JSONB                  | Informationen zu den Ausgaben des Modells.                        |
| `mlm_hyperparameters`      | JSONB                  | Die Hyperparameter des Modells.                                    |

### 6. `mlm_tasks`

Die Tabelle `mlm_tasks` speichert die spezifischen Aufgaben, die von den Modellen in den Elementen ausgeführt werden.

| Spalte            | Datentyp                | Beschreibung                                                        |
|-------------------|------------------------|--------------------------------------------------------------------|
| `item_id`         | TEXT                   | Die ID des Elements (Fremdschlüssel).                             |
| `collection_id`   | TEXT                   | Die ID der Sammlung, zu der dieses Element gehört (Fremdschlüssel).|
| `task`            | TEXT                   | Die spezifische Aufgabe des Modells (z.B. "Klassifikation").      |
| PRIMARY KEY       | (collection_id, item_id, task) | Kombinierter Primärschlüssel für Sammlung, Element und Aufgabe. |

### 7. `users`

Die Tabelle `users` speichert Nutzerdaten für die Authentifizierung in der Anwendung.

| Spalte            | Datentyp                | Beschreibung                                                        |
|-------------------|------------------------|--------------------------------------------------------------------|
| `user_id`         | SERIAL                 | Eindeutige ID des Nutzers (Primärschlüssel).                      |
| `username`        | TEXT                   | Eindeutiger Benutzername des Nutzers.                             |
| `full_name`       | TEXT                   | Vollständiger Name des Nutzers.                                   |
| `email`           | TEXT                   | Eindeutige E-Mail-Adresse des Nutzers.                            |
| `password_hash`   | TEXT                   | Hash des Passworts des Nutzers.                                   |
| `created_at`      | TIMESTAMP              | Zeitpunkt der Erstellung des Nutzers (Standard: aktueller Zeitstempel). |

## Verwendung

Um die Datenbank zu nutzen, stelle sicher, dass die PostGIS-Erweiterungen installiert sind und die Tabellenstruktur in PostgreSQL erstellt wurde. Du kannst die bereitgestellten SQL-Befehle verwenden, um Testdaten in die Datenbank einzufügen und diese für deine Anwendung zu nutzen.

## Lizenz

Die Lizenzinformationen für die Nutzung der Daten und die Datenbankstruktur findest du in der `collections`-Tabelle.


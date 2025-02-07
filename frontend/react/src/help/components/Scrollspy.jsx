import React from "react";

// navigation and tutorials in one
const ScrollSpyComponent = () => {
  return (
    <div className="d-flex flex-row h-80">
      <nav
        id="navbar-example3"
        className="m-2 h-100 position-sticky custom-container overflow-auto justify-content-start"
      >
        <nav className="nav nav-pills flex-column">
          <a className="nav-link scroll-link" href="#item-1">
            Introduction to STAC
          </a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link scroll-link ms-3 my-1" href="#item-1-1">
              Core Components of STAC
            </a>
          </nav>

          <a className="nav-link scroll-link" href="#item-2">
            How to add
          </a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link scroll-link ms-3 my-1" href="#item-2-1">
              Add collections
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-2-2">
              Add items
            </a>

            <a className="nav-link scroll-link" href="#item-3">
              Getting Started with STAC Clients
            </a>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link scroll-link ms-3 my-1" href="#item-3-1">
                Overview
              </a>
              <a className="nav-link scroll-link ms-3 my-1" href="#item-3-2">
                Installation
              </a>

            </nav>
            <a className="nav-link scroll-link" href="#item-4">
              Using STAC Clients in R
            </a>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link scroll-link ms-3 my-1" href="#item-4-1">
                Connecting to a STAC
              </a>
              <a className="nav-link scroll-link ms-3 my-1" href="#item-4-2">
                Retrieving Metadata
              </a>
              <a className="nav-link scroll-link ms-3 my-1" href="#item-4-3">
                Searching for Items
              </a>
              <a className="nav-link scroll-link ms-3 my-1" href="#item-4-4">
                Downloading Assets
              </a>
            </nav>
            <a className="nav-link scroll-link" href="#item-5">
              Using STAC Clients in Python
            </a>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link scroll-link ms-3 my-1" href="#item-5-1">
                Connecting to a STAC
              </a>
              <a className="nav-link scroll-link ms-3 my-1" href="#item-5-2">
                Exploring Metadata
              </a>
              <a className="nav-link scroll-link ms-3 my-1" href="#item-5-3">
                Searching the Catalog
              </a>
              <a className="nav-link scroll-link ms-3 my-1" href="#item-5-4">
                Downloading Assets
              </a>
            </nav>
            <a className="nav-link scroll-link" href="#item-6">
              Comparing RSTAC and PySTAC
            </a>
            <a className="nav-link scroll-link" href="#item-7">
              Additional Resources
            </a>
          </nav>
        </nav>
      </nav>

      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example3"
        data-bs-smooth-scroll="true"
        className="overflow-auto h-100 m-3"
        tabIndex="0"
        id="scrollspy-div"
      >
        <div id="item-1">
          <h4>Introduction to STAC</h4>
          <p>
            The SpatioTemporal Asset Catalog (STAC) is a widely adopted standard
            designed to make geospatial data more accessible, discoverable, and
            usable.
          </p>
        </div>
        <br />
        <div id="item-1-1">
          <h5>Core Components of STAC</h5>
          <ul>
            <li>
              <strong>STAC Item:</strong> The atomic unit of STAC, describing a
              single spatiotemporal asset.
            </li>
            <li>
              <strong>STAC Catalog:</strong> A JSON file that organizes assets
              and items into a navigable structure through links.
            </li>
            <li>
              <strong>STAC Collection:</strong> An extension of the catalog that
              includes additional metadata about a group of related assets.
            </li>
            <li>
              <strong>STAC API:</strong> A standardized API endpoint for
              querying and retrieving assets programmatically.
            </li>
          </ul>
        </div>

        <hr />


        <div id="item-2">
          <h4>How to add</h4>
          <p>
            In this guide, you learn how to add your own collections and items to our webcatalog.
          </p>
        </div>
        <br />
        <div id="item-2-1">
          <h5>How to add collections</h5>
          <ul>
            After signing in with your personal account, you can click on the tab "Add/Collection" to add a new collection. There, you find a formular to insert metadata about your collection. Either simply upload a valid JSON file or manually fill in the gaps. The key attributes are mandatory information, all other attributes are optional.
            Here you can find an example collection with all data types required:
            <br></br>
            <li>
              <strong>Type: </strong>Description: Defines the type of the collection. Input: Default 'Collection' is given.
            </li>
            <br></br>
            <li>
              <strong>ID: </strong>Description: A unique identifier for the collection. Input: An alphanumeric string without spaces. <br></br> Example: landsat-8-global-imagery
            </li>
            <br></br>
            <li>
              <strong>Description: </strong>Description: A detailed description of the collection. Input: Free text describing the dataset. <br></br>Example: This collection contains multispectral imagery from the Landsat 8 satellite.
            </li>
            <br></br>
            <li>
              <strong>Stac_version: </strong>Description: Specifies the STAC version used. Input: A valid STAC version number. <br></br>Example: 1.0.0
            </li>
            <br></br>
            <h5>Here is a screenshot to help you understand the process:</h5>
            <div>
              <img src="../../CollectionsAddRequiredData.jpeg" alt="Screenshot of collection creation" width="820" />
            </div>
            <br></br>
            <li>
              <strong>STAC Extensions: </strong>Description: A list of STAC extensions used in this collection. Input: A comma-separated list of URLs pointing to extension schemas. <br></br>Example: https://stac-extensions.github.io/projection/v1.0.0/schema.json, https://stac-extensions.github.io/eo/v1.0.0/schema.json
            </li>
            <br></br>
            <li>
              <strong>Title: </strong>Description: A human-readable title for the collection. Input: Any text describing the collection. <br></br>Example: Landsat 8 Global Imagery Dataset
            </li>
            <br></br>
            <li>
              <strong>License: </strong>Description: The license under which the data is made available. Input: A recognized license ID (e.g., CC-BY-4.0) or proprietary for private datasets. <br></br>Example: CC-BY-4.0
            </li>
            <br></br>
            <li>
              <strong>Provider: </strong>Description: Who provides this collection. Input: A JSONB array containing provider information. <br></br>Example:
              &#91;
              &#123; "name": "Wherebots", "roles": [ "producer" ], "url": "https://wherobots.com/" &#125;, <br></br>
              &#123; "name": "Terradue", "roles": [ "producer" ], "url": "https://www.terradue.com/portal/" &#125;, <br></br>
              &#123; "name": "IFGI", "roles": [ "server" ], "url": "https://www.uni-muenster.de/Geoinformatics/" &#125;
              &#93;

            </li>
            <br></br>
            <li>
              <strong>Keywords: </strong>Description: Concise labels to describe the dataset. Input: A JSONB format. <br></br>
              Example: Landsat-8, OLI, TIRS, 30, 0-100%
            </li>

            <br></br>
            <li>
              <strong>Item Assets: </strong>Description: Defines the available assets in the collection.
              Input: A structured JSON-like format listing asset details. <br></br>
              Example: &#123;
              "B1": &#123;
              "type": "image/tiff",
              "roles": ["reflectance", "visual"],
              "title": "Band 1 (Ultra Blue, 0.43-0.45 µm)",
              "href": "https://example.com/data/B1.tif"
              &#125;
              &#125;

            </li>

            <br></br>
            <li>
              <strong>Summaries: </strong>Description: Contains aggregated information about the collection. Input: Key-value pairs summarizing the dataset’s properties. <br></br>Example: &#123; "platform": ["Landsat-8"], "instruments": ["OLI", "TIRS"], "cloud_cover": [0, 100],
              "bands": ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11"] &#125;
            </li>
            <br></br>
            <h5>Here is a screenshot to help you understand the process:</h5>
            <div>
              <img src="../../CollectionsAddOptionalData.jpeg" alt="Screenshot of STAC metadata upload" width="820" />
            </div>
            <br></br>
          </ul>
        </div>
        <div id="item-2-2">
          <h5>How to add items</h5>
          <ul>
            After signing in with your personal account, you can click on the tab "Add/Item" to add a new item.
          </ul>
          <ul>
            <h5>Key attributes</h5>
            <li>
              <strong>Type: </strong>Description: Defines the type of the item. Input: Default 'Feature' is given.
            </li>
            <br></br>
            <li>
              <strong>ID: </strong>Description: A unique identifier for the item. Input: An alphanumeric string without spaces. <br></br>
              Example: item_solar_satlas_sentinel2
            </li>
            <br></br>
            <li>
              <strong>Geometry: </strong>Description: Defines the spatial coverage of the item. Input: A GeoJSON object representing the item's geometry. <br></br>
              Example: &#123;
              "type": "Polygon", <br></br>
              "coordinates": [[[ -7.88, 37.13 ], [ -7.88, 58.21 ], [ 27.91, 58.21 ], [ 27.91, 37.13 ], [ -7.88, 37.13 ]]]
              &#125;
            </li>
            <br></br>
            <li>
              <strong>Assets: </strong>Description: Lists the data files related to the item.
              Input: A JSONB object containing asset details. <br></br>
              Example: &#123;
              "model": &#123;
              "href": "s3://wherobots-modelhub-prod/professional/semantic-segmentation/solar-satlas-sentinel2/inductor/gpu/aot_inductor_gpu_tensor_cores.zip", <br></br>
              "type": "application/zip; application=pytorch", <br></br>
              "title": "AOTInductor model exported from private, edited, hard fork of Satlas GitHub repo.", <br></br>
              "mlm_artifact_type": "torch.jit.script" <br></br>
              &#125;
              &#125;
            </li>
            <br></br>
            <li>
              <strong>Collection: </strong>Description: Specifies the collection to which this item belongs. Input: A valid collection ID, taken from dropdown menu. If no collections exist, please firstly create one.
              <br></br>
              <a href="#item-2-1">Learn here!</a>
            </li>
            <br></br>
            <li>
              <strong>STAC Version: </strong>Description: Specifies the STAC version used. Input: A valid STAC version number. <br></br>
              Example: 1.0.0
            </li>
            <br></br>
            <h5>Properties</h5>
            <li>
              <strong>MLM Name: </strong>Description: Name of the Machine Learning Model. Input: An alphanumeric string. <br></br>
              Example: Satlas Solar Farm Segmentation
            </li>
            <br></br>
            <li>
              <strong>MLM Task: </strong>Description: The specific task that the MLM is designed for, such as classification, segmentation,... Input: Comma-separated list of tasks. <br></br>
              Example: semantic-segmentation, segmentation
            </li>
            <br></br>
            <li>
              <strong>MLM Architecture: </strong>Description: The structure of the MLM. Input: An alphanumeric string. <br></br>
              Example: PyTorch
            </li>
            <br></br>
            <h5>Optional Properties</h5>
            <li>
              <strong>STAC Extensions: </strong>Description: Additional metadata extensions in the Spatial Temporal Asset Catalog (STAC) format. Input: A comma-separated list of URLs pointing to extension schemas. <br></br>Example: https://stac-extensions.github.io/projection/v1.0.0/schema.json, https://stac-extensions.github.io/eo/v1.0.0/schema.json
            </li>
            <br></br>
            <li>
              <strong>BBox: </strong>Description: The geographic boundary of an item. Input:  A GeoJSON object representing the item's geometry.<br></br>
              Example: -7.882190080512502, 37.13739173208318, 27.911651652899923, 58.21798141355221
            </li>
            <br></br>
            <li>
              <strong>Description</strong>Description: Detailed textual explanation of the dataset or model. Input: An alphanumeric string. <br></br>
              Example: Sourced from torchgeo python library, identifier is ResNet18_Weights.SENTINEL2_ALL_MOCO. The batch size suggestion is 3300, which almost maxes out an NVIDIA 3090's 24 GB CUDA memory.
            </li>
            <br></br>
            <li>
              <strong>Datetime: </strong>Description: A timestamp indicating a specific date and time associated with the data or model. Input: A timestamp. <br></br>
              Example:
            </li>
            <br></br>
            <li>
              <strong>Start Datetime: </strong>Description: The beginning timestamp for the dataset or model's validity period. Input: A timestamp. <br></br>
              Example: 2021-01-01T00:00:00Z
            </li>
            <br></br>
            <li>
              <strong>End Datetime: </strong>Description: The end timestamp for the dataset or model's validity period. Input: A timestamp. <br></br>
              Example: 2023-12-01T00:00:00Z
            </li>
            <br></br>
            <li>
              <strong>MLM Framework: </strong>Description: The software framework used to develop and train the model. Input: An alphanumeric string. <br></br>
              Example: pytorch
            </li>
            <br></br>
            <li>
              <strong>MLM Framework Version: </strong>Description: The specific version of the framework used for model training and inference. Input: An alphanumeric string. <br></br>
              Example: 2.3.0+cu121
            </li>
            <br></br>
            <li>
              <strong>MLM Memory Size: </strong>Description: The amount of memory (RAM) required to load and run the model. Input: An integer. <br></br>
              Example: 94452432
            </li>
            <br></br>
            <li>
              <strong>MLM Total Parameters: </strong>Description: The total number of trainable parameters in the model, representing its complexity. Input: An integer <br></br>
              Example: 11700000
            </li>
            <br></br>
            <li>
              <strong>MLM Pretrained: </strong>Description:  Indicates whether the model is pretrained on another dataset before fine-tuning. Input: Tick the box or not.
            </li>
            <br></br>
            <li>
              <strong>MLM Pretrained Source: </strong>Description: The dataset or repository from which the pretrained model was obtained. Input: An alphanumeric string. <br></br>
              Example:EuroSat Sentinel-2
            </li>
            <br></br>
            <li>
              <strong>MLM Batch Size Suggestion: </strong>Description: The recommended number of samples to process in one batch during training or inference. Input: An integer. <br></br>
              Example: 3300
            </li>
            <br></br>
            <li>
              <strong>MLM Accelerator: </strong>Description: The type of hardware accelerator used. Input: An alphanumeric string. <br></br>
              Example: cuda
            </li>
            <br></br>
            <li>
              <strong>MLM Accelerator COnstrained: </strong>Description:  Indicates whether the model has specific constraints related to the accelerator type or availability. Input: Tick the box or not.
            </li>
            <br></br>
            <li>.
              <strong>MLM Accelerator Summary</strong>Description:  A brief description of the hardware acceleration setup. Input: An alphanumeric string. <br></br>
              Example: Unknown
            </li>
            <br></br>
            <li>
              <strong>MLM Accelerator Count: </strong>Description: The number of accelerators (e.g., GPUs) used for training or inference. Input: An integer. <br></br>
              Example: 1
            </li>
            <br></br>
            <li>
              <strong>MLM Input: </strong>Description: The format and structure of input data required by the model. Input: A JSONB file. <br></br>
              Example: [
              &#123;
              "name": "13 Band Sentinel-2 Batch",
              "bands": [
              "B01",
              "B02",
              "B03",
              "B04",
              "B05",
              "B06",
              "B07",
              "B08",
              "B8A",
              "B09",
              "B10",
              "B11",
              "B12"
              ],
              "input": &#123;
              "shape": [
              -1,
              13,
              64,
              64
              ],
              "dim_order": [
              "batch",
              "channel",
              "height",
              "width"
              ],
              "data_type": "float32"
              &#125;,
              "norm_by_channel": true,
              "norm_type": "z-score",
              "statistics": [
              &#123;
              "mean": 1354.40546513,
              "stddev": 245.71762908
              &#125;,
              &#123;
              "mean": 1118.24399958,
              "stddev": 333.00778264
              &#125;
              ],
              "pre_processing_function": &#123;
              "format": "python",
              "expression": "torchgeo.datamodules.eurosat.EuroSATDataModule.collate_fn"
              &#125;
              &#125;
              ]
            </li>
            <br></br>
            <li>
              <strong>MLM Output: </strong>Description: he format and structure of the output produced by the model. Input: A JSONB file. <br></br>
              Example:[
              &#123;
              "name": "scene-classification",
              "tasks": [
              "scene-classification"
              ],
              "result": &#123;
              "shape": [
              -1,
              10
              ],
              "dim_order": [
              "batch",
              "class"
              ],
              "data_type": "float32"
              &#125;,
              "classification:classes": [
              &#123;
              "value": 0,
              "name": "Annual Crop",
              "description": "Annual Crop"
              &#125;,
              &#123;
              "value": 1,
              "name": "Forest",
              "description": "Forest"
              &#125;
              ],
              "post_processing_function": null
              &#125;
              ]

            </li>
            <br></br>
            <li>
              <strong>MLM Hyperparameters: </strong>Description: The set of adjustable parameters that control the learning process of the model. Input: A JSONB file. <br></br>
              Example: &#123;
              "learning_rate": 0.001,
              "batch_size": 32,
              "epochs": 50,
              "optimizer": "Adam",
              "dropout": 0.3,
              "loss_function": "cross_entropy"
              &#125;
            </li>
            <br></br>
            <h5>Here is a screenshot to help you understand the process:</h5>
            <div>
              <img src="../../ItemsAddData.jpeg" alt="Screenshot of item addition" width="820" />
            </div>
            <br></br>

          </ul>

          <hr />
          <br></br>


          <div id="item-3">
            <h4>Getting Started with STAC Clients</h4>
          </div>
          <br></br>
          <div id="item-3-1">
            <h5>Overview</h5>
            <ul>
              <li>
                <strong>R (rstac):</strong> Provides tools for connecting to STAC
                servers, searching data collections, and downloading assets.
              </li>
              <li>
                <strong>Python (pystac):</strong> Offers a comprehensive set of
                utilities to navigate, query, and fetch data from STAC catalogs.
              </li>
            </ul>
          </div>
          <br></br>
          <div id="item-3-2">
            <h5>Installation</h5>
            <p>
              <strong>For R:</strong>
            </p>
            <pre>
              <code>
                <span style={{ color: "green" }}>
                  # Install rstac package from CRAN
                </span>
                <br></br>
                install.packages("rstac")
                <br></br>
                <span style={{ color: "green" }}>
                  # Load the rstac package into the R session
                </span>
                <br></br>
                library(rstac)
              </code>
            </pre>
            <p>
              <strong>For Python:</strong>
            </p>
            <pre>
              <code>
                <span style={{ color: "green" }}>
                  # Install pystac package using pip{" "}
                </span>
                <br></br>pip install pystac
              </code>
            </pre>
          </div>

          <hr></hr>
          <br></br>
          <div id="item-4">
            <h4>Using STAC Clients in R</h4>
            <br></br>
            <div id="item-4-1">
              <h5>Connecting to a STAC</h5>
              <p>
                To connect, specify the catalog URL and initialize a STAC object:
              </p>
              <pre>
                <code>
                  <span style={{ color: "green" }}>
                    # Define the URL of the STAC catalog{" "}
                  </span>
                  <br></br>
                  stac_url &lt;- "https://example.com/stac" <br></br>
                  <span style={{ color: "green" }}>
                    # Create a STAC object to interact with the catalog{" "}
                  </span>
                  <br></br>stac_obj &lt;- stac(stac_url)
                </code>
              </pre>
              <br></br>
              <div id="item-4-2">
                <h5>Retrieving Metadata</h5>
                <p>Fetch details about the STAC service or its collections:</p>
                <pre>
                  <code>
                    <span style={{ color: "green" }}>
                      # Get general metadata about the STAC catalog{" "}
                    </span>
                    <br></br>
                    stac_obj %&gt; get_request() <br></br>
                    <span style={{ color: "green" }}>
                      # List all available collections in the STAC catalog{" "}
                    </span>{" "}
                    <br></br> stac_obj %&gt; collections() %&gt; get_request()
                  </code>
                </pre>
              </div>
              <br></br>
              <div id="item-4-3">
                <h5>Searching for Items</h5>
                <p>
                  Filter data by collection, time period, or other parameters:
                </p>
                <pre>
                  <code>
                    <span style={{ color: "green" }}>
                      # Perform a search query to find items in a specific
                      collection{" "}
                    </span>{" "}
                    <br></br>search_results &lt;- stac_search( <br></br>q =
                    stac_obj,
                    <span style={{ color: "green" }}>
                      {" "}
                      # The STAC object connected to the catalog{" "}
                    </span>
                    <br></br>collections = "collection-name",
                    <span style={{ color: "green" }}>
                      {" "}
                      # Specify the collection to search{" "}
                    </span>
                    <br></br>datetime = "2022-01-01/2022-12-31",
                    <span style={{ color: "green" }}>
                      {" "}
                      # Define the time range for the search{" "}
                    </span>{" "}
                    <br></br>limit = 5
                    <span style={{ color: "green" }}>
                      {" "}
                      # Limit the number of results returned{" "}
                    </span>
                    <br></br>) %&gt; get_request()
                  </code>
                </pre>
              </div>
              <br></br>
              <div id="item-4-4">
                <h5>Downloading Assets</h5>
                <p>Download files associated with your search:</p>
                <pre>
                  <code>
                    <span style={{ color: "green" }}>
                      # Download specific assets from the search results{" "}
                    </span>{" "}
                    <br></br>
                    assets_download( <br></br>search_results,
                    <span style={{ color: "green" }}>
                      {" "}
                      # The search query result object{" "}
                    </span>{" "}
                    <br></br> asset_id = "asset-name",
                    <span style={{ color: "green" }}>
                      {" "}
                      # The ID of the asset to download{" "}
                    </span>
                    <br></br> output_dir = "output-directory",
                    <span style={{ color: "green" }}>
                      {" "}
                      # Specify the directory for saving files{" "}
                    </span>
                    <br></br>overwrite = TRUE
                    <span style={{ color: "green" }}>
                      {" "}
                      # Overwrite files if they already exist{" "}
                    </span>
                    <br></br> )
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <hr></hr>
          <br></br>
          <div id="item-5">
            <h4>Using STAC Clients in Python</h4>
          </div>
          <br></br>
          <div id="item-5-1">
            <h5>Connecting to a STAC</h5>
            <p>Connect to catalog using its URL:</p>
            <pre>
              <code>
                <span style={{ color: "green" }}>
                  # Import the pystac Client module to connect to the STAC catalog{" "}
                </span>
                <br></br>
                from pystac_client import Client
                <br></br>
                <span style={{ color: "green" }}>
                  # Define the STAC catalog URL{" "}
                </span>
                <br></br>
                catalog_url = "https://example.com/stac"
                <br></br>
                <span style={{ color: "green" }}>
                  # Open a connection to the STAC catalog{" "}
                </span>
                <br></br>
                client = Client.open(catalog_url)
              </code>
            </pre>
          </div>
          <br></br>
          <div id="item-5-2">
            <h5>Exploring Metadata</h5>
            <p>
              Fetch and display metadata about the catalog, collections, or items:
            </p>
            <pre>
              <code>
                <span style={{ color: "green" }}>
                  # Get the root catalog object{" "}
                </span>{" "}
                <br />
                catalog = client.get_catalog()
                <br />
                <span style={{ color: "green" }}>
                  # Display basic metadata about the catalog{" "}
                </span>{" "}
                <br />
                print(f"Catalog ID: &#123;catalog.id&#125;") &nbsp;{" "}
                <span style={{ color: "green" }}>
                  # Unique identifier for the catalog{" "}
                </span>
                <br />
                print(f"Description: &#123;catalog.description&#125;") &nbsp;{" "}
                <span style={{ color: "green" }}>
                  # Description of the catalog{" "}
                </span>
                <br />
                <span style={{ color: "green" }}>
                  # Retrieve and list all collections in the catalog{" "}
                </span>
                <br />
                collections = list(catalog.get_collections())
                <br />
                print(f"Number of collections: &#123;len(collections)&#125;")
                &nbsp;{" "}
                <span style={{ color: "green" }}>
                  # Display the total number of collections{" "}
                </span>
                <br />
                <span style={{ color: "green" }}>
                  # Loop through collections to display their IDs{" "}
                </span>
                <br />
                print("Collections IDs:")
                <br />
                for collection in collections:
                <br />
                &nbsp;&nbsp;print(f"- &#123;collection.id&#125;")
                <br />
              </code>
            </pre>
          </div>
          <br></br>
          <div id="item-5-3">
            <h5>Searching the Catalog</h5>
            <p>Use the client to search for specific datasets:</p>
            <pre>
              <code>
                <span style={{ color: "green" }}>
                  # Perform a search query with specific parameters{" "}
                </span>{" "}
                <br />
                search = client.search(
                <br />
                &nbsp;&nbsp;collections=&#91;"collection-name"&#93;, &nbsp;
                <span style={{ color: "green" }}>
                  # Specify the collection to search{" "}
                </span>
                <br />
                &nbsp;&nbsp;datetime="2022-01-01/2022-12-31", &nbsp;
                <span style={{ color: "green" }}># Filter by time range </span>
                <br />
                &nbsp;&nbsp;limit=5 &nbsp;
                <span style={{ color: "green" }}>
                  # Limit the number of results{" "}
                </span>
                <br />
                )<br />
                <span style={{ color: "green" }}>
                  # Retrieve all items from the search results{" "}
                </span>{" "}
                <br />
                items = list(search.get_items())
                <br />
                for item in items:
                <br />
                &nbsp;&nbsp;print(f"Item ID: &#123;item.id&#125;") &nbsp;
                <span style={{ color: "green" }}>
                  # Print the ID of each retrieved item{" "}
                </span>{" "}
                <br />
              </code>
            </pre>
          </div>
          <br></br>
          <div id="item-5-4">
            <h5>Downloading Assets</h5>
            <p>Download data files from an item’s assets:</p>
            <pre>
              <code>
                <span style={{ color: "green" }}>
                  # Loop through items and download their assets{" "}
                </span>{" "}
                <br />
                for item in items:
                <br />
                &nbsp;&nbsp;for asset_key, asset in item.assets.items():
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "green" }}>
                  # Get the URL of the asset{" "}
                </span>{" "}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;asset_url = asset.href
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "green" }}>
                  # Define a file name for saving the asset locally{" "}
                </span>{" "}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;file_name =
                f"&#123;asset_key&#125;.&#123;asset.media_type.split('/')&#91;-1&#93;&#125;"
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "green" }}>
                  # Download the asset using an HTTP GET request{" "}
                </span>{" "}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;response = requests.get(asset_url)
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "green" }}>
                  # Save the asset to the local file system{" "}
                </span>{" "}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;with open(file_name, 'wb') as f:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f.write(response.content)
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;print(f"Downloaded:
                &#123;file_name&#125;") &nbsp;
                <span style={{ color: "green" }}>
                  # Confirm the file was downloaded{" "}
                </span>
                <br />
              </code>
            </pre>
          </div>
          <hr></hr>
          <br></br>
          <div id="item-6">
            <h4>Comparing RSTAC and PySTAC</h4>
            <div>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid black",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid black" }}>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Feature
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      rstac (R)
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      pystac (Python)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Primary Use
                    </th>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      Ideal for R workflows and visualization
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      Optimized for Python scripting
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Search Functions
                    </th>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      Integrated search and filtering tools
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      Flexible querying and client options
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Asset Downloads
                    </th>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      Simplified with <code>assets_download()</code>
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      Requires Python libraries like <code>requests</code>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Target Audience
                    </th>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      R analysts using geospatial libraries
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      Python developers working on automation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div id="item-7">
              <h4>Additional Resources</h4>
              <div>
                <ul>
                  <li>
                    <a
                      href="https://stacspec.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      STAC Specification: STAC Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cran.r-project.org/package=rstac"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      rstac Package: rstac on CRAN
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pypi.org/project/pystac/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      pystac Library: pystac on PyPI
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSpyComponent;

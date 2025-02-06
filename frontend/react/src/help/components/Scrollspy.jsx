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
            Getting Started with STAC Clients
          </a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link scroll-link ms-3 my-1" href="#item-2-1">
              Overview
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-2-2">
              Installation
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-2-3">
              Using STAC Clients in R
            </a>
          </nav>
          <a className="nav-link scroll-link" href="#item-3">
            Using STAC Clients in R
          </a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link scroll-link ms-3 my-1" href="#item-3-1">
              Connecting to a STAC
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-3-2">
              Retrieving Metadata
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-3-3">
              Searching for Items
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-3-4">
              Downloading Assets
            </a>
          </nav>
          <a className="nav-link scroll-link" href="#item-4">
            Using STAC Clients in Python
          </a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link scroll-link ms-3 my-1" href="#item-4-1">
              Connecting to a STAC
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-4-2">
              Exploring Metadata
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-4-3">
              Searching the Catalog
            </a>
            <a className="nav-link scroll-link ms-3 my-1" href="#item-4-4">
              Downloading Assets
            </a>
          </nav>
          <a className="nav-link scroll-link" href="#item-5">
            Comparing RSTAC and PySTAC
          </a>
          <a className="nav-link scroll-link" href="#item-6">
            Additional Resources
          </a>
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
        <br></br>
        <div id="item-2">
          <h4>Getting Started with STAC Clients</h4>
        </div>
        <br></br>
        <div id="item-2-1">
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
        <div id="item-2-2">
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
        <div id="item-3">
          <h4>Using STAC Clients in R</h4>
          <br></br>
          <div id="item-3-1">
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
            <div id="item-3-2">
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
            <div id="item-3-3">
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
            <div id="item-3-4">
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
        <div id="item-4">
          <h4>Using STAC Clients in Python</h4>
        </div>
        <br></br>
        <div id="item-4-1">
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
        <div id="item-4-2">
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
        <div id="item-4-3">
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
        <div id="item-4-4">
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
        <div id="item-5">
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
          <div id="item-6">
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
  );
};

export default ScrollSpyComponent;

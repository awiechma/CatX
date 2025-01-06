import React from "react";
import "/src/Help.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ScrollSpyComponent = () => {
  return (
    <div className="row" style={{ marginTop: "5%" }}>
      <div className="col-4">
        {/* Navigation mit verschachteltem Layout */}
        <nav
          id="navbar-example3"
          className="h-100 flex-column align-items-stretch pe-4 border-end"
        >
          <nav className="nav nav-pills flex-column">
            <a className="nav-link" href="#item-1">
              Introduction to STAC
            </a>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link ms-3 my-1" href="#item-1-1">
                Core Components of STAC
              </a>
            </nav>
            <a className="nav-link" href="#item-2">
              Getting Started with STAC Clients
            </a>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link ms-3 my-1" href="#item-2-1">
                Overview
              </a>
              <a className="nav-link ms-3 my-1" href="#item-2-2">
                Installation
              </a>
              <a className="nav-link ms-3 my-1" href="#item-2-3">
                Using STAC Clients in R
              </a>
            </nav>
            <a className="nav-link" href="#item-3">
              Using STAC Clients in R
            </a>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link ms-3 my-1" href="#item-3-1">
                Connecting to a STAC
              </a>
              <a className="nav-link ms-3 my-1" href="#item-3-2">
                Retrieving Metadata
              </a>
              <a className="nav-link ms-3 my-1" href="#item-3-3">
                Searching for Items
              </a>
              <a className="nav-link ms-3 my-1" href="#item-3-4">
                Downloading Assets
              </a>
            </nav>
            <a className="nav-link" href="#item-4">
              Using STAC Clients in Python
            </a>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link ms-3 my-1" href="#item-4-1">
                Connecting to a STAC
              </a>
              <a className="nav-link ms-3 my-1" href="#item-4-2">
                Exploring Metadata
              </a>
              <a className="nav-link ms-3 my-1" href="#item-4-3">
                Searching the Catalog
              </a>
              <a className="nav-link ms-3 my-1" href="#item-4-4">
                Downloading Assets
              </a>
            </nav>
          </nav>
        </nav>
      </div>

      <div className="col-8">
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example3"
          data-bs-smooth-scroll="true"
          className="scrollspy-example-2"
          tabIndex="0"
        >
          <div id="item-1">
            <h4>Introduction to STAC</h4>
            <p>
              The SpatioTemporal Asset Catalog (STAC) is a widely adopted
              standard designed to make geospatial data more accessible,
              discoverable, and usable.
            </p>
          </div>
          <div id="item-1-1">
            <h5>Core Components of STAC</h5>
            <ul>
              <li>
                <strong>STAC Item:</strong> The atomic unit of STAC, describing
                a single spatiotemporal asset.
              </li>
              <li>
                <strong>STAC Catalog:</strong> A JSON file that organizes assets
                and items into a navigable structure through links.
              </li>
              <li>
                <strong>STAC Collection:</strong> An extension of the catalog
                that includes additional metadata about a group of related
                assets.
              </li>
              <li>
                <strong>STAC API:</strong> A standardized API endpoint for
                querying and retrieving assets programmatically.
              </li>
            </ul>
          </div>
          <div id="item-2">
            <h4>Getting Started with STAC Clients</h4>
          </div>
          <div id="item-2-1">
            <h5>Overview</h5>
            <ul>
              <li>
                <strong>R (rstac):</strong> Provides tools for connecting to
                STAC servers, searching data collections, and downloading
                assets.
              </li>
              <li>
                <strong>Python (pystac):</strong> Offers a comprehensive set of
                utilities to navigate, query, and fetch data from STAC catalogs.
              </li>
            </ul>
          </div>
          <div id="item-2-2">
            <h5>Installation</h5>
            <p>
              <strong>For R:</strong>
            </p>
            <pre>
              <code>
                # Install rstac package from CRAN
                <br></br>
                install.packages("rstac")
                <br></br># Load the rstac package into the R session
                <br></br>
                library(rstac)
              </code>
            </pre>
            <p>
              <strong>For Python:</strong>
            </p>
            <pre>
              <code>
                # Install pystac package using pip
                <br></br>pip install pystac
              </code>
            </pre>
          </div>
          <div id="item-3">
            <h4>Using STAC Clients in R</h4>
            <div id="item-3-1">
              <h5>Connecting to a STAC</h5>
              <p>
                To connect, specify the catalog URL and initialize a STAC
                object:
              </p>
              <pre>
                <code>
                  # Define the URL of the STAC catalog <br></br>
                  stac_url &lt;- "https://example.com/stac" <br></br># Create a
                  STAC object to interact with the catalog <br></br>stac_obj
                  &lt;- stac(stac_url)
                </code>
              </pre>
              <div id="item-3-2">
                <h6>Retrieving Metadata</h6>
                <p>Fetch details about the STAC service or its collections:</p>
                <pre>
                  <code>
                    # Get general metadata about the STAC catalog <br></br>
                    stac_obj %&gt; get_request() <br></br># List all available
                    collections in the STAC catalog <br></br> stac_obj %&gt;
                    collections() %&gt; get_request()
                  </code>
                </pre>
              </div>
              <div id="item-3-3">
                <h6>Searching for Items</h6>
                <p>
                  Filter data by collection, time period, or other parameters:
                </p>
                <pre>
                  <code>
                    # Perform a search query to find items in a specific
                    collection <br></br>search_results &lt;- stac_search({" "}
                    <br></br>q = stac_obj, # The STAC object connected to the
                    catalog
                    <br></br>collections = "collection-name",# Specify the
                    collection to search
                    <br></br>datetime = "2022-01-01/2022-12-31", # Define the
                    time range for the search<br></br>limit = 5 # Limit the
                    number of results returned
                    <br></br>) %&gt; get_request()
                  </code>
                </pre>
              </div>
              <div id="item-3-4">
                <h6>Downloading Assets</h6>
                <p>Download files associated with your search:</p>
                <pre>
                  <code>
                    # Download specific assets from the search results<br></br>
                    assets_download( <br></br>search_results, # The search query
                    result object <br></br> asset_id = "asset-name", # The ID of
                    the asset to download <br></br> output_dir =
                    "output-directory", # Specify the directory for saving files{" "}
                    <br></br>overwrite = TRUE # Overwrite files if they already
                    exist <br></br> )
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div id="item-3">
            <h4>Item 3</h4>
            <p>Placeholder content for Item 3.</p>
          </div>
          <div id="item-3-1">
            <h5>Item 3-1</h5>
            <p>Additional details about Item 3-1.</p>
          </div>
          <div id="item-3-2">
            <h5>Item 3-2</h5>
            <p>Additional details about Item 3-2.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSpyComponent;

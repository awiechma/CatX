from pystac import Catalog

def test_stac_endpoints(api_url):
    root_catalog = Catalog.from_file(api_url)
    root_catalog.describe()
    
if __name__ == "__main__":
    # Replace with the URL of the STAC API you want to test
    stac_api_url = "http://localhost:3000/stac/"  # Example STAC API
    test_stac_endpoints(stac_api_url)

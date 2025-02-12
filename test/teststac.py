import pytest
import requests

STAC_API_URL = "http://localhost:3000/stac"  # Update this if needed

@pytest.fixture
def get_collections():
    response = requests.get(f"{STAC_API_URL}/collections")
    assert response.status_code == 200, "Failed to fetch collections"
    return response.json()

@pytest.fixture
def get_first_item(get_collections):
    collections = get_collections.get("collections", [])
    assert collections, "No collections found"
    collection_id = collections[0]["id"]
    
    response = requests.get(f"{STAC_API_URL}/collections/{collection_id}/items")
    assert response.status_code == 200, f"Failed to fetch items for collection {collection_id}"
    items = response.json().get("features", [])
    assert items, "No items found in the collection"
    return items[0]

def test_collection_attributes(get_collections):
    collections = get_collections.get("collections", [])
    assert collections, "No collections found"
    for collection in collections:
        assert "id" in collection, "Collection missing 'id' attribute"
        assert "title" in collection, "Collection missing 'title' attribute"
        assert "extent" in collection, "Collection missing 'extent' attribute"
        assert "links" in collection, "Collection missing 'links' attribute"

def test_item_attributes(get_first_item):
    item = get_first_item
    assert "id" in item, "Item missing 'id' attribute"
    assert "geometry" in item, "Item missing 'geometry' attribute"
    assert "properties" in item, "Item missing 'properties' attribute"
    assert "links" in item, "Item missing 'links' attribute"

def test_search_endpoint():
    payload = {
        "bbox": [-180, -90, 180, 90],
        "limit": 1
    }
    response = requests.post(f"{STAC_API_URL}/search", json=payload)
    assert response.status_code == 200, "Failed to search STAC API"
    search_results = response.json()
    assert "features" in search_results, "Search response missing 'features'"
    assert isinstance(search_results["features"], list), "'features' should be a list"

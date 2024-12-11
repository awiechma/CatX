import pystac

# Ersetzen Sie dies durch die URL zu Ihrem STAC-Endpoint
stac_url = "http://localhost:3000/stac"

# Katalog laden
catalog = pystac.Catalog.from_file(stac_url)


# Alternativ, wenn es sich um einen STAC-API-Endpoint handelt:
#catalog = pystac.Catalog.open(stac_url)
print(catalog)

# Auflisten von Sammlungen im Katalog
#for collection in catalog.get_collections():
 #   print(f"Collection ID: {collection.id}")

# Auflisten von Items in der ersten Sammlung
#first_collection = next(catalog.get_collections())
#items = list(first_collection.get_items())

#for item in items:
#    print(f"Item ID: {item.id}")
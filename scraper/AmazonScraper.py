import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

API_KEY = os.getenv("CANOPY_API")
if not API_KEY:
    raise RuntimeError("Missing CANOPY_API in environment")

url = "https://graphql.canopyapi.co/"
headers = {
    "Content-Type": "application/json",
    "API-KEY": API_KEY
}

# Your working GraphQL query
query = """
query amazonProduct {
  amazonProductSearchResults(input: {domain: US, searchTerm: "plush toy"}) {
    productResults(input: {page: "1", limit: "1000"}) {
      results {
        asin
        bookDescription
        brand
        rating
        price {
          currency
          display
          symbol
          value
        }
        title
        subtitle
        url
        imageUrls
      }
    }
    availableRefinements {
      name
    }
  }
}
"""

payload = {"query": query}

resp = requests.post(url, json=payload, headers=headers)
resp.raise_for_status()

data = resp.json().get("data", {}) \
                .get("amazonProductSearchResults", {})

results = data.get("productResults", {}).get("results", [])
print(f"Found {len(results)} items.\n")

for item in results[:5]:  # just show first 5
    print(f"• {item['title']} ({item['asin']})")
    print(f"  Brand: {item.get('brand')}, Rating: {item.get('rating')}")
    print(f"  Price: {item['price']['display']} ({item['price']['currency']})")
    print(f"  URL:   {item['url']}")
    print(f"  Images: {len(item.get('imageUrls', []))} URLs")
    print()

# Show which refinements are available for further paging/filters
refs = data.get("availableRefinements", [])
print("Refinements you can use:")
for r in refs:
    print(" -", r["name"])
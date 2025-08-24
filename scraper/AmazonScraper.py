import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

API_KEY = os.getenv("CANOPY_API")
if not API_KEY:
    raise RuntimeError("Missing CANOPY_API in environment; set CANOPY_API in a .env file or the environment")

url = "https://graphql.canopyapi.co/"
headers = {
    "Content-Type": "application/json",
    "API-KEY": API_KEY,
}

# GraphQL query — you can change searchTerm or paging as needed
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


def fetch_amazon_products():
    payload = {"query": query}
    resp = requests.post(url, json=payload, headers=headers)
    resp.raise_for_status()
    data = resp.json().get("data", {}).get("amazonProductSearchResults", {})
    results = data.get("productResults", {}).get("results", [])
    return results, data.get("availableRefinements", [])


def write_to_frontend(results, out_path=None):
    # default path: ../frontend/public/products.json relative to this file
    if out_path is None:
        base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        out_path = os.path.join(base, "frontend", "public", "products.json")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    # We'll write a compact list of items useful for the frontend
    simplified = []
    for it in results:
        simplified.append({
            "asin": it.get("asin"),
            "title": it.get("title"),
            "brand": it.get("brand"),
            "rating": it.get("rating"),
            "price": it.get("price", {}).get("display") if it.get("price") else None,
            "currency": it.get("price", {}).get("currency") if it.get("price") else None,
            "url": it.get("url"),
            "images": it.get("imageUrls", []),
        })

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(simplified, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(simplified)} items to {out_path}")


def main():
    results, refs = fetch_amazon_products()
    print(f"Found {len(results)} items.")
    # show a few
    for item in results[:5]:
        print(f"• {item.get('title')} ({item.get('asin')})")
    if refs:
        print("Available refinements:")
        for r in refs:
            print(" -", r.get("name"))

    write_to_frontend(results)


if __name__ == "__main__":
    main()
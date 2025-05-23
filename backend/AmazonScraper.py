import os
import requests
from dotenv import load_dotenv

# 1. Load your API key (and optional affiliate tag) from .env
load_dotenv()
API_KEY       = os.getenv("CANOPY_API")
ASSOCIATE_TAG = os.getenv("AMAZON_AFFILIATE")  # e.g. "plushly-20"
if not API_KEY:
    raise RuntimeError("Missing CANOPY_API in environment")

# 2. REST search endpoint
url = "https://canopyapi.co/api/search"

# 3. Build query params
params = {
    "key": API_KEY,
    "type": "search",
    "search": "plushies",
    "country": "US",
    # pass your associate tag here if you want Canopy to append it for you:
    "associate_tag": ASSOCIATE_TAG,
    "page": 1,
}

# 4. Perform the request
resp = requests.get(url, params=params)
resp.raise_for_status()

# 5. Parse and display
data = resp.json()
products = data.get("products", [])

if not products:
    print("No products found.")
else:
    for p in products:
        title = p.get("title")
        price = p.get("price")
        link  = p.get("url")       # will include your associate_tag if you passed it
        img   = p.get("image")
        print(f"{title}\n  Price: {price}\n  Buy:  {link}\n  Img:  {img}\n")


import os
import requests
from dotenv import load_dotenv


load_dotenv()
API_KEY       = os.getenv("CANOPY_API")
ASSOCIATE_TAG = os.getenv("AMAZON_AFFILIATE")  
if not API_KEY:
    raise RuntimeError("Missing CANOPY_API in environment")


url = "https://canopyapi.co/api/search"


params = {
    "key": API_KEY,
    "type": "search",
    "search": "plushies",
    "country": "US",

    "associate_tag": ASSOCIATE_TAG,
    "page": 1,
}


resp = requests.get(url, params=params)
resp.raise_for_status()


data = resp.json()
products = data.get("products", [])

if not products:
    print("No products found.")
else:
    for p in products:
        title = p.get("title")
        price = p.get("price")
        link  = p.get("url")      
        img   = p.get("image")
        print(f"{title}\n  Price: {price}\n  Buy:  {link}\n  Img:  {img}\n")


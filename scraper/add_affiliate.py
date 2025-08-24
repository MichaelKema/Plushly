#!/usr/bin/env python3
"""Check product URLs for Amazon affiliate tag and optionally create a copy with tags added.

Usage:
  python3 add_affiliate.py [AFFILIATE_TAG]

If AFFILIATE_TAG is omitted the script uses environment variable AFFILIATE_TAG or 'yourtag-20'.
"""
import json
import os
import sys
from urllib.parse import urlparse, parse_qs
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()
AMAZON_API = os.getenv("AMAZON_AFFILIATE")

def has_affiliate(url: str) -> bool:
    if not url:
        return False
    url = url.lower()
    # common Amazon associate param is 'tag'
    if 'tag=' in url:
        return True
    # some affiliate systems use 'aff' or 'affiliate' or 'utm_campaign' but we treat tag= as canonical
    return False


def main():
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    in_path = os.path.join(base, 'frontend', 'public', 'products.json')
    out_path = os.path.join(base, 'frontend', 'public', 'products.json')
    backup_path = os.path.join(base, 'frontend', 'public', 'products_orig.json')

    if len(sys.argv) > 1:
        aff = sys.argv[1]
    else:
        # prefer AMAZON_AFFILIATE defined in scraper/.env, then AFFILIATE_TAG, then fallback
        aff = os.environ.get('AMAZON_AFFILIATE') or os.environ.get('AFFILIATE_TAG') or AMAZON_API or 'plushly-20'

    with open(in_path, 'r', encoding='utf-8') as f:
        products = json.load(f)

    total = len(products)
    have = []
    missing = []

    for p in products:
        url = p.get('url', '') or ''
        if has_affiliate(url):
            have.append((p.get('asin'), url))
        else:
            missing.append((p.get('asin'), url))

    print(f'Total products: {total}')
    print(f'Have affiliate tag: {len(have)}')
    print(f'Missing affiliate tag: {len(missing)}')

    if have:
        print('\nExamples with tag:')
        for asin, url in have[:5]:
            print(f' - {asin}: {url}')

    if missing:
        print('\nExamples missing tag:')
        for asin, url in missing[:5]:
            print(f' - {asin}: {url}')

    # Build an output copy where missing URLs are replaced by a direct /dp/{ASIN}/?tag=AFF
    updated = []
    for p in products:
        url = p.get('url', '') or ''
        if has_affiliate(url):
            updated.append(p)
            continue

        asin = p.get('asin')
        if asin:
            new_url = f'https://www.amazon.com/dp/{asin}/?tag={aff}'
        else:
            # fallback: append tag to original URL (may not work for sspa redirects)
            sep = '&' if '?' in url else '?'
            new_url = url + sep + f'tag={aff}'

        new = dict(p)
        new['original_url'] = url
        new['url'] = new_url
        updated.append(new)

    # Backup original products.json if present and not already backed up
    try:
        if os.path.exists(out_path) and not os.path.exists(backup_path):
            os.replace(out_path, backup_path)
            print(f'Backed up original products.json to {backup_path}')
    except Exception as e:
        print('Warning: could not create backup:', e)

    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(updated, f, ensure_ascii=False, indent=2)

    print(f'Wrote updated file with affiliate links to: {out_path}')


if __name__ == '__main__':
    main()

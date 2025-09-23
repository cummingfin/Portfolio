#!/usr/bin/env python3
"""
Script to download images from your old portfolio site
Run this script to download images for your projects
"""

import requests
import os
from urllib.parse import urljoin, urlparse
import re

def download_image(url, filename):
    """Download an image from URL and save it locally"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def main():
    # Create AssetsProjects directory if it doesn't exist
    os.makedirs('AssetsProjects', exist_ok=True)
    
    # Image URLs from your old portfolio (you'll need to replace these with actual URLs)
    images_to_download = {
        'fifty-pence.jpg': 'https://cummingfin.myportfolio.com/fifty-pence-image.jpg',  # Replace with actual URL
        'oodo.jpg': 'https://cummingfin.myportfolio.com/oodo-image.jpg',  # Replace with actual URL
        'lotus.jpg': 'https://cummingfin.myportfolio.com/lotus-image.jpg',  # Replace with actual URL
        'lawny.jpg': 'https://cummingfin.myportfolio.com/lawny-image.jpg',  # Replace with actual URL
    }
    
    print("Image Download Script")
    print("=" * 50)
    print("To use this script:")
    print("1. Visit your old portfolio: https://cummingfin.myportfolio.com")
    print("2. Right-click on project images and copy image URLs")
    print("3. Replace the URLs in this script with the actual image URLs")
    print("4. Run: python3 download_images.py")
    print()
    
    # For now, just show what needs to be done
    for filename, url in images_to_download.items():
        print(f"Need to download: {filename}")
        print(f"From URL: {url}")
        print()

if __name__ == "__main__":
    main()

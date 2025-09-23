# Adding Images to Project Popups

## How to Add Images from Your Old Portfolio

### Step 1: Get Image URLs
1. Visit your old portfolio: https://cummingfin.myportfolio.com
2. For each project, right-click on the main image and select "Copy image address"
3. Note down the URLs for:
   - Fifty Pence
   - oODo  
   - Lotus
   - Lawny

### Step 2: Download Images
1. Create the images directory:
   ```bash
   mkdir -p AssetsProjects
   ```

2. Download each image using curl:
   ```bash
   # Replace URLs with actual image URLs from your old site
   curl -o AssetsProjects/fifty-pence.jpg "https://your-actual-image-url-here.jpg"
   curl -o AssetsProjects/oodo.jpg "https://your-actual-image-url-here.jpg"
   curl -o AssetsProjects/lotus.jpg "https://your-actual-image-url-here.jpg"
   curl -o AssetsProjects/lawny.jpg "https://your-actual-image-url-here.jpg"
   ```

### Step 3: Alternative - Manual Download
1. Right-click each image on your old site
2. Select "Save image as..."
3. Save to the `AssetsProjects` folder with these exact names:
   - `fifty-pence.jpg`
   - `oodo.jpg`
   - `lotus.jpg`
   - `lawny.jpg`

### Step 4: Test
Once images are added, the popups will automatically display them. If an image is missing, it will show a placeholder.

## Image Requirements
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 600x400px or larger
- **Quality**: High resolution for best display
- **Names**: Must match exactly as specified above

## Current Status
✅ Popup layouts updated with image containers
✅ Fallback placeholders ready
⏳ Waiting for actual images to be added

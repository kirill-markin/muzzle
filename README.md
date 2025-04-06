# Kirill Markin muzzle

## How to run localy

Run bundle install:

```bash
bundle install
```

Run jekyll:

```bash
sudo bundle exec jekyll serve
```

## Media Mention Layouts

The website has these media mention layouts:
1. **mention-card-text** - Basic text card without thumbnail
2. **mention-card-text-photo** - Card with text and photo/thumbnail
3. **mention-card-featured-horizontal** - Large horizontal featured card with content area at bottom left
4. **mention-card-featured-vertical** - Large vertical featured card with content and image side by side

## Media Requirements

- All media thumbnails must have a 16:9 aspect ratio
- Use ImageMagick to convert images if needed: `convert input.png -resize WIDTHxHEIGHT^ -gravity center -extent WIDTHxHEIGHT output.png`

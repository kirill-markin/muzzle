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

## Media Requirements

- All media thumbnails must have a 16:9 aspect ratio
- Use ImageMagick to convert images if needed: `convert input.png -resize WIDTHxHEIGHT^ -gravity center -extent WIDTHxHEIGHT output.png`

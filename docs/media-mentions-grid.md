## Current Grid System Overview

The media mentions grid is implemented using CSS Grid with the following base configuration:

```css
.media-mentions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
```

This creates a responsive grid where each column is at least 16rem wide and will automatically fit as many columns as possible in the available space.

## Card Types and Their Grid Behavior

There are several types of cards with different grid behaviors:

### Basic Text Card (mention-card-text)

- Takes up 1 column space
- No thumbnail
- Shows title and description
- Website logo at bottom if provided

### Text with Photo Card (mention-card-text-photo)

- Takes up 1 column space
- Has thumbnail at bottom (55% height)
- Gradient overlay on the thumbnail
- Website logo appears over the thumbnail
- Minimum height of 16rem on desktop, 10rem on mobile

### Video Card (mention-card-video)

- Takes up 2 columns (grid-column: span 2)
- Full thumbnail coverage with gradient overlay
- 16:9 aspect ratio
- Video icon in bottom left
- Title appears over the thumbnail

### Featured Horizontal Card (mention-card-featured-horizontal)

- Takes up 2 columns
- 16:9 aspect ratio
- Full thumbnail coverage with gradient overlay
- Content box (60% width) overlays the thumbnail
- White background for content area

### Featured Vertical Card (mention-card-featured-vertical)

- Takes up 2 columns
- Split layout: 50% content, 50% image
- Content on left, image on right
- Border between content and image

## Card Type Determination Logic

Currently, the card type is determined in this order:

- If render-style is specified in YAML, use that directly
- If type is "Video" and has thumbnail, use mention-card-video
- If has thumbnail but not video, use mention-card-text-photo
- Default to mention-card-text

## Thumbnail Handling

- Thumbnails are handled differently for each card type:

  - Text-photo: Bottom 55% with gradient overlay
  - Video: Full coverage with gradient
  - Featured horizontal: Full coverage with content overlay
  - Featured vertical: Right 50% of card

- When thumbnail is missing:

  - Currently falls back to default styling
  - Placeholder images named articles-screen-saver-1.png and articles-screen-saver-2.png are used

## Proposed Automation Strategy

To make the grid smarter and more automatic, you could:

1. new grid pattern:
### Primary Grid Pattern

The grid follows this repeating pattern:
- Line 1: [2fr] [1fr] [1fr]
- Line 2: [1fr] [1fr] [2fr]
And repeats...

This creates:
- Desktop view: 
  - Line 1: One big card, two small cards
  - Line 2: Two small cards, one big card
  - Repeat
- Mobile view: 
  - Big card
  - Two small cards (stacked)
  - Two small cards (stacked)
  - Big card
  - Repeat

### Grid Position Determination

1. First, determine if a card should be "big" (2fr) or "small" (1fr) based on its position in the pattern
2. Apply the following classes:
   - `mention-card-large`: Takes 2 columns
   - `mention-card-small`: Takes 1 column

## Content-Based Styling

After the grid position is determined, apply these styling rules in order:

### For Large Cards (2fr):
1. If it's a video -> `mention-card-video`
2. If it has a long title -> `mention-card-featured-horizontal`
3. If it has both title and description -> `mention-card-featured-vertical`
4. Default to `mention-card-featured-horizontal`

### For Small Cards (1fr):
1. If it has a thumbnail -> `mention-card-text-photo`
2. Default to `mention-card-text`

2. Automatic Card Type Selection based on Content:

  - Long titles -> Featured horizontal
  - Videos -> Video card
  - Content with both title and description -> Featured vertical
  - Short content with image -> Text-photo
  - Text only -> Basic text card

2. Smart Thumbnail Management:

- Create a consistent fallback system
- Rotate between placeholder images systematically
- Consider content type when selecting placeholder

1. Grid Balance Rules:

- Limit consecutive large cards
- Ensure featured cards don't create awkward gaps
- Maintain visual hierarchy with proper spacing

4. Responsive Adjustments:

- Collapse all cards to single column on mobile
- Adjust aspect ratios for different screen sizes
- Maintain readability of overlaid content

This would require modifying the HTML template to include logic for automatic style selection rather than relying on YAML configuration.

## Implementation Notes

The HTML template should:
1. First count position in the grid to determine large/small card status
2. Then apply appropriate styling based on content type
3. Handle thumbnails and responsive behavior last

This approach ensures visual consistency while still accommodating different content types appropriately.


## Additional Notes

there are two placeholder images used for thumbnails:

- /data/articles_thumbnails/articles-screen-saver-1.png
- /data/articles_thumbnails/articles-screen-saver-2.png

i need to mix them up.
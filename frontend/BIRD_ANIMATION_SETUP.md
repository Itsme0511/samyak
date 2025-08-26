# Bird Animation Setup Guide

## Overview
The bird animation system has been implemented to show different bird states:
- **Resting State**: Bird sitting on a branch (static image)
- **Flying State**: Bird flapping wings (animated GIF)

## Required Images

### 1. Bird Resting Image (`bird-resting.png`)
- **Location**: `frontend/src/public/bird-resting.png`
- **Description**: The blue bird character sitting on a brown branch with green leaves
- **Format**: PNG image
- **Size**: Recommended 56x56 pixels or larger (will be scaled down)

### 2. Bird Flying GIF (`bird-flying.gif`)
- **Location**: `frontend/src/public/bird-flying.gif`
- **Description**: The blue bird character with wings flapping in flight
- **Format**: Animated GIF
- **Size**: Recommended 56x56 pixels or larger (will be scaled down)

## How It Works

### Bird States
1. **Resting**: When the bird is stationary on a level, it shows the resting image
2. **Flying**: When the bird moves between levels, it shows the flying GIF

### Animation Triggers
- **Automatic**: When user progresses to a new level (after completing a quiz)
- **Manual**: When clicking on an unlocked level (for testing)

### Animation Flow
1. User completes a level or clicks on an unlocked level
2. Bird switches to flying state (shows flapping wings GIF)
3. Bird moves to the new level position
4. After 800ms, bird switches back to resting state (shows branch image)

## Implementation Details

### Bird Component (`frontend/src/components/Bird.jsx`)
- Accepts `flying` prop to determine which image to show
- Accepts `onAnimationComplete` callback to handle animation end
- Uses different transition styles for flying vs resting states

### Home Component (`frontend/src/pages/Home.jsx`)
- Manages bird position and flying state
- Handles level progression animations
- Provides manual animation triggers for testing

## Testing
1. Replace the placeholder files with actual images
2. Click on any unlocked level to see the bird fly to that position
3. Complete a quiz to see automatic progression animation

## Notes
- The animation duration is 1.2s for flying (slower and more dramatic)
- The bird size is 56x56 pixels when resting, 100x100 pixels when flying
- Images are automatically scaled to fit the container
- The flying animation includes an upward movement and scaling effect for visual impact

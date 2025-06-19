# Interactive Components for Green Atlas Magazine

## Overview
This document provides an overview of the interactive components implemented for the Green Atlas Magazine feature. These components enhance the user experience by providing interactive visualizations, image comparisons, and maps within article content.

## Components Implemented

### 1. ArticleEnhancer
- **Purpose**: Processes article content to replace special placeholders with interactive components
- **Location**: `src/components/interactive/ArticleEnhancer.jsx`
- **Features**:
  - Parses article content for special placeholders
  - Renders appropriate interactive components based on placeholder type
  - Supports three types of interactive components: charts, image comparisons, and maps
  - Handles error cases gracefully

### 2. DataVisualization
- **Purpose**: Renders various types of charts and data visualizations
- **Location**: `src/components/interactive/DataVisualization.jsx`
- **Features**:
  - Supports multiple chart types (line, bar, pie, doughnut)
  - Customizable appearance and labels
  - Responsive design

### 3. ImageComparison
- **Purpose**: Allows users to compare before/after images using a slider
- **Location**: `src/components/interactive/ImageComparison.jsx`
- **Features**:
  - Interactive slider to reveal before/after images
  - Support for touch and mouse interactions
  - Customizable labels and descriptions
  - Fixed ESLint warnings by properly handling event listeners with useCallback

### 4. InteractiveMap
- **Purpose**: Displays interactive maps with markers and geographic data
- **Location**: `src/components/interactive/InteractiveMap.jsx`
- **Features**:
  - Based on react-leaflet for map rendering
  - Supports markers with popups
  - Supports GeoJSON data for displaying geographic features
  - Multiple base layers (street map, satellite)
  - Fixed ESLint warning by replacing deprecated `whenCreated` prop with proper ref handling

## Integration with ArticleDetailPage

The ArticleDetailPage component has been modified to use these interactive components:

- Imports ArticleEnhancer component
- Conditionally renders ArticleEnhancer when article has interactive data
- Uses mock services for fetching article data and handling comments

## Mock Data and Services

### Mock Article Service
- **Location**: `src/services/mockArticleService.js`
- **Features**:
  - Provides mock implementations of article-related API calls
  - Methods for fetching articles, comments, and related articles
  - Method for adding comments

### Mock Interactive Data
- **Location**: `src/utils/mockInteractiveData.js`
- **Features**:
  - Provides sample data for charts, maps, and image comparisons
  - Sample article content with interactive placeholders
  - GeoJSON data for map features

## Usage

To add interactive components to an article:

1. Include the appropriate placeholder in the article content:
   - Charts: `{{CHART:type=line,title=Chart Title,data=chartDataId}}`
   - Image Comparisons: `{{IMAGE_COMPARE:before=url1,after=url2,title=Comparison Title}}`
   - Maps: `{{MAP:center=lat|lng,zoom=9,markers=markersDataId,title=Map Title}}`

2. Provide the corresponding data in the article's `interactiveData` object.

3. The ArticleEnhancer component will automatically replace the placeholders with the interactive components.

## Recent Changes

1. Fixed ESLint warning in ImageComparison component:
   - Used useCallback to memoize event handler functions
   - Properly handled dependencies in useEffect hook

2. Fixed ESLint warning in InteractiveMap component:
   - Replaced deprecated `whenCreated` prop with proper ref callback

These changes ensure that the components follow React best practices and avoid potential memory leaks or stale closures.
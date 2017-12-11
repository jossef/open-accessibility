![image](https://raw.githubusercontent.com/jossef/open-accessability/master/misc/banner.png)

[![Build Status](https://travis-ci.org/jossef/open-accessability.svg?branch=master)](https://travis-ci.org/jossef/open-accessability)

Free accessability tools menu for website maintainers powered by jQuery. [See the demo](https://jossef.github.io/open-accessability/)

### Getting Started


#### CDN
Add the following imports (make sure to import jQuery before)
```
<script src="https://cdn.rawgit.com/jossef/open-accessability/master/dist/open-accessability.min.js"></script>
<link rel="stylesheet" href="https://cdn.rawgit.com/jossef/open-accessability/master/dist/open-accessability.min.css">
```

#### Bower

```
bower install open-accessability --save
```

#### NPM

```
npm install open-accessability --save
```

### Initialization


In order for the plugin to load, it has to be initialized like so:
```
$('body').openAccessibility();
```

In addition, some default options may be overidden on initialization:
```
$('body').openAccessibility({
  textSelector: 'h1,p'
});
```

Full list of default options:
```
isMenuOpened: false
highlightedLinks: false
isMobileEnabled: false
grayscale: 0
brightness: 100
contrast: 100
maxZoomLevel: 3
minZoomLevel: 0.5
zoomStep: 0.2
zoom: 1
cursor: false
textSelector: '.open-accessibility-text'
invert: false
iconSize: 'm'
```


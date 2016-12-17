![image](https://raw.githubusercontent.com/jossef/open-accessability/master/misc/banner.png)


Accessability tools menu for website maintainers


[![Build Status](https://travis-ci.org/jossef/open-accessability.svg?branch=master)](https://travis-ci.org/jossef/open-accessability)

### Dependencies
jquery


### Demo
https://jossef.github.io/open-accessability/

### Usage

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdn.rawgit.com/jossef/open-accessability/master/dist/open-accessability.min.js"></script>
<link rel="stylesheet" href="https://cdn.rawgit.com/jossef/open-accessability/master/dist/open-accessability.min.css">

<script>
  $(function () {
      $('body').openAccessibility();
  })
</script>
```

### Customization


default options can be overidden  on initialization 
```
defaultOptions = {
    isMenuOpened: false,
    highlightedLinks: false,
    isMobileEnabled: false,
    grayscale: 0,
    brightness: 100,
    contrast: 100,
    maxZoomLevel: 3,
    minZoomLevel: 0.5,
    zoomStep: 0.2,
    zoom: 1,
    cursor: false,
    textSelector: '.open-accessibility-text',
    invert: false
};
```

```
<script>
  $('body').openAccessibility({
    textSelector: 'h1,p'
  });
</script>
```

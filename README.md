# MapLibre-Control-BasemapBar

A MapLibre control to select which basemap layer is visible.

Demo = https://greeninfo-network.github.io/MapLibre-Control-BasemapBar/

Github = https://github.com/GreenInfo-Network/MapLibre-Control-BasemapBar/


## Usage

```
const basemapbar = new MapLibreControlBasemapBar({
    basemaps: [
        { id: 'basemap-positron', title: "Stamen Light", tooltip: "Stamen's Light basemap also known as Positron" },
        { id: 'basemap-openstreetmap', title: "OpenStreetMap", tooltip: "Map tiles from OpenStreetMap" },
        { id: 'basemap-terrain', title: "Stamen Terrain", tooltip: "Colored terrain map by Stamen" },
    ],
});
MAP.addControl(basemapbar, 'top-right');

MAP.on('load', () => {
    basemapbar.selectBasemap('basemap-terrain');
});
```

Constructor parameters:

* `basemaps` -- A list of objects, each one representing a basemap option offered. Each basemap offering has these keys:
  * `id` -- The layer's `id` as it appears in your map style.
  * `title` -- Text to show in the basemap selection UI. This should be brief.
  * `tooltip` -- Optional tooltip to show if the mouse is hovered over this basemap option.
* `expandButtonText` -- Text to show in the collapsed state, which will open the control. Default is "Base Map".
* `tooltipExpandButton` -- Tooltip to show when the control is collapsed and the mouse is hovered over it.
* `tooltopCollapseButton` -- Tooltip to show over the button which closes the control, when the mouse is hovered over it.


Methods:

* `selectBasemap(id)` -- Select the given basemap option. The `id` is the same as the layer's `id` and the `id` given in the `basemaps` parameter.
* `selectedOption()` -- Returns the `id` of the currently selected basemap.
* `expandBar()` -- Expands the bar to show the basemap options.
* `collapseBar()` -- Collapses the control to just the "Base Map" button, hiding the basemap options.
* `isExpanded()` -- Return true/false indicating whether the control is currently expanded.



## Setting up your layers

This is intended and tested with raster layers, but should work with any other layer type which supports `layout.visibility` including vector layers.

The layers to be managed by MapLibre-Control-BasemapBar should have `visibility: none` set in the style at startup, and then `selectBasemap()` should be used to toggle the basemap layer on.

```
{
    "id": "basemap-terrain",
    "type": "raster",
    "source": "terrain",
    "layout": {
        "visibility": "none"
    }
}
```

```
MAP.addControl(basemapbar, 'top-right');
basemapbar.selectBasemap('basemap-terrain');
```


## Development

Fire up a Python CLI web server via `python -m SimpleHTTPServer 7438` or `python3 -m http.server 7438`

You can now point a browser at http://localhost:7438/ and see the demo.

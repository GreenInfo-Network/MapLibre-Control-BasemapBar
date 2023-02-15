class MapLibreControlBasemapBar {
    constructor(options) {
        this.options = Object.assign({
            basemaps: [], // list of options
            expandButtonText: "Base Map",
            tooltipExpandButton: "Show base map options",
            tooltopCollapseButton: "Hide base map options",
        }, options);

        if (! this.options.basemaps.length) throw new Error('MapLibreControlBasemapBar requires at least 1 entry in basemaps');
    }

    onAdd (map) {
        this._map = map;

        const container = document.createElement('div');
        container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group maplibre-control-basemapbar maplibre-control-basemapbar-collapsed';

        // a button for each option
        this.options.basemaps.forEach((basemap) => {
            const button = document.createElement('button');
            button.className = 'maplibre-control-basemapbar-option';
            button.title = basemap.tooltip;
            button.setAttribute('data-layer-id', basemap.id);
            button.innerHTML = basemap.title;

            button.addEventListener('click', () => {
                this.selectBasemap(basemap.id);
            });

            container.appendChild(button);
        });

        // an expand button and collapse button
        const exbutton = document.createElement('button');
        exbutton.className = 'maplibre-control-basemapbar-expandbutton';
        exbutton.title = this.options.tooltipExpandButton;
        exbutton.innerHTML = this.options.expandButtonText;
        container.appendChild(exbutton);

        const colbutton = document.createElement('button');
        colbutton.className = 'maplibre-control-basemapbar-collapsebutton';
        colbutton.title = this.options.tooltopCollapseButton;
        colbutton.innerHTML = "&times;";
        container.appendChild(colbutton);

        colbutton.addEventListener('click', () => {
            this.collapseBar();
            exbutton.focus();
        });

        exbutton.addEventListener('click', () => {
            this.expandBar();
            colbutton.focus();
        });

        // done!
        this._container = container; // we need to examine our own buttons
        return container;
    }

    onRemove() {
        this._map = undefined;
    }

    expandBar() {
        if (this.isExpanded()) return;
        this._container.classList.remove('maplibre-control-basemapbar-collapsed');
    }

    collapseBar() {
        if (! this.isExpanded()) return;
        this._container.classList.add('maplibre-control-basemapbar-collapsed');
    }

    isExpanded() {
        return ! this._container.classList.contains('maplibre-control-basemapbar-collapsed');
    }

    selectBasemap(newlayerid) {
        const buttons = this._container.querySelectorAll('button.maplibre-control-basemapbar-option');
        [...buttons].forEach((button) => {
            const layerid = button.getAttribute('data-layer-id');
            const istheone = layerid == newlayerid;

            if (istheone) {
                this._map.setLayoutProperty(layerid, 'visibility', 'visible');
                button.classList.add('maplibre-control-basemapbar-active');
            } else {
                this._map.setLayoutProperty(layerid, 'visibility', 'none');
                button.classList.remove('maplibre-control-basemapbar-active');
            }
        });
    }

    selectedOption() {
        const button = this._container.querySelector('button.maplibre-control-basemapbar-option.maplibre-control-basemapbar-active');
        const layerid = button.getAttribute('data-layer-id');
        return layerid;
    }
}

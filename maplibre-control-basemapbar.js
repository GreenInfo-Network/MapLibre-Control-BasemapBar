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
        const buttonset = document.createElement('span');
        buttonset.id = `maplibre-control-basemapbar-${Math.round(1000000 * Math.random())}`;
        container.appendChild(buttonset);

        this.options.basemaps.forEach((basemap) => {
            const button = document.createElement('button');
            button.className = 'maplibre-control-basemapbar-option';
            button.title = basemap.tooltip;
            button.setAttribute('data-layer-id', basemap.id);
            button.innerHTML = basemap.title;

            button.addEventListener('click', () => {
                this.selectBasemap(basemap.id);
            });

            buttonset.appendChild(button);
        });

        // an expand button and collapse button
        this.expandbutton = document.createElement('button');
        this.expandbutton.className = 'maplibre-control-basemapbar-expandbutton';
        this.expandbutton.title = this.options.tooltipExpandButton;
        this.expandbutton.innerHTML = this.options.expandButtonText;
        this.expandbutton.setAttribute('aria-controls', buttonset.id);
        this.expandbutton.setAttribute('aria-expanded', 'true');
        container.appendChild(this.expandbutton);

        this.collapsebutton = document.createElement('button');
        this.collapsebutton.className = 'maplibre-control-basemapbar-collapsebutton';
        this.collapsebutton.title = this.options.tooltopCollapseButton;
        this.collapsebutton.innerHTML = "&times;";
        this.collapsebutton.setAttribute('aria-controls', buttonset.id);
        this.collapsebutton.setAttribute('aria-expanded', 'true');
        container.appendChild(this.collapsebutton);

        this.collapsebutton.addEventListener('click', () => {
            this.collapseBar();
            this.expandbutton.focus();
        });

        this.expandbutton.addEventListener('click', () => {
            this.expandBar();
            this.collapsebutton.focus();
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

        this.expandbutton.setAttribute('aria-expanded', 'true');
        this.collapsebutton.setAttribute('aria-expanded', 'true');
    }

    collapseBar() {
        if (! this.isExpanded()) return;
        this._container.classList.add('maplibre-control-basemapbar-collapsed');

        this.expandbutton.setAttribute('aria-expanded', 'false');
        this.collapsebutton.setAttribute('aria-expanded', 'false');
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
                button.setAttribute('aria-pressed', 'true');
            } else {
                this._map.setLayoutProperty(layerid, 'visibility', 'none');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }

    selectedOption() {
        const button = this._container.querySelector('button.maplibre-control-basemapbar-option[aria-pressed="true"]');
        const layerid = button.getAttribute('data-layer-id');
        return layerid;
    }
}

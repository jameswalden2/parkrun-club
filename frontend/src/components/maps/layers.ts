import type { LayerProps } from "react-map-gl";

export const clusterLayer: LayerProps = {
    id: "clusters",
    type: "circle",
    source: "earthquakes",
    filter: ["has", "point_count"],
    paint: {
        "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            40,
            "#f1f075",
            100,
            "#f28cb1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 40, 25, 100, 30],
    },
    interactive: true,
};

export const clusterCountLayer: LayerProps = {
    id: "cluster-count",
    type: "symbol",
    source: "earthquakes",
    filter: ["has", "point_count"],
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
    },
};

export const walksOutlineLayer: LayerProps = {
    id: "walksOutline",
    type: "line",
    source: "allTrailsWalks",
    paint: {
        "line-color": "white",
        "line-width": 8,
    },
};

export const walksLayer: LayerProps = {
    id: "walks",
    type: "line",
    source: "allTrailsWalks",
    paint: {
        "line-color": "green",
        "line-width": 5,
    },
};

export const trainStationsLayer: LayerProps = {
    id: "train_stations",
    type: "circle",
    source: "train_stations",
    filter: ["!", ["has", "point_count"]],
    paint: {
        "circle-color": "red",
        "circle-opacity": 0.85,
        "circle-radius": 6,
        "circle-stroke-width": 3,
        "circle-stroke-color": "#fff",
    },
};

export const trainLinesLayer: LayerProps = {
    id: "train_lines",
    type: "line",
    source: "train_lines",
    filter: ["!", ["has", "point_count"]],
    paint: {
        "line-color": "black",
        "line-opacity": 0.5,
    },
};

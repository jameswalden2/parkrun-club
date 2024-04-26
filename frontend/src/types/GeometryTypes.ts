import { Feature, Geometry, GeoJsonProperties } from "geojson";

export type geojsonPointType = {
    type: string;
    properties: {
        id: number;
        name: string;
        stationId?: number;
        allTrailsLink?: string;
    };
    geometry: {
        coordinates: Array<number>;
        type: string;
        bbox?: Array<number>;
    };
    id: number;
};

export type polygonParkrunFeatureType = {
    type: string;
    properties: {
        id: number;
        name: string;
        location: string;
        logitude: number;
        latitude: number;
    };
    geometry: {
        geometries: Array<Object>;
        type: string;
    };
};

export type geojsonPolygonsType = {
    type: "FeatureCollection";
    features: Array<Feature<Geometry, GeoJsonProperties>>;
};

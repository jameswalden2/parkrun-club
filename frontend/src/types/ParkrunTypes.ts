export type ParkrunTableRowType = {
    avatarURL: string;
    name: string;
    parkruns: number;
};

export type ParkrunCompletedTableRowType = {
    id: number;
    parkrunId: number;
    parkrun: ParkrunTableRowType;
};

export type ParkrunCompletedTableProps = {
    completedParkruns: Array<ParkrunCompletedTableRowType>;
};

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
        name: string;
        description: string;
        styleUrl: string;
        Location: string;
        Permit: string;
    };
    geometry: {
        geometries: Array<Object>;
        type: string;
    };
};

export type geojsonPolygonsType = {
    type?: string;
    features?: Array<polygonParkrunFeatureType>;
};

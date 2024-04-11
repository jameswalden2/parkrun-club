import { Map, Source, Layer, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { EventDataObjectItem } from "@/types/EventSeasonTypes";
import { useMemo } from "react";

type SimplePinMapProps = {
    locations: Array<EventDataObjectItem>;
};

export default function SimplePinMap({ locations }: SimplePinMapProps) {
    const pins = useMemo(() => {
        return locations.map((location) => {
            // <Marker longitude={location.}></Marker>;
        });
    }, []);
    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
                longitude: -1,
                latitude: 53,
                zoom: 6,
            }}
            minZoom={3}
            mapStyle="mapbox://styles/mapbox/light-v11"
            style={{
                height: 700,
            }}
        ></Map>
    );
}

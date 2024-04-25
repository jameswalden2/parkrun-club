"use client";

import { Map, Source, Layer, Marker, LayerProps } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useState, useMemo, useCallback } from "react";
import Pin from "@/components/maps/Pin";

import { completedParkrunsAtom, userSettingsAtom } from "@/atoms/atoms";
import { useAtom, useAtomValue } from "jotai";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { geojsonPointType, geojsonPolygonsType } from "@/types/GeometryTypes";
import { ParkrunType } from "@/types/ParkrunTypes";

export default function ParkrunsMap() {
    const [parkrunPointsData, setParkrunPointsData] = useState<
        Array<geojsonPointType>
    >([]);

    const [parkrunPolygonsData, setParkrunPolygonsData] =
        useState<geojsonPolygonsType>({});

    const [completedParkrunList, setCompletedParkrunList] = useAtom(
        completedParkrunsAtom
    );

    const userSettings = useAtomValue(userSettingsAtom);

    const user = useCurrentUser();

    useEffect(() => {
        fetch("./parkrun/parkrun_points.geojson")
            .then((response) => response.json())
            .then((json) => {
                setParkrunPointsData(json.features);
            });
        fetch("./parkrun/parkrun_polygons.geojson")
            .then((response) => response.json())
            .then((json) => {
                setParkrunPolygonsData(json);
            });
    }, []);

    const modifiedParkrunPolygonsData = useMemo(() => {
        if (!parkrunPolygonsData.features) return parkrunPolygonsData;
        const features = parkrunPolygonsData.features.map((feature) => ({
            ...feature,
            properties: {
                ...feature.properties,
                completed: completedParkrunList.some((item) => {
                    return item.parkrunId === feature.properties.id;
                }),
            },
        }));

        return { ...parkrunPolygonsData, features: features };
    }, [parkrunPolygonsData, completedParkrunList]);

    const handleMarkerClick = useCallback(
        (parkrun: ParkrunType) => {
            // Check if the parkrun is already completed
            const isCompleted = completedParkrunList.some(
                (item) => item.parkrunId === parkrun.id
            );

            if (isCompleted) {
                // If the parkrun is already completed, send a DELETE request
                const parkrunIndex = completedParkrunList.findIndex(
                    (item) => item.parkrunId == parkrun.id
                );
                fetch("/api/parkrun/completed-parkrun", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(completedParkrunList[parkrunIndex]),
                })
                    .then((response) => response.json())
                    .then(() => {
                        // Update the local state to reflect the change
                        setCompletedParkrunList((prevList) =>
                            prevList.filter(
                                (item) => item.parkrunId !== parkrun.id
                            )
                        );
                    })
                    .catch((error) =>
                        console.error("Error removing parkrun:", error)
                    );
            } else {
                // If the parkrun is not completed, send a POST request to add it
                fetch("/api/parkrun/completed-parkrun", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ parkrun: parkrun, user: user.id }),
                })
                    .then((response) => response.json())
                    .then((newParkrun) => {
                        // Update the local state to include the new parkrun
                        setCompletedParkrunList((prevList) => [
                            ...prevList,
                            newParkrun,
                        ]);
                    })
                    .catch((error) =>
                        console.error("Error adding parkrun:", error)
                    );
            }
        },
        [completedParkrunList, user, setCompletedParkrunList]
    );

    const parkrunPoints = useMemo(
        () =>
            parkrunPointsData.map((parkrun) => (
                <span key={parkrun.id} className="z-10">
                    <Marker
                        longitude={parkrun.geometry.coordinates[0]}
                        latitude={parkrun.geometry.coordinates[1]}
                        anchor="bottom"
                        style={{ zIndex: 6 }}
                        onClick={() => {
                            handleMarkerClick(parkrun.properties);
                        }}
                    >
                        <Pin size={14} fill="#3ed4cf" />
                    </Marker>
                </span>
            )),
        [parkrunPointsData, handleMarkerClick]
    );

    const parkrunPolygonsLayer: LayerProps = useMemo(() => {
        return {
            id: "parkrun_polygons",
            type: "fill",
            paint: {
                "fill-color": {
                    type: "categorical",
                    property: "completed",
                    stops: [
                        [
                            true,
                            userSettings && userSettings?.theme
                                ? userSettings.theme
                                : "green",
                        ],
                        [false, "white"],
                    ],
                },
                "fill-opacity": {
                    type: "categorical",
                    property: "completed",
                    stops: [
                        [true, 0.8],
                        [false, 0.1],
                    ],
                },
                "fill-outline-color": "black",
            },
        };
    }, [userSettings]);

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
                longitude: -1,
                latitude: 53,
                zoom: 6,
            }}
            minZoom={3}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onClick={(event) => console.log(event)}
        >
            <Source
                id="parkrun_polygons"
                type="geojson"
                data={modifiedParkrunPolygonsData}
            >
                <Layer {...parkrunPolygonsLayer} />
            </Source>
            {parkrunPoints}
        </Map>
    );
}

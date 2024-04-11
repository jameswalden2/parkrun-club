"use client";

import { Map, Source, Layer, Marker, LayerProps } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useState, useMemo, useCallback } from "react";
import Pin from "@/components/maps/Pin";
import ParkrunCompletedTable from "@/components/parkrun/ParkrunCompletedTable";
import { ParkrunCompletedTableRowType } from "@/types/ParkrunTypes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { geojsonPointType, geojsonPolygonsType } from "@/types/ParkrunTypes";

export default function ParkrunClub() {
    const [parkrunPointsData, setParkrunPointsData] = useState<
        Array<geojsonPointType>
    >([]);

    const [parkrunPolygonsData, setParkrunPolygonsData] =
        useState<geojsonPolygonsType>({});

    const [completedParkrunList, setCompletedParkrunList] = useState<
        Array<ParkrunCompletedTableRowType>
    >([]);

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

    useEffect(() => {
        fetch("/api/parkrun/completed-parkrun")
            .then((response) => response.json())
            .then((data) => setCompletedParkrunList(data));
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
        (parkrun) => {
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
        [completedParkrunList, user]
    );

    const parkrunPoints = useMemo(
        () =>
            parkrunPointsData.map((parkrun) => (
                <Marker
                    key={parkrun.id}
                    longitude={parkrun.geometry.coordinates[0]}
                    latitude={parkrun.geometry.coordinates[1]}
                    anchor="bottom"
                    style={{ zIndex: 6 }}
                    onClick={() => {
                        handleMarkerClick(parkrun.properties);
                    }}
                >
                    <Pin size={10} fill="#3ed4cf" />
                </Marker>
            )),
        [parkrunPointsData, handleMarkerClick]
    );

    const parkrunPolygonsLayer: LayerProps = {
        id: "parkrun_polygons",
        type: "fill",
        paint: {
            "fill-color": {
                type: "categorical",
                property: "completed",
                stops: [
                    [true, "#3288bd"],
                    [false, "red"],
                ],
            },
            "fill-opacity": {
                type: "categorical",
                property: "completed",
                stops: [
                    [true, 0.6],
                    [false, 0.2],
                ],
            },
        },
    };

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto">
            <div className="p-4">
                <h3>Hey, {user.name}</h3>
            </div>
            <div className="grid grid-cols-3 h-[80vh] w-full">
                <div className="col-span-2 w-full h-full">
                    <Map
                        // mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                        initialViewState={{
                            longitude: -1,
                            latitude: 53,
                            zoom: 6,
                        }}
                        minZoom={3}
                        mapStyle="mapbox://styles/mapbox/light-v11"
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
                </div>
                <div className="col-span-1 bg-blue-100 p-4">
                    <h3>Completed Parkruns:</h3>
                    <ParkrunCompletedTable
                        completedParkruns={completedParkrunList}
                    />
                </div>
            </div>
            <div className="h-[80vh] bg-pink-100"></div>
        </div>
    );
}

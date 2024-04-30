"use client";

import { Map, Source, Layer, Marker, LayerProps } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useTransition,
} from "react";
import Pin from "@/components/maps/Pin";

import { completedParkrunsAtom, userSettingsAtom } from "@/atoms/atoms";
import { useAtom, useAtomValue } from "jotai";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { geojsonPointType, geojsonPolygonsType } from "@/types/GeometryTypes";
import { ParkrunType } from "@/types/ParkrunTypes";
import clsx from "clsx";

export default function ParkrunsMap() {
    const [parkrunPointsData, setParkrunPointsData] = useState<
        Array<geojsonPointType>
    >([]);

    const [parkrunPolygonsData, setParkrunPolygonsData] =
        useState<geojsonPolygonsType>({
            type: "FeatureCollection",
            features: [],
        });

    const [completedParkrunList, setCompletedParkrunList] = useAtom(
        completedParkrunsAtom
    );

    const [isPending, startTrasition] = useTransition();

    const userSettings = useAtomValue(userSettingsAtom);

    const user = useCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            // Fetching parkrun points data
            try {
                await fetch("/api/parkrun/points")
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("POINTS FEATURES");
                        console.log(data.features);
                        setParkrunPointsData(data.features);
                    });
            } catch (error) {
                console.error("Failed to fetch parkrun points data:", error);
            }

            // Fetching parkrun polygons data
            try {
                await fetch("/api/parkrun/polygons")
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("POLYGONS DATA");
                        console.log(data);
                        setParkrunPolygonsData(data);
                    });
            } catch (error) {
                console.error("Failed to fetch parkrun polygons data:", error);
            }
        };

        fetchData();
    }, []);

    const modifiedParkrunPolygonsData = useMemo(() => {
        if (!parkrunPolygonsData.features || !completedParkrunList)
            return parkrunPolygonsData;
        const features = parkrunPolygonsData.features.map((feature) => ({
            ...feature,
            properties: {
                ...feature.properties,
                completed: completedParkrunList.some((item) => {
                    if (!feature.properties) return false;
                    return item.parkrunId === feature.properties.id;
                }),
            },
        }));

        return { ...parkrunPolygonsData, features: features };
    }, [parkrunPolygonsData, completedParkrunList]);

    const deleteCompletedParkrun = useCallback(
        async (parkrun: ParkrunType) => {
            const parkrunIndex = completedParkrunList.findIndex(
                (item) => item.parkrunId == parkrun.id
            );
            await fetch("/api/parkrun/completed-parkrun", {
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
                        prevList.filter((item) => item.parkrunId !== parkrun.id)
                    );
                })
                .catch((error) => {
                    throw new Error("Error deleting parkrun:", error);
                });
        },
        [setCompletedParkrunList, completedParkrunList]
    );

    const addCompletedParkrun = useCallback(
        async (parkrun: ParkrunType) => {
            if (!user) {
                return;
            }
            // If the parkrun is not completed, send a POST request to add it
            await fetch("/api/parkrun/completed-parkrun", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    parkrun: parkrun,
                    user: user.id,
                }),
            })
                .then((response) => response.json())
                .then((newParkrun) => {
                    // Update the local state to include the new parkrun
                    setCompletedParkrunList((prevList) => [
                        ...prevList,
                        newParkrun,
                    ]);
                })
                .catch((error) => {
                    throw new Error("Error adding parkrun:", error);
                });
        },
        [setCompletedParkrunList, user]
    );

    const handleMarkerClick = useCallback(
        (parkrun: ParkrunType) => {
            startTrasition(() => {
                if (!user || !completedParkrunList) {
                    return;
                }
                const isCompleted = completedParkrunList.some(
                    (item) => item.parkrunId === parkrun.id
                );

                if (isCompleted) {
                    deleteCompletedParkrun(parkrun);
                } else {
                    addCompletedParkrun(parkrun);
                }
            });
        },
        [
            completedParkrunList,
            user,
            addCompletedParkrun,
            deleteCompletedParkrun,
        ]
    );

    const cursor = useMemo(() => {
        return isPending ? "wait" : "auto";
    }, [isPending]);

    const parkrunPoints = useMemo(
        () =>
            parkrunPointsData
                ? parkrunPointsData.map((parkrun) => (
                      <span key={parkrun.id} className={clsx("z-10")}>
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
                  ))
                : [],
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
            cursor={cursor}
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

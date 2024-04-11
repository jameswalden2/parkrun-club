"use client";

import { eventDataAtom } from "@/atoms/atoms";
import { useAtomValue } from "jotai";
import { useState } from "react";

import { Toggle } from "../ui/toggle";

import { ApexOptions } from "apexcharts";

import { secondsToHMS } from "@/lib/utils";

import Chart from "react-apexcharts";

export default function SeasonGraph() {
    const eventData = useAtomValue(eventDataAtom);

    const [normalisedDataPreferred, setNormalisedDataPreferred] =
        useState<boolean>(false);
    const [useWindAdjustedValue, setUseWindAdjustedValue] =
        useState<boolean>(false);

    let graphKey = () => {
        let key: string = "";
        if (normalisedDataPreferred) {
            key += "normalised_";
        }
        if (useWindAdjustedValue) {
            key += "wind_adjusted_";
        }
        return `${key}performance`;
    };

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: "line",
            dropShadow: {
                enabled: true,
                color: "#000",
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.05,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
            enabled: true,
            formatter: (val, _) => {
                return secondsToHMS(val);
            },
        },
        stroke: {
            curve: "straight",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        markers: {
            size: 1,
        },
        xaxis: {
            type: "datetime",
            title: {
                text: "Date",
            },
        },
        yaxis: {
            title: {
                text: "Performance (s)",
            },
            labels: {
                show: true,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: [],
                    fontSize: "12px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    cssClass: "apexcharts-yaxis-label",
                },
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                formatter: (value: number) => {
                    return String(
                        normalisedDataPreferred
                            ? Math.round(value * 1000) / 1000
                            : secondsToHMS(value)
                    );
                },
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            // offsetY: -25,
            // offsetX: -5,
        },
    };

    return (
        <div className="bg-card flex flex-col w-full h-[500px] p-4 rounded">
            {typeof window !== "undefined" && (
                <Chart
                    options={options}
                    series={[
                        {
                            data: eventData.map((element) => {
                                return {
                                    x: new Date(element.date).getTime(),
                                    y: element[graphKey()],
                                };
                            }),
                        },
                    ]}
                    type="line"
                    width="100%"
                    height="90%"
                />
            )}
            <div className="flex space-x-2 p-2 items-center justify-start h-32">
                <Toggle
                    onClick={() => {
                        setNormalisedDataPreferred(!normalisedDataPreferred);
                    }}
                >
                    Normalise Data
                </Toggle>
                <Toggle
                    className="rounded"
                    onClick={() => {
                        setUseWindAdjustedValue(!useWindAdjustedValue);
                    }}
                >
                    Wind Adjusted
                </Toggle>
            </div>
        </div>
    );
}

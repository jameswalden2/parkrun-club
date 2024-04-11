import json

import kml2geojson


def convert_kml_to_geojson(kml_path: str, points_save_path: str, polygons_save_path: str):
    converted_geojson: dict[str, list] = kml2geojson.convert(kml_path_or_buffer=kml_path)
    points = []
    polygons = []
    for feature in converted_geojson[0]["features"]:
        feature["properties"]["name"] = feature["properties"]["name"].replace("\ufffd", "'").replace("?", "'")
        feature["properties"]["Location"] = (
            feature["properties"]["Location"].replace("\ufffd", "'").replace("?", "'")
        )
        if feature["geometry"]["type"] == "Point":
            points.append(feature)
        else:
            polygons.append(feature)

    points_geojson = {"type": "FeatureCollection", "features": points}

    polygons_geojson = {"type": "FeatureCollection", "features": polygons}

    with open(points_save_path, "w+", encoding="utf-8") as f:
        f.write(json.dumps(points_geojson))

    with open(polygons_save_path, "w+", encoding="utf-8") as f:
        f.write(json.dumps(polygons_geojson))


def convert_geojson_for_db(points_path: str, polygons_path: str, save_path: str):
    with open(points_path, "r", encoding="utf-8") as f:
        points_geojson_obj = json.load(f)

    with open(polygons_path, "r") as f:
        polygons_geojson_obj = json.load(f)

    points_remapped = {}

    for point in points_geojson_obj["features"]:
        point_name = point["properties"]["name"]
        new_point = {
            "name": point_name,
            "location": point["properties"].get("Location", ""),
            "longitude": point["geometry"]["coordinates"][0],
            "latitude": point["geometry"]["coordinates"][1],
            "polygonGeometry": {},
        }

        points_remapped[point_name] = new_point

    for point in polygons_geojson_obj["features"]:
        point_name = point["properties"]["name"]

        points_remapped[point_name]["polygonGeometry"] = point["geometry"]

    data_list = list(points_remapped.values())
    data = {"features": data_list}

    with open(save_path, "w+") as f:
        json.dump(data, f)

    return data_list

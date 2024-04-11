import json

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from backend.etl.db import engine
from backend.etl.orm import Parkrun


def extract_db_to_geojson(points_save_path: str, polygons_save_path: str):
    Session = sessionmaker(bind=engine)

    with Session() as session:
        parkruns = session.query(Parkrun).all()

    parkruns_list: list[dict] = []
    for parkrun in parkruns:
        parkrun_dict = {
            "id": parkrun.id,
            "name": parkrun.name,
            "location": parkrun.location,
            "longitude": parkrun.longitude,
            "latitude": parkrun.latitude,
            "polygonGeometry": json.loads(parkrun.polygonGeometry),
        }
        parkruns_list.append(parkrun_dict)

    points = []
    for parkrun in parkruns_list:
        points.append(
            {
                "type": "Feature",
                "properties": {**parkrun},
                "geometry": {"type": "Point", "coordinates": [parkrun["longitude"], parkrun["latitude"], 0]},
            }
        )

    points_geojson = {"type": "FeatureCollection", "features": points}

    with open(points_save_path, "w+", encoding="utf-8") as f:
        f.write(json.dumps(points_geojson))

    polygons = []
    for parkrun in parkruns_list:
        polygons.append(
            {
                "type": "Feature",
                "properties": {k: v for k, v in parkrun.items() if k != "polygonGeometry"},
                "geometry": parkrun["polygonGeometry"],
            }
        )

    polygons_geojson = {"type": "FeatureCollection", "features": polygons}

    with open(polygons_save_path, "w+", encoding="utf-8") as f:
        f.write(json.dumps(polygons_geojson))

    return parkruns_list

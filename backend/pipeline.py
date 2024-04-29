import argparse

from dotenv import load_dotenv

from backend.etl.extract import extract_db_to_geojson
from backend.etl.load import insert_parkruns
from backend.etl.transform import convert_geojson_for_db
from backend.utils.config import load_config

load_dotenv(".env")

# convert_kml_to_geojson(
#     kml_path="./etl/data/parkrun_permits.kml",
#     points_save_path=RAW_POINTS_GEOJSON_PATH,
#     polygons_save_path=RAW_POLYGONS_GEOJSON_PATH,
# )


def parkrun_data_to_db(file_prefix: str):
    RAW_POINTS_GEOJSON_PATH = f"./data/1_raw/{file_prefix}_parkrun_points.geojson"
    RAW_POLYGONS_GEOJSON_PATH = f"./data/1_raw/{file_prefix}_parkrun_polygons.geojson"

    DB_UPLOAD_SAVE_PATH = f"./data/2_db_upload/{file_prefix}_db_data.geojson"

    data_to_insert = convert_geojson_for_db(
        points_path=RAW_POINTS_GEOJSON_PATH,
        polygons_path=RAW_POLYGONS_GEOJSON_PATH,
        save_path=DB_UPLOAD_SAVE_PATH,
    )

    print("Inserting into db...")
    insert_parkruns(parkruns_list=data_to_insert)


def db_to_geojson():
    print("Downloading from db...")
    POINTS_GEOJSON_PATH = "./data/3_db_download/parkrun_points.geojson"
    POLYGONS_GEOJSON_PATH = "./data/3_db_download/parkrun_polygons.geojson"

    extract_db_to_geojson(
        points_save_path=POINTS_GEOJSON_PATH,
        polygons_save_path=POLYGONS_GEOJSON_PATH,
    )


def parkrun_data_to_geojson_pipeline(config: dict):
    for file_prefix in config.get("file_prefixes", []):
        print(f"Generating: {file_prefix}")
        parkrun_data_to_db(file_prefix=file_prefix)

    db_to_geojson()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process some integers.")
    parser.add_argument("--load-db", action="store_true", help="Flag to load the database")
    parser.add_argument("--generate", action="store_true", help="Flag to generate content")

    args = parser.parse_args()

    load_db = args.load_db
    generate = args.generate

    if load_db:
        print("Loading db...")
        db_to_geojson()

    if generate:
        print("Generating parkruns...")
        config_path = "./data/config/pipeline_config.yaml"

        config = load_config(file_path=config_path)

        parkrun_data_to_geojson_pipeline(config=config)

import json

from sqlalchemy.orm import sessionmaker

from backend.etl.db import engine
from backend.etl.orm import Parkrun


def insert_parkruns(parkruns_list):
    Session = sessionmaker(bind=engine)
    session = Session()

    for parkrun in parkruns_list:
        print(f"Checking for {parkrun['name']}...")
        existing_parkrun = session.query(Parkrun).where(Parkrun.name == parkrun["name"]).all()
        if len(existing_parkrun) > 0:
            print(f"Parkrun ({parkrun['name']}) already exists.")
            continue
        parkrun["polygonGeometry"] = json.dumps(parkrun["polygonGeometry"])

        new_parkrun = Parkrun(**parkrun)
        session.add(new_parkrun)

    session.commit()
    session.close()

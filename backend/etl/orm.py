from sqlalchemy import JSON, Column, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Parkrun(Base):
    __tablename__ = "parkruns"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    location = Column(String)
    longitude = Column(Float)
    latitude = Column(Float)
    polygonGeometry = Column(JSON)

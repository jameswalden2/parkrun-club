import os

from sqlalchemy import create_engine

print(os.environ.get("DB_URL"))

engine = create_engine(os.environ.get("DB_URL"))

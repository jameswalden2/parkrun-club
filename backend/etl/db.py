from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://root:password@localhost:3306/auth")

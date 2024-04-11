from fastapi import FastAPI, Path
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def get_root():
    return {"result": "Success"}


class GetDataRequest(BaseModel):
    athleteID: int


# @app.post("/athlete-data/scrape", response_model=dict)
# async def athlete_data_scrape(
#     req: GetDataRequest,
# ):
#     return data_bot.get_athlete_data(athlete_id=req.athleteID)


# @app.get("/athlete-data/{athlete_id}/seasons")
# async def get_available_seasons(athlete_id: int = Path(..., ge=1)):
#     return {"seasons": data_bot.get_available_seasons(athlete_id=athlete_id)}


# @app.get("/athlete-data/{athlete_id}/{event}")
# @app.get("/athlete-data/{athlete_id}/{event}/{season}")
# async def get_event_season_data(
#     athlete_id: int = Path(..., ge=1, description="The ID of the athlete to get data for"),
#     event: str = Path(..., description="The event to get data for"),
#     season: int | None = None,
# ):
#     return {"performances": data_bot.get_event_season_data(athlete_id=athlete_id, event=event, season=season)}

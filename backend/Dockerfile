# build image
ARG PYTHON_VERSION=3.10-slim

FROM python:${PYTHON_VERSION} as builder

WORKDIR /build

# poetry install
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.6.1
RUN pip install "poetry==$POETRY_VERSION"
COPY backend/pyproject.toml backend/poetry.lock* /build/
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# final image
FROM python:${PYTHON_VERSION}

WORKDIR /backend

COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

COPY ./backend/ ./

ENV PYTHONPATH="../:"

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

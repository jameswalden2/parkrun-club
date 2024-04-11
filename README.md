# Parkrun Club

Parkrun Club app.

Python version: ^3.10

# DevOps

## Local

There is a local deployment through docker images available under `deploys/local`.

Docker issues:

- docker credential desktop
    - https://stackoverflow.com/questions/65896681/exec-docker-credential-desktop-exe-executable-file-not-found-in-path

## Kubernetes (Helm)

Instructions for managing k8s deployment of app.

This project uses Helm to manage the versioning and release of the individual apps.

### Design choices

1. Single namespace: for now, a single namespace is being used to manage all the apps' resources.
1. Separate charts for backend and frontend, when transitioning to ArgoCD an umbrella chart or one single chart to deploy both can be used.
1. Traefik is used for Ingress.

### Local

Steps to deploy locally using minikube and helm:

1. Run `docker compose up -d` from within `deploys/k8s` directory.
1. Wait for the build-service to complete the image builds of the services.
1. Run `deploys/k8s/start_k8s_local.sh`.
1. In two separate terminals:
    - Run `minikube dashboard`
    - Run `minikube tunnel` to generate a tunnel to the local cluster. This must remain open in order to access the traefik load balancer.
1. Add the following to your `/etc/hosts`
    - 127.0.0.1 api.po10.com
    - 127.0.0.1 local.po10.com
1. Access the backend service directly through `api.po10.com` and the frontend service through `local.po10.com`


# Backend

FastAPI app.

## Linting

A makefile is included to consolidate linting. Run `make lint` from within the `backend/` directory. `make check` can be used to not apply any of the corrections and just print to the stdout the files that need fixing, this is used in CI.

# Frontend

NextJS app.

## Commands

- `npm run dev`
- `npm run lint`

### Icons
- <a target="_blank" href="https://icons8.com/icon/X1F0FerHt74r/spinner">Spinner</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
- <a target="_blank" href="https://icons8.com/icon/ZFKgC5O8ab3K/bar-chart">Bar Chart</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>


# Databases

PostgreSQL.


# CI

Cicrcle CI is chosen to run CI/CD pipelines.

See `.circleci/config.yaml`.

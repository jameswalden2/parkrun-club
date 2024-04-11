#!/bin/bash

# allows minikube to use the local registry from the docker compose
minikube addons enable ingress
minikube start --insecure-registry="host.minikube.internal:5001"

# third party
helm repo add traefik https://traefik.github.io/charts
helm repo add bitnami https://charts.bitnami.com/bitnami

helm repo update

helm upgrade --install traefik traefik/traefik --values config/traefik/values.yaml --namespace traefik --create-namespace
helm upgrade --install redis-cluster bitnami/redis --values config/redis/values.yaml --namespace redis --create-namespace


# zalando postgres operator
# install helm charts
helm upgrade --install backend ../charts/backend --values ../charts/backend/values.yaml --namespace po10-local --create-namespace
helm upgrade --install frontend ../charts/frontend --values ../charts/frontend/values.yaml --namespace po10-local --create-namespace

echo "Helm has deployed, run 'minikube tunnel' and leave it open to get an external IP to the load balancer. :)"
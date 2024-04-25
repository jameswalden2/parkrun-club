#!/bin/bash

# allows minikube to use the local registry from the docker compose
minikube addons enable ingress
minikube start --insecure-registry="host.minikube.internal:5001"

# third party
helm repo add traefik https://traefik.github.io/charts
helm repo update

helm install traefik traefik/traefik

# install helm charts
helm upgrade --install frontend ../charts/frontend --values ../charts/frontend/values.yaml --namespace parkrun-club-local --create-namespace

echo "Helm has deployed, run 'minikube tunnel' and leave it open to get an external IP to the load balancer. :)"
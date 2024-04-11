# Use Ubuntu as the base image
FROM ubuntu:latest

# Install necessary packages for building and pushing Docker images
RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# Add Docker's official GPG key
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

# Add Docker's stable repository
RUN add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Install Docker Engine
RUN apt-get update && \
    apt-get install -y docker-ce docker-ce-cli

WORKDIR /app

COPY . /app/

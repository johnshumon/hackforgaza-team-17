#!/bin/bash
set -e

# load
source .env

# fetch docker image
docker pull neo4j:latest

# start neo4j (username: neo4j)
docker run \
    --restart always \
    --detach \
    --name neo4j-server \
    --volume ${HOME}/neo4j/data:/data \
    --publish 7474:7474 \
    --publish 7687:7687 \
    --env NEO4J_AUTH=neo4j/${NEO4J_PASSWORD} \
    neo4j:latest

IMAGE_NAME=$1

echo "BUILDING $IMAGE_NAME SERVICE"

docker build -f /app/$2 -t $IMAGE_NAME /app/
docker push $IMAGE_NAME

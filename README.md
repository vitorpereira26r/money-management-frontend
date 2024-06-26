## how to start the application

# create a .env file with the API url
VITE_API_URL={URL}

# running
npm run dev

## run the application using docker

# build and run the container
docker-compose up --build -d

# stop the container
docker-compose down

# see applications logs

docker-compose logs -f


## how to start the cypress

npx cypress open
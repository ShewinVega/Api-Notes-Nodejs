# NodeJS API-Notes


# Environment variables

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT          | localhost to the api server with express            | "3000"      |
|MONGO_URI           | mongo url conection with mongoose           | "*"      |
|CORS           | Cors accepted values            | "mongodb://localhost:27017/*"      |

# Pre-requisites
- Install [Nvm](https://github.com/nvm-sh/nvm) latest
- Install [Node.js] 18.17.1
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)


# Getting started

- Clone the Repository

```
 git clone https://github.com/ShewinVega/Api-Notes-Nodejs
```
- Install dependencies
```
cd Api-Notes-Nodejs
npm install
```
- Build and run the project
```
- Open docker desktop in order to run:
docker compose up
```
```
npm run dev
```
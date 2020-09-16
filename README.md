# demo-classified-ad-react-apollo

_the concept is develop a productivity app in which users can manage and filter a list of tasks using **react.js**, **apollo-client** and **apollo-sever** with **mongoDB**_

## Installation
To install this project you simply need to have [docker-compose](https://docs.docker.com/compose/install/) installed then clone this and run:
```bash
docker-compose up -d
```
Install express dependencies 
```bash
docker exec -it raam-express yarn install
```
Install react dependencies 
```bash
docker exec -it raam-react yarn install
```
To run the server:
```bash
docker exec -it raam-react yarn start
```
To run the Web App:
```bash
docker exec -it raam-react yarn start
```
## Demo Features
* The project is divided into Front-End(app) and Back-End(server)
* The data fetching is based on [GraphQl](https://graphql.org)
* The Front-End(app) use [react.js](https://reactjs.org) and [apollo-client](https://www.apollographql.com/docs/react/)
* The Back-End(server) use [express](https://www.express.com), [apollo-server](https://www.apollographql.com/docs/apollo-server/) and [mongoDB](https://www.mongodb.com/)
* The UI use CSS Grids with [Material-UI](https://material-ui.com/getting-started/installation/)
* Authentication with [Accounts-js](https://www.accountsjs.com)
* Authorization and Router with [react-router-dom](https://reactrouter.com/web/guides/quick-start)
* Data validation with [formik](https://formik.org/docs/overview)
* Error handling whit [error boundaries react](https://reactjs.org/docs/error-boundaries.html)
* Gobal Store whit API's React ([useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) and [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer))
* Use of [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to manage persistence of state

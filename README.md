Backend repo available here: https://github.com/nvande/unit-conversion-api

Live demo online via Github Pages here: https://nvande.github.io/unit-conversion-frontend/


# Unit Conversion Frontend App

This is a React Typescript front-end application to consume the Unit Conversion API.

## Setup

Before you can start the application, you will need to create an .env file in the root directory.

In that file, add the following value
```
REACT_APP_API_URL = http://unit-conversion-api.us-west-2.elasticbeanstalk.com
```

You will need to replace the URL with the correct localhost address if you are running it locally, ie http://locahlhost:3000

To start the application, you can run:

### `npm run start`

You can also build the application with:

### `npm run build`

Builds the app for production to the `build` folder.


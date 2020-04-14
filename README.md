[![Maintainability](https://api.codeclimate.com/v1/badges/aa287e926495123f6e4d/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/beerthoven-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/aa287e926495123f6e4d/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/beerthoven-be/test_coverage)

# Beerthoven Back End

Our mission is to offer enriching musical experiences through down-to-earth means. You can find the deployed project at [Beerthoven](https://master.dsj5o2cfzjzih.amplifyapp.com).

* [Contributors](#Contributors)
* [Project Overview](#Project-Overview)
* [Build and Installation](#Build-and-Installation)
* [Endpoints](#Endpoints)
* [Available Scripts](#Available-Scripts)
* [Testings](#Testings)
* [Contributing](#Contributing)


## Contributors

| [Eunice Baiden](https://github.com/ebisLab) | [Colin de Vries](https://github.com/dvcolin) | [Eralp Kor](https://github.com/eralpkor) | [Wesley Moody](https://github.com/wesley-moody) | [Nolan Picini](https://github.com/NolanPic) | [Justin Trombley](https://github.com/JustinTrombley96) | [Emily Yoo](https://github.com/eyoo96) |

## Project Overview

[Product Vision](https://www.notion.so/Beerthoven-2ac2dcac96d741fc8c5ff645cf0ccaea) on Notion.

[Planned Releases](https://www.notion.so/e9858304e56341a688cab689992a28c7?v=c2982db92bfe40a8b3151ac63f8be8df) on Notion.

The Beerthoven Backend repository contains code for the three services in our stack.

An Apollo GraphQL service in the root directory that conducts business logic on GraphQL queries with data collected from the database and authentication services.

A Prisma Database ORM service defined in the /prisma/ directory. The prisma is ready for deployment on any Prisma implementation, including free deployment on Heroku through Prisma Cloud.

An Okta authentication application hosted on Okta with custom rules and forms defined in the /apollo/resolvers directory.

This backend build is on top of [Prismatopia](https://github.com/Lambda-School-Labs/prismatopia) an API stack combining a bunch of technologies: Apollo Server, Prisma, OAuth, OpenID Connect, JWT, Postgres, Docker, AWS and more!

## Key Features
* concert attendees
* benefactors
* ticket sales
* merch sales
* event inventory usage
* event surveys
* concert drink/food donations
* event food/drinks/inventory 
* concert venue and venue details

## Backend Framework

We chose an Apollo GraphQL server over a RESTful API for the two reasons:

Allow web and mobile clients to request the exact event details they have space to render. This prevents overfetching and increases performance on mobile.

Allow the Beerthoven API to be seamless expanded to include integration of event data from external APIs in future releases

## Client repositories

1. Web application at [React Front End Repository.](https://master.dsj5o2cfzjzih.amplifyapp.com)
2. No IOS or Android versions.

## Build and Installation

Our server relies on Okta and another Prisma/PostgreSQL deployment to function correctly. If you would like to get your own local Beerthoven server running, clone this repo and follow this guide here.

Once Okta and Prisma is configured:

* Follow [these directions](#Prismatopia:) for prismatopia commands

* visit your endpoint URL to interact with your server through the GraphQL Playground

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

Create a .env file that includes the following:
```
APOLLO_CONTAINER_IMAGE - lambdaschoollabs/your_repo_name
APOLLO_JWKS_URI - Okta domain for your Okta application.
APOLLO_JWT_ISSUER=<Okta domain for your Okta application.>
APOLLO_TOKEN_ENDPOINT=<An OAuth endpoint for Apollo to use for validating tokens: e.,g. "https://dev-173777.okta.com/oauth2/default">
APOLLO_CLIENT_ID=<Client ID from Okta>
APOLLO_CLIENT_SECRET=<a secret for the prisma service to use: e.g. myfirstpassword>
APOLLO_TEST_USERNAME=<username>
APOLLO_TEST_PASSWORD=<password>
PRISMA_ENDPOINT=http://localhost:7000
PRISMA_SECRET=<another secret>
PRISMA_MANAGEMENT_API_SECRET=<somesecret>
LOG_LEVEL=<debug or just info>
APPLICATION_NAME=<Give your App name>
ENVIRONMENT_NAME=<production>
```

## Endpoints
The GraphQL API consists of a single endpoint. In addition to the built-in documentation available from the GraphQL playground, the following queries and mutations can be consumed to conduct CRUD operations on the Beerthoven database:

## Queries:
| Query Name  | Access Control |  Description |
| ---------------- | ------------------- | --------------- |
| `users (...)`     |  authenticated users      |  returns a list of users. |
| `user(...)`  | authenticated user     | Get user's information and stuff |
| `events(...)` | get list of events | Returns a list of beerthoven events |

## Mutations
| Query Name  | Access Control |  Description |
| ------------- | ------------- | ------------ |
| `createUser (...)` | Okta service | Creates a newly registered user. |
| `createEvent (...)` | authenticated users | Create beerthoven event |
| `createPerson (...)` | Okta service | Creates a newly registered person |

## Testing
Our test runner is Jest for unit and integration tests.

For integration testing, we simulate queries and mutations on the server through the apollo-server-testing library's createTestClient() function.

### Setting up a testing Prisma service and database


#### Running the tests with Docker Desktop


## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct. Please follow it in all your interactions with the project.

### Issue/Bug Request
If you are having an issue with the existing project code, please submit a bug report under the following guidelines:

* Check first to see if your issue has already been reported.
* Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
* Create a live example of the problem.
* Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.
### Feature Requests
We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests
If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

### Pull Request Guidelines
* Ensure any install or build dependencies are removed before the end of the layer when doing a build.
* Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
* Ensure that your code conforms to our existing code conventions and test coverage.
* Include the relevant issue number, if applicable.
* You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Prismatopia:

1. Create your .env file to feed environment variables to Prismatopia
2. Start the services via `make local-up`
3. Develop and deploy your Prisma data-model
4. Develop and deploy your Apollo resolvers
5. Go to 3 until done
6. Push to AWS
7. Repeat


## Available Scripts
Makefile
First, it is very important to note that there is a Makefile in the root directly that is intended to provide all of the controls that you'll need for both local development and AWS operations.

make init
This command will do some cleanup and will try to ensure that all required packages are in place. It's a good command to start with.

make docker-clean
This command will do some cleanup of your Docker environment, which can get messy and cluttered at times.

make local-up
This is a big one! It will use Docker Compose to bring up a local environment with a running Apollo Server, Prisma Server and Postgres Server.

make prisma-generate
Generates a Prisma client and GraphQL model from your Prisma data model for use in your Apollo resolvers.

make local-prisma-deploy
Deploys your Prisma data model to the locally running Prisma server.

make local-prisma-reseed
Resets and reseeds data into the locally running Prisma server.

make local-prisma-token
Grabs a token that you can use in the GraphQL Playground of your locally running Prisma server.

make apollo-build
Builds a fresh new Docker image from the contents of the apollo folder and stores it in your local Docker service.

make apollo-push
Builds a fresh new Docker image from the contents of the apollo folder and pushes it to Docker Hub.

make apollo-token
Grabs a token, using the OAUTH_TOKEN_ENDPOINT, TEST_OAUTH_CLIENT_ID and TEST_OAUTH_CLIENT_SECRET environment variables. Very handy to use in the Apollo GraphQL Playground.

Detailed Local Development Workflow
Certainly some steps were skipped earlier, so here are the details to how to work with Prismatopia locally:

1) Install tools
Docker
Prisma CLI
2) Create a domain on Okta
TBDocumented

3) Setup your environment variables
Create an .env file in the root directory as described above

Start Prismatopia
make local-up

Prisma, Apollo and Postgres should be running now, check the output for the endpoints:

...
apollo_1    | Running at address :: on port 8000
...
prisma_1    | Server running on :7000
...
Check the web interfaces
You should now be able to hit Prisma in the browser:

Prisma GraphQL Playground: http://localhost:7000/
Prisma Admin: http://localhost:7000/_admin
You should also be able to hit Apollo in the browser:

Apollo GraphQL Playground: http://localhost:8000/
Sweet! Now, you need to deploy something to Prisma, which starts out empty.

Deploy data model to Prisma
make local-prisma-deploy

Play with Prisma
Generate a token: make local-prisma-deploy
Open the Prisma Admin: http://localhost:7000/_admin
Add the token (TBD)
See the data
Open the Prisma GraphQL Playground: http://localhost:7000/
Add the token (TBD)
See the data
Hooray! Your Prisma service is talking to Postgres!

Play with Apollo
Generate a token: make apollo-token
Open the Apollo GraphQL Playground: http://localhost:8000/
Add the token (TBD)
See the data


### Attribution
These contribution guidelines have been adapted from [this good-Contributing.md-template.](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
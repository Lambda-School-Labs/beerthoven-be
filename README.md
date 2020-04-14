[![Maintainability](https://api.codeclimate.com/v1/badges/aa287e926495123f6e4d/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/beerthoven-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/aa287e926495123f6e4d/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/beerthoven-be/test_coverage)

# Beerthoven Back End

Our mission is to offer enriching musical experiences through down-to-earth means. You can find the deployed project at [Beerthoven](https://master.dsj5o2cfzjzih.amplifyapp.com/).

* [Contributors](#Contributors)
* Project Overview
* Build and Installation
* Endpoints
* Available Scripts
* Testings
* Contributing


## Contributors

| [Eunice Baiden](https://github.com/ebisLab) | [Colin de Vries](https://github.com/dvcolin) | [Eralp Kor](https://github.com/eralpkor) | [Wesley Moody](https://github.com/wesley-moody) | [Nolan Picini](https://github.com/NolanPic) | [Justin Trombley](https://github.com/JustinTrombley96) | [Emily Yoo](https://github.com/eyoo96) |

## Project Overview

[Product Vision](https://www.notion.so/Beerthoven-2ac2dcac96d741fc8c5ff645cf0ccaea) on Notion.

[Planned Releases](https://www.notion.so/e9858304e56341a688cab689992a28c7?v=c2982db92bfe40a8b3151ac63f8be8df) on Notion.

The Beerthoven Backend repository contains code for the three services in our stack.

An Apollo GraphQL service in the root directory that conducts business logic on GraphQL queries with data collected from the database and authentication services.

A Prisma Database ORM service defined in the /prisma/ directory. The prisma is ready for deployment on any Prisma implementation, including free deployment on Heroku through Prisma Cloud.

An Okta authentication application hosted on Okta with custom rules and forms defined in the /apollo/resolvers directory.

This backend build on top of [Prismatopia](https://github.com/Lambda-School-Labs/prismatopia) an API stack combining a bunch of technologies: Apollo Server, Prisma, OAuth, OpenID Connect, JWT, Postgres, Docker, AWS and more!

## Key Features


## Backend Framework

## Client repositories

## Build and Installation

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

Create a .env file that includes the following:

APOLLO_CONTAINER_IMAGE
APOLLO_JWKS_URI
APOLLO_JWT_ISSUER
APOLLO_TOKEN_ENDPOINT
APOLLO_CLIENT_ID
APOLLO_CLIENT_SECRET
APOLLO_TEST_USERNAME
APOLLO_TEST_PASSWORD
PRISMA_ENDPOINT=http://localhost:7000
PRISMA_SECRET
PRISMA_MANAGEMENT_API_SECRET=somesecret
LOG_LEVEL=debug
APPLICATION_NAME=beerthoven
ENVIRONMENT_NAME=production
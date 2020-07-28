# Cloud dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/e1a4192e-327a-4e1c-8ed0-cfcee560322d/deploy-status)](https://app.netlify.com/sites/focused-hoover-466baa/deploys)

A simple prototype of cloud dashboard app. Imitate [Coogle Cloud Dashboard](console.cloud.google.com).

## Try it

I have hosted it on the [Netlify](https://netlify.com). You can just hint this link to play with it.

> [https://focused-hoover-466baa.netlify.app](https://focused-hoover-466baa.netlify.app)

## Features

- User sign-in/sign-up
- API authorization
- Create new sample project with several resource widgets
- Rearrange the widgets position as you like
- Customize the source provider

## Technical stack

- AWS stack(DynamoDB/Cognito/Lambda/AWS CDK)
- React
- Typescript
- Rxjs

## Dependencies

- React
- Rxjs
- Tailwind
- aws-amplify (use to login user via cognito)

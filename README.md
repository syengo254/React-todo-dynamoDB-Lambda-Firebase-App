# React + TypeScript + Vite + AWS Lambda + GCP Firebase + AWS DynamoDB

This is a simple react todo app that leverages the serverless techstacks offered by GCP and AWS.

This repo has 3 branches:
1. Main branch - a bare React todo app with non-persistent data.
2. feat-aws-lamda-dynamoDB - the React todo app with persistent storage to Amazon's dynamoDB + API Gateway + Lambda functions.
3. feat-firebase-store - the React todo app persisted by Google's Firebase/Firestore database.


## Instructions
Checkout any branch mentioned above and run the following commands:
1. ``` yarn install ```
2. ``` yarn run dev ```


## Live Demo
URL: https://local-dev-projects.web.app/

The app should then run locally on port 5173.

The backends for the cloud providers code is just included as the cloud infrastructure was manually created.

&copy; 2023. David Syengo. All rights reserved.

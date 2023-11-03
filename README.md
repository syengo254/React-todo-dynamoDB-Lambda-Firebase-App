# React + TypeScript + Vite + AWS Lambda + GCP Firebase + AWS DynamoDB

This is a simple react todo app that leverages the serverless techstacks offered by GCP and AWS.

This repo has 3 branches:
1. Main branch - a bare React todo app with non-persistent data.
2. feat-aws-lamda-dynamoDB - the React todo app with persistent storage to Amazon's dynamoDB + API Gateway + Lambda functions.
3. feat-firebase-store - the React todo app persisted by Google's Firebase/Firestore database.


## Instructions
1. Copy the .example.env file to .env and set the VITE_APP_AWS_API_URL to your AWI api URL without the trailing slash.
2. Checkout any branch mentioned above and run the following commands:
    NOTE: You might need to enter the appropriate .env config values
      1. ``` yarn install ```
      2. ``` yarn run dev ```

The app should then run locally on port 5173.

The backends for the cloud providers code is just included as the cloud infrastructure was manually created.

## Live Demo
View at: https://feat-aws-lamda-dynamodb.d3g6lkug132148.amplifyapp.com

&copy; 2023. David Syengo. All rights reserved.

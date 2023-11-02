/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   const name = request.query.name;
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!" + name);
// });

// create task
exports.createTask = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Not authorised!");
  }

  const task = data.task;
  return admin.firestore().collection("tasks").add(task);
});

// delete task
exports.deleteTask = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Not authorised!");
  }
  const taskId = data.taskId;

  return admin.firestore().collection("tasks").doc(taskId).delete();
});

const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Listens for brothers added to the site in  /bros/:email and creates a
// sortkey for the guest in /bros/:email/sortKey
exports.brotherSortkey = functions.database
  .ref("/bros/{email}")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const brother = snapshot.val();
    console.log("Creating sort key for " + brother.name);
    let sortKeyArr = brother.name.toUpperCase().split(" ");
    let sortKey = sortKeyArr.splice(1).join("") + sortKeyArr[0];
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.child("sortKey").set(sortKey);
  });

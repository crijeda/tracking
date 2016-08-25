twitterdata = "TwitterData";  // avoid typos, this string occurs many times.

TwitterData = new Mongo.Collection(twitterdata);

Meteor.methods({
  /**
   * Invoked by AutoForm to add a new TwitterData record.
   * @param doc The TwitterData document.
   */
  addTwitterData: function(doc) {
    // check(doc, TwitterData.simpleSchema());
    doc.createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
    TwitterData.insert(doc);
  },
  /**
   *
   * Invoked by AutoForm to update a TwitterData record.
   * @param doc The TwitterData document.
   * @param docID It's ID.
   */
  editTwitterData: function(doc, docID) {
    // check(doc, TwitterData.simpleSchema());
    TwitterData.update({_id: docID}, doc);
  },
   deleteTwitterData: function(docID) {
    TwitterData.remove({_id: docID});
  }

});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish("TwitterData", function (val) {
    return TwitterData.find({},{limit : val});
  });
}


/**
 * Create the schema for TwitterData
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
// TwitterData.attachSchema(new SimpleSchema({

//   id: {
//     type: String,
//   },

// }));
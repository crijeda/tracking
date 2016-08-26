facebookdata = "FacebookData";  // avoid typos, this string occurs many times.

FacebookData = new Mongo.Collection(facebookdata);

Meteor.methods({
  /**
   * Invoked by AutoForm to add a new FacebookData record.
   * @param doc The FacebookData document.
   */
  addFacebookData: function(doc) {
    // check(doc, FacebookData.simpleSchema());
    doc.createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
    FacebookData.insert(doc);
  },
  /**
   *
   * Invoked by AutoForm to update a FacebookData record.
   * @param doc The FacebookData document.
   * @param docID It's ID.
   */
  editFacebookData: function(doc, docID) {
    // check(doc, FacebookData.simpleSchema());
    FacebookData.update({_id: docID}, doc);
  },
   deleteFacebookData: function(docID) {
    FacebookData.remove({_id: docID});
  }

});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish("FacebookData", function (val) {
    return FacebookData.find({},{limit : val});
  });
}


/**
 * Create the schema for FacebookData
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
// FacebookData.attachSchema(new SimpleSchema({

//   id: {
//     type: String,
//   },

// }));
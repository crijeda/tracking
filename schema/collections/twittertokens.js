twittertokens = "TwitterTokens";  // avoid typos, this string occurs many times.

TwitterTokens = new Mongo.Collection(twittertokens);

if (Meteor.isServer) {
  Meteor.publish("TwitterTokens", function () {
    return TwitterTokens.find();
  });
}
Meteor.methods({
  /**
   * Invoked by AutoForm to add a new TwitterData record.
   * @param doc The TwitterData document.
   */
  addTwitterTokens: function(doc) {
    check(doc, TwitterTokens.simpleSchema());
    doc.createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
    TwitterTokens.insert(doc);
  },
  /**
   *
   * Invoked by AutoForm to update a TwitterTokens record.
   * @param doc The TwitterTokens document.
   * @param docID It's ID.
   */
  editTwitterTokens: function(doc, docID) {
    check(doc, TwitterTokens.simpleSchema());
    TwitterTokens.update({_id: docID}, doc);
  },
   deleteTwitterTokens: function(docID) {
    TwitterTokens.remove({_id: docID});
  }

});
TwitterTokens.attachSchema(new SimpleSchema({

 createdAt: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "datetime"
      }
    }
  },
  consumer_key: {
    label: "consumer_key",
    type: String,
    optional: false,
  },
  consumer_secret: {
    label: "consumer_key",
    type: String,
    optional: false,
  },
  access_token: {
    label: "consumer_key",
    type: String,
    optional: false,
  },
  access_token_secret: {
    label: "consumer_key",
    type: String,
    optional: false,
  },
   requests: {
    type: [Object],
    optional: true,
  },


}));
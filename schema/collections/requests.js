requests = "Requests";  // avoid typos, this string occurs many times.

Requests = new Mongo.Collection(requests);

if (Meteor.isServer) {
  Meteor.publish("Requests", function () {
    return Requests.find();
  });
}
Meteor.methods({
  /**
   * Invoked by AutoForm to add a new TwitterData record.
   * @param doc The TwitterData document.
   */
  addRequests: function(doc) {
    check(doc, Requests.simpleSchema());
    doc.createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
    Requests.insert(doc);
  },
  /**
   *
   * Invoked by AutoForm to update a Requests record.
   * @param doc The Requests document.
   * @param docID It's ID.
   */
  editRequests: function(doc, docID) {
    check(doc, Requests.simpleSchema());
    Requests.update({_id: docID}, doc);
  },
   deleteRequests: function(docID) {
    Requests.remove({_id: docID});
  }

});
Requests.attachSchema(new SimpleSchema({
  token_id: {
    type: String,
    optional: false,
  },
  createdAt: {
    type: String,
    optional: false,
    autoform: {
      afFieldInput: {
        type: "datetime"
      }
    }
  },

}));
facebooktokens = "FacebookTokens";  // avoid typos, this string occurs many times.

FacebookTokens = new Mongo.Collection(facebooktokens);

if (Meteor.isServer) {
  Meteor.publish("FacebookTokens", function () {
    return FacebookTokens.find();
  });
}
Meteor.methods({

  addFacebookTokens: function(doc) {
    check(doc, FacebookTokens.simpleSchema());
    doc.createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
    FacebookTokens.insert(doc);
  },
  editFacebookTokens: function(doc, docID) {
    check(doc, FacebookTokens.simpleSchema());
    FacebookTokens.update({_id: docID}, doc);
  },
   deleteFacebookTokens: function(docID) {
    FacebookTokens.remove({_id: docID});
  }

});
FacebookTokens.attachSchema(new SimpleSchema({

 createdAt: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "datetime"
      }
    }
  },
  app_id: {
    label: "App ID",
    type: String,
    optional: false,
  },
  app_secret: {
    label: "App Secret",
    type: String,
    optional: false,
  },

}));
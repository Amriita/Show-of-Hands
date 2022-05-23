const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    Name: {
        type: String,
    },
    Surname: {
        type: String,
    },
    Mobile: {
        type: Number,
    },
    Address1: {
        type: String,
    },
    PostalCode: {
        type: Number,
    },
    state: {
        type: String
    },
    Area: {
        type: String
    },
    Email: {
        type: String
    },
    bio: {
        type: String
    },
  },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

ProfileSchema.virtual("thumbnail_url").get(function () {
    return this.thumbnail;
  });

module.exports = Profile = mongoose.model('profile', ProfileSchema);
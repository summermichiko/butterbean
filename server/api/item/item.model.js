'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String, default: "" },
  yelpName: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  writeUp: { type: String, default: "" },
  category: { type: String, default: "" },
  address: { type: String, default: "" },
  telephone: { type: String, default: "" },
  website: { type: String, default: "" },
  gradeLevels: { type: String, default: "" },
  enrollment: { type: String, default: "" },
  boarding: { type: String, default: "" },
  gender: { type: String, default: "" },
  religion: { type: String, default: "" },
  town: { type: [String, String], default: []},
  student: { type: [String, String, String, String], default: []},
  city: { type: String, default: "" },
  logo: { type: String, default: "" },
  video: { type: String, default: "" }
});

module.exports = mongoose.model('Item', ItemSchema);
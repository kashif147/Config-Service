const mongoose = require('mongoose');

// RegionalContacts Schema (Referenced to Region and contactType)
const regionalcontactsSchema = new mongoose.Schema({
    ContactID: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    RegionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true }

});

module.exports = mongoose.model('RegionalContacts', regionalcontactsSchema);



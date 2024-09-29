const mongoose = require('mongoose');

// ContactType Schema (Referenced by RegionalContacts)
const contactTypeSchema = new mongoose.Schema({
    ContactTypeID: { type: String, required: true },
    ContactType: { type: String, required: true },
    DisplayName: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('ContactType', contactTypeSchema);



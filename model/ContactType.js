const mongoose = require('mongoose');

// ContactType Schema (Referenced in Contacts)
const contactTypeSchema = new mongoose.Schema({
    ContactType: { type: String, required: true },
    DisplayName: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('ContactType', contactTypeSchema);



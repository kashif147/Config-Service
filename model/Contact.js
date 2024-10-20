const mongoose = require('mongoose');

// Contacts Schema (Referenced to contactType)
const contactSchema = new mongoose.Schema({
    ContactName: { type: String, required: true },
    ContactPhone: { type: String, required: true },
    ContactEmail: { type: String, required: true },
    ContactAddress: {
        BuildingOrHouse: { type: String, required: true },
        StreetOrRoad: { type: String, required: true },
        AreaOrTown: { type: String, required: true },
        CityCountyOrPostCode: { type: String, required: true },
        Eircode: { type: String, required: true }
    },
    ContactTypeID: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactType', required: true },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
   
});

module.exports = mongoose.model('Contact', contactSchema);


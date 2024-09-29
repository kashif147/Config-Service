const mongoose = require('mongoose');

// RegionalContacts Schema (Referenced to Region and contactType)
const regionalcontactsSchema = new mongoose.Schema({
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
    RegionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true }

});

module.exports = mongoose.model('RegionalContacts', regionalcontactsSchema);

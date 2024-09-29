const mongoose = require('mongoose');

// Region Schema (References to RegionType)
// and  Reference by RegionalContacts
const regionSchema = new mongoose.Schema({
    RegionID: { type: String, required: true },
    RegionCode: { type: String, required: true },
    RegionName: { type: String, required: true },
    DisplayName: { type: String, required: true },
    ParentRegion: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', default: null },  // Self-referencing
    RegionTypeID: { type: mongoose.Schema.Types.ObjectId, ref: 'RegionType', required: true }, // Reference to RegionType
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Region', regionSchema);

const mongoose = require('mongoose');

// Region Schema (References to RegionType)
// and  Reference by RegionalContacts
const regionSchema = new mongoose.Schema({
    RegionCode: { type: String, required: true },
    RegionName: { type: String, required: true },
    DisplayName: { type: String },
    ParentRegion: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', default: null },  // Now storing as Number, self-referencing
    RegionTypeID: { type: mongoose.Schema.Types.ObjectId, ref: 'RegionType', required: true },  // Now storing as Number, reference to RegionType
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Region', regionSchema);



const mongoose = require('mongoose');

// RegionType Schema (Referenced by Region)
const regionTypeSchema = new mongoose.Schema({
    RegionTypeID: { type: String, required: true },
    RegionType: { type: String, required: true },
    DisplayName: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('RegionType', regionTypeSchema);
  

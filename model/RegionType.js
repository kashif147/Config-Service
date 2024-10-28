const mongoose = require('mongoose');

// RegionType Schema (Referenced by Region)
const regionTypeSchema = new mongoose.Schema({
    RegionType: { type: String, required: true },
    DisplayName: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }

});

module.exports = mongoose.model('RegionType', regionTypeSchema);
  

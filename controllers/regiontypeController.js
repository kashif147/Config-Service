const RegionType = require('../model/RegionType');

// Get all region types, excluding soft deleted ones
/* app.get('/region-types', async (req, res) => {
    try {
        const regionTypes = await RegionType.find({ isDeleted: false });
        res.json(regionTypes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load region types' });
    }
});
 */

const getAllRegionTypes = async (req, res) => 
    {
        const regiontypes = await RegionType.find();
        if (!regiontypes) return res.status(204).json({ 'message': 'No region types found.' });
        res.json(regiontypes);
    }

const createNewRegionType =  async (req, res) => {
     // Validate required fields
    if (!req?.body?.RegionType) {
        return res.status(400).json({ message: 'Region Type is required.' });
    }
   
    try {
        // Create a new RegionType
        const result = await RegionType.create({
            RegionType: req.body.RegionType.trim(),
            DisplayName: req.body.DisplayName ? req.body.DisplayName.trim() : '', // Optional DisplayName
            isDeleted: req.body.isDeleted || false,  // Optional isDeleted, default to false
            isActive: req.body.isActive !== undefined ? req.body.isActive : true // Optional isActive, default to true
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create Region Type.', error: err.message });
    }
}
    
const updateRegionType = async (req, res) => {
  // Validate ID parameter
   if (!req?.body?.id) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }

    // Additional validation for RegionType if provided
    // if (req.body.RegionType && (typeof req.body.RegionType !== 'string' || req.body.RegionType.trim().length < 3)) {
    //     return res.status(400).json({ message: 'Region Type must be a string with at least 3 characters.' });
    // }
   
    try {
        // Find the region type by ID
        const regiontype = await RegionType.findById(req.body.id).exec();
        if (!regiontype) {
            return res.status(404).json({ message: `No RegionType matches ID ${req.body.id}.` });
        }

        // Update fields if provided in the request body
        if (req.body?.RegionType) regiontype.RegionType = req.body.RegionType.trim();
        if (req.body?.DisplayName) regiontype.DisplayName = req.body.DisplayName.trim();
        if (req.body.isDeleted !== undefined) regiontype.isDeleted = req.body.isDeleted;
        if (req.body.isActive !== undefined) regiontype.isActive = req.body.isActive;

        // Save the updated region type
        const result = await regiontype.save();
        res.json(result);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to update Region Type.', error: err.message });
        }
    }
    
    const deleteRegionType = async (req, res) => {
        if (!req?.body?.id) return res.status(400).json({ 'message': 'RegionType ID required.'});
    
        const regiontype = await RegionType.findOne({ _id: req.body.id}).exec();
        if (!regiontype) {
            return res.status(240).json({ "message": ` No regiontype matches ID ${req.body.id}. ` });
        }
    
       const result = await regiontype.deleteOne({ _id: req.body.id });
        res.json(result);
    }
    
    const getRegionType =  async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'RegionType ID required.'});
    
        const regiontype = await RegionType.findOne({ _id: req.params.id}).exec();
        if (!regiontype) {
                    return res.status(240).json({ "message": ` No RegionType matches ID ${req.params.id}. ` });
        }
        res.json(regiontype);
    }

    
    module.exports = {
        getAllRegionTypes,
        createNewRegionType,
        updateRegionType,
        deleteRegionType,
        getRegionType
       }
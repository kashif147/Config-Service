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
        if (!req?.body?.RegionTypeID || !req?.body?.RegionType || !req?.body?.DisplayName ) {
            return res.status(400).json({ 'message': 'RegionTypeID, Region Type and Display names are required' });
        }
        
        try 
        {
            const result = await RegionType.create({
                RegionTypeID: req.body.RegionTypeID,
                RegionType: req.body.RegionType,
                DisplayName: req.body.DisplayName,
                isDeleted: req.body.isDeleted
            });
            res.status(201).json(result);
        }
         catch (err) {
            console.error(err);
        }
    }
    
    const updateRegionType = async (req, res) => {
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID parameter is required'});
        }
    
        const regiontype = await RegionType.findOne({ _id: req.body.id}).exec();
        if (!regiontype) {
            return res.status(240).json({ "message": ` No RegionType matches ID ${req.body.id}. ` });
        }
    
        if (req.body?.RegionTypeID) regiontype.RegionTypeID = req.body.RegionTypeID;
        if (req.body?.RegionType) regiontype.RegionType = req.body.RegionType;
        if (req.body?.DisplayName) regiontype.DisplayName = req.body.DisplayName;
        if (req.body?.isDeleted) regiontype.isDeleted = req.body.isDeleted;
        
        const result = await regiontype.save();
        res.json(result);
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
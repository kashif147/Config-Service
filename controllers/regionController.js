const Region = require('../model/Region');

const getAllRegions = async (req, res) => 
    {
        const region = await Region.find();
        if (!region) return res.status(204).json({ 'message': 'No region found.' });
        res.json(region);
    }

const createNewRegion =  async (req, res) => {
        if (!req?.body?.RegionID || !req?.body?.RegionCode ) {
            return res.status(400).json({ 'message': 'RegionID, Region Code are required' });
        }
        
        try 
        {
            const result = await Region.create({
                RegionID: req.body.RegionID,
                RegionCode: req.body.RegionCode,
                RegionName: req.body.RegionName,
                DisplayName: req.body.DisplayName,
                ParentRegion: req.body.ParentRegion,
                RegionTypeID: req.body.RegionTypeID,
                isDeleted: req.body.isDeleted

            });
            res.status(201).json(result);
        }
         catch (err) {
            console.error(err);
        }
    }
    
    /* const updateContactType = async (req, res) => {
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID parameter is required'});
        }
    
        const contacttype = await ContactType.findOne({ _id: req.body.id}).exec();
        if (!contacttype) {
            return res.status(240).json({ "message": ` No ContactType matches ID ${req.body.id}. ` });
        }
    
        if (req.body?.ContactTypeID) contacttype.ContactTypeID = req.body.ContactTypeID;
        if (req.body?.ContactType) contacttype.ContactType = req.body.ContactType;
        if (req.body?.DisplayName) contacttype.DisplayName = req.body.DisplayName;
        if (req.body?.isDeleted) contacttype.isDeleted = req.body.isDeleted;
        
        const result = await contacttype.save();
        res.json(result);
    }
    
    const deleteContactType= async (req, res) => {
        if (!req?.body?.id) return res.status(400).json({ 'message': 'ContactType ID required.'});
    
        const contacttype = await ContactType.findOne({ _id: req.body.id}).exec();
        if (!contacttype) {
            return res.status(240).json({ "message": ` No contacttype matches ID ${req.body.id}. ` });
        }
    
       const result = await contacttype.deleteOne({ _id: req.body.id });
        res.json(result);
    } */
    
/*     const getRegion =  async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'RegionID required.'});
    
        const region = await Region.findOne({ _id: req.params.id}).exec();
        if (!Region) {
                    return res.status(240).json({ "message": ` No Region matches ID ${req.params.id}. ` });
        }
        res.json(region);
    }
 */
    const getRegionWithType =  async (req, res) => {
       // if (!req?.params?.RegionTypeID) return res.status(400).json({ 'message': 'Region Type required.'});
    
        if (!req?.params?.RegionTypeID && !req?.params?.ParentRegion ) {
            return res.status(400).json({ 'message': 'Region Type and Parent Region are required' });
        }

       // const region = await Region.find({ RegionTypeID: req.params.RegionTypeID}).exec();
       const region = await Region.find({ RegionTypeID: req.params.RegionTypeID,
                                      ParentRegion: req.params.ParentRegion}).exec();

        if (!Region) {
                    return res.status(240).json({ "message": ` No Region matches against Region Type ${req.params.RegionTypeID}. ` });
        }
        res.json(region);
    }

    
    module.exports = {
        getAllRegions,
        createNewRegion,
       // updateRegion,
        //deleteRegion,
       // getRegion,
        getRegionWithType
       }

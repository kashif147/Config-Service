const Contact = require('../model/Contact');
const Region = require('../model/Region');
const RegionalContacts = require('../model/RegionalContacts');
const mongoose = require('mongoose');

const getAllRegions = async (req, res) => {
    try {
        // Fetch all regions and populate ParentRegionId with RegionName
        const regions = await Region.find({})
            .populate({
                path: 'ParentRegionId',
                select: 'RegionName' // Only include the RegionName field
            })
            .exec();

        if (!regions.length) {
            return res.status(404).json({ message: 'No regions found' });
        }

        // Transform the data to include ParentRegionName separately
        const formattedRegions = regions.map(region => ({
            _id: region._id,
            RegionCode: region.RegionCode,
            RegionName: region.RegionName,
            DisplayName: region.DisplayName,
            ParentRegionId: region.ParentRegionId ? region.ParentRegionId._id : null, // Keep only the ID
            ParentRegion: region.ParentRegionId ? region.ParentRegionId.RegionName : null, // Include name separately
            RegionTypeID: region.RegionTypeID
        }));

        res.status(200).json(formattedRegions);
    } catch (error) {
        console.error("Error fetching regions:", error);
        res.status(500).json({ error: 'An error occurred while fetching regions' });
    }
};



const createNewRegion = async (req, res) => {
    //testing comit
    try {
        // Validate required fields
        const { region, contactsprofile } = req.body;

        if (!region?.RegionCode || !region?.RegionName) {
            return res.status(400).json({ message: 'Region Code and Region Name are required' });
        }

        // Ensure ParentRegionId is set properly (if provided)
        const newRegion = {
            RegionCode: region.RegionCode,
            RegionName: region.RegionName,
            DisplayName: region.DisplayName || region.RegionName, // Default to RegionName if DisplayName is not provided
            ParentRegionId: region.ParentRegionId || null, // Null if not provided
            RegionTypeID: region.RegionTypeID, // Required field
            isDeleted: region.isDeleted || false,
            isActive: region.isActive !== undefined ? region.isActive : true,
        };

        // Step 1: Create Region
        const createdRegion = await Region.create(newRegion);
        const regionid = createdRegion._id;

        let contactid = null;

        // Step 2: Optional Contact Profile Creation
        if (Array.isArray(contactsprofile) && contactsprofile.length > 0) {
            const contacts = await Contact.create(contactsprofile);
            contactid = contacts[0]._id;

            // Create RegionalContacts only if contacts are provided
            await RegionalContacts.create({
                ContactID: contactid,
                RegionID: regionid
            });
        }

        // Send response
        res.status(201).json({
            regionid,
            contactid: contactid || null,
            message: "Region created successfully"
        });

    } catch (err) {
        console.error("Error creating region:", err);
        res.status(500).json({ error: 'Region registration failed', details: err.message });
    }
};

    
const updateRegion = async (req, res) => {
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID parameter is required'});
        }
    
        const region = await Region.findOne({ _id: req.body.id}).exec();
        if (!region) {
            return res.status(240).json({ "message": ` No Region matches ID ${req.body.id}. ` });
        }
    
        if (req.body?.RegionCode) region.RegionCode = req.body.RegionCode;
        if (req.body?.RegionName) region.RegionName = req.body.RegionName;
        if (req.body?.DisplayName) region.DisplayName = req.body.DisplayName;
        if (req.body?.ParentRegion) region.ParentRegion = req.body.ParentRegion;
        if (req.body?.RegionTypeID) region.RegionTypeID = req.body.RegionTypeID;
        if (req.body?.isDeleted) region.isDeleted = req.body.isDeleted;
        if (req.body?.isActive) region.isActive = req.body.isActive;

        const result = await region.save();
        res.json(result);
    }
    
    const deleteRegion= async (req, res) => {
        if (!req?.body?.id) return res.status(400).json({ 'message': 'Region ID required.'});
    
        const region = await Region.findOne({ _id: req.body.id}).exec();
        if (!region) {
            return res.status(240).json({ "message": ` No region matches ID ${req.body.id}. ` });
        }
    
       const result = await region.deleteOne({ _id: req.body.id });
        res.json(result);
    } 
    
    const getRegion = async (req, res) => {
        try {
            // Fetch all regions and populate ParentRegionId with RegionName
            const regions = await Region.find()
                .populate('ParentRegionId', 'RegionName') // Populate only the RegionName
                .exec();
    
            if (!regions.length) {
                return res.status(404).json({ message: 'No regions found' });
            }
    
            // Send response
            res.json(regions);
    
        } catch (error) {
            console.error("Error fetching regions:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    
    
    
    
 
    //load region against regiontype or parentregion parameters
//     const getRegionWithType =  async (req, res) => {
//         try {
//          // Extract parameters from req.params
//          const { RegionTypeID, ParentRegion } = req.params;

//          // Build the query object dynamically
//          let query = {};

//          // Add RegionTypeID to the query if provided
//         if (RegionTypeID) {
//             query.RegionTypeID = RegionTypeID;
//         }

//         // Add ParentRegion to the query if provided
//         if (ParentRegion) {
//             query.ParentRegion = ParentRegion;
//         }

//         console.log("test query" + query);
// //        return res.status(240).json({ "message": ` query:  query ` });
//         // Execute the query with the built query object
//         const regions = await Region.find(query).exec();

//         // If no regions are found, return a 404
//         if (regions.length === 0) {
//             return res.status(404).send('No regions found');
//         }

//         // Send back the matching regions
//         res.json(regions);

//         } catch (error) {
//             res.status(500).send('Server error');
//         }      
//     }

const getRegionWithType = async (req, res) => {
    try {
        // Extract RegionTypeID and ParentRegionId from the URL params
        const { RegionTypeID, ParentRegionId } = req.params;

        // Ensure both RegionTypeID and ParentRegionId are provided
        if (!RegionTypeID || !ParentRegionId) {
            return res.status(400).json({ message: "RegionTypeID and ParentRegionId are required" });
        }

        // Build query object dynamically
        let query = { 
            RegionTypeID: RegionTypeID, 
            ParentRegionId: ParentRegionId 
        };

        console.log("Query:", query);

        // Fetch only filtered regions
        const regions = await Region.find(query)
            .populate({
                path: 'ParentRegionId',
                select: 'RegionName DisplayName' // Fetch RegionName & DisplayName
            })
            .populate({
                path: 'RegionTypeID',
                select: 'TypeName' // Fetch TypeName from RegionType model
            })
            .exec();

        // If no regions are found, return 404
        if (!regions.length) {
            return res.status(404).json({ message: 'No regions found' });
        }

        // Format response
        const formattedRegions = regions.map(region => ({
            _id: region._id,
            RegionCode: region.RegionCode,
            RegionName: region.RegionName,
            DisplayName: region.DisplayName,
            ParentRegionId: region.ParentRegionId ? region.ParentRegionId._id : null,
            ParentRegionName: region.ParentRegionId ? region.ParentRegionId.RegionName : null,
            ParentRegionDisplayName: region.ParentRegionId ? region.ParentRegionId.DisplayName : null,
            RegionTypeID: region.RegionTypeID ? region.RegionTypeID._id : null,
            RegionTypeName: region.RegionTypeID ? region.RegionTypeID.TypeName : null
        }));

        res.status(200).json(formattedRegions);
    } catch (error) {
        console.error("Error fetching regions:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


    
    
    module.exports = {
        getAllRegions,
        createNewRegion,
        updateRegion,
        deleteRegion,
        getRegion,
        getRegionWithType
       }

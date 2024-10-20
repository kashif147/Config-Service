const Contact = require('../model/Contact');
const Region = require('../model/Region');
const RegionalContacts = require('../model/RegionalContacts');
const mongoose = require('mongoose');

const getAllRegions = async (req, res) => 
    {
        const region = await Region.find();
        if (!region) return res.status(204).json({ 'message': 'No region found.' });
        res.json(region);
    }

const createNewRegion =  async (req, res) => {
      //  if (!req?.body?.RegionCode || !req?.body?.RegionName ) {
        //    return res.status(400).json({ 'message': 'Region Code/Name are required' });
       // }
        const session = await mongoose.startSession();
        session.startTransaction();

        try 
        {
            // Step 1: Create Profile
            const region = await Region.create([req.body.region], { session });
            const regionid = region[0]._id;

            const cprofile = req.body.contactsprofile;
            if (cprofile && cprofile.length === 0) {
               return res.status(400).json({ 'message': 'No Contacts registered' });
            }
    
            // Step 2: Create Related Entities
                const contactsprofile = req.body.contactsprofile.map(Contact => ({ ...Contact}));

                const contacts = await Contact.create(contactsprofile, { session });
                const contactid = contacts[0]._id;
    
                const result = await RegionalContacts.create({
                 ContactID: contactid,
                 RegionID: regionid
                });
                res.status(201).json(result);    
                       
            // Step 3: Commit transaction if all went well
            await session.commitTransaction();
            session.endSession();        
            
            res.status(201).send({ regionid , contactid});

        }
         catch (err) {
            // Rollback transaction
             await session.abortTransaction();
            session.endSession();
             res.status(500).send({ error: 'Region registration failed', details: error });
            //console.error(err);
        }
    }
    
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
    
    const getRegion =  async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'RegionID required.'});
    
        const region = await Region.findOne({ _id: req.params.id}).exec();
        if (!Region) {
                    return res.status(240).json({ "message": ` No Region matches ID ${req.params.id}. ` });
        }
        res.json(region);
    }
 
    //load region against regiontype or parentregion parameters
    const getRegionWithType =  async (req, res) => {
        try {
         // Extract parameters from req.params
         const { RegionTypeID, ParentRegion } = req.params;

         // Build the query object dynamically
         let query = {};

         // Add RegionTypeID to the query if provided
        if (RegionTypeID) {
            query.RegionTypeID = RegionTypeID;
        }

        // Add ParentRegion to the query if provided
        if (ParentRegion) {
            query.ParentRegion = ParentRegion;
        }

        console.log("test query" + query);
//        return res.status(240).json({ "message": ` query:  query ` });
        // Execute the query with the built query object
        const regions = await Region.find(query).exec();

        // If no regions are found, return a 404
        if (regions.length === 0) {
            return res.status(404).send('No regions found');
        }

        // Send back the matching regions
        res.json(regions);

        } catch (error) {
            res.status(500).send('Server error');
        }      
    }

    //regionProfile

    const createRegionProfile =  async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
    
            // Step 1: Create Profile
            const region = await Region.create([req.body.region], { session });
        
            const profileId = region[0]._id;
            console.log(profileId);
    
            // Step 2: Create Related Entities
           // const contacts = req.body.contacts.map(contact => ({ ...contact, profileId }));
           // const regionalcontacts = req.body.regionalcontacts.map(rgcontact => ({ ...rgcontact, profileId }));
        
            //await contacts.create(contacts, { session });
            //await regionalcontacts.create(regionalcontacts, { session });
        
            // Step 3: Commit transaction if all went well
            await session.commitTransaction();
            session.endSession();
        
            res.status(201).send({ profileId });
          } catch (error) {
            // Rollback transaction
            await session.abortTransaction();
            session.endSession();
            res.status(500).send({ error: 'Profile registration failed', details: error });
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

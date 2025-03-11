const Lookup = require('../model/Lookup');

const getAllLookup = async (req, res) => 
{
    try {
        // Fetch all Lookup documents and populate lookuptypeId with fields from LookupType
        const lookups = await Lookup.find({})
            .populate({
                path: 'lookuptypeId',
                select: 'code lookuptype displayname' // Fields to include from LookupType
            });

        // Send the populated data as a JSON response
        res.status(200).json(lookups);
    } catch (error) {
        console.error('Error fetching lookups:', error);
        res.status(500).json({ error: 'An error occurred while fetching lookups' });
    }

}

const getLookup =  async (req, res) => {
    try {
        const { id } = req.params;
        // const lookup = await Lookup.findById(id);
        // if (!lookup) {
        //   return res.status(404).json({ error: 'Lookup not found' });
        // }
        // res.json(lookup);

         // Fetch all Lookup documents and populate lookuptypeId with fields from LookupType
         const lookups = await Lookup.findById(id)
         .populate({
             path: 'lookuptypeId',
             select: 'code lookuptype displayname' // Fields to include from LookupType
            });

            res.status(200).json(lookups);

      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }    
}

const createNewLookup =  async (req, res) => {
    try {
        const { code, lookupname, DisplayName, Parentlookup, lookuptypeId, isdeleted, isactive, userid } = req.body;
    
        // Validate required fields
        if (!code || !lookupname || !userid) {
           return res.status(400).json({ error: 'Code, Lookup, User ID are required' });
         }
    

        // Assign fields individually to control which properties are saved
        const r = await Lookup.create({
          code: req.body.code,
          lookupname: req.body.lookupname,
          DisplayName: req.body.DisplayName,
          Parentlookup: req.body.Parentlookup,
          lookuptypeId: req.body.lookuptypeId,
          isdeleted: req.body.isdeleted || false, // Defaults to false if not provided
          isactive: req.body.isactive , // Defaults to true if not provided
          userid: req.body.userid
        });
    
        res.status(201).json(r);
      } catch (error) {
        if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message });
        }
        if (error.code === 11000) {
          // Duplicate key error for 'code' field
          return res.status(400).json({ error: 'Code must be unique' });
        }
        if (error.lookupname === 11000) {
          // Duplicate key error for 'code' field
          return res.status(400).json({ error: 'Code must be unique' });
        }
        res.status(500).json({ error: 'Server error' });
      }
}

const updateLookup = async (req, res) => {
    try {
        const { id, code, lookupname, DisplayName, Parentlookup, lookuptypeId, isdeleted, isactive, userid } = req.body;

      
        // Find the LookupType document by ID
        const lookups = await Lookup.findById(id);
        if (!lookups) {
        return res.status(404).json({ error: 'Lookup not found' });
        }
        console.log('error');
        // Update fields individually only if they are provided in the request
        if (code) lookups.code = code;
        if (lookupname) lookups.lookupname = lookupname;
        if (DisplayName) lookups.DisplayName = DisplayName;
        if (Parentlookup) lookups.Parentlookup = Parentlookup;
        if (lookuptypeId) lookups.lookuptypeId = lookuptypeId;
        if (typeof isdeleted !== 'undefined') lookups.isdeleted = isdeleted;
        if (typeof isactive !== 'undefined') lookups.isactive = isactive;
        if (userid) lookups.userid = userid;

        // Save the updated document, applying validation
        await lookups.save();
        res.json(lookups);
    } catch (error) {
        if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Server error' });
    }
}

const deleteLookup = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Lookup ID required.'});

    const lookups = await Lookup.findOne({ _id: req.body.id}).exec();
    if (!lookups) {
        return res.status(240).json({ "message": ` No lookups matches ID ${req.body.id}. ` });
    }

   const result = await lookups.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    getAllLookup,
    getLookup,
    createNewLookup,
    updateLookup,
    deleteLookup
   }
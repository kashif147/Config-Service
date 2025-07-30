const ContactType = require('../model/ContactType');

const getAllContactType = async (req, res) => 
    {
        const contacttype = await ContactType.find();
        if (!contacttype) return res.status(204).json({ 'message': 'No contact types found.' });
        res.json(contacttype);
    }

    const createNewContactType = async (req, res) => {
        // Validate required fields
        if (!req?.body?.ContactType) {
            return res.status(400).json({ message: 'Contact Type is required' });
        }
    
        try {
            // Create a new ContactType
            const result = await ContactType.create({
                ContactType: req.body.ContactType,
                DisplayName: req.body.DisplayName || '', // Optional DisplayName
                isDeleted: req.body.isDeleted || false,  // Optional isDeleted, default to false
                isActive: req.body.isActive !== undefined ? req.body.isActive : true // Optional isActive, default to true
            });
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to create Contact Type', error: err.message });
        }
    };

    const updateContactType = async (req, res) => {
        // Validate ID parameter
        if (!req?.body?.id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }
    
        try {
            // Find the contact type by ID
            const contacttype = await ContactType.findById(req.body.id).exec();
            if (!contacttype) {
                return res.status(404).json({ message: `No ContactType matches ID ${req.body.id}.` });
            }
    
            // Update fields if provided in the request body
            if (req.body?.ContactType) contacttype.ContactType = req.body.ContactType;
            if (req.body?.DisplayName) contacttype.DisplayName = req.body.DisplayName;
            if (req.body?.isDeleted !== undefined) contacttype.isDeleted = req.body.isDeleted;
            if (req.body?.isActive !== undefined) contacttype.isActive = req.body.isActive;
    
            // Save the updated contact type
            const result = await contacttype.save();
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to update Contact Type', error: err.message });
        }
    };
    
   const deleteContactType= async (req, res) => {
        if (!req?.body?.id) return res.status(400).json({ 'message': 'ContactType ID required.'});
    
        const contacttype = await ContactType.findOne({ _id: req.body.id}).exec();
        if (!contacttype) {
            return res.status(240).json({ "message": ` No contacttype matches ID ${req.body.id}. ` });
        }
    
       const result = await contacttype.deleteOne({ _id: req.body.id });
        res.json(result);
    }
    
    const getContactType =  async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'ContactType ID required.'});
    
        const contacttype = await ContactType.findOne({ _id: req.params.id}).exec();
        if (!contacttype) {
                    return res.status(240).json({ "message": ` No ContactType matches ID ${req.params.id}. ` });
        }
        res.json(contacttype);
    }

    
    module.exports = {
        getAllContactType,
        createNewContactType,
        updateContactType,
        deleteContactType,
        getContactType
       }

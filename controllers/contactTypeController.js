const ContactType = require('../model/ContactType');

const getAllContactType = async (req, res) => 
    {
        const contacttype = await ContactType.find();
        if (!contacttype) return res.status(204).json({ 'message': 'No contact types found.' });
        res.json(contacttype);
    }

const createNewContactType =  async (req, res) => {
        if (!req?.body?.ContactTypeID || !req?.body?.ContactType || !req?.body?.DisplayName ) {
            return res.status(400).json({ 'message': 'ContactTypeID, Contact Type and Display names are required' });
        }
        
        try 
        {
            const result = await ContactType.create({
                ContactTypeID: req.body.ContactTypeID,
                ContactType: req.body.ContactType,
                DisplayName: req.body.DisplayName,
                isDeleted: req.body.isDeleted
            });
            res.status(201).json(result);
        }
         catch (err) {
            console.error(err);
        }
    }
    
    const updateContactType = async (req, res) => {
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

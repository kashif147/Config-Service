const Contact = require('../model/Contact');

const getAllContact = async (req, res) => 
    {
        const contact = await Contact.find();
        if (!contact) return res.status(204).json({ 'message': 'No contact found.' });
        res.json(contact);
    }

const createNewContact =  async (req, res) => {
        if (!req?.body?.ContactName || !req?.body?.ContactPhone || !req?.body?.ContactEmail ) {
            return res.status(400).json({ 'message': 'ContactName/ContactPhone/ContactEmail are required' });
        }
        
        try 
        {
            const result = await Contact.create({
                ContactName: req.body.ContactName,
                ContactPhone: req.body.ContactPhone,
                ContactEmail: req.body.ContactEmail,
                ContactAddress: {
                    BuildingOrHouse: req.body.BuildingOrHouse,
                    StreetOrRoad: req.body.StreetOrRoad,
                    AreaOrTown: req.body.AreaOrTown,
                    CityCountyOrPostCode: req.body.CityCountyOrPostCode,
                    Eircode: req.body.Eircode
                },
                ContactTypeID : req.body.ContactTypeID,
                isDeleted: req.body.isDeleted
            
            });
            res.status(201).json(result);
        }
         catch (err) {
            console.error(err);
        }
    }
    
    const updateContact = async (req, res) => {
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID parameter is required'});
        }
    
        const contact = await Contact.findOne({ _id: req.body.id}).exec();
        if (!contact) {
            return res.status(240).json({ "message": ` No Contact matches ID ${req.body.id}. ` });
        }
    
        if (req.body?.ContactName) contact.ContactName = req.body.ContactName;
        if (req.body?.ContactPhone) contact.ContactPhone = req.body.ContactPhone;
        if (req.body?.ContactEmail) contact.ContactEmail = req.body.ContactEmail;
        if (req.body?.ContactTypeID) contact.ContactTypeID = req.body.ContactTypeID;        
        if (req.body?.isDeleted) contact.isDeleted = req.body.isDeleted;
        if (req.body?.isActive) contact.isActive = req.body.isActive;

        if (req.body?.ContactAddress)  {
            contact.BuildingOrHouse = req.body.BuildingOrHouse,
            contact.StreetOrRoad = req.body.StreetOrRoad,
            contact.AreaOrTown = req.body.AreaOrTown,
            contact.CityCountyOrPostCode = req.body.CityCountyOrPostCode,
            contact.Eircode = req.body.Eircode
        } 
        
        const result = await contact.save();
        res.json(result);
    }
    
    const deleteContact = async (req, res) => {
        if (!req?.body?.id) return res.status(400).json({ 'message': 'Contact ID required.'});
    
        const contact = await Contact.findOne({ _id: req.body.id}).exec();
        if (!contact) {
            return res.status(240).json({ "message": ` No contact matches ID ${req.body.id}. ` });
        }
    
       const result = await contact.deleteOne({ _id: req.body.id });
        res.json(result);
    }
    
    const getContact =  async (req, res) => {
        if (!req.params.id) return res.status(400).json({ 'message': 'Contact ID required.'});
    
        const contact = await Contact.findOne({ _id: req.params.id}).exec();
        if (!contact) {
                    return res.status(240).json({ "message": ` No Contact matches ID ${req.params.id}. ` });
        }
        res.json(contact);
    }

    
    module.exports = {
        getAllContact,
        createNewContact,
        updateContact,
        deleteContact,
        getContact
       }

const Contact = require('../model/Contact');

const getAllContact = async (req, res) => 
    {
        const contact = await Contact.find();
        if (!contact) return res.status(204).json({ 'message': 'No contact found.' });
        res.json(contact);
    };

const createNewContact =  async (req, res) => {
        //  if (!req?.body?.ContactName || !req?.body?.ContactPhone || !req?.body?.ContactEmail ) {
        //      return res.status(400).json({ 'message': 'ContactName/ContactPhone/ContactEmail are required' });
        //  }
        const { Surname,Forename, ContactPhone, ContactEmail, ContactTypeID, isDeleted, ContactAddress } = req.body;

        // Check for required fields
        if (!Surname || !Forename || !ContactPhone || !ContactEmail) {
            return res.status(400).json({ message: 'Surname,Forename,  ContactPhone, and ContactEmail are required' });
        }
        
       // console.log("Request body:", req.body); // Add this line to log the request body for debugging
        try 
        {
            const result = await Contact.create({
                Surname,Forename, 
                ContactPhone,
                ContactEmail,
                ContactAddress:  {
                    BuildingOrHouse : ContactAddress?.BuildingOrHouse || '',   // Use empty string if not provided
                    StreetOrRoad : ContactAddress?.StreetOrRoad || '',
                    AreaOrTown : ContactAddress?.AreaOrTown || '',
                    CityCountyOrPostCode : ContactAddress?.CityCountyOrPostCode || '',
                    Eircode : ContactAddress?.Eircode || ''
                },
                ContactTypeID : ContactTypeID || null, // Optional, use null if not provided
                isDeleted: isDeleted !== undefined ? isDeleted : false // Default to false if not provided
               
            });
            res.status(201).json(result);
        }
        catch (err) {
        res.status(500).json({
            message: 'An error occurred while creating the contact',
            error: err.message
        });
    }
};
    
    const updateContact = async (req, res) => {
        const { id } = req.body;  // Get the contact ID from the request body
        const { Surname,Forename,  ContactPhone, ContactEmail, ContactAddress, ContactTypeID, isDeleted } = req.body;
    
        // Logging the request body for debugging
       // console.log("Request body:", req.body);
    
        try {
            // Find the contact by ID
            const updatedContact = await Contact.findOne({ _id: id }).exec();
    
            if (!updatedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
    
            // Update the fields if they are provided, otherwise keep existing values
            if (Surname) updatedContact.Surname = Surname;
            if (ContactPhone) updatedContact.ContactPhone = ContactPhone;
            if (ContactEmail) updatedContact.ContactEmail = ContactEmail;
    
            if (ContactAddress) {
                // Only update the fields inside ContactAddress that are provided
                if (ContactAddress.BuildingOrHouse) updatedContact.ContactAddress.BuildingOrHouse = ContactAddress.BuildingOrHouse;
                if (ContactAddress.StreetOrRoad) updatedContact.ContactAddress.StreetOrRoad = ContactAddress.StreetOrRoad;
                if (ContactAddress.AreaOrTown) updatedContact.ContactAddress.AreaOrTown = ContactAddress.AreaOrTown;
                if (ContactAddress.CityCountyOrPostCode) updatedContact.ContactAddress.CityCountyOrPostCode = ContactAddress.CityCountyOrPostCode;
                if (ContactAddress.Eircode) updatedContact.ContactAddress.Eircode = ContactAddress.Eircode;
            }
    
            if (ContactTypeID) updatedContact.ContactTypeID = ContactTypeID;
            if (isDeleted !== undefined) updatedContact.isDeleted = isDeleted;
    
            // Save the updated contact
            const result = await updatedContact.save();
    
            // Return the updated contact in the response
            res.status(200).json({
                message: 'Contact updated successfully',
                contact: result
            });
    
        } catch (err) {
            console.error("Error updating contact:", err);
            res.status(500).json({
                message: 'An error occurred while updating the contact',
                error: err.message
            });
        }
    };
    
    
    const deleteContact = async (req, res) => {
        if (!req?.body?.id) return res.status(400).json({ 'message': 'Contact ID required.'});
    
        const contact = await Contact.findOne({ _id: req.body.id}).exec();
        if (!contact) {
            return res.status(240).json({ "message": ` No contact matches ID ${req.body.id}. ` });
        }
    
       const result = await contact.deleteOne({ _id: req.body.id });
        res.json(result);
    };
    
    const getContact =  async (req, res) => {
        if (!req.params.id) return res.status(400).json({ 'message': 'Contact ID required.'});
    
        const contact = await Contact.findOne({ _id: req.params.id}).exec();
        if (!contact) {
                    return res.status(240).json({ "message": ` No Contact matches ID ${req.params.id}. ` });
        }
        res.json(contact);
    };

    
    module.exports = {
        getAllContact,
        createNewContact,
        updateContact,
        deleteContact,
        getContact
       };
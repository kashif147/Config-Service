const Region = require('../model/registerRegionController');

console.log('test');

const createRegionProfile =  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        console.log('dddd');
        // Step 1: Create Profile
        const region = await Region.create([req.body.region], { session });
    
        const profileId = region[0]._id;
    
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
}

// First Create Region, then Add in Contacts then in regionalcontacts
// Documents --> ContactType, RegionType, Region, Contacts, RegionalContacts
//app.post('/api/registerProfile', async (req, res) => {
     
  //});
  
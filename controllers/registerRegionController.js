
app.post('/api/regionalprofile', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Create Profile
    const profile = await Profile.create([req.body.profile], { session });

    const profileId = profile[0]._id;

    // Step 2: Create Related Entities
   // const partnerships = req.body.partnerships.map(partner => ({ ...partner, profileId }));
   // const children = req.body.children.map(child => ({ ...child, profileId }));
   // const memberships = req.body.memberships.map(membership => ({ ...membership, profileId }));
   // const subscriptions = req.body.subscriptions.map(subscription => ({ ...subscription, profileId }));

    //await Partnership.create(partnerships, { session });
    //await Children.create(children, { session });
    //await Membership.create(memberships, { session });
    //await Subscription.create(subscriptions, { session });

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
});
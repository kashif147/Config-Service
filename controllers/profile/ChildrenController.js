const Children = require("../../model/profile/ChildrenModal");

// ✅ Get all children
const getAllChildren = async (req, res) => {
  try {
    const children = await Children.find() // Populating profile details
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: "Error fetching children", error });
  }
};

// ✅ Get a single child by ID
const getChildById = async (req, res) => {
  try {
    const child = await Children.findById(req.params.id);
    if (!child) return res.status(404).json({ message: "Child not found" });
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ message: "Error fetching child", error });
  }
};

// ✅ Get all children associated with a specific profile
const getChildrenByProfile = async (req, res) => {
  try {
    const children = await Children.find({ profileId: req.params.profileId });
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: "Error fetching children for profile", error });
  }
};

// ✅ Create a new child (Admin, Editor)
const createChild = async (req, res) => {
  try {
    const { profileId, title, forename, surname } = req.body;

    if (!profileId || !title || !forename || !surname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newChild = new Children({ profileId, title, forename, surname });
    await newChild.save();

    res.status(201).json({ message: "Child added successfully", newChild });
  } catch (error) {
    res.status(500).json({ message: "Error adding child", error });
  }
};

// ✅ Update a child (Admin, Editor)
const updateChild = async (req, res) => {
  try {
    const { title, forename, surname } = req.body;
    const updatedChild = await Children.findByIdAndUpdate(
      req.params.id,
      { title, forename, surname },
      { new: true }
    );

    if (!updatedChild) return res.status(404).json({ message: "Child not found" });

    res.status(200).json({ message: "Child updated successfully", updatedChild });
  } catch (error) {
    res.status(500).json({ message: "Error updating child", error });
  }
};

// ✅ Delete a child (Admin)
const deleteChild = async (req, res) => {
  try {
    const deletedChild = await Children.findByIdAndDelete(req.params.id);

    if (!deletedChild) return res.status(404).json({ message: "Child not found" });

    res.status(200).json({ message: "Child deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting child", error });
  }
};

module.exports = {
  getAllChildren,
  getChildById,
  getChildrenByProfile,
  createChild,
  updateChild,
  deleteChild,
};

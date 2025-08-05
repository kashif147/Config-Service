const Lookup = require("../model/Lookup");

const getAllLookup = async (req, res) => {
  try {
    const lookups = await Lookup.find({});
    res.status(200).json(lookups);
  } catch (error) {
    console.error("Error fetching lookups:", error);
    res.status(500).json({ error: "An error occurred while fetching lookups" });
  }
};

const getLookup = async (req, res) => {
  try {
    const { id } = req.params;
    const lookup = await Lookup.findById(id);
    if (!lookup) {
      return res.status(404).json({ error: "Lookup not found" });
    }
    res.json(lookup);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createNewLookup = async (req, res) => {
  try {
    const lookup = await Lookup.create(req.body);
    res.status(201).json(lookup);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

const updateLookup = async (req, res) => {
  try {
    const { id } = req.body;
    const lookup = await Lookup.findByIdAndUpdate(id, req.body, { new: true });
    if (!lookup) {
      return res.status(404).json({ error: "Lookup not found" });
    }
    res.json(lookup);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteLookup = async (req, res) => {
  try {
    if (!req?.body?.id) return res.status(400).json({ message: "Lookup ID required." });

    const result = await Lookup.findByIdAndDelete(req.body.id);
    if (!result) {
      return res.status(404).json({ message: `No lookup matches ID ${req.body.id}.` });
    }

    res.json({ message: "Lookup deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllLookup,
  getLookup,
  createNewLookup,
  updateLookup,
  deleteLookup,
};

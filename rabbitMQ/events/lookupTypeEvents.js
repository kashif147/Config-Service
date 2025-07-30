const { publishEvent } = require("message-bus");

async function emitLookupTypeCreatedEvent(data) {
  try {
    await publishEvent("lookuptype.created", data);
    console.log("✅ [Config] LookupType Created Event published:", data);
  } catch (error) {
    console.error("❌ [Config] Error publishing LookupType Created Event:", error.message);
    throw error;
  }
}

async function emitLookupTypeUpdatedEvent(data) {
  try {
    await publishEvent("lookuptype.updated", data);
    console.log("✅ [Config] LookupType Updated Event published:", data);
  } catch (error) {
    console.error("❌ [Config] Error publishing LookupType Updated Event:", error.message);
    throw error;
  }
}

async function emitLookupTypeDeletedEvent(data) {
  try {
    await publishEvent("lookuptype.deleted", data);
    console.log("✅ [Config] LookupType Deleted Event published:", data);
  } catch (error) {
    console.error("❌ [Config] Error publishing LookupType Deleted Event:", error.message);
    throw error;
  }
}

module.exports = {
  emitLookupTypeCreatedEvent,
  emitLookupTypeUpdatedEvent,
  emitLookupTypeDeletedEvent,
};

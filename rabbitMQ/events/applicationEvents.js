// const { publishEvent } = require("message-bus");

// async function emitApplicationApprovalRequest(data) {
//   try {
//     await publishEvent("application.approvalRequest", data);
//     console.log("✅ [Config] Application Approval Request Event published:", data);
//   } catch (error) {
//     console.error("❌ [Config] Error publishing Application Approval Request Event:", error.message);
//     throw error;
//   }
// }

// async function emitApplicationApproved(data) {
//   try {
//     await publishEvent("application.approved", data);
//     console.log("✅ [Config] Application Approved Event published:", data);
//   } catch (error) {
//     console.error("❌ [Config] Error publishing Application Approved Event:", error.message);
//     throw error;
//   }
// }

// async function emitApplicationRejected(data) {
//   try {
//     await publishEvent("application.rejected", data);
//     console.log("✅ [Config] Application Rejected Event published:", data);
//   } catch (error) {
//     console.error("❌ [Config] Error publishing Application Rejected Event:", error.message);
//     throw error;
//   }
// }

// module.exports = {
//   emitApplicationApprovalRequest,
//   emitApplicationApproved,
//   emitApplicationRejected,
// };

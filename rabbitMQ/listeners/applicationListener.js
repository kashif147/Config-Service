// const { subscribeToEvent } = require("message-bus");

// class ApplicationListener {
//   constructor() {
//     this.pendingApplications = new Map(); // In-memory storage for pending applications
//     this.initializeListeners();
//   }

//   async initializeListeners() {
//     try {
//       // Listen for application submissions from Portal Service
//       await subscribeToEvent("application.submitted", this.handleApplicationSubmitted.bind(this));

//       console.log("✅ Application Listener initialized successfully in Config Service");
//     } catch (error) {
//       console.error("❌ Error initializing Application Listener:", error.message);
//     }
//   }

//   async handleApplicationSubmitted(data) {
//     try {
//       console.log("📥 Received application submission from Portal Service:", data);

//       const { personalDetailsId, professionalDetailsId, subscriptionId, userId, applicationData } = data;

//       // Store the application data for approval workflow
//       this.pendingApplications.set(personalDetailsId, {
//         personalDetailsId,
//         professionalDetailsId,
//         subscriptionId,
//         userId,
//         applicationData,
//         submittedAt: new Date(),
//         status: "pending"
//       });

//       console.log("✅ Application stored for approval. Total pending:", this.pendingApplications.size);

//     } catch (error) {
//       console.error("❌ Error handling application submission:", error.message);
//     }
//   }

//   // Get all pending applications
//   getAllPendingApplications() {
//     return Array.from(this.pendingApplications.values());
//   }

//   // Get single pending application
//   getPendingApplication(personalDetailsId) {
//     return this.pendingApplications.get(personalDetailsId);
//   }

//   // Remove application from pending list (after approval/rejection)
//   removePendingApplication(personalDetailsId) {
//     return this.pendingApplications.delete(personalDetailsId);
//   }
// }

// module.exports = new ApplicationListener();

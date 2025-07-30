// const applicationListener = require("../rabbitMQ/listeners/applicationListener");
// const { emitApplicationApprovalRequest } = require("../rabbitMQ/events/applicationEvents");

// class ApplicationApprovalController {
//   // Get all pending applications
//   async getAllPendingApplications(req, res) {
//     try {
//       const pendingApplications = applicationListener.getAllPendingApplications();

//       return res.status(200).json({
//         success: true,
//         message: "Pending applications retrieved successfully",
//         count: pendingApplications.length,
//         data: pendingApplications
//       });
//     } catch (error) {
//       console.error("Get All Pending Applications Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to retrieve pending applications",
//         error: error.message
//       });
//     }
//   }

//   // Get single pending application
//   async getPendingApplication(req, res) {
//     try {
//       const { personalDetailsId } = req.params;

//       if (!personalDetailsId) {
//         return res.status(400).json({
//           success: false,
//           message: "Personal Details ID is required"
//         });
//       }

//       const application = applicationListener.getPendingApplication(personalDetailsId);

//       if (!application) {
//         return res.status(404).json({
//           success: false,
//           message: "Application not found"
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Application retrieved successfully",
//         data: application
//       });
//     } catch (error) {
//       console.error("Get Pending Application Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to retrieve application",
//         error: error.message
//       });
//     }
//   }

//   // Approve application
//   async approveApplication(req, res) {
//     try {
//       const { personalDetailsId } = req.params;
//       const { comments } = req.body;
//       const approvedBy = req.user?.id || "admin"; // From JWT token or default

//       if (!personalDetailsId) {
//         return res.status(400).json({
//           success: false,
//           message: "Personal Details ID is required"
//         });
//       }

//       const application = applicationListener.getPendingApplication(personalDetailsId);

//       if (!application) {
//         return res.status(404).json({
//           success: false,
//           message: "Application not found"
//         });
//       }

//       // Send approval request to Portal Service
//       await emitApplicationApprovalRequest({
//         personalDetailsId,
//         status: "approved",
//         approvedBy,
//         comments,
//         approvedAt: new Date()
//       });

//       // Remove from pending applications
//       applicationListener.removePendingApplication(personalDetailsId);

//       return res.status(200).json({
//         success: true,
//         message: "Application approved successfully",
//         data: {
//           personalDetailsId,
//           status: "approved",
//           approvedBy,
//           comments
//         }
//       });
//     } catch (error) {
//       console.error("Approve Application Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to approve application",
//         error: error.message
//       });
//     }
//   }

//   // Reject application
//   async rejectApplication(req, res) {
//     try {
//       const { personalDetailsId } = req.params;
//       const { rejectionReason, comments } = req.body;
//       const rejectedBy = req.user?.id || "admin"; // From JWT token or default

//       if (!personalDetailsId) {
//         return res.status(400).json({
//           success: false,
//           message: "Personal Details ID is required"
//         });
//       }

//       if (!rejectionReason) {
//         return res.status(400).json({
//           success: false,
//           message: "Rejection reason is required"
//         });
//       }

//       const application = applicationListener.getPendingApplication(personalDetailsId);

//       if (!application) {
//         return res.status(404).json({
//           success: false,
//           message: "Application not found"
//         });
//       }

//       // Send rejection request to Portal Service
//       await emitApplicationApprovalRequest({
//         personalDetailsId,
//         status: "rejected",
//         approvedBy: rejectedBy,
//         comments,
//         rejectionReason,
//         rejectedAt: new Date()
//       });

//       // Remove from pending applications
//       applicationListener.removePendingApplication(personalDetailsId);

//       return res.status(200).json({
//         success: true,
//         message: "Application rejected successfully",
//         data: {
//           personalDetailsId,
//           status: "rejected",
//           rejectedBy,
//           rejectionReason,
//           comments
//         }
//       });
//     } catch (error) {
//       console.error("Reject Application Error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to reject application",
//         error: error.message
//       });
//     }
//   }
// }

// module.exports = new ApplicationApprovalController();

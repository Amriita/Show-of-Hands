const express = require("express");
const multer = require("multer");

const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const verifyToken = require("./config/verifyToken");
const LoginController = require("./controllers/LoginController");
const TaskController = require("./controllers/TaskController");
const ProposalController = require("./controllers/ProposalController");
const ProfileController = require("./controllers/ProfileController");
const RegistrationController = require("./controllers/RegistrationController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const routes = express.Router();

routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});

//Registration(for events)
routes.post("/registration/:eventId", verifyToken, RegistrationController.create);
routes.get("/registration",verifyToken,RegistrationController.getMyRegistrations);
routes.get("/event/participants/:eventId",verifyToken,RegistrationController.getEventParticipants);
routes.get("/registration/:registrationId",verifyToken,RegistrationController.getRegistration);

//Approve
routes.post("/registration/:registrationId/approval",verifyToken,ApprovalController.approval);
routes.post("/registration/:registrationId/rejection",verifyToken,RejectionController.rejection);


//Dashboard
routes.get("/dashboard", verifyToken, DashboardController.getAllEvents);
routes.get("/dashboard/:title",verifyToken,DashboardController.getAllEvents);
routes.get("/user/events", verifyToken, DashboardController.getEventsByUserId);
routes.get("/event/:eventId", verifyToken, DashboardController.getEventById);


//DashBoard Task
routes.post("/task",verifyToken,TaskController.createTask);
routes.get("/task", verifyToken, TaskController.getAllTask);
routes.delete("/task/:taskId", verifyToken, TaskController.delete);
routes.get("/task/details/:taskId",verifyToken,TaskController.getTaskDetails);

//Proposal
routes.post("/proposal",verifyToken, ProposalController.createProposal);
routes.get("/Proposal", verifyToken, ProposalController.getAllProposal);
routes.delete("/proposal/:proposalId", verifyToken, ProposalController.delete);
routes.get("/proposal/details/:proposalId",verifyToken, ProposalController.getProposalDetails);

//Event
routes.post("/event",verifyToken,EventController.createEvent);
routes.delete("/event/:eventId", verifyToken, EventController.delete);

//profile
routes.post("/profile",verifyToken, ProfileController.Profile);

//User
routes.post("/user/register", UserController.createUser);
routes.post("/login", LoginController.store);
routes.get("/user/:userId", UserController.getUserById);

//Get Event Details
routes.get(
  "/events/details/:eventId",
  verifyToken,
  EventController.getEventDetails
);
module.exports = routes;

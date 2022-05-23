const Proposal = require("../models/Proposal");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
    createProposal(req, res) {
      jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
          res.statusCode(401);
        } else {
          const { title, description, NotAccepted , Accepted } = req.body;  
          const user = await User.findById(authData.user._id);
  
          if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
          }
  
          try {
            const proposal = await Proposal.create({
              title,
              description,
              NotAccepted,
              Accepted,
              user: authData.user._id,
            });
            return res.json(proposal);

          } catch (error) {
            return res.status(400).json({ message: error });

          }
        }
      });
    },
  
    delete(req, res) {
      jwt.verify(req.token, "secret", async (err) => {
        if (err) {
          res.statusCode(401);
        } else {
          const { proposalId } = req.params;
          try {
            await Task.findByIdAndDelete(proposalId);
            return res.status(204).send();
          } catch (error) {
            return res
              .status(400)
              .json({ message: "We do have any proposal with the ID" });
          }
        }
      });
    },

    getProposalDetails(req, res) {
      jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
          res.sendStatus(401);
        } else {
          try {
            const { proposalId } = req.params;
            const proposalObj = await Proposal.findById(proposalId)
            if (proposalObj) {
              // console.log(eventObj)
              return res.json(proposalObj);
            } else {
              console.log("Proposal not found")
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
    },

    getAllProposal(req, res) {
        console.log("token:" + req.token);
    
        jwt.verify(req.token, "secret", async (err, authData) => {
    
          if (err) {
            res.sendStatus(401);
          } else {
      
            try {
              console.log("Proposal ========> ");
              
              const proposal = await Proposal.find();
    
              console.log(proposal);
    
              if (proposal) {
                return res.json({ authData, proposal });
              }
            } catch (error) {
              return res
                .status(400)
                .json({ message: "We do not have any proposal yet" });
            }
          }
        });
      },
  };
  
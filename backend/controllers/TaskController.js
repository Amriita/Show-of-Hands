const Task = require("../models/Task");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
    createTask(req, res) {
      jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
          res.statusCode(401);
        } else {
          const { title, Name,Progress,Cmpleted, DueDate } = req.body;
          // console.log("Event type is " + price);
  
          const user = await User.findById(authData.user._id);
  
          if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
          }
  
          try {
            const task = await Task.create({
              title,
              Name,
              Progress,
              Cmpleted,
              user: authData.user._id,
              DueDate,
            });
  
            return res.json(task);
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
          const { taskId } = req.params;
          try {
            await Task.findByIdAndDelete(taskId);
            return res.status(204).send();
          } catch (error) {
            return res
              .status(400)
              .json({ message: "We do have any task with the ID" });
          }
        }
      });
    },

    getTaskDetails(req, res) {
      jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
          res.sendStatus(401);
        } else {
          try {
            const { taskId } = req.params;
            const taskObj = await Task.findById(taskId)
            if (taskObj) {
              // console.log(eventObj)
              return res.json(taskObj);
            } else {
              console.log("Task not found")
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
    },

    getAllTask(req, res) {
        console.log("token:" + req.token);
    
        jwt.verify(req.token, "secret", async (err, authData) => {
    
          if (err) {
            res.sendStatus(401);
          } else {
      
            try {
              console.log("Tasks ========> ");
              
              const task = await Task.find();
    
              console.log(task);
    
              if (task) {
                return res.json({ authData, task });
              }
            } catch (error) {
              return res
                .status(400)
                .json({ message: "We do not have any task yet" });
            }
          }
        });
      },
  };
  
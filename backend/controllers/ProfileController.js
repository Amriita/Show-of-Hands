const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Profile = require('../models/profile');
;


module.exports = {
    Profile(req, res) {
        jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
            res.statusCode(401);
        } else {
        const { Name, Surname,Mobile,Address1,PostalCode,state,Area,Email, bio } = req.body;
        // console.log("Event type is " + price);

        const user = await User.findById(authData.user._id);
        
        if (!user) {
          return res.status(400).json({ message: "User does not exist!" });
        }
        
        try {
            const profile = await Profile.create({
                Name, 
                Surname,
                Mobile,
                Address1,
                PostalCode,
                state,
                Area,
                Email,
                bio,
                user: authData.user._id,
            });
        
                  return res.json(profile);
                } catch (error) {
                  return res.status(400).json({ message: error });
                }
              }
            });
          }
        }
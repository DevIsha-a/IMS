const AuthModel = require('../Models/AuthModel');

const Auth = AuthModel;

const Controllers = {
  
  SignUp: async (req, res) => {

    const x = req.body;

    // EMAIL ALREADY EXIST
    const alreadyExist = await Auth.findOne({email: x.email});
    if(alreadyExist) return res.send({ message: "This email is already registered." });

    // USERNAME ALREADY EXIST
    const userNameExist = await Auth.findOne({email: x.email});
    if(userNameExist) return res.send({ message: "This username is already taken.", messageType: "warning" });
    
    // CREATE NEW USER
    const response = await Auth.create({
      firstName: x.firstName,
      lastName: x.lastName,
      userName: x.userName,
      email: x.email,
      password: x.password,
      gender: x.gender
    }).then((user) => {
      return user ? {message: "You have registered successfully", messageType: "success"} : {message: "Could not register the user", messageType: "danger"};
    }).catch((error) => {
      console.log(error);
    });
    return res.send(response);
  },

  SignIn: async (req, res) => {
      const x = req.body;
      // CHECK EMAIL
      const userFound = await Auth.findOne({email: x.email, password: x.password});
      if(userFound){
          return res.send({ message: "You have signed in succesfully", messageType: "success" })
      }

      // USER NOT FOUND
      return res.send({ message: "Incorrect email or password", messageType: "error" })
  }
}

module.exports = Controllers;
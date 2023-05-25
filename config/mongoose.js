//Require Mongoose Dependency
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Connect to MongoDB for retrieval of documents
mongoose.connect(process.env.CONNECTION_STRING)
  .then(async () => {
    try {
      // Check if an admin record already exists
      const existingAdmin = await User.findOne({email: "admin@ers.com"});
      
      if (!existingAdmin) {
        // Create a new admin record this is like a super user
        const newAdmin = new User({
          name: 'admin',
          email: 'admin@ers.com',
          password: await bcrypt.hash('admin',10),
          role: 'admin'
        });
  
        // Save the new admin record to the database
        await newAdmin.save();
  
        console.log('Admin record created successfully.');
      } else {
        console.log('Admin record already exists.');
      }
    } catch (error) {
      console.error('Error creating admin record:', error);
    }
    //Connected to mongoose database.
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    //Error connecting to mongoose database.
    console.error('Error connecting to MongoDB:', error);
  });

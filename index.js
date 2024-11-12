import dotenv from "dotenv/config";
import fs from "fs";
import mongoose from "mongoose";
import express from "express";

const app = express();
const port = 6000;

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    isMarried: {
      type: Boolean,
    },
  },
  //   To add timestamp to the object created.
  {
    timestamps: true,
  }
);

// We use the model method to define the name of the collection.
const Contact = mongoose.model("Contact", contactSchema);

// Function for creating a user contact.
async function addContact() {
  const createdContact = await Contact.create({
    fullName: "Jesus Christ",
    email: "jesus@gmail.com",
    phoneNumber: "+2348475839",
    birthDate: "25-12-1222",
    isMarried: false,
  });
  console.log(createdContact);
}

async function findContact() {
  const userContacts = await Contact.find();
  console.log(userContacts);
}

async function updateContactInfo(params) {
  const updateContact = await Contact.findOneAndUpdate(
    { email: "jesus@gmail.com" },
    {
      fullName: "Benson Melon",
      phoneNumber: "+2340875432",
      email: "benson@gmail.com",
    },
    { new: true }
  );
  console.log(updateContact);
}

// Function for deleting contact using phoneNumbers
async function deleteUserContact(params) {
  let result = await Contact.deleteMany({ fullName: "Chima Ikegbulam" });
  console.log(result);
}

// Establishing connection to DB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("Database connection successful");
    console.log("Server running on port " + port);
    // await findContact();
  } catch (error) {
    console.log(error);
  }
}

// Listen to event
app.listen(port, () => {
  connectToDatabase();
});

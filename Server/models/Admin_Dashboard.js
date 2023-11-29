const mongoose = require("mongoose");
const AdminTask = new mongoose.Schema(
  {
    Title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    }, 
    Description: {
        type: String,
        trim: true,
        required: [true, "Description is required"],
      },
      Assigned: {
        type:String,
        trim: true,
        required: [true, "Assigned is required"],
      },
      Duration : {
        type: String,
        trim: true,
        required: [true, "Comment is required"],
      },
      Status: {
        type: String,
        trim: true,
        required: [true, "Status is required"],
      },
      Notification: {
        type: Boolean,
        trim: true,
        // default:false,
        required: [true, "Notification is required"],
      },
      Comments : {
        type: String,
        trim: true,
        required: [true, "Comment is required"],
      },
      TaskCreatedAt : {
        type: String,
        trim: true,
        required: [true, "Date is required"],
      }
  },
  {timestamps:true}
);
 
module.exports = mongoose.model("Admin_task", AdminTask);
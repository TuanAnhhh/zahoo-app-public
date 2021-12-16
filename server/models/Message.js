const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema(
    {
        conversation: {type: mongoose.Types.ObjectId, ref: 'Conversation'},
        sender: { type: mongoose.Types.ObjectId, ref: 'User' },
        text: String,
        media:Array,
        call:Object
        
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Message", MessageSchema);
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 ||1
        const limit = this.queryString.limit * 1 ||9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const messagesCrl = {
   postMessage: async (req, res) => {
       const {sender, conversation, text, media,call} = req.body
        if(!conversation || !sender || (!text.trim() && media.length ===0 && !call)) return
        const newMessage = new Message(req.body)

        try {
            const savedMessage = await newMessage.save()
            await Conversation.findOneAndUpdate(
                { _id: savedMessage.conversation},
                { lastMessage: savedMessage._id }
            )
            res.status(200).json(savedMessage._doc)
        } catch (err) { 
            res.status(500).json({msg: err.message})
        }
    },
    getMessageByConversationId: async (req, res) => {
        try {
            const features = new APIfeatures(Message.find({conversation: req.params.conversationId}), req.query).paginating()
            const messages = await features.query
            .select(' -updatedAt')
            .sort('-createdAt')
            .populate("sender", "username profilePicture")
    
            res.status(200).json({
                data:messages,
                page: parseInt(req.query.page), 
                result: messages.length
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
}
module.exports = messagesCrl
const mongoose = require('mongoose');

const ChatbotInteractionSchema = new mongoose.Schema({
    userId: String,
    message: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
}, {
    collection: "ChatbotInteractions"  
});

mongoose.model('ChatbotInteraction', ChatbotInteractionSchema);

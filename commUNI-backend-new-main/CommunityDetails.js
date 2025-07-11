const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    tags: { type: [String], required: true },
    logo: { type: String, required: true },
}, {
    collection: "Communities"  
});

mongoose.model("Community", CommunitySchema);

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: String,
  image: String,
  time: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedByUser: { type: Boolean, default: false },
}, {
  collection: "Posts"
});

const UserDetailSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  birthday: String,
  idNumber: String,
  department: String,   
  program: String,     
  yearlevel: String,
  mbtiType: String, 
  interests: [String],  // Add this line to store the interests as an array of strings
  profilePicture: { type: String, default: 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg' },  
  headerImage: { type: String, default: 'https://i.ibb.co/2Yy9JM4/your-image.jpg' },   
  posts: [PostSchema], // Add the posts array to hold user posts
  likedCommunitiesCount: { type: Number, default: 0 }, // Add this line to store the count of liked communities
}, {
  collection: "UserInfo"
});
mongoose.model("UserInfo", UserDetailSchema);
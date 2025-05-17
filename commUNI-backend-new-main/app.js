const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
app.use(express.json());
const jwt = require('jsonwebtoken');

const mongoUrl = "mongodb+srv://valdeviesojuancarlos:D4IUuEHSC6whfvgR@cluster0.sw4ug8q.mongodb.net/?retryWrites=true&w=majority&appName=communi-backend";


const JWT_SECRET = "ksfdgjshdkjvbhdsjkhjkhkjh54jhj$#%^gsdfjkgdsjkghdjfkhiiiuiure&&^%"
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

require('./UserDetails');
const User = mongoose.model("UserInfo");

require('./CommunityDetails');
const Community = mongoose.model("Community");

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});


app.post('/register', async (req, res) => {
  console.log("Request body:", req.body);

  const { firstName, lastName, email, password, birthday, idNumber, department, program, yearlevel } = req.body;
 
  if (!firstName || !lastName || !email || !password || !birthday || !idNumber || !department || !program) {
    return res.status(400).send({ status: "error", data: "All fields are required" });
  }

  // Check if user already exists
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).send({ status: "error", data: "User already exists!" });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
 
    await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      birthday,
      idNumber,
      department,
      program,
      yearlevel,
      profilePicture: 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg',
      headerImage: 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg',
    });

    res.status(201).send({ status: "ok", data: "User created successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ status: "error", data: "Server error" });
  }
});


app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).send({ status: "error", data: "Email and password are required!" });
  }

  try {
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
      return res.status(404).send({ status: "error", data: "User doesn't exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordValid) {
      return res.status(401).send({ status: "error", data: "Invalid password!" });
    }

    // Retrieve user data including selected interests
    const userData = {
      firstName: oldUser.firstName,
      lastName: oldUser.lastName,
      email: oldUser.email,
      birthday: oldUser.birthday,
      program: oldUser.program,
      department: oldUser.department,
      yearlevel: oldUser.yearlevel,
      profilePicture: oldUser.profilePicture,
      headerImage: oldUser.headerImage,
    };

    // Fetch selected interests from the database
    const selectedInterests = oldUser.interests || []; // Fallback to an empty array if no interests are set

    // Return the user data along with the selected interests
    return res.status(200).send({
      status: "ok",
      userData: userData,
      selectedInterests: selectedInterests, // Include selected interests here
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ status: "error", data: "Internal server error" });
  }
});


app.post("/save-mbti", async (req, res) => {
  const { email, mbtiResult } = req.body;

  if (!email || !mbtiResult) {
    return res.status(400).send({ status: "error", data: "Email and MBTI result are required" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { mbtiType: mbtiResult },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    res.status(200).send({ status: "ok", data: "MBTI result saved successfully", user: updatedUser });
  } catch (error) {
    console.error("Error saving MBTI result:", error);
    res.status(500).send({ status: "error", data: "Internal server error" });
  }
});


// app.post("/save-interests", async (req, res) => {
//   const { email, selectedInterests } = req.body;

//   // Ensure email and selectedInterests are provided
//   if (!email || !selectedInterests || selectedInterests.length === 0) {
//     return res.status(400).send({ status: 'error', data: 'Email and interests are required' });
//   }

//   try {
//     // Find the user by email and update the interests field
//     const updatedUser = await User.findOneAndUpdate(
//       { email: email },  // Match the user by email
//       { $set: { interests: selectedInterests } },  // Update interests using $set
//       { new: true }  // Ensure the updated document is returned
//     );

//     // If no user is found
//     if (!updatedUser) {
//       return res.status(404).send({ status: 'error', data: 'User not found' });
//     }

//     res.status(200).send({ status: 'ok', data: 'Interests saved successfully', user: updatedUser });
//   } catch (error) {
//     console.error('Error saving interests:', error);
//     res.status(500).send({ status: 'error', data: 'Internal server error' });
//   }
// });

app.post("/save-interests", async (req, res) => {
  const { email, selectedInterests } = req.body;

  // Validate input
  if (!email || !Array.isArray(selectedInterests) || selectedInterests.length === 0) {
    return res.status(400).send({
      status: 'error',
      data: 'Valid email and an array of interests are required',
    });
  }

  try {
    // Find user by email and update interests
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Match user by email
      { $set: { interests: selectedInterests } }, // Update interests field
      { new: true } // Return the updated document
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).send({
        status: 'error',
        data: 'User not found',
      });
    }

    // Success response
    res.status(200).send({
      status: 'ok',
      data: 'Interests saved successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error saving interests:', error);

    // Internal server error response
    res.status(500).send({
      status: 'error',
      data: 'An internal server error occurred',
    });
  }
});


app.post("/get-communities", async (req, res) => {
  const { mbti, interests } = req.body;

  if (!mbti || !interests || interests.length === 0) {
    return res.status(400).send({ status: "error", data: "MBTI and interests are required" });
  }

  try {
    // Find communities that match any of the user's interests
    const matchingCommunities = await Community.find({
      tags: { $in: interests } // Match at least one tag
    });

    return res.status(200).send({ status: "ok", data: matchingCommunities });
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).send({ status: "error", data: "Internal server error" });
  }
});

// app.post("/update-profile-images", async (req, res) => {
//   const { email, profilePicture, headerImage } = req.body;

//   if (!email) {
//     return res.status(400).send({ status: 'error', data: 'Email is required' });
//   }

//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { email: email },
//       {
//         ...(profilePicture && { profilePicture }),
//         ...(headerImage && { headerImage }),
//       },
//       { new: true } // Return the updated user
//     );

//     if (!updatedUser) {
//       return res.status(404).send({ status: 'error', data: 'User not found' });
//     }

//     res.status(200).send({ status: 'ok', data: 'Profile images updated successfully', user: updatedUser });
//   } catch (error) {
//     console.error("Error updating profile images:", error);
//     res.status(500).send({ status: 'error', data: 'Internal server error' });
//   }
// });

app.post('/update-profile-images', async (req, res) => {
  const { email, type, image } = req.body; // type: 'profile' or 'header'
  try {
    const fieldToUpdate = type === 'profile' ? { profilePicture: image } : { headerImage: image };
    await db.collection('users').updateOne({ email }, { $set: fieldToUpdate });
    res.status(200).json({ status: 'ok', message: 'Image updated successfully!' });
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({ status: 'error', message: 'Failed to update image' });
  }
});


app.post('/upload-image', async (req, res) => {
  const { email, type, image } = req.body; // Get the email, type, and Base64 image string from the request

  try {
    // Determine which field to update
    const updateField = type === 'profile' ? { profilePicture: image } : { headerImage: image };

    // Update the user's document in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updateField,
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      res.status(200).send({ status: 'ok', user: updatedUser });
    } else {
      res.status(404).send({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).send({ status: 'error', message: 'Failed to save image' });
  }
});

app.post('/get-user-data', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.collection('users').findOne({ email });
    if (user) {
      res.status(200).json({
        status: 'ok',
        userData: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          headerImage: user.headerImage,
        },
      });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch user data' });
  }
});

// Save Post endpoint
app.post("/savePost", async (req, res) => {
  const { userEmail, post } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new post to the user's posts array
    user.posts.push(post);

    // Save the user document with the new post
    await user.save();

    // Respond with a success message or the updated user data
    res.status(200).json({ message: "Post saved successfully!" });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/get-user-posts', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user's posts
    res.status(200).json({
      status: 'ok',
      posts: user.posts || [],  // Assuming the 'posts' field is an array of posts in the User model
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// app.listen(5003, () => {
//   console.log("Node js server started.. we're killing this");
// });

// Route to update the like count

// app.post('/updateLikeCount', async (req, res) => {
//   const { email, likeCount } = req.body; // Expecting email and likeCount in the request body

//   if (!email || likeCount === undefined) {
//     return res.status(400).json({ error: "Email and like count are required" });
//   }

//   try {
//     // Find the user by ID and update the likedCommunitiesCount field
//     const user = await UserDetails.findOneAndUpdate(
//       { email: email }, // Find by email
//       { likedCommunitiesCount: likeCount },
//       { new: true } // Return the updated document
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ message: "Like count updated successfully", user });
//   } catch (error) {
//     console.error("Error updating like count:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.post('/updateLikeCount', async (req, res) => {
//   try {
//     const { email, likeCount } = req.body;
//     if (!email || likeCount === undefined) {
//       return res.status(400).json({ error: 'Invalid input' });
//     }
//     // Database update logic here
//     res.status(200).json({ message: 'Success' });
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// });

app.post('/updateLikeCount', async (req, res) => {
  try {
    const { email, likeCount } = req.body;

    // Validate input
    if (!email || likeCount === undefined) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Update the likedCommunitiesCount field for the user
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Match user by email
      { likedCommunitiesCount: likeCount }, // Update the field
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Like count updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


app.get('/likedCommunitiesCount', async (req, res) => {
  try {
    const email = req.query.email; // Get the email from query parameter
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ count: user.likedCommunitiesCount }); // Return likedCommunitiesCount
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/get-user-preferences', async (req, res) => {
  const { email } = req.body;

  // Validate email input
  if (!email) {
    return res.status(400).send({ status: 'error', data: 'Email is required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ status: 'error', data: 'User not found' });
    }

    // Extract selected interests and MBTI type
    const { interests, mbtiType } = user;

    res.status(200).send({
      status: 'ok',
      data: {
        selectedInterests: interests || [], // Return an empty array if no interests are set
        mbtiType: mbtiType || null, // Return null if MBTI type is not set
      },
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).send({ status: 'error', data: 'Internal server error' });
  }
});

app.listen(process.env.PORT || 5003, () => {
  console.log(`Server running on port ${process.env.PORT || 5003}`);
});
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const User = require('./models/userModel'); // Ensure this is the correct path to your User model
const Image = require('./models/photoModel'); // Ensure this is the correct path to your Image model

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded_pics/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('photos'), async (req, res) => {
  try {
    const { username, title, description } = req.body;

    // Find or create the user
    let user = await User.findOne({ name: username });
    if (!user) {
      user = await User.create({ name: username });
    }

    // Save each uploaded image to the database
    for (let file of req.files) {
      const obj = {
        user: user._id,
        title: title,
        description: description,
        img: {
          data: fs.readFileSync(path.join(__dirname + '/uploaded_pics/' + file.filename)),
          contentType: file.mimetype
        }
      };
      await Image.create(obj);
    }

    res.send('Files uploaded and saved successfully!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

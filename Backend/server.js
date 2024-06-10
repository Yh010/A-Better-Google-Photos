const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const User = require('./models/userModel'); 
const Image = require('./models/photoModel'); 

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { MongoClient } = require('mongodb');

const checkDatabaseStatus = async (url) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const adminDb = client.db().admin();
  const dbStats = await adminDb.command({ dbStats: 1 });
  await client.close();
  return {
    url,
    freeSpace: dbStats.storageSize - dbStats.dataSize,
    isFree: dbStats.dataSize < 1000000000, // Example threshold: 1GB
  };
};

const findFreeDB = async (MONGO_URL1, MONGO_URL2, MONGO_URL3) => {
  const mongoUrls = [MONGO_URL1, MONGO_URL2, MONGO_URL3];
  const dbStatuses = await Promise.all(mongoUrls.map(checkDatabaseStatus));

  const freeDBs = dbStatuses.filter(dbStatus => dbStatus.isFree);
  if (freeDBs.length === 0) {
    throw new Error('No free databases available');
  }

  // Sort freeDBs by free space in descending order
  freeDBs.sort((a, b) => b.freeSpace - a.freeSpace);

  // Return the URL of the database with the most free space
  return freeDBs[0].url;
};

// Add your MONGO_URLs here
const MONGO_URL1 = process.env.MONGO_URL1;
const MONGO_URL2 = process.env.MONGO_URL2;
const MONGO_URL3 = process.env.MONGO_URL3;

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
    const { useremail } = req.body;
    let dbUrl;

    // Check if user exists in any of the databases
    const userInDb1 = await User.findOne({ email: useremail }).catch(() => null);
    const userInDb2 = await User.findOne({ email: useremail }).catch(() => null);
    const userInDb3 = await User.findOne({ email: useremail }).catch(() => null);

    let user = userInDb1 || userInDb2 || userInDb3;

    if (user) {
      dbUrl = userInDb1 ? MONGO_URL1 : userInDb2 ? MONGO_URL2 : MONGO_URL3;
    } else {
      dbUrl = await findFreeDB(MONGO_URL1, MONGO_URL2, MONGO_URL3);
    }

    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    if (!user) {
      user = await User.create({ email: useremail });
    }

    // Save each uploaded image to the database
    for (let file of req.files) {
      const obj = {
        user: user._id,
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

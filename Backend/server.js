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
const { default: loadModels } = require('./hooks/loadModels');

const checkDatabaseStatus = async (url) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db();
    const stats = await db.stats();
    const freeSpace = stats.storageSize - stats.dataSize;
    const isFree = stats.dataSize < 500000000; 
    return { url, freeSpace, isFree };
  } catch (error) {
    console.error(`Failed to check database status for ${url}:`, error);
    return { url, freeSpace: 0, isFree: false };
  } finally {
    await client.close();
  }
};
//TODO: ADD DB_ID TO USERS 
const findFreeDB = async (MONGO_URL1, MONGO_URL2, MONGO_URL3) => {
  const mongoUrls = [MONGO_URL1, MONGO_URL2, MONGO_URL3];
  const dbStatuses = await Promise.all(mongoUrls.map(checkDatabaseStatus));

  const freeDBs = dbStatuses.filter(dbStatus => dbStatus.isFree);
  if (freeDBs.length === 0) {
    throw new Error('No free databases available');
  }

  
  freeDBs.sort((a, b) => b.freeSpace - a.freeSpace);
  console.log(freeDBs)
  
  return freeDBs[0].url;
};

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

 const recognzSinglePic = () => {
  loadModels()
}


const upload = multer({ storage: storage });

app.post('/upload', upload.array('photos'), async (req, res) => {
  try {
    const { useremail } = req.body;
    let dbUrl;
    let user = await User.findOne({ email: useremail }).catch(() => null);

    if (!user) {
      dbUrl = await findFreeDB(MONGO_URL1, MONGO_URL2, MONGO_URL3);
      await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      user = await User.create({ email: useremail });
    } else {
      dbUrl = MONGO_URL1; 
    }

    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    
    for (let file of req.files) {
      const obj = {
        user: user._id,
        img: {
          data: fs.readFileSync(path.join(__dirname + '/uploaded_pics/' + file.filename)),
          contentType: file.mimetype
        }
      };
      const image = await Image.create(obj);
      user.images.push(image._id);
    }

    await user.save();

    res.send('Files uploaded and saved successfully!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

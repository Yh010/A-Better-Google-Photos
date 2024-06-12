const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const faceapi = require('@tensorflow-models/face-detection');
const tf = require('@tensorflow/tfjs-node');
const fetch = require('node-fetch');

global.fetch = fetch; // Required for face-api.js

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Load face detection model
let model;
(async () => {
  model = await faceapi.load(faceapi.SupportedModels.MediaPipeFaceDetector, {
    modelUrl: 'https://tfhub.dev/mediapipe/tfjs-model/face-detection/short-range/1/default/1'
  });
})();

// Create directories if they do not exist
const inputFolder = 'uploaded_pics';
const singlePersonFolder = 'single_person_pics';
const groupedFolder = 'grouped_pics';
if (!fs.existsSync(singlePersonFolder)) fs.mkdirSync(singlePersonFolder);
if (!fs.existsSync(groupedFolder)) fs.mkdirSync(groupedFolder);

const processImages = async () => {
  const files = fs.readdirSync(inputFolder).filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));

  // Step 1: Detect faces and segregate single-person photos
  const knownFaceDescriptors = [];
  const knownFaceNames = [];

  for (const filename of files) {
    const filePath = path.join(inputFolder, filename);
    const image = await sharp(filePath).toBuffer();
    const tensor = tf.node.decodeImage(image, 3);
    const faces = await model.estimateFaces(tensor, false);

    if (faces.length === 1) {
      const singlePersonPath = path.join(singlePersonFolder, filename);
      fs.copyFileSync(filePath, singlePersonPath);
      
      const faceDescriptor = faces[0].box;
      knownFaceDescriptors.push(faceDescriptor);
      knownFaceNames.push(filename);
    }
  }

  // Step 2: Segregate photos into groups
  for (const filename of files) {
    const filePath = path.join(inputFolder, filename);
    const image = await sharp(filePath).toBuffer();
    const tensor = tf.node.decodeImage(image, 3);
    const faces = await model.estimateFaces(tensor, false);

    for (const face of faces) {
      const distances = knownFaceDescriptors.map(descriptor => {
        return Math.sqrt(
          (descriptor.x - face.box.x) ** 2 + 
          (descriptor.y - face.box.y) ** 2 + 
          (descriptor.width - face.box.width) ** 2 + 
          (descriptor.height - face.box.height) ** 2
        );
      });

      const minDistance = Math.min(...distances);
      const bestMatchIndex = distances.indexOf(minDistance);

      if (minDistance < 50) { // You can adjust the threshold
        const personFolder = path.join(groupedFolder, knownFaceNames[bestMatchIndex]);
        if (!fs.existsSync(personFolder)) fs.mkdirSync(personFolder);
        fs.copyFileSync(filePath, path.join(personFolder, filename));
        break;
      }
    }
  }

  console.log('Photos have been segregated into groups based on the identified persons.');
};

app.get('/process-images', async (req, res) => {
  try {
    await processImages();
    res.send('Photos have been segregated into groups based on the identified persons.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

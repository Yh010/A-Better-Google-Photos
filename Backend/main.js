const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function loadModels() {
    const modelsPath = path.join(__dirname, 'models');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
}

async function detectFacesInImage(imagePath) {
    const img = await loadImage(imagePath);
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    return detections;
}

async function recognizePersons(detections) {
    const labeledDescriptors = [
        // Add labeled face descriptors for known persons here
        // Example: new faceapi.LabeledFaceDescriptors('yash', [yashDescriptor])
    ];

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
    
    const results = detections.map(detection => ({
        detection,
        match: faceMatcher.findBestMatch(detection.descriptor)
    }));

    return results;
}

async function createFoldersForPersons(results) {
    const groupWisePhotosDir = path.join(__dirname, 'group_wise_photos');
    if (!fs.existsSync(groupWisePhotosDir)) {
        fs.mkdirSync(groupWisePhotosDir);
    }

    const persons = results.reduce((persons, { match }) => {
        if (match) {
            const personName = match.label;
            if (!persons.includes(personName)) {
                persons.push(personName);
                const personDir = path.join(groupWisePhotosDir, personName);
                fs.mkdirSync(personDir, { recursive: true });
            }
        }
        return persons;
    }, []);

    return persons;
}

async function segregateImagesByPersons(imageDir) {
    const imageFiles = fs.readdirSync(imageDir).filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png'));
    for (const file of imageFiles) {
        const imagePath = path.join(imageDir, file);
        const detections = await detectFacesInImage(imagePath);
        const results = await recognizePersons(detections);
        const persons = await createFoldersForPersons(results);

        for (const { match } of results) {
            if (match) {
                const personName = match.label;
                const personDir = path.join(__dirname, 'group_wise_photos', personName);
                const destPath = path.join(personDir, file);
                fs.copyFileSync(imagePath, destPath);
            }
        }
    }
}

async function main() {
    await loadModels();
    const uploadedPicsDir = path.join(__dirname, 'uploaded_pics');
    await segregateImagesByPersons(uploadedPicsDir);
}

main().catch(err => console.error(err));

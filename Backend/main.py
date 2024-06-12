import os
from PIL import Image
import face_recognition
import shutil

# Paths
input_folder = 'uploaded_pics'
single_person_folder = 'single_person_pics'
grouped_folder = 'grouped_pics'

# Create folders if they don't exist
os.makedirs(single_person_folder, exist_ok=True)
os.makedirs(grouped_folder, exist_ok=True)

# Step 1: Detect faces and segregate single-person photos
for filename in os.listdir(input_folder):
    if filename.endswith(('.jpg', '.jpeg', '.png')):
        image_path = os.path.join(input_folder, filename)
        image = face_recognition.load_image_file(image_path)
        face_locations = face_recognition.face_locations(image)

        if len(face_locations) == 1:
            shutil.copy(image_path, os.path.join(single_person_folder, filename))

# Step 2: Create encodings for single-person photos
known_face_encodings = []
known_face_names = []

for filename in os.listdir(single_person_folder):
    if filename.endswith(('.jpg', '.jpeg', '.png')):
        image_path = os.path.join(single_person_folder, filename)
        image = face_recognition.load_image_file(image_path)
        face_encoding = face_recognition.face_encodings(image)[0]

        known_face_encodings.append(face_encoding)
        known_face_names.append(filename)  # You can use a more sophisticated naming scheme

# Step 3: Segregate photos into groups
for filename in os.listdir(input_folder):
    if filename.endswith(('.jpg', '.jpeg', '.png')):
        image_path = os.path.join(input_folder, filename)
        image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(image)

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = face_distances.argmin()

            if matches[best_match_index]:
                person_folder = os.path.join(grouped_folder, known_face_names[best_match_index])
                os.makedirs(person_folder, exist_ok=True)
                shutil.copy(image_path, os.path.join(person_folder, filename))
                break

print("Photos have been segregated into groups based on the identified persons.")

// const express = require('express');
// const multer = require('multer');
// const sharp = require('sharp'); // Import sharp for image manipulation

// const app = express();

// // Configure Multer for single file upload
// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('profilePic'), async (req, res) => {
//   try {
//     if (req.file) {
//       const filename = req.file.filename;
//       const originalPath = `uploads/${filename}`;

//       // Convert to PNG
//       await sharp(originalPath)
//         .png({ quality: 80 }) // Adjust quality as needed
//         .toFile(`uploads/${filename}.png`); // Save as PNG

//       console.log('File uploaded and converted to PNG successfully!');
//       res.json({ message: 'File uploaded and converted successfully!' });
//     } else {
//       console.error('No file uploaded!');
//       res.status(400).json({ message: 'No file uploaded!' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// const port = 3000;
// app.listen(port, () => console.log(`Server listening on port ${port}`));

const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs') // For path manipulation

const upload = multer({ dest: "uploads/" });

app.post('/upload', upload.single('profile'), (req, res) => {
  try {
    if (req.file) {
      const originalFilename = req.file.originalname;
      const extension = path.extname(originalFilename);

      // Create new filename with extension
      const newFilename = `${req.file.filename}${extension}`;

      // Rename the uploaded file
      fs.renameSync(req.file.path, path.join(req.file.destination, newFilename));

      console.log('File uploaded successfully:', newFilename);
      res.send({ message: 'Waaaah Anas you did it!' });
    } else {
      console.error('No file uploaded!');
      res.status(400).send({ message: 'No file uploaded!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.listen(4000, ()=>{
  console.log(`Server is Running`)
})

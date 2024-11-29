const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer storage configuration (storing files in 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    // Keep original file name, or you can generate a unique name
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('file'); // Handle single file upload

// Controller for uploading a file
exports.uploadFile = async (req, res) => {
  console.log('Request Body:', req.body);  // Log form data
  console.log('Request File:', req.file);  // Log file data

  // First, handle the file upload
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    // Check if the file was uploaded successfully
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Get the form data (name, url, projectId) and file path
      const { name, projectId } = req.body;
      const fileUrl = req.file.path; // The URL or path to the uploaded file

      // Ensure all required fields are provided
      if (!name || !projectId || !fileUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create the file record in the database
      const file = await prismaClient.file.create({
        data: {
          name, // The file name
          url: fileUrl, // The path or URL to the file
          projectId: parseInt(projectId), // Project ID (ensure it's an integer)
        },
      });

      // Send the created file record as the response
      res.status(201).json(file);
    } catch (error) {
      console.error('Error creating file entry:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
};

// Controller to get files by project ID
exports.getFilesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Fetch the files for the given project ID
    const files = await prismaClient.file.findMany({
      where: { projectId: Number(projectId) },
    });

    // Return the list of files for the project
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error.message);
    res.status(500).json({ error: error.message });
  }
};

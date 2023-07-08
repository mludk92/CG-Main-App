const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const {
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
    S3Client,
} = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

router.get('/', async (req, res) => {
    try {
        let result = await pool.query(`
            SELECT * FROM "images";
        `);
        res.send(result.rows);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

/**
 * For private buckets, you will need to request the image
 * through your server.
 */
router.get('/:imageName', async (req, res) => {
    try {
        const { imageName } = req.params;
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: `images/${imageName}`, // folder/file 
        });
        const data = await s3Client.send(command);
        data.Body.pipe(res);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
      const { imageName, imageType, author } = req.query; // Retrieve the 'imageName', 'imageType', and 'author' values from 'req.query'
      const imageData = req.files.image.data;
      const imageKey = `images/${imageName}`; // folder/file
  
      console.log('imageName:', imageName);
      console.log('imageType:', imageType);
      console.log('author:', author);
      console.log('imageData:', imageData);
      console.log('imageKey:', imageKey);
  
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: imageKey,
        Body: imageData,
      });
  
      const response = await s3Client.send(command);
      console.log('S3 response:', response); // Used for debugging
  
      await pool.query(
        `INSERT INTO "images" ("name", "type", "author")
              VALUES ($1, $2, $3);`,
        [imageName, imageType, author]
      );
  
      res.sendStatus(201);
    } catch (error) {
      console.log('Error:', error);
      res.sendStatus(500);
    }
  });
  


router.delete('/:fileId', async (req, res) => {
    try {
      const { fileId } = req.params;
      const fileType = req.baseUrl.replace('/', ''); // Extract the file type from the base URL (e.g., 'images', 'audio', 'video')
  
      // Get the file name and key from the database
      const result = await pool.query(`SELECT name FROM images WHERE id = $1`, [fileId]);
      const fileName = result.rows[0].name;
      const fileKey = `images/${fileName}`;
  
      // Delete the file from S3
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey,
      });
      await s3Client.send(command);
  
      // Delete the file from the database
      await pool.query(`DELETE FROM images WHERE id = $1`, [fileId]);
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
module.exports = router;
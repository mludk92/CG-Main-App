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
      SELECT * FROM "audio";
    `);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/:audioName', async (req, res) => {
  try {
    const { audioName } = req.params;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: `audio/${audioName}`, // folder/file
    });
    const data = await s3Client.send(command);
    data.Body.pipe(res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const { audioName, audioType, author, title, category } = req.query;
    const decodedAudioType = decodeURIComponent(audioType); // Decode the audioType

    const audioData = req.files.audio.data;
    const audioKey = `audio/${audioName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: audioKey,
      Body: audioData,
    });

    const response = await s3Client.send(command);
    console.log(response);
    await pool.query(`
      INSERT INTO "audio" ("name", "type", "author", "title", "category")
      VALUES ($1, $2, $3, $4, $5);
    `, [audioName, decodedAudioType, author, title, category]); // Add title and category to the query parameters

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



router.delete('/:fileId', async (req, res) => {
    try {
      const { fileId } = req.params;
      const fileType = req.baseUrl.replace('/', ''); // Extract the file type from the base URL (e.g., 'images', 'audio', 'video')
  
      // Get the file name and key from the database
      const result = await pool.query(`SELECT name FROM audio WHERE id = $1`, [fileId]);
      const fileName = result.rows[0].name;
      const fileKey = `audio/${fileName}`;
  
      // Delete the file from S3
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey,
      });
      await s3Client.send(command);
  
      // Delete the file from the database
      await pool.query(`DELETE FROM audio WHERE id = $1`, [fileId]);
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

module.exports = router;

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
      SELECT * FROM "videos";
    `);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/:videoName', async (req, res) => {
  try {
    const { videoName } = req.params;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: `videos/${videoName}`, // folder/file
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
    const { videoName, videoType, author, title, category, summary } = req.query; // Retrieve the 'videoName', 'videoType', 'author', 'title', and 'category' values from 'req.query'
    const decodedVideoName = decodeURIComponent(videoName); // Decode the videoName
    const decodedVideoType = decodeURIComponent(videoType); // Decode the videoType

    const videoData = req.files.video.data;
    const videoKey = `videos/${decodedVideoName}`; // folder/file

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: videoKey,
      Body: videoData,
    });

    const response = await s3Client.send(command);
    console.log(response);
    await pool.query(
      `INSERT INTO "videos" ("name", "type", "author", "title", "category", "summary")
            VALUES ($1, $2, $3, $4, $5, $6);`,
      [decodedVideoName, decodedVideoType, author, title, category, summary]
    );

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
    const result = await pool.query(`SELECT name FROM videos WHERE id = $1`, [fileId]);
    const fileName = result.rows[0].name;
    const fileKey = `videos/${fileName}`;

    // Delete the file from S3
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: fileKey,
    });
    await s3Client.send(command);

    // Delete the file from the database
    await pool.query(`DELETE FROM videos WHERE id = $1`, [fileId]);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const {
    GetObjectCommand,
    PutObjectCommand,
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
      const { videoName, videoType } = req.query;
      const videoData = req.files.file.data;
      const videoKey = `videos/${videoName}`; // folder/file
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: videoKey,
        Body: videoData,
      });
  
      const response = await s3Client.send(command);
      console.log(response);
      await pool.query(`
        INSERT INTO "videos" ("name", "type")
        VALUES ($1, $2);
      `, [videoName, videoType]);
  
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

module.exports = router;
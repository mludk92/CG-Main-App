const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    console.log('In /favorites POST route');

    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const contentId = req.body;
        const queryText = `INSERT INTO favorites (user_id, content_id)
            VALUES ($1, $2)`;

        pool
            .query(queryText, [userId, contentId])
            .then(() => {
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log('Error inserting favorite entry:', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

router.delete('/', (req, res) => {
    console.log('In /favorites DELETE route');

    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const contentId = req.body;
        const queryText = `DELETE FROM favorites WHERE "user_id" = $1
            AND "content_id" = $2;`;

        pool
            .query(queryText, [userId, contentId])
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('Error deleting faavorite entry:', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
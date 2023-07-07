const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route for all badges a user currently owns
router.get('/', (req, res) => {
    const userId = req.user.id;
    const queryText = 
    `select * from login_history_view where user_id = $1 limit 1`
   

    pool.query(queryText, [userId]).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        console.log('GET call to /api/login failed: ', err);
        res.sendStatus(500);
    });
});



module.exports = router;
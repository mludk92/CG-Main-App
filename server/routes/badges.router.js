const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route for all badges a user currently owns
router.get('/', (req, res) => {
    const userId = req.user.id;

    // Selects rows that displays:
    // badge_id, badge_name, and summary 
    // for each badge associated with a user in the badge_earned table
    const queryText = `
    SELECT badge_earned.badge_id, badges.badge_name, badges.summary 
    FROM badge_earned 
    JOIN "user" ON badge_earned.user_id = "user".id 
    JOIN badges ON badge_earned.badge_id = badges.id 
    WHERE "user".id = $1;`;

    pool.query(queryText, [userId]).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log('GET call to /api/badges failed: ', err);
        res.sendStatus(500);
    });
});

module.exports = router;
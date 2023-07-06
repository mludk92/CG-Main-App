const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route for all badges a user currently owns
router.get('/', (req, res) => {
    const userId = req.user.id;

    // Selects rows that displays:
    // badge_id, badge_name, and summary 
    // for each badge associated with a user in the badge_earned table
    const queryText = 
    `select b.id, b.badge_name, b.summary, be.user_id, u.username from badges b
    left outer join badge_earned be on 
    be.badge_id = b.id
    left outer join "user" u
    on u.id = be.user_id`
    // SELECT badge_earned.badge_id, badges.badge_name, badges.summary 
    // FROM badge_earned 
    // JOIN "user" ON badge_earned.user_id = "user".id 
    // JOIN badges ON badge_earned.badge_id = badges.id 
    // WHERE user_id= $1;`;

    pool.query(queryText).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        console.log('GET call to /api/badges failed: ', err);
        res.sendStatus(500);
    });
});


// POST Route for when a user earns a new badge
router.post('/', (req, res) => {
    const userId = req.user.id;
    const badgeId = req.body.badge;
  
    const queryText = `INSERT INTO "badge_earned" (user_id, badge_id) VALUES ($1, $2)`;
    pool.query(queryText, [userId, badgeId]).then(() => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('POST call to /api/badges failed: ', err);
        res.sendStatus(500);
    });
  });

module.exports = router;
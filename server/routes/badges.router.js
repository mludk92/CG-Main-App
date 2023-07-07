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


// POST Route for adding a new badge entry to badge_earned
/**  */
router.post('/', (req, res) => {
    const userId = req.user.id;
    let badgeId;
  
    const maxJournalIdQuery = 'SELECT MAX(id) AS max_id FROM journal';
  
    pool.query(maxJournalIdQuery)
      .then((response) => {
        const maxJournalId = response.rows[0].max_id;
  
        if (maxJournalId > 1) {
          badgeId = 3;
        } else if (maxJournalId > 100) {
          badgeId = 4;
        }
  
        if (badgeId) {
          const checkExistQuery = 'SELECT EXISTS (SELECT 1 FROM badge_earned WHERE user_id = $1 AND badge_id = $2) AS exists';
          const checkExistParams = [userId, badgeId];
  
          pool.query(checkExistQuery, checkExistParams)
            .then((checkExistResponse) => {
              const { exists } = checkExistResponse.rows[0];
  
              if (!exists) {
                const insertQuery = 'INSERT INTO badge_earned (user_id, badge_id) VALUES ($1, $2)';
                const insertParams = [userId, badgeId];
  
                pool.query(insertQuery, insertParams)
                  .then(() => {
                    // Insertion completed silently, no response needed
                  })
                  .catch((err) => {
                    console.log('POST call to /api/badges failed: ', err);
                  });
              }
            })
            .catch((err) => {
              console.log('SELECT check query failed: ', err);
            });
        }
      })
      .catch((err) => {
        console.log('GET call to /journal failed: ', err);
      });
  });
  
  module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route for all badges a user currently owns
router.get('/', (req, res) => {
  const userId = req.user.id;
  const calculateStreakQuery = 'CALL calculate_login_streak($1)';
  const selectStreakQuery = 'SELECT * FROM login_history_with_streak ORDER BY login_date DESC LIMIT 1';

  pool.query(calculateStreakQuery, [userId])
    .then(() => pool.query(selectStreakQuery))
    .then((response) => {
      const rows = response.rows;

      res.send(rows);
    })
    .catch((err) => {
      console.log('GET call to /api/login failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;

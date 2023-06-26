const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged-in user's journal entries
router.get('/', (req, res) => {
  console.log('/journal GET route');
  console.log('is authenticated?', req.isAuthenticated());

  // STEP 1: Are we authenticated?
  if (req.isAuthenticated()) {
    // User is logged in
    console.log('user', req.user);
    const userId = req.user.id;
    const queryText = `SELECT * FROM journal WHERE user_id = $1 ORDER BY entry_date DESC`;

    // STEP 2: Use the logged-in user's id (req.user.id) to GET the list of journal entries.
    pool
      .query(queryText, [userId])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    // User is NOT logged in
    res.sendStatus(403);
  }
});

router.post('/', (req, res) => {
  console.log('/journal POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const { journal, entry_date, mood } = req.body;
    const queryText = `INSERT INTO journal (user_id, journal, entry_date, mood)
      VALUES ($1, $2, $3, $4)`;

    const values = [userId, journal, entry_date, mood];

    pool
      .query(queryText, values)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log('Error inserting journal entry:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/', (req, res) => {
  console.log('/journal DELETE route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  if (req.isAuthenticated()) {
    const entryId = req.body.id;

    const deleteQuery = `DELETE FROM journal WHERE id = $1`;

    pool
      .query(deleteQuery, [entryId])
      .then(() => {
        console.log('Deletion successful');
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log('Error in Journal Entry Delete:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

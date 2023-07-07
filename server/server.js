const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const fileUpload = require('express-fileupload');
// Route includes
const userRouter = require('./routes/user.router');
const badgesRouter = require('./routes/badges.router');
const imageRouter = require('./routes/image.router.js');
const audioRouter = require('./routes/audio.router.js');
const videoRouter = require('./routes/video.router.js');
const logindataRouter = require('./routes/login.router');
// journal router added by Mitch
const journalRouter = require('./routes/journal.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

// Accept file uploads
app.use(fileUpload());

// Passport Session Configuration
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/badges', badgesRouter);
app.use('/journal', journalRouter);
app.use('/api/images', imageRouter);
app.use('/api/audio', audioRouter);
app.use('/api/video', videoRouter);
app.use('/api/logindata', logindataRouter);


// App Set
const PORT = process.env.PORT || 5002;

/** Listen **/
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const express = require("express");
const minicrypt = require('./miniCrypt');
const secrets = require('./secrets.json');
const mc = new minicrypt();

const pgp = require("pg-promise")({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

// Local PostgreSQL credentials

const pghost = secrets.postgreSQL_host;
const pgport = secrets.postgreSQL_port;
const pgdatabase = secrets.postgreSQL_database;
const pgusername = secrets.postgreSQL_username;
const pgpassword = secrets.postgreSQL_password;

const config = {
    host: pghost,
    port: pgport,
    database: pgdatabase,
    user: pgusername,
    password: pgpassword
};

const db = pgp(config);

async function connectAndRun(task) {
    let connection = null;
    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        connection.done();
    }
}

async function addNewUser(email, password, username, schoolname, gender, major) {
    return await connectAndRun(db => db.none("INSERT INTO users VALUES (DEFAULT, $1, $2, $3, $4, $5, $6);", [email, password, username, schoolname, gender, major]));
}


async function addNewCourse(schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall, userid, username, textcomment) {
    db.tx(async db => {
        const courseid = await db.one("INSERT INTO courses(courseid, schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING courseid;", [schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall], c => +c.courseid);
        return db.none("INSERT INTO coursecomments VALUES ($1, $2, $3, $4, $5, $6, $7);", [courseid, userid, username, textcomment, difficulty, time, overall]);
    });
}

async function addNewComment(courseid, userid, username, textcomment, difficulty, time, overall) {
    return await connectAndRun(db => db.none("INSERT INTO coursecomments VALUES ($1, $2, $3, $4, $5, $6, $7);", [courseid, userid, username, textcomment, difficulty, time, overall]));
}

async function updateUserInfoByUserID(userid, email, password, username, schoolname, gender, major) {
    return await connectAndRun(db => db.none("UPDATE users SET email = $2, password = $3, username = $4, schoolname = $5, gender = $6, major = $7 WHERE userid = $1;", [userid, email, password, username, schoolname, gender, major]));
}

async function updateUserInfoNoPWDChangeByUserID(userid, email, username, schoolname, gender, major) {
    return await connectAndRun(db => db.none("UPDATE users SET email = $2, username = $3, schoolname = $4, gender = $5, major = $6 WHERE userid = $1;", [userid, email, username, schoolname, gender, major]));
}

async function updateCourseInfoByCommentsAVG(courseid) {
    return await connectAndRun(db => db.none("UPDATE courses SET difficulty = (SELECT ROUND(AVG(difficulty)) FROM coursecomments WHERE courseid = $1), time = (SELECT ROUND(AVG(time)) FROM coursecomments WHERE courseid = $1), overall = (SELECT ROUND(AVG(overall)) FROM coursecomments WHERE courseid = $1) WHERE courseid = $1;", [courseid]));
}

async function loadCourseByCourseID(courseid) {
    return await connectAndRun(db => db.one("SELECT * from courses WHERE courseid = $1;", [courseid]));
}

async function loadCoursesBySchoolSubjectNumber(schoolname, coursesubject, coursenumber) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE LOWER(schoolname) = LOWER($1) AND LOWER(coursesubject) = LOWER($2) AND coursenumber = $3;", [schoolname, coursesubject, coursenumber]));
}

async function loadCoursesBySchoolSubject(schoolname, coursesubject) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE LOWER(schoolname) = LOWER($1) AND LOWER(coursesubject) = LOWER($2);", [schoolname, coursesubject]));
}

async function loadCoursesBySchool(schoolname) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE LOWER(schoolname) = LOWER($1);", [schoolname]));
}


async function loadCoursecommentsByCourseID(courseid) {
    return await connectAndRun(db => db.any("SELECT * from coursecomments WHERE courseid = $1;", [courseid]));
}

async function checkUserExistByEmail(email) {
    return await connectAndRun(db => db.any("SELECT * FROM users WHERE email = $1;", [email]));
}

async function loadUserInfoByUserID(userid) {
    return await connectAndRun(db => db.any("SELECT * FROM users WHERE userid = $1;", [userid]));
}

async function loadUserInfoByEmail(useremail) {
    return await connectAndRun(db => db.any("SELECT * FROM users WHERE email = $1;", [useremail]));
}

async function loadCoursecommentsByCourseIDUserID(courseid, userid) {
    return await connectAndRun(db => db.any("SELECT * from coursecomments WHERE courseid = $1 AND userid = $2;", [courseid, userid]));
}

async function delateCourseByCourseID(courseid) {
    return await connectAndRun(db => db.one("DELETE FROM courses WHERE courseid = $1;", [courseid]));
}

async function delateCoursecommentsByCourseID(courseid) {
    return await connectAndRun(db => db.one("DELETE FROM coursecomments WHERE courseid = $1;", [courseid]));
}

async function delateUserByUserID(userid) {
    return await connectAndRun(db => db.none("DELETE FROM users WHERE userid = $1;", [userid]));
}


// EXPRESS SETUP
const app = express();

app.use('/', express.static('./client'));

app.use(express.json());

app.post("/addnewuser", async (req, res) => {
    await addNewUser(req.body.email, req.body.password, req.body.username, req.body.schoolname, req.body.gender, req.body.major);
    res.send("OK");
});

app.post("/addnewcourse", async (req, res) => {
    await addNewCourse(req.body.schoolname, req.body.coursesubject, req.body.coursenumber, req.body.instructor, req.body.difficulty, req.body.time, req.body.overall, req.body.userid, req.body.username, req.body.textcomment);
    res.send("OK");
});

app.post("/addnewcomment", async (req, res) => {
    await addNewComment(req.body.courseid, req.body.userid, req.body.username, req.body.textcomment, req.body.difficulty, req.body.time, req.body.overall);
    res.send("OK");
});

app.post("/updateuserinfo", async (req, res) => {
    const [salt, hash] = mc.hash(req.body.password);
    await updateUserInfoByUserID(req.body.userid, req.body.email, [salt, hash], req.body.username, req.body.schoolname, req.body.gender, req.body.major);
    res.send("OK");
});

app.post("/updateuserinfonopwdchange", async (req, res) => {
    await updateUserInfoNoPWDChangeByUserID(req.body.userid, req.body.email, req.body.username, req.body.schoolname, req.body.gender, req.body.major);
    res.send("OK");
});

app.post("/updatecourseinfo", async (req, res) => {
    await updateCourseInfoByCommentsAVG(req.body.courseid);
    res.send("OK");
});

app.get("/loadthiscourse", async (req, res) => {
    const thiscourse = await loadCourseByCourseID(req.query.courseid);
    res.send(JSON.stringify(thiscourse));
});

app.get("/loadcoursesbyschoolsubjectnumber", async (req, res) => {
    const coursesloaded = await loadCoursesBySchoolSubjectNumber(req.query.schoolname, req.query.coursesubject, req.query.coursenumber);
    res.send(JSON.stringify(coursesloaded));
});

app.get("/loadcoursesbyschoolsubject", async (req, res) => {
    const coursesloaded = await loadCoursesBySchoolSubject(req.query.schoolname, req.query.coursesubject);
    res.send(JSON.stringify(coursesloaded));
});

app.get("/loadcoursesbyschool", async (req, res) => {
    const coursesloaded = await loadCoursesBySchool(req.query.schoolname);
    res.send(JSON.stringify(coursesloaded));
});

app.get("/loadcoursecommentsbycourseid", async (req, res) => {
    const commentsloaded = await loadCoursecommentsByCourseID(req.query.courseid);
    res.send(JSON.stringify(commentsloaded));
});

app.get("/loadcoursecommentsbycourseiduserid", async (req, res) => {
    const commentloaded = await loadCoursecommentsByCourseIDUserID(req.query.courseid, req.query.userid);
    res.send(JSON.stringify(commentloaded));
});

app.get("/checkuserexistbyemail", async (req, res) => {
    const user = await checkUserExistByEmail(req.query.email);    
    res.send(JSON.stringify(user));
});

app.get("/loaduserinfobyuserid", async (req, res) => {
    const user = await loadUserInfoByUserID(req.query.userid);    
    res.send(JSON.stringify(user));
});

app.get("/loaduserinfobyemail", async (req, res) => {
    const user = await loadUserInfoByEmail(req.query.email);    
    res.send(JSON.stringify(user));
});

//Session/Cookie starts from here.
//Very important, variables username below are all represented for user_email, not actual username!

require('dotenv').config();

const expressSession = require('express-session');  // for managing session state
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy
const port = process.env.PORT || 8080;

// Session configuration

const session = {
    secret : process.env.SECRET || 'SECRET', // encryption key set up in config_vars, 'SECRET' is for local testing.
    resave : false,
    saveUninitialized: false
};

// Passport configuration

const strategy = new LocalStrategy(
    async (username, password, done) => {
	if (await findUser(username) === false) {
        // no such user
        return done(null, false, { 'message' : 'Wrong useremail' });
        }
        if (await validatePassword(username, password) === false) {
        // invalid password
        // should disable logins after N messages
        // delay return to rate-limit brute-force attacks
        await new Promise((r) => setTimeout(r, 2000)); // two second delay
        return done(null, false, { 'message' : 'Wrong password' });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, username);
    });

// App configuration

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

app.use(express.json()); // allow JSON inputs
app.use(express.urlencoded({'extended' : true})); // allow URLencoded data

/////

// Returns true iff the user exists.
async function findUser(email) {
    const selectedUser = await checkUserExistByEmail(email);
    if (selectedUser.length === 0) {
        return false;
    } else {
        return true;
    }
}

// Returns true iff the password is the one we have stored (in plaintext = bad but easy).
async function validatePassword(email, pwd) {
    if (!findUser(email)) {
	return false;
    }
    const selectedUser = await checkUserExistByEmail(email);
    if (!mc.check(pwd, selectedUser[0].password[0], selectedUser[0].password[1])) {
	return false;
    }
    return true;
}

// Add a user to the "database".
// Return true if added, false otherwise (because it was already there).
// TODO
async function addUser(email, pwd) {
	if(await findUser(email) === false){
        const [salt, hash] = mc.hash(pwd);
        await addNewUser(email, [salt, hash], "Anonymous", "", "", "");
        return true;
	}else{
		return false;
	}
}



function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
	// If we are authenticated, run the next route.
	next();
    } else {
	// Otherwise, redirect to the login page.
	res.redirect('/login');
    }
}

app.get('/getsession',
	checkLoggedIn,
	(req, res) => {
        console.log("Successfully logged in!");
        res.send(req.session);
	});


app.post('/login', 
    passport.authenticate('local' , {     
        'successRedirect' : '/private',   
        'failureRedirect' : '/loginfailure'      
    }));

app.get('/loginfailure',
     (req, res) => {
         console.log("loginfailed");
         res.sendFile('client/alertloginfailed.html',
         { 'root' : './'});
     });

app.get('/private',
     checkLoggedIn, 
     (req, res) => {             
         res.redirect('/index.html');
     });


// Handle the URL /login (just output the login.html file).
app.get('/login',
    (req, res) => res.sendFile('client/login.html',
    { 'root' : './'}));

app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.sendFile('client/index.html',
    { 'root' : './'}); 
});



app.post('/signup',
    async (req, res) => {
        const username = req.body['username'];
        const password = req.body['password'];
        if(await addUser(username,password) === true){
            res.sendFile('client/alertsignupsuccess.html',
            { 'root' : './'});
        }
        else{
            res.sendFile('client/alertuserexisted.html',
            { 'root' : './'});
        }
    });

// Register URL
app.get('/signup',
	(req, res) => res.sendFile('client/signup.html',
                   { 'root' : './'}));
app.use(express.static('client'));

app.get('*', (req, res) => {
    res.send('Error');
});



app.listen(port);
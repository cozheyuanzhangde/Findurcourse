import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';

let database;
if (existsSync("server/database.json")) {
    database = JSON.parse(readFileSync("server/database.json"));
} else {
    database = {
        users: [],
        courses: [],
        coursesdetail: []
    };
}

const port = process.env.PORT || 8080;

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/addnewuser') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.users.push({
                useremail: data.useremail,
                userpassword: data.userpassword,
                username: data.username,
                userschoolname: data.userschoolname,
                usergender: data.usergender,
                usermajor: data.usergender
            });
            
            writeFile("server/database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    }
    else if (parsed.pathname === '/addnewcourse') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.coursesdetail.push({
                detailschoolname: data.courseschoolname,
                detailsubject: data.coursesubject,
                detailnumber: data.coursenumber,
                detailprofessor: data.courseprofessor,
                detailusername: "Anonymous",
                detailcomment: data.coursecomment,
                detaildifficulty: data.coursedifficulty,
                detailtime: data.coursetime,
                detailoverall: data.courseoverall
            });

            database.courses.push({
                courseschoolname: data.courseschoolname,
                coursesubject: data.coursesubject,
                coursenumber: data.coursenumber,
                courseprofessor: data.courseprofessor,
                coursedifficulty: data.coursedifficulty,
                coursetime: data.coursetime,
                courseoverall: data.courseoverall,
                coursecommentsnumber: 1
            });
            
            writeFile("server/database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    }
    else if (parsed.pathname === '/addnewcomment') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.coursesdetail.push({
                detailschoolname: data.courseschoolname,
                detailsubject: data.coursesubject,
                detailnumber: data.coursenumber,
                detailprofessor: data.courseprofessor,
                detailusername: "Anonymous",
                detailcomment: data.coursecomment,
                detaildifficulty: data.coursedifficulty,
                detailtime: data.coursetime,
                detailoverall: data.courseoverall
            });
            
            writeFile("server/database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    }
    else if (parsed.pathname === '/changeuserinfo') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            const this_useremail = data.useremail;
            database.users.forEach(function (obj) {
                if(obj.useremail === this_useremail){
                    obj.userpassword = data.userpassword;
                    obj.username = data.username;
                    obj.userschoolname = data.userschoolname;
                    obj.usergender = data.usergender;
                    obj.usermajor = data.usergender;
                }  
            });
            
            writeFile("server/database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                }else{
                    res.end();
                }
            });
        });
    }
    else if (parsed.pathname === '/loadcourses') {
        res.end(JSON.stringify(
            database.courses
        ));
    }
    else if (parsed.pathname === '/loadcoursesdetail') {
        res.end(JSON.stringify(
            database.coursesdetail
        ));
    }
    else {
        // If the client did not request an API endpoint, we assume we need to fetch a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
        const filename = parsed.pathname === '/' ? "index.html" : parsed.pathname.replace('/', '');
        const path = join("client/", filename);
        console.log("trying to serve " + path + "...");
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, {"Content-Type" : "text/html"});
            } else if (filename.endsWith("css")) {
                res.writeHead(200, {"Content-Type" : "text/css"});
            } else if (filename.endsWith("js")) {
                res.writeHead(200, {"Content-Type" : "text/javascript"});
            } else {
                res.writeHead(200);
            }

            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(port);
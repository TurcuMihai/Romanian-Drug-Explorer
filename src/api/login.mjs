import jwt from 'jsonwebtoken';
//import { getDate } from './statistics.js';
const dbFilePath = "../database.db";
import sqlite3 from 'sqlite3';

export const loginUser = (username, password, callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.get(
        `select count (*) as ok from users where username = $username and password = $password`, 
        {
            $username: username,
            $password: password
        },
        (err, row) => {
            const found = row.ok;
            db.close();
            
            if(found === 0) {
                callback("NOT_AUTHORIZED");
            } else {
                const token = jwt.sign(
                    { username: username },
                    'key',
                    { expiresIn: "12h" }
                );
                callback(token);
            }
        }
    );
}

export const registerUser = (username, password, callback) =>{
    const db = new sqlite3.Database(dbFilePath);
    db.get(
        `select count (*) as ok from users where username = $username`,
        {
            $username: username,
        },
        (err, row) => {
            const found = row.ok;
            db.close();
            
            if(found === 0) {
                db.run("insert into users (username,password) values ($username, $password);",
                {
                    $username: username,
                    $password: password
                }, (errInsert, e) => {
                    callback("OK");
                });
            } else {
                callback("user already exists");
            }
        }
    )
}

export const decodeToken = (token) => {
    return jwt.verify(token, 'key');
}
const os = require('os');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const HOMEDIR = os.homedir();
const TERMIDIR = '.termichat';
const DB = 'termichat.db';


/**
 * Ensure file system structure is in place
 */
 const dirVerify = () => {
    console.log('Verifying folder');
    return new Promise((rs, rj) => {
        const dir = `${HOMEDIR}/${TERMIDIR}`;
       
        if (!fs.existsSync(dir)) {
            console.log('Creating folder')
            fs.mkdirSync(dir);
            fs.open(`${HOMEDIR}/${TERMIDIR}/${DB}`, 'w', (err, file) => {
                console.log('DB created');
                rs(true);
            });
        } else {
            console.log('DB detected');
            rs(false);
        }

    });
};

const getDb = async () => {
    const createTables = await dirVerify();
    return new Promise((rs, rj) => {
        const db = new sqlite3.Database(`${HOMEDIR}/${TERMIDIR}/${DB}`, sqlite3.OPEN_READWRITE, err => {
            if (err) {
                return rj(err);
            }
            rs(db);
            if (createTables) {
                initDb(db);
            }
        });
    });
};

/**
 * Creating a db instance
 */
const db = getDb();

/**
 * All SQL statements that are going to run when termichat first runs
 */
const initCommand = [
    'CREATE TABLE keys (id TEXT, pbk TEXT, pvk TEXT)'
];

/**
 * Execute all db statement
 * @param {DB} db 
 */
const initDb = (db) => {
    initCommand.forEach(sql => db.run(sql, () => console.log('DB RUN COMPLETED')));
};


module.exports = {
    db
}
import fs from 'fs';
import sqlite3 from 'sqlite3';
const dbFilePath = "../database.db";

function addQuotesToCSV(csvString) {
    const rows = csvString.split('\n');
    const quotedRows = rows.map(row => {
      const values = row.split(',');
      const quotedValues = values.map(value => `"${value.trim()}"`);
      return quotedValues.join(',');
    });
  
    return quotedRows.join('\n');
  }

export const runAll = (manual = false, callback = ()=>{}) => {
    try { fs.unlinkSync(dbFilePath); } catch(e) { }

    const db = connectToDatabase();
    db.exec(`
        CREATE TABLE confiscari
        (
            an NUMERIC,
            nume_drog  TEXT,
            grame NUMERIC,
            nr_capturi NUMERIC
        );
        CREATE TABLE persoane_cercetate
        (
            an NUMERIC,
            tip_persoane  TEXT,
            nr_persoane NUMERIC
        );
        CREATE TABLE situatia_pedepselor
        (
            an NUMERIC,
            hotarare TEXT,
            nr_pedepse NUMERIC
        );
        CREATE TABLE persoane_condamnate
        (
            an NUMERIC,
            gen TEXT,
            nr_persoane NUMERIC
        );
        CREATE TABLE users
        (
            username  VARCHAR(50),
            password   VARCHAR(50),
            last_login VARCHAR(50)
        );
        CREATE TABLE activitati
        (
            an NUMERIC,
            locatie TEXT,
            nr_activitati NUMERIC
        );
        CREATE TABLE campanii
        (
            an NUMERIC,
            nume TEXT,
            nr_beneficiari NUMERIC
        );
        CREATE TABLE proiecte
        (
            an NUMERIC,
            nume TEXT,
            nr_beneficiari NUMERIC
        );
        CREATE TABLE urgente
        (
            an NUMERIC,
            urgenta TEXT,
            nr_urgente NUMERIC
        );
        CREATE TABLE urgente_drog
        (
            an NUMERIC,
            drog TEXT,
            nr_urgente NUMERIC
        );
        CREATE TABLE urgente_gen
        (
            an NUMERIC,
            gen TEXT,
            nr_urgente NUMERIC
        );

    `, ()=> {
        db.run("insert into users (username,password,last_login) values ('admin', 'admin', '21');");
        db.run("insert into users (username,password,last_login) values ('test', 'test', '21');");

        fs.readdir(".", (err, files) => {
            files.forEach(file => {
            
                if(manual === false && file.includes(".csv") && file.includes("capturi") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const nume_drog = parts[1].replace('"', '').replace('"', '');
                                    const grame = parts[2].replace('"', '').replace('"', '');
                                    const nr_capturi = parts[parts.length-1].replace('"', '').replace('"', '');
                                 
                                    elements.push([
                                        an,
                                        nume_drog, 
                                        grame, 
                                        nr_capturi, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?, ?, ?)").join(', ');
                                        const querry =  `insert into confiscari (an,nume_drog, grame, nr_capturi) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?, ?)").join(', ');
                    const querry =  `insert into confiscari (an, nume_drog, grame, nr_capturi) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes(".csv") && file.includes("cercetate") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const tip_persoane = parts[1].replace('"', '').replace('"', '');
                                    const nr_persoane = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        tip_persoane, 
                                        nr_persoane, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into persoane_cercetate (an,tip_persoane,nr_persoane) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into persoane_cercetate (an, tip_persoane,nr_persoane) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes(".csv") && file.includes("pedepselor") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const hotarare = parts[1].replace('"', '').replace('"', '');
                                    const nr_pedepse = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        hotarare, 
                                        nr_pedepse, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into situatia_pedepselor (an,hotarare,nr_pedepse) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into situatia_pedepselor (an,hotarare,nr_pedepse) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes(".csv") && file.includes("condamnate") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const gen = parts[1].replace('"', '').replace('"', '');
                                    const nr_persoane = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        gen, 
                                        nr_persoane, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into persoane_condamnate (an,gen,nr_persoane) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into persoane_condamnate (an,gen,nr_persoane) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes(".csv") && file.includes("activitati") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const locatie = parts[1].replace('"', '').replace('"', '');
                                    const nr_activitati = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        locatie, 
                                        nr_activitati, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into activitati (an,locatie,nr_activitati) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into activitati (an,locatie,nr_activitati) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                } 
                if(manual === false && file.includes(".csv") && file.includes("campanii") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const nume = parts[1].replace('"', '').replace('"', '');
                                    const nr_beneficiari = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        nume, 
                                        nr_beneficiari, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into campanii (an,nuem,nr_beneficiari) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into campanii (an,nume,nr_beneficiari) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes(".csv") && file.includes("proiecte") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const nume = parts[1].replace('"', '').replace('"', '');
                                    const nr_beneficiari = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        nume, 
                                        nr_beneficiari, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into proiecte (an,nuem,nr_beneficiari) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into proiecte (an,nume,nr_beneficiari) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes("urgente.csv") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const urgenta = parts[1].replace('"', '').replace('"', '');
                                    const nr_urgente = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        urgenta, 
                                        nr_urgente, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into urgente (an,urgenta,nr_urgente) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into urgente (an,urgenta,nr_urgente) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes("urgente_gen.csv") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const gen = parts[1].replace('"', '').replace('"', '');
                                    const nr_urgente = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        gen, 
                                        nr_urgente, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into urgente_gen (an,gen,nr_urgente) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into urgente_gen (an,gen,nr_urgente) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                if(manual === false && file.includes("urgente_drog.csv") || manual === true && file.includes(".qq1"))
                {
                    let elements = [];
                    let fLine = true;
                    const allFileContents1 = fs.readFileSync(file, 'utf-8');
                    const allFileContents = addQuotesToCSV(allFileContents1);
                    console.log(allFileContents);
                        allFileContents.split(/\r?\n/).forEach(line =>  {
                            if(fLine) {
                                fLine = false;
                            } else {  
                                const parts = line.split(",");
                                if(parts.length > 1) {
                                    const an = parts[0].replace('"', '').replace('"', '');
                                    const drog = parts[1].replace('"', '').replace('"', '');
                                    const nr_urgente = parts[2].replace('"', '').replace('"', '');
                                    elements.push([
                                        an,
                                        drog, 
                                        nr_urgente, 
                                    ]);

                                    if(elements.length === 100) {
                                        let placeHolders = elements.map(() => "(?,?,?)").join(', ');
                                        const querry =  `insert into urgente_drog (an,drog,nr_urgente) 
                                            VALUES ${placeHolders}`;
                                        let flatArtist = [];
                                        elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                                            
                                        try {
                                            db.serialize(function(){
                                                db.run(querry, flatArtist);
                                            });
                                        } catch (e) {
                                            console.log('ERROR EXECUTING INSERT');
                                            console.log(e);
                                        }  

                                        elements = [];
                                    }
                                }
                            }
                    });

                    let placeHolders = elements.map(() => "(?,?, ?)").join(', ');
                    const querry =  `insert into urgente_drog (an,drog,nr_urgente) 
                        VALUES ${placeHolders}`;
                    let flatArtist = [];
                    elements.forEach((arr) => { arr.forEach((item) => { flatArtist.push(item) }) });
                        
                    try {
                        db.serialize(function(){
                            db.run(querry, flatArtist);
                        });
                    } catch (e) {
                        console.log('ERROR EXECUTING INSERT');
                        console.log(e);
                    }  

                    console.log("------------------------------------------");
                }
                
            });
        });

        if(manual) {
            callback();
        }
    });

    function connectToDatabase() {
    if (fs.existsSync(dbFilePath)) {
        return new sqlite3.Database(dbFilePath);
    } else {
        const db = new sqlite3.Database(dbFilePath, (error) => {
        if (error) {
            return console.error(error.message);
        }
        console.log("Connected to the database successfully");
        console.log("------------------------------------------");
        });
        return db;
    }
    }
}
runAll();
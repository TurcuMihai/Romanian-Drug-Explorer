import sqlite3 from 'sqlite3';
const dbFilePath = "../database.db";

export const GetStatisticsConfiscari = (an, nume_drog, callback) => {
    const querry = GetStatisticsConfiscariQuery(an, nume_drog);
    const db = new sqlite3.Database(dbFilePath);

    if (nume_drog) {
        nume_drog = decodeURIComponent(nume_drog);
        nume_drog = nume_drog.replace('%C4%83', 'ă');
    }



    console.log(`Executing '${querry}'`);
    db.all(
        querry, 
        {
            $an: an,
            $nume_drog: nume_drog,
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return querry;
}

const GetStatisticsConfiscariQuery = (an, nume_drog ) => {
    let querry = "select * from confiscari";
    let hasFilters = an || nume_drog;
    let filters = {
        an: an, 
        nume_drog: nume_drog
    }
    if(hasFilters) {
        querry = `${querry} where`;
        if(an) {
            querry = `${querry} an = $an`
        }
        if(nume_drog) {
            if(hasPreviousWhere(filters, 'nume_drog'))
                querry =`${querry} and`
            querry = `${querry} nume_drog = $nume_drog`
        }
    }
    querry = `${querry} order by an desc`;
    return querry;
}


const hasPreviousWhere = (filters, type) => {
    console.log(filters);
    if(type === 'an') 
        return false;
    if(type === 'nume_drog') 
        return hasType(filters,'an') ;
}

const hasType = (filters, type) => {
    console.log(filters[type]);
    return filters[type] !== undefined;
}


export const GetStatisticsConfiscariAni = (callback) => {
    let query = "select an, sum(grame) as grame, sum(nr_capturi) as nr_capturi from confiscari group by an"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    db.all(
        query, 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}

export const GetStatisticsCercetariAni = (callback) => {
    let query = "select an, sum(nr_persoane) as nr_persoane from persoane_cercetate group by an"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    db.all(
        query, 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}

export const GetStatisticsPedepseAni = (callback) => {
    let query = "select an, sum(nr_pedepse) as nr_pedepse from situatia_pedepselor group by an"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    db.all(
        query, 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}

export const GetStatisticsCampaniiAni = (callback) => {
    let query = "select an, sum(nr_beneficiari) as nr_beneficiari from campanii group by an"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    db.all(
        query, 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}

export const GetStatisticsActivitatiAni = (callback) => {
    let query = "select an, sum(nr_activitati) as nr_activitati from activitati group by an"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    db.all(
        query, 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}

export const GetStatisticsUrgenteAni = (callback) => {
    let query = "select an, sum(nr_urgente) as nr_urgente from urgente_drog group by an"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    db.all(
        query, 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}

export const GetStatisticsCondamnari = (an, callback) => {
    let query = "select * from persoane_condamnate where an=$an;"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    console.log(an);
    db.all(
        query, 
        {
            $an: an,
         },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}
export const GetStatisticsUrgente_gen = (an, callback) => {
    let query = "select * from urgente_gen where an=$an;"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    console.log(an);
    db.all(
        query, 
        {
            $an: an,
         },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}

export const GetStatisticsProiecte = (an, callback) => {
    let query = "select * from proiecte where an=$an;"
    const db = new sqlite3.Database(dbFilePath);

    console.log(`Executing '${query}'`);
    console.log(an);
    db.all(
        query, 
        {
            $an: an,
         },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return query;
}




export const GetAni = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct an from confiscari order by an desc;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}

export const GetUrgente = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct urgenta from urgente order by urgenta;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}


export const GetDroguri = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct nume_drog from confiscari order by nume_drog;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}

export const GetPersoane = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct tip_persoane from persoane_cercetate order by tip_persoane;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}

export const GetPedepse = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct hotarare from situatia_pedepselor order by hotarare;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}
export const GetLocatii = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct locatie from activitati order by locatie;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}
export const GetNumeCampanii = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct nume from campanii order by nume;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}
export const GetUrgente_drog = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select distinct drog from urgente_drog order by drog;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}
export const GetUsers = (callback) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(
        'select username, last_login from users;', 
        { },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
}
//----------------------------------------------------------------------------------------------------------
// TABELA CU PERSOANE CERCETATE
export const GetStatisticsCercetari= (an, tip_persoane, callback) => {
    const querry = GetStatisticsCercetariQuery(an, tip_persoane);
    const db = new sqlite3.Database(dbFilePath);
    console.log(tip_persoane);
    if (tip_persoane) {
        tip_persoane = decodeURIComponent(tip_persoane);
       // tip_persoane = tip_persoane.replace('%C4%83', 'ă');
       // tip_persoane = tip_persoane.replace('%C4%83', 'î');
      //  tip_persoane = tip_persoane.replace('%C4%83', 'â');
       // tip_persoane = tip_persoane.replace('%C4%83', 'ș');
      //  tip_persoane = tip_persoane.replace('%C4%83', 'ț');
      //  tip_persoane = tip_persoane.replace('%20', ' ');
    }
    console.log(`Executing '${querry}'`);
    
    db.all(
        querry, 
        {
            $an: an,
            $tip_persoane: tip_persoane,
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return querry;
}

const GetStatisticsCercetariQuery = (an, tip_persoane ) => {
    let querry = "select * from persoane_cercetate";
    let hasFilters = an || tip_persoane;
    let filters = {
        an: an, 
        tip_persoane: tip_persoane
    }
    if(hasFilters) {
        querry = `${querry} where`;
        if(an) {
            querry = `${querry} an = $an`
        }
        if(tip_persoane) {
            if(hasPreviousWhereCercetari(filters, 'tip_persoane'))
                querry =`${querry} and`
            querry = `${querry} tip_persoane = $tip_persoane`
        }
    }
    querry = `${querry} order by an desc`;
    return querry;
}

const hasPreviousWhereCercetari = (filters, type) => {
    console.log(filters);
    if(type === 'an') 
        return false;
    if(type === 'tip_persoane') 
        return hasTypeCercetari(filters,'an') ;
}

const hasTypeCercetari = (filters, type) => {
    console.log(filters[type]);
    return filters[type] !== undefined;
}
//--------------------------------------------------------------------------------
// PENTRU PEDEPSE
export const GetStatisticsPedepse = (an, hotarare, callback) => {
    const querry = GetStatisticsPedepseQuery(an, hotarare);
    const db = new sqlite3.Database(dbFilePath);
    console.log(hotarare);
    if (hotarare) {
        hotarare = decodeURIComponent(hotarare);
    }
    console.log(`Executing '${querry}'`);
    
    db.all(
        querry, 
        {
            $an: an,
            $hotarare: hotarare,
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return querry;
}

const GetStatisticsPedepseQuery = (an, hotarare ) => {
    let querry = "select * from situatia_pedepselor";
    let hasFilters = an || hotarare;
    let filters = {
        an: an, 
        hotarare: hotarare
    }
    if(hasFilters) {
        querry = `${querry} where`;
        if(an) {
            querry = `${querry} an = $an`
        }
        if(hotarare) {
            if(hasPreviousWherePedepse(filters, 'hotarare'))
                querry =`${querry} and`
            querry = `${querry} hotarare = $hotarare`
        }
    }
    querry = `${querry} order by an desc`;
    return querry;
}

const hasPreviousWherePedepse = (filters, type) => {
    console.log(filters);
    if(type === 'an') 
        return false;
    if(type === 'hotarare') 
        return hasTypePedepse(filters,'an') ;
}

const hasTypePedepse = (filters, type) => {
    console.log(filters[type]);
    return filters[type] !== undefined;
}
//--------------------------------------------------------------------------------------------------
// PT TABELA ACTIVITATI DE PREVENIRE

export const GetStatisticsActivitati = (an, locatie, callback) => {
    const querry = GetStatisticsActivitatiQuery(an, locatie);
    const db = new sqlite3.Database(dbFilePath);
    console.log(locatie);
    if (locatie) {
        locatie = decodeURIComponent(locatie);
    }
    console.log(`Executing '${querry}'`);
    
    db.all(
        querry, 
        {
            $an: an,
            $locatie: locatie,
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return querry;
}

const GetStatisticsActivitatiQuery = (an, locatie ) => {
    let querry = "select * from activitati";
    let hasFilters = an || locatie;
    let filters = {
        an: an, 
        locatie: locatie
    }
    if(hasFilters) {
        querry = `${querry} where`;
        if(an) {
            querry = `${querry} an = $an`
        }
        if(locatie) {
            if(hasPreviousWhereActivitati(filters, 'locatie'))
                querry =`${querry} and`
            querry = `${querry} locatie = $locatie`
        }
    }
    querry = `${querry} order by an desc`;
    return querry;
}

const hasPreviousWhereActivitati = (filters, type) => {
    console.log(filters);
    if(type === 'an') 
        return false;
    if(type === 'locatie') 
        return hasTypeActivitati(filters,'an') ;
}

const hasTypeActivitati = (filters, type) => {
    console.log(filters[type]);
    return filters[type] !== undefined;
}
//-------------------------------------
// PT TABELA CAMPANII

export const GetStatisticsCampanii = (an, nume, callback) => {
    const querry = GetStatisticsCampaniiQuery(an, nume);
    const db = new sqlite3.Database(dbFilePath);
    console.log(nume);
    if (nume) {
        nume = decodeURIComponent(nume);
    }
    console.log(`Executing '${querry}'`);
    
    db.all(
        querry, 
        {
            $an: an,
            $nume: nume,
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return querry;
}

const GetStatisticsCampaniiQuery = (an, nume ) => {
    let querry = "select * from campanii";
    let hasFilters = an || nume;
    let filters = {
        an: an, 
        nume: nume
    }
    if(hasFilters) {
        querry = `${querry} where`;
        if(an) {
            querry = `${querry} an = $an`
        }
        if(nume) {
            if(hasPreviousWhereCampanii(filters, 'nume'))
                querry =`${querry} and`
            querry = `${querry} nume = $nume`
        }
    }
    querry = `${querry} order by an desc`;
    return querry;
}

const hasPreviousWhereCampanii = (filters, type) => {
    console.log(filters);
    if(type === 'an') 
        return false;
    if(type === 'nume') 
        return hasTypeCampanii(filters,'an') ;
}

const hasTypeCampanii = (filters, type) => {
    console.log(filters[type]);
    return filters[type] !== undefined;
}

//---------------------------------------------
// pt tabela urgente

export const GetStatisticsUrgente = (an, urgenta, callback) => {
    const querry = GetStatisticsUrgenteQuery(an, urgenta);
    const db = new sqlite3.Database(dbFilePath);

    if (urgenta) {
        urgenta = decodeURIComponent(urgenta);
    }
    console.log(`Executing '${querry}'`);
    
    db.all(
        querry, 
        {
            $an: an,
            $urgenta: urgenta,
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return querry;
}

const GetStatisticsUrgenteQuery = (an, urgenta ) => {
    let querry = "select * from urgente";
    let hasFilters = an || urgenta;
    let filters = {
        an: an, 
        urgenta: urgenta
    }
    if(hasFilters) {
        querry = `${querry} where`;
        if(an) {
            querry = `${querry} an = $an`
        }
        if(urgenta) {
            if(hasPreviousWhereUrgente(filters, 'urgenta'))
                querry =`${querry} and`
            querry = `${querry} urgenta = $urgenta`
        }
    }
    querry = `${querry} order by an desc`;
    return querry;
}

const hasPreviousWhereUrgente = (filters, type) => {
    if(type === 'an') 
        return false;
    if(type === 'urgenta') 
        return hasTypeUrgente(filters,'an') ;
}

const hasTypeUrgente = (filters, type) => {
    console.log(filters[type]);
    return filters[type] !== undefined;
}

//---------------------------------------------
// pt tabela urgente_drog

export const GetStatisticsUrgente_drog = (an, drog, callback) => {
    const querry = GetStatisticsUrgente_drogQuery(an, drog);
    const db = new sqlite3.Database(dbFilePath);

    if (drog) {
        drog = decodeURIComponent(drog);
    }
    console.log(`Executing '${querry}'`);
    
    db.all(
        querry, 
        {
            $an: an,
            $drog: drog,
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            db.close();
            callback(rows);
        }
    );
    return querry;
}

const GetStatisticsUrgente_drogQuery = (an, drog ) => {
    let querry = "select * from urgente_drog";
    let hasFilters = an || drog;
    let filters = {
        an: an, 
        drog: drog
    }
    if(hasFilters) {
        querry = `${querry} where`;
        if(an) {
            querry = `${querry} an = $an`
        }
        if(drog) {
            if(hasPreviousWhereUrgente_drog(filters, 'drog'))
                querry =`${querry} and`
            querry = `${querry} drog = $drog`
        }
    }
    querry = `${querry} order by an desc`;
    return querry;
}

const hasPreviousWhereUrgente_drog = (filters, type) => {
    if(type === 'an') 
        return false;
    if(type === 'drog') 
        return hasTypeUrgente_drog(filters,'an') ;
}

const hasTypeUrgente_drog = (filters, type) => {
    console.log(filters[type]);
    return filters[type] !== undefined;
}

export const getDate = () => {
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    return date + "-" + month + "-" + year;
}




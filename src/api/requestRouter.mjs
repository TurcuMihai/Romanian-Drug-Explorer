import { GetAni, GetDroguri, GetStatisticsConfiscari, GetStatisticsConfiscariAni, GetStatisticsCercetariAni , GetStatisticsPedepseAni,
GetPedepse, GetPersoane, GetStatisticsCercetari, GetStatisticsUrgente_gen, GetStatisticsPedepse, GetStatisticsUrgente_drog, GetUrgente_drog, GetStatisticsUrgente, 
GetUrgente, GetLocatii, GetStatisticsUrgenteAni,GetStatisticsProiecte, GetStatisticsCampanii, GetNumeCampanii, GetStatisticsCondamnari, GetStatisticsActivitatiAni, 
GetStatisticsCampaniiAni, GetStatisticsActivitati, GetUsers, getDate} from "./statistics.mjs";
import {getParams} from '../utilities.mjs';
import { decodeToken, loginUser, registerUser } from "./login.mjs";
import fs from 'fs';
import crypto from 'crypto';
import sqlite3 from 'sqlite3';
const dbFilePath = "../database.db";


export const routeRequest = (req, response) => {
   
    if(req.method === 'POST' && req.url === '/api/authenticate_user') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();

            const auth_payload = JSON.parse(body);
            const username = auth_payload["USERNAME"];
            const password = auth_payload["PASSWORD"];

            loginUser(username, password, (token) => {
                if(token === "NOT_AUTHORIZED") {
                    response.writeHead(401, { 'Content-Type': 'application/json' });
                    response.write(token);
                    response.end();
                } else {
                    updateDate(username);
                    response.write(token);
                    response.end();
                }
            });
        });
    }
    else if(req.method === 'POST' && req.url === '/api/register_user') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();

            const auth_payload = JSON.parse(body);
            const username = auth_payload["USERNAME"];
            const password = auth_payload["PASSWORD"];

            registerUser(username, password, (status) => {
                if(status == "OK") {
                    updateDate(username);
                }
                response.write(status);
                response.end();
            });
        });

    }
    else if(req.method === 'GET' && req.url === '/api/check_auth') {
        try {
            const authorizationToken = req.headers['authorization'].replace("Bearer ", "");
            console.log(decodeToken(authorizationToken));

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(decodeToken(authorizationToken).username);
            response.end();
        } catch(ex) {
            response.writeHead(401, { 'Content-Type': 'application/json' });
            response.write('');
            response.end();
        }
    }
     else if (req.method === 'GET' && req.url.includes('/api/statistics/droguri')) {
        GetDroguri((rows) => {
          const droguri = [];
          for (let i = 0; i < rows.length; i++) {
            droguri.push(rows[i]["nume_drog"]);
          }
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(droguri));
          response.end();
        });
    }      
    else if(req.method === 'GET' && req.url === '/api/statistics/ani') {
        GetAni((rows)=>{
            const ani = [];
            for( let i=0;i<rows.length;i++)
                ani.push(rows[i]["an"]);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(ani));
            response.end();
        });
    } 
    else if(req.method === 'GET' && req.url === '/api/statistics/persoane') {
        GetPersoane((rows)=>{
            const ani = [];
            for( let i=0;i<rows.length;i++)
                ani.push(rows[i]["tip_persoane"]);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(ani));
            response.end();
        });
    } 
    else if(req.method === 'GET' && req.url === '/api/statistics/pedepse') {
        GetPedepse((rows)=>{
            const ani = [];
            for( let i=0;i<rows.length;i++)
                ani.push(rows[i]["hotarare"]);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(ani));
            response.end();
        });
    } 
    else if(req.method === 'GET' && req.url.includes('/api/statistics/confiscari_tabel')) {
        const params = getParams(req);
        GetStatisticsConfiscari(
            params['an'],
            params['nume_drog'],
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    } 
    else if(req.method === 'GET' && req.url.includes('/api/statistics/confiscari_bar')) {
        const params = getParams(req);
        GetStatisticsConfiscari(
            params['an'],
            undefined,
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    }  
    else if(req.method === 'POST' && req.url === '/api/statistics/confiscari_generate_csv') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            const params = JSON.parse(body);
            GetStatisticsConfiscari(
                params['an'],
                params['nume_drog'],
                (rows, rowsCount) => {
                    const file = `${crypto.randomUUID()}.csv`;
                    try { fs.mkdirSync('static/files'); } catch(e) { }
                    let csv_table = `an,nume_drog,grame,nr_capturi\n`;
                    for(let i = 0; i < rows.length; i++) {
                        const row = rows[i];
                        csv_table += `${row['an']},${row['nume_drog']},${row['grame']},${row['nr_capturi']}\n`;
                    }
                    fs.writeFile(`static/files/${file}`, csv_table, err => {
                        if (err) {
                          console.error(err);
                        }
                      });
                    response.writeHead(200, { 'Content-Type': 'application/text' });
                    response.write(`/files/${file}`);
                    response.end();
                }
            );
        });
    } 
    else if(req.method === 'GET' && req.url.includes('/api/statistics/confiscari_line')) {
        GetStatisticsConfiscariAni(
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    } 
    else if(req.method === 'GET' && req.url.includes('/api/statistics/infractiuni_line')) {
            GetStatisticsCercetariAni(
                (rows, rowsCount) => {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(
                        JSON.stringify({
                            'elements': rows,
                            'totalCount': rowsCount
                        })
                    );
                    response.end();
                }
            );
    } 
    else if(req.method === 'GET' && req.url.includes('/api/statistics/infractiuni_bar')) {
            GetStatisticsPedepseAni(
                (rows, rowsCount) => {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(
                        JSON.stringify({
                            'elements': rows,
                            'totalCount': rowsCount
                        })
                    );
                    response.end();
                }
            );
    }
    else if(req.method === 'GET' && req.url.includes('/api/statistics/cercetari_tabel')) {
        const params = getParams(req);
        GetStatisticsCercetari(
            params['an'],
            params['tip_persoane'],
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    } 
    else if(req.method === 'GET' && req.url.includes('/api/statistics/pedepse_tabel')) {
        const params = getParams(req);
        GetStatisticsPedepse(
            params['an'],
            params['hotarare'],
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    }
    else if(req.method === 'GET' && req.url.includes('/api/statistics/infractiuni_pie')) {
        const params = getParams(req);
        GetStatisticsCondamnari(
            params['an'],
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    }
    else if(req.method === 'POST' && req.url === '/api/statistics/cercetari_generate_csv') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            const params = JSON.parse(body);
            GetStatisticsCercetari(
                params['an'],
                params['tip_persoane'],
                (rows, rowsCount) => {
                    const file = `${crypto.randomUUID()}.csv`;
                    try { fs.mkdirSync('static/files'); } catch(e) { }
                    let csv_table = `an,tip_persoane,nr_persoane\n`;
                    for(let i = 0; i < rows.length; i++) {
                        const row = rows[i];
                        csv_table += `${row['an']},${row['tip_persoane']},${row['nr_persoane']}\n`;
                    }
                    fs.writeFile(`static/files/${file}`, csv_table, err => {
                        if (err) {
                          console.error(err);
                        }
                      });
                    response.writeHead(200, { 'Content-Type': 'application/text' });
                    response.write(`/files/${file}`);
                    response.end();
                }
            );
        });
    } 
    else if(req.method === 'POST' && req.url === '/api/statistics/pedepse_generate_csv') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            const params = JSON.parse(body);
            GetStatisticsPedepse(
                params['an'],
                params['hotarare'],
                (rows, rowsCount) => {
                    const file = `${crypto.randomUUID()}.csv`;
                    try { fs.mkdirSync('static/files'); } catch(e) { }
                    let csv_table = `an,hotarare,nr_pedepse\n`;
                    for(let i = 0; i < rows.length; i++) {
                        const row = rows[i];
                        csv_table += `${row['an']},${row['hotarare']},${row['nr_pedepse']}\n`;
                    }
                    fs.writeFile(`static/files/${file}`, csv_table, err => {
                        if (err) {
                          console.error(err);
                        }
                      });
                    response.writeHead(200, { 'Content-Type': 'application/text' });
                    response.write(`/files/${file}`);
                    response.end();
                }
            );
        });
    } 
    else if(req.method === 'GET' && req.url.includes('/api/statistics/infractiuni_cercetari')) {
        const params = getParams(req);
        GetStatisticsCercetari(
            params['an'],
            undefined,
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    }
    else if(req.method === 'GET' && req.url.includes('/api/statistics/infractiuni_pedepse')) {
        const params = getParams(req);
        GetStatisticsPedepse(
            params['an'],
            undefined,
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
    }
    else if(req.method === 'GET' && req.url.includes('/api/statistics/prevenire_line')) {
        GetStatisticsCampaniiAni(
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
} 
else if(req.method === 'GET' && req.url.includes('/api/statistics/prevenire_bar')) {
        GetStatisticsActivitatiAni(
            (rows, rowsCount) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                    JSON.stringify({
                        'elements': rows,
                        'totalCount': rowsCount
                    })
                );
                response.end();
            }
        );
}
else if(req.method === 'GET' && req.url === '/api/statistics/locatii') {
    GetLocatii((rows)=>{
        const locatii = [];
        for( let i=0;i<rows.length;i++)
            locatii.push(rows[i]["locatie"]);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(locatii));
        response.end();
    });
} 
else if(req.method === 'GET' && req.url.includes('/api/statistics/activitati_tabel')) {
    const params = getParams(req);
    GetStatisticsActivitati(
        params['an'],
        params['locatie'],
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
}
else if(req.method === 'GET' && req.url.includes('/api/statistics/campanii_tabel')) {
    const params = getParams(req);
    GetStatisticsCampanii(
        params['an'],
        params['nume'],
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
}
else if(req.method === 'GET' && req.url.includes('/api/statistics/nume_campanii')) {
    GetNumeCampanii((rows)=>{
        const nume = [];
        for( let i=0;i<rows.length;i++)
        nume.push(rows[i]["nume"]);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(nume));
        response.end();
    });
}
else if(req.method === 'GET' && req.url.includes('/api/statistics/prevenire_campanii')) {
    const params = getParams(req);
    GetStatisticsCampanii(
        params['an'],
        undefined,
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
} 
else if(req.method === 'GET' && req.url.includes('/api/statistics/prevenire_proiecte')) {
    const params = getParams(req);
    GetStatisticsProiecte(
        params['an'],
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
} 
else if(req.method === 'POST' && req.url === '/api/statistics/activitati_generate_csv') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
        const params = JSON.parse(body);
        GetStatisticsActivitati(
            params['an'],
            params['locatie'],
            (rows, rowsCount) => {
                const file = `${crypto.randomUUID()}.csv`;
                try { fs.mkdirSync('static/files'); } catch(e) { }
                let csv_table = `an,locatie,nr_activitati\n`;
                for(let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    csv_table += `${row['an']},${row['locatie']},${row['nr_activitati']}\n`;
                }
                fs.writeFile(`static/files/${file}`, csv_table, err => {
                    if (err) {
                      console.error(err);
                    }
                  });
                response.writeHead(200, { 'Content-Type': 'application/text' });
                response.write(`/files/${file}`);
                response.end();
            }
        );
    });
} 
else if(req.method === 'POST' && req.url === '/api/statistics/campanii_generate_csv') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
        const params = JSON.parse(body);
        GetStatisticsCampanii(
            params['an'],
            params['nume'],
            (rows, rowsCount) => {
                const file = `${crypto.randomUUID()}.csv`;
                try { fs.mkdirSync('static/files'); } catch(e) { }
                let csv_table = `an,nume,nr_beneficiari\n`;
                for(let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    csv_table += `${row['an']},${row['nume']},${row['nr_beneficiari']}\n`;
                }
                fs.writeFile(`static/files/${file}`, csv_table, err => {
                    if (err) {
                      console.error(err);
                    }
                  });
                response.writeHead(200, { 'Content-Type': 'application/text' });
                response.write(`/files/${file}`);
                response.end();
            }
        );
    });
} 
else if(req.method === 'GET' && req.url.includes('/api/statistics/urgente_line')) {
    GetStatisticsUrgenteAni(
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
} 
else if(req.method === 'GET' && req.url === '/api/statistics/urgente') {
    GetUrgente((rows)=>{
        const urgente = [];
        for( let i=0;i<rows.length;i++)
        urgente.push(rows[i]["urgenta"]);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(urgente));
        response.end();
    });
}
else if(req.method === 'GET' && req.url.includes('/api/statistics/urgente_tabel')) {
    const params = getParams(req);
    GetStatisticsUrgente(
        params['an'],
        params['urgenta'],
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
} 
else if(req.method === 'GET' && req.url === '/api/statistics/tip_droguri') {
    GetUrgente_drog((rows)=>{
        const tip_droguri = [];
        for( let i=0;i<rows.length;i++)
        tip_droguri.push(rows[i]["drog"]);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(tip_droguri));
        response.end();
    });
}
else if(req.method === 'GET' && req.url.includes('/api/statistics/urgente_drog_tabel')) {
    const params = getParams(req);
    GetStatisticsUrgente_drog(
        params['an'],
        params['drog'],
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
} 
else if(req.method === 'GET' && req.url.includes('/api/statistics/urgente_pie')) {
    const params = getParams(req);
    GetStatisticsUrgente_gen(
        params['an'],
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
}
else if(req.method === 'GET' && req.url.includes('/api/statistics/urgente_bar')) {
    const params = getParams(req);
    GetStatisticsUrgente(
        params['an'],
        undefined,
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
}
else if(req.method === 'GET' && req.url.includes('/api/statistics/urgente_drog_bar')) {
    const params = getParams(req);
    GetStatisticsUrgente_drog(
        params['an'],
        undefined,
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
}
else if(req.method === 'POST' && req.url === '/api/statistics/urgente_generate_csv') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
        const params = JSON.parse(body);
        GetStatisticsUrgente(
            params['an'],
            params['urgenta'],
            (rows, rowsCount) => {
                const file = `${crypto.randomUUID()}.csv`;
                try { fs.mkdirSync('static/files'); } catch(e) { }
                let csv_table = `an,urgenta,nr_urgente\n`;
                for(let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    csv_table += `${row['an']},${row['urgenta']},${row['nr_urgente']}\n`;
                }
                fs.writeFile(`static/files/${file}`, csv_table, err => {
                    if (err) {
                      console.error(err);
                    }
                  });
                response.writeHead(200, { 'Content-Type': 'application/text' });
                response.write(`/files/${file}`);
                response.end();
            }
        );
    });
} 
else if(req.method === 'POST' && req.url === '/api/statistics/urgente__drog_generate_csv') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
        const params = JSON.parse(body);
        GetStatisticsUrgente_drog(
            params['an'],
            params['drog'],
            (rows, rowsCount) => {
                const file = `${crypto.randomUUID()}.csv`;
                try { fs.mkdirSync('static/files'); } catch(e) { }
                let csv_table = `an,drog,nr_urgente\n`;
                for(let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    csv_table += `${row['an']},${row['drog']},${row['nr_urgente']}\n`;
                }
                fs.writeFile(`static/files/${file}`, csv_table, err => {
                    if (err) {
                      console.error(err);
                    }
                  });
                response.writeHead(200, { 'Content-Type': 'application/text' });
                response.write(`/files/${file}`);
                response.end();
            }
        );
    });
} 
else if(req.method === 'GET' && req.url.includes('/api/statistics/users_tabel')) {
    GetUsers(
        (rows, rowsCount) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(
                JSON.stringify({
                    'elements': rows,
                    'totalCount': rowsCount
                })
            );
            response.end();
        }
    );
}

}

function updateDate (username) {
    const db = new sqlite3.Database(dbFilePath);
   
    db.all(
        'update users set last_login = $last_login where username=$username;', 
        {
            $username: username,
            $last_login: getDate(),
        },
        (err, rows) => {
            if(err)
            {
                console.log(err);
            }
            db.close();

        }
    );
}


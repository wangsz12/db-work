import { createConnection } from 'mysql';

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dbwork',
});

export function executeSQL(query: string) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      console.log('err, res: ', err, res);
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

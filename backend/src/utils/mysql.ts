import { createConnection } from 'mysql';

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dbwork',
});

export function executeSQL(
  query: string,
  values?: unknown[],
): Promise<any> | Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

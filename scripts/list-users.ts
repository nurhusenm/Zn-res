import Database from 'better-sqlite3';

const db = new Database('sqlite.db');

const users = db.prepare('SELECT id, email, name, role FROM users').all();

console.log('Users in database:');
console.table(users); 
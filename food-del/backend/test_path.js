import path from 'path';
console.log("CWD:", process.cwd());
console.log("Resolved Uploads:", path.resolve("..", "uploads"));
const p = path.resolve("..", "uploads");
import fs from 'fs';
console.log("Exists:", fs.existsSync(p));
if (fs.existsSync(p)) {
    console.log("Files:", fs.readdirSync(p).slice(0, 5));
}

const dotenv = require('dotenv');

dotenv.config();

console.log("Enviroment:", process.env || 'development');
console.log("DB Host:", process.env.MYSQL_HOST);
console.log("Database URL:", process.env.DATABASE_URL || 'not set');
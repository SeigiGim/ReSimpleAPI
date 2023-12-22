// config.js

const portFromEnv = parseInt(process.env.PORT, 10);
const PORT = !isNaN(portFromEnv) ? portFromEnv : 3000;

module.exports = { PORT };

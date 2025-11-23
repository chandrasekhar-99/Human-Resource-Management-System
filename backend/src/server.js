const { sequelize } = require('./models');
require("dotenv").config();
const app = require("./app");
const {info, warn, error} = require('./utils/logger');

const PORT = process.env.PORT || 5000;

(async function start() {
  try {
    await sequelize.authenticate();
    info('DB connected');
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => info(`Server started on http://localhost:${PORT}`));
  } catch (err) {
    error('Failed to start:', err);
    process.exit(1);
  }
})();
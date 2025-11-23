const Log = require('../models/log.model');

const addLog = async (userId, action, details = null) => {
  try {
    const timestamp = new Date().toISOString();
    const logDetails = details ? (typeof details === 'string' ? details : JSON.stringify(details)) : '';
    await Log.create({
      userId,
      action: `[${timestamp}] User '${userId}' ${action}${logDetails ? ' with details: ' + logDetails : ''}`
    });
  } catch (err) {
    console.error('Failed to write log:', err.message);
  }
};

module.exports = { addLog };




function time() { return new Date().toISOString(); }
const info = (...args) => console.log('[INFO]', time(), ...args);
const warn = (...args) => console.warn('[WARN]', time(), ...args);
const error = (...args) => console.error('[ERROR]', time(), ...args);

module.exports = { info, warn, error };

const emitter = require('../events/emitter');

const { addRecord } = require('../events/record.event');

emitter.on('addRecord', addRecord);

module.exports = emitter;
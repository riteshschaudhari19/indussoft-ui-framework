'use strict';

const uiEngine = require('..');
const assert = require('assert').strict;

assert.strictEqual(uiEngine(), 'Hello from uiEngine');
console.info('uiEngine tests passed');

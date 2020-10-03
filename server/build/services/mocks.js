'use strict';

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let randomName = _faker2.default.name.findName(); // Rowan Nikolaus
let randomEmail = _faker2.default.internet.email(); // Kassandra.Haley@erich.biz
let randomCard = _faker2.default.helpers.createCard(); // random contact card containing many properties

console.log(randomCard, randomEmail, randomName);
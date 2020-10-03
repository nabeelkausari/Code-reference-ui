'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CounterSchema = (0, _mongoose.Schema)({
  id: { type: String, required: true },
  seq: { type: Number }
});

exports.default = _mongoose2.default.model('Counter', CounterSchema);
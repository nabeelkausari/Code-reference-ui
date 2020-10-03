'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSequence = require('mongoose-sequence');

var _mongooseSequence2 = _interopRequireDefault(_mongooseSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AutoIncrement = (0, _mongooseSequence2.default)(_mongoose2.default);

const CategorySchema = new _mongoose.Schema({
  name: String
});

CategorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

exports.default = _mongoose2.default.model('Category', CategorySchema);
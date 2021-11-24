"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.get('/', (request, response) => response.json({
  message: 'Teste 1'
}));
app.listen(5050, () => console.log('App conectado na porta 5050'));
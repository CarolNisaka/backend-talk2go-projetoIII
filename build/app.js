"use strict";

var _express = _interopRequireWildcard(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongodbConfig = _interopRequireDefault(require("./database/mongodbConfig"));

var _routes = _interopRequireDefault(require("./routes"));

var _mapearRequest = _interopRequireDefault(require("./middlewares/mapearRequest"));

var _errorHandling = _interopRequireDefault(require("./middlewares/errorHandling"));

var _pagNaoEncontrada = _interopRequireDefault(require("./middlewares/pagNaoEncontrada"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv.default.config();

const app = (0, _express.default)();
(0, _mongodbConfig.default)(); //21) colocar o json no body para as rotas com post

app.use(_express.default.json()); //17) Middlewares - levei eles pra pasta correta

app.use(_mapearRequest.default); //20) Middleware de configuracao de rotas

app.use('/api', _routes.default); //18) Middlewares de erros -  Todas as rotas devem estar em cima desse midleware pra poder cair aqui.

app.use(_errorHandling.default); //19) Middleware de rota nao encontrada

app.use(_pagNaoEncontrada.default);
app.listen(process.env.PORT, () => console.log(`App conectado na porta ${process.env.PORT}`));
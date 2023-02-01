const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
require('dotenv').config();
// const extractBearerToken = (header) => header.replace('Bearer ', '');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, _, next) => {
  console.log(req.rawHeaders);
  // закоментированный код не работает - никто не отвечает почему
  // const { Authorization } = req.headers;

  // if (!Authorization || !Authorization.startsWith('Bearer ')) {
  //   next(new UnauthorizedError('Требуется авторизация'));
  // }
  // const token = extractBearerToken(Authorization);

  // иначе не работает авторизация. Причину не нашел - в request не приходят заголовки (headers)
  const token = req.rawHeaders.find((el) => el.match('jwt')) ? req.rawHeaders.find((el) => el.match('jwt')).replace('jwt=', '') : 0;
  // const token = jwt.sign(
  //   { _id: user._id },
  //   NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
  // );

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, { expiresIn: '7d' }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    // payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
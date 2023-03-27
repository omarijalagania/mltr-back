"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compassMongoConnection = exports.atlasMongoConnection = void 0;
const compassMongoConnection = () => {
  const {
    MONGO_PROTOCOL,
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_PORT
  } = process.env;
  return `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
};
exports.compassMongoConnection = compassMongoConnection;
const atlasMongoConnection = () => {
  const {
    MONGO_PROTOCOL,
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD
  } = process.env;
  return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`;
};
exports.atlasMongoConnection = atlasMongoConnection;
export const compassMongoConnection = () => {
  const { MONGO_PROTOCOL, MONGO_HOST, MONGO_DATABASE, MONGO_PORT } = process.env
  return `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
}

export const atlasMongoConnection = () => {
  const {
    MONGO_PROTOCOL,
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD,
  } = process.env
  return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`
}

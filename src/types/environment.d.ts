export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT?: string
      TOKEN_SECRET: string
      CLIENT_URL: string
      JWT_SECRET: string
      MONGO_PROTOCOL: string
      MONGO_DATABASE: string
      MONGO_PORT?: number
      MONGO_USER: string
      MONGO_PASSWORD: number
      MONGO_PARAMS: number
      MONGO_HOST: string

      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string

      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
    }
  }
}

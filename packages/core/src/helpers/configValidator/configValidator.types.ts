export interface ConfigErrorMessage {
  location: string
  message: string
}

export interface ConfigError {
  configKey: string
  messages: ConfigErrorMessage[]
}

import themeCfg from './_theme'
import systemCfg from './_system'

export default new class Config {
  constructor() {
    this.systemCfg = systemCfg
    this.themeCfg = themeCfg
  }
}()

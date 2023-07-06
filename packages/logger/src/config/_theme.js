import figures from 'figures'
import chalk from 'chalk'

export default {
  console: {
    log: {
      prefix: '',
      prefixBgHex: '#fff',
      prefixColorHex: '#fff',
      contentColorHex: '#fff',
    },
    debug: {
      prefix: ` ${figures.star}  Debug: `,
      prefixBgHex: '#4b4b4b',
      prefixColorHex: '#ffffff',
      contentColorHex: '#7a7a7a',
    },
    info: {
      prefix: ` ${figures.info}  Info:  `,
      prefixBgHex: '#92e1fe',
      prefixColorHex: '#000000',
      contentColorHex: '#92e1fe',
    },
    warn: {
      prefix: ` ${figures.warning}  Warn:  `,
      prefixBgHex: '#fed96d',
      prefixColorHex: '#000000',
      contentColorHex: '#fed96d',
    },
    error: {
      prefix: ` ${figures.warning}  Error: `,
      prefixBgHex: '#ee3d2a',
      prefixColorHex: '#fff',
      contentColorHex: '#ee3d2a',
    },
  },
  yarn: {
    status: {
      textColorHex: '#00B294',
      descColorHex: '#5D5A58',
      bracketColorHex: '#018574',
      bracketStatusColorHex: '#DA3B01',
      symbolOK: chalk.greenBright(figures.tick),
      symbolFail: chalk.redBright(figures.cross),
      symbolWarning: chalk.yellowBright(figures.warning),
      symbolInfo: chalk.blueBright(figures.info),
    },
    info: {
      textColorHex: '#FF8C00',
      valueColorHex: '#FF8C00',
      bracketColorHex: '#DA3B01',
    },
  },
}

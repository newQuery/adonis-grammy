import { Bot } from 'grammy'
import { Agent } from 'node:https'
import env from '#start/env'

const bot = new Bot(env.get('AI_TELEGRAM_BOT_TOKEN'), {
  client: {
    apiRoot: 'https://api.hustler.su',
    baseFetchConfig: {
      compress: true,
      agent: new Agent({
        keepAlive: true,
        rejectUnauthorized: false,
      }),
    },
  },
})

bot.command('start', (ctx) => ctx.reply('TEST'))

export default bot

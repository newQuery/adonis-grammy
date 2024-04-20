/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import bot from '#models/bot'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { webhookCallback } from 'grammy'
import { Update } from 'grammy/types'

router
  .group(() => {
    router.post('telegram-bot', ({ request, response }: HttpContext) => {
      const callback = (req: any, res: any) => {
        return {
          update: Promise.resolve(req.toJSON().body as Update),
          respond: (json: any) => {
            res.header('Content-Type', 'application/json')
            res.send(json)
          },
          unauthorized: () => {
            res.unauthorized()
          },
        }
      }
      return webhookCallback(bot, callback(request, response))
    })
  })
  .prefix('webhooks')

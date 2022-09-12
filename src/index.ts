import app from './app'
import { logger } from './logger'

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server running on port:3000`)
})

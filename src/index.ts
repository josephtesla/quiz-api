import app from './app'
import { logger } from './logger'

import './db'
import { Config } from './config'

const port = Config.PORT || 5000
app.listen(port, () => {
  logger.info(`Server running on port: ${port}`)
})

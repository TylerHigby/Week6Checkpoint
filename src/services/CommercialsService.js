import { AppState } from "../AppState.js"
import { Commercial } from "../models/Commercial.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommercialsService {

  async getCommercials() {
    const res = await api.get('api/ads')
    // logger.log(res.data)
    AppState.commercials = res.data.map(commercial => new Commercial(commercial))
  }

}

export const commercialsService = new CommercialsService()

import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js";
import { Profile } from "../models/Profile.js"
class ProfilesService {
  async getProfileById(profileId) {
    AppState.activeProfile = null
    const res = await api.get(`api/profiles/${profileId}`)
    logger.log(res.data)
    AppState.activeProfile = new Profile(res.data)
  }
}

export const profilesService = new ProfilesService()
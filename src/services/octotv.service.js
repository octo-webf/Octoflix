import axios from 'axios'
const OCTOTV_API = 'https://tv.octo.com/api/v2/'

const defaultHttpClient = axios.create({
  baseURL: OCTOTV_API
})

export default class OctoTvService {
  constructor (httpClient = defaultHttpClient) {
    this.httpClient = httpClient
  }
  async getVideos (categoryId) {
    const result = await this.httpClient.get(`channels/content/?parent_oid=${categoryId}`)
    if (!result.data || !result.data.success) {
      throw new Error('Unknown error')
    }
    return result.data.videos
  }
  async getCategories () {
    const result = await this.httpClient.get('channels/tree/')
    if (!result.data || !result.data.success) {
      throw new Error('Unknown error')
    }
    return result.data.channels
  }
  async getVideoInformations (videoId) {
    const result = await axios.httpClient.get(`medias/modes/?oid=${videoId}&html5=mp4`)
    if (!result.data || !result.data.success || result.data.names.length === 0) {
      throw new Error('Unknown error')
    }
    return result.data
  }
}

import axios from 'axios'

const OCTOTV_API = 'https://tv.octo.com/api/v2'

const getCategories = async () => {
  const result = await axios.get(`${OCTOTV_API}/channels/tree/`)
  return result.data.channels
}

const getVideos = async () => {
  return await axios.get(`${OCTOTV_API}/channels/content/?parent_oid=c124cd0c0f8f2cu50e8j`)
}

const getVideoInformations = async () => {
  return await axios.get(`${OCTOTV_API}/medias/modes/?oid=v125ce7058895jido9lx&html5=mp4`)
}

export default {
  getCategories,
  getVideoInformations,
  getVideos
}

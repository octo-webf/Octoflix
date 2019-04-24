import axios from 'axios'

const OCTOTV_API = 'https://tv.octo.com/api/v2'
const categoryList = {
  c124ccf81539cwmir14k: { name: 'Actualités' },
  c124cd0c0f8f2cu50e8j: { name: 'BOFs' },
  c125159f81d17p0als7b: { name: 'Externe' },
  c124ccf81532boogbh2m: { name: 'Matinales' },
  c124f23e8c015v7knn09: { name: 'Octo Academy' }
}

const getCategoryInformations = (category_oid) => {
  return categoryList[category_oid]
}

const getCategories = async () => {
  try {
    const result = await axios.get(`${OCTOTV_API}/channels/tree/`)
    if (!result.data || !result.data.success) {
      throw new Error('Unknown error')
    }
    return result.data.channels
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getVideos = async (categoryId) => {
  try {
    const result = await axios.get(`${OCTOTV_API}/channels/content/?parent_oid=${categoryId}`)
    if (!result.data || !result.data.success) {
      throw new Error('Unknown error')
    }
    return result.data.videos
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getVideoInformations = async (videoId) => {
  try {
    const result = await axios.get(`${OCTOTV_API}/medias/modes/?oid=${videoId}&html5=mp4`)
    if (!result.data || !result.data.success || result.data.names.length === 0) {
      throw new Error('Unknown error')
    }
    return result.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export default {
  getCategories,
  getCategoryInformations,
  getVideoInformations,
  getVideos
}

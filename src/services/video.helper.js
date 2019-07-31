const categoryList = {
  c124ccf81539cwmir14k: { name: 'Actualités' },
  c124cd0c0f8f2cu50e8j: { name: 'BOFs' },
  c125159f81d17p0als7b: { name: 'Externe' },
  c124ccf81532boogbh2m: { name: 'Matinales' },
  c124f23e8c015v7knn09: { name: 'Octo Academy' }
}

const getVideoURL = video => {
  return video && video.names && video.names[0] && video[video.names[0]] && video[video.names[0]].html5
}

const calculateTime = (minutes, seconds) => {
  return minutes * 60 + seconds
}
const getVideoTime = time => {
  const minutes = parseInt(time.replace(/(\d{2}) m (\d{2}) s/, '$1'))
  const seconds = parseInt(time.replace(/(\d{2}) m (\d{2}) s/, '$2'))
  return calculateTime(minutes, seconds)
}

const getCategoryInformations = categoryOid => {
  return categoryList[categoryOid]
}

export default {
  getCategoryInformations,
  getVideoTime,
  getVideoURL
}

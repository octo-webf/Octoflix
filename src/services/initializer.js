import axios from 'axios'

const OCTOTV_API = 'https://tv.octo.com/api/v2/channels'


const ulrToCache = [
  `${OCTOTV_API}/tree`,
  `${OCTOTV_API}/content/?parent_oid=c124cd0c0f8f2cu50e8j`,
  `${OCTOTV_API}/content/?parent_oid=c125159f81d17p0als7b`,
  `${OCTOTV_API}/content/?parent_oid=c124ccf81539cwmir14k`,
  `${OCTOTV_API}/content/?parent_oid=c124ccf81532boogbh2m`,
  `${OCTOTV_API}/content/?parent_oid=c124f23e8c015v7knn09`,
]


const init = () => {
  try {
    ulrToCache.forEach(url => {
      axios.get(url)
    })
  } catch (e) {
    console.log(e)
    throw e
  }
}

export default {
  init
}

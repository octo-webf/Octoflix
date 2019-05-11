import axios from 'axios'

const PUSH_SERVER_API = ''

const register = async (id) => {
  console.log('registered')
  console.log(id)
  return
  const result = await axios.post(`${PUSH_SERVER_API}/register/?parent_oid=${categoryId}`)
  return result
}

export default {
  register
}

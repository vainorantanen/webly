import axios from 'axios'
const baseUrl = '/api/confirm-email'

const create = async (object) => {
  const request = await axios.post(`${baseUrl}/${object.id}/${object.token}`, object)
  return request.data
}

const send = async (object) => {
    const request = await axios.post(`${baseUrl}`, object)
    return request.data
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default { create, send }
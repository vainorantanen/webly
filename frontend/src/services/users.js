import axios from 'axios'
const baseUrl = '/api/users'
import storageService from './storage'

const headers = {
  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}

const getAllUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object)
  return request.data
}

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, { headers })
  return request.data
}

export default { getAllUsers, create, update }
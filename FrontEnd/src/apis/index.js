import axios from 'axios'
import API_ROOT from '~/utils/constants'

export const fetchBoardDetailsAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${id}`)
  return response.data
}
import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getProducts() {
    return apiHelper.get('/index', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getCategories() {
    return apiHelper.get('/categories', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
}

import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
    getCategories() {
        return apiHelper.get('/getallcategories')
    },
    getProductsByCategory(whereQuery) {
        const searchParams = new URLSearchParams(whereQuery)

        // 判斷有沒有token時要return時帶不帶header，避免沒有token時產生Bearer null這種值送到後端，這樣後端可能會以為妳有給token，但事實上是null，導致後端掛掉
        if (getToken()) {
            return apiHelper.get(`/categories?${searchParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        } else {
            return apiHelper.get(`/categories?${searchParams.toString()}`)
        }
    },
    getProductDetail({ productId }) {
        // 判斷有沒有token時要return時帶不帶header，避免沒有token時產生Bearer null這種值送到後端，這樣後端可能會以為妳有給token，但事實上是null，導致後端掛掉
        if (getToken()) {
            return apiHelper.get(`/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        } else {
            return apiHelper.get(`/products/${productId}`)
        }
    }
}

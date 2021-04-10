import axios from 'axios'
import cons from '../constants'

const configuredAxios = axios.create({
    baseURL: cons.BASE_URL,
})

export default configuredAxios
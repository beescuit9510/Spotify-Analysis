import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://api.spotify.com',
})

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token'
    )}`
    return config
  },
  (err) => console.log(err)
)

export const http = {
  get: function get<Response = unknown>(url: string, config = {}) {
    return axios.get<Response>(url, config).then((res) => res.data)
  },
  post: function post<Request = any, Response = unknown>(
    url: string,
    data?: Request
  ) {
    return axios.post<Response>(url, { data }).then((res) => res.data)
  },
}

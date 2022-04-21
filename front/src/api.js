import axios from 'axios'

const Axios = axios.create({
  //   baseURL: 'http://j6c205.p.ssafy.io:8080',
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':
    // 'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
    // 'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
    // 'Access-Control-Max-Age': '3600',
  },
})

const getAxios = () => {
  return Axios
}

export { getAxios }

import axios from 'axios'

const Axios = axios.create({
  //   baseURL: 'http://j6c205.p.ssafy.io:8080',
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  },
})

const getAxios = () => {
  // const token = sessionStorage.getItem('token')
  // Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return Axios
}

export { getAxios }

import axios from 'axios'

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const BASE_URL =  '/api'

// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_URL, // 基础 API 地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 请求前处理（如添加token）
    // const token = localStorage.getItem('token') || ''
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3QuamluemhpeXVucy5jb20iLCJzdWIiOiJlYzJiNzVjNzc0NzQwMDAwYTdlNDMzMWJjMDNhNzhjNyIsImlhdCI6MTc0OTQ1MTY2OSwiZXhwIjoxNzQ5NDk0ODY5LCJFbWFpbCI6IjU3ODQxMDg0MEBxcS5jb20iLCJEaXNwbGF5TmFtZSI6Iui2hee6p-euoeeQhuWRmCIsIlVzZXJOYW1lIjoiYWRtaW5pc3RyYXRvciIsIkF2YXRhciI6Ii9zdG9yYWdlcy9Pcmdhbml6YXRpb25zL01lbWJlci9BdmF0YXJzLzYzYzNmYzYwZmRhNjQ4ZjNiNGI3ZjU1NGJlYWEwM2U4L-mHkem5iueuoeeQhuWRmC5qcGc_XzIwMDUwNDIwNDUyMTQ9MTY2NzIwOTIxODMyNSIsIklkIjoidE9jYjdFbThPaVY1Y3pqZ3cwa0kiLCJUeXBlIjoiTWVtYmVyIiwiT3JnYW5pemF0aW9uTmFtZSI6IumHkem5iumbhuWboiJ9.ddPp5n0v3wehX06MDfWpgJ31tzfXOcTvWhRJpifFdj4'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做处理
    // 假设后端返回格式为 { code: number, data: any, message: string }
    const data = response.data
    
    if (data.code === 200 || data.code === 0) {
      return data.data
    } else {
      // 处理业务错误
      return Promise.reject(new Error(data.message || 'Error'))
    }
  },
  (error) => {
    // 处理HTTP错误
    if (error.response) {
      const status = error.response.status
      let message = ''
      
      switch (status) {
        case 400:
          message = '请求错误'
          break
        case 401:
          message = '未授权，请登录'
          // router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求地址不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = '网络错误'
      }
      
      console.error(message)
    }
    return Promise.reject(error)
  }
)

// 封装通用请求方法
const request = {
  get(url, params, config) {
    return service.get(url, { params, ...config })
  },

  post(url, data, config) {
    return service.post(url, data, config)
  },

  put(url, data, config) {
    return service.put(url, data, config)
  },

  delete(url, params, config) {
    return service.delete(url, { params, ...config })
  },

  upload(url, file, data) {
    const formData = new FormData()
    formData.append('file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default request
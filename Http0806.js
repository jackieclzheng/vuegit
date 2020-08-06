import axios from 'axios'
import service from './contactApi'
const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000
})

const Http0806 = {}
for (const key in service) {
  const api = service[key]
  Http0806[key] = async function (
    params,
    isFormData = false,
    config = {}
  ) {
    let response = {}
    let newParams = {}
    // 如果是isFormData是真，则将newParams初始化为FormData，如果isFormData是假，则newParams等于params
    if (isFormData) {
      newParams = new FormData()
      for (const i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    try {
      if (api.method === 'get') {
        response = await instance[api.method](api.url)
      }
    } catch (err) {
      response = err
    }
    if (api.method === 'post') { // 分为application jason和formdata两种情况
      response = await instance[api.method](api.url, newParams) // 如果config不设置的话可以吗
    }
    if (api.method === 'put') {
      response = await instance[api.method](api.url, params)
    }
    if (api.method === 'delete') {
      config.params = params
      response = await instance[api.method](api.url, config)
    }
    return response
  }
}
export default Http0806

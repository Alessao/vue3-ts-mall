import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './typs'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responsetInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, .5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close
        // 判断不同的HttpErrorCode显示不同的错误信息
        if (err.responses.status === 404) {
          console.log('404 not found')
        }
        return err
      }
    )
  }

  request<T>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responsetInterceptor) {
            // res = config.interceptors.responsetInterceptor(res)
          }
          // console.log(res)
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest

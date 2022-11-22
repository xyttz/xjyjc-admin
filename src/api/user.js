import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA } from '@/config'

export async function login(data) {
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  return request({
    url: '/youlai-auth/oauth/token',
    method: 'post',
    params: data,
    headers: {
      Authorization: 'Basic eW91bGFpLWFkbWluOjEyMzQ1Ng==', // 客户端信息加密摘要认证，明文：youlai-admin:123456
    },
  })
}

export async function socialLogin(data) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  return request({
    // url: '/userInfo',
    url: '/youlai-admin/api/v1/users/me',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/youlai-auth/oauth/logout',
    method: 'delete',
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}

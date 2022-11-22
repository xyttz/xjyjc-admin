import request from '@/utils/request'
export function updateEntrust(id, formParams, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/' + id,
    method: 'put',
    data: formParams,
  })
}

export function addEntrust(params, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType,
    method: 'post',
    data: params,
  })
}

export function list(queryParams, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType,
    method: 'get',
    params: queryParams,
  })
}

export function getByEntId(id, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/' + id,
    method: 'get',
  })
}

export function getBySampleKey(sampkey, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/sampkey/' + sampkey,
    method: 'get',
  })
}

export function getByEntkey(entkey, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/entkey/' + entkey,
    method: 'get',
  })
}

export function syncCheckData(entnum, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/sync/' + entnum,
    method: 'get',
  })
}

/** 获取历史填写的人员信息 */
export function getMans() {
  return request({
    url: '/youlai-admin/api/v1/users/mans',
    method: 'get',
  })
}

/** 获取历史填写的单位信息 */
export function getCompanys(entunitnum) {
  return request({
    url: '/basicinfo-admin/api/v1/base/company/list/' + entunitnum,
    method: 'get',
  })
}

/** 获取报告记录 */
export function getReportData(entnum, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/report/' + entnum,
    method: 'get',
  })
}

/** 扫码登记 */
export function scanQrByOpr(qrcode, oprtype) {
  var parameters = { qrcode: qrcode, oprtype: oprtype }
  // var postData = new URLSearchParams()
  // postData.append('qrcode', qrcode)
  // postData.append('oprtype', oprtype)
  return request({
    url: '/entrust-admin/api/v1/qr/scan',
    method: 'post',
    data: parameters,
  })
}

/** 下载委托报告 */
export function downloadEntrustReport(entnum, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/download/entrust/' + entnum,
    method: 'get',
    // responseType: 'arraybuffer',
  })
}

/** 下载加测报告 */
export function downloadCheckReport(entnum, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/download/checkreport/' + entnum,
    method: 'get',
    // responseType: 'blob',
  })
}

/** 查看原始记录 */
export function downloadOrgReport(entnum, pathType) {
  return request({
    url: '/entrust-admin/api/v1/entrust/' + pathType + '/download/orgreport/' + entnum,
    method: 'get',
    // responseType: 'arraybuffer',
  })
}

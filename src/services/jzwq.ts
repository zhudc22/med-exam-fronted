import request from '@/utils/request';


/** POST /api/check/check-spinal-po/save */
export async function save(params: API.Jzwq) {
  return request<{
    success: boolean;
    data: API.Jzwq;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-spinal-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** POST /api/check/check-spinal-files-po/files/{orderid} */
export async function reports(orderId) {
  return request<{
    success: boolean;
    data: API.JzwqReport[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-spinal-files-po/files/${orderId}`, {
    method: 'GET',
  });
}


/** DELETE /api/check/check-balance-files-po/del?ids={id} */
export async function remove(id: number) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-spinal-files-po/del?ids=${id}`, {
    method: 'DELETE',
  });
}

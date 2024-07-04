import request from '@/utils/request';


/** POST /api/check/check-balance-po/save */
export async function save(params: API.Balance) {
  return request<{
    success: boolean;
    data: API.Balance;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-balance-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** POST /api/check/check-balance-files-po/upload?orderId={order} */
export async function uploadReport(orderId, file) {
  const formData = new FormData();
  formData.append('file', file.originFileObj);

  return request(`/api/check/check-balance-files-po/upload?orderId=${orderId}`, {
    method: 'POST',
    data: formData
  });
}

/** POST /api/check/check-balance-files-po/files/{orderid} */
export async function reports(orderId) {
  return request<{
    success: boolean;
    data: API.BalanceReport[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-balance-files-po/files/${orderId}`, {
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
  }>(`/api/check/check-balance-files-po/del?ids=${id}`, {
    method: 'DELETE',
  });
}

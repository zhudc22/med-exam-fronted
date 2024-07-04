import request from '@/utils/request';


/** POST /api/check/check-stcf-po/save */
export async function save(params: API.Stcf) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-stcf-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}


/** GET /api/check/check-stcf-po/order/{id} */
export async function queryByOrderId(orderId: string) {
  return request<{
    success: boolean;
    data: API.Stcf;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-stcf-po/order/${orderId}`, {
    method: 'GET',
  });
}


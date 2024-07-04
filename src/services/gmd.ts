import request from '@/utils/request';


/** POST /api/check/check-gmd-po/save */
export async function save(params: API.gmd) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-gmd-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** GET /api/check/check-gmd-po/order/{id} */
export async function queryByOrderId(orderId: string) {
  return request<{
    success: boolean;
    data: API.gmd;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-gmd-po/order/${orderId}`, {
    method: 'GET',
  });
}

export async function queryDataByOrderId(orderId: string) {
  return request<{
    success: boolean;
    data: any;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-gmd-dcheck-po/data/${orderId}`, {
    method: 'GET',
  });
}

export async function updateZValue(orderId: string, params: any) {
  return request<{
    success: boolean;
    data: API.gmd;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-gmd-po/updateZvalue`, {
    method: 'POST',
    data: {
      ...params,
      orderId,
    },
  });
}

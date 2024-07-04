import request from '@/utils/request';



/** 分页查询 POST /api/check/check-tyzk-po/list */
export async function read(params: API.PageParams) {
  return request<{
    success: boolean;
    data: API.TrainingRecord[];
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-tyzk-po/list', {
    method: 'POST',
    data: {
      orderId: params.id,
    }
  });
}

export async function getByOrderId(orderId: string) {
  return request<{
    success: boolean;
    data: API.TrainingRecord[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-tyzk-po/order/${orderId}`);
}

export async function add(item: API.TrainingRecord) {
  return request<{
    success: boolean;
    data: API.TrainingRecord;
    total: number;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-tyzk-po/add`, {
    method: 'POST',
    data: {
      ...item,
    },
  });
}

export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-tyzk-po/del', {
    method: 'DELETE',
    params: {
      ids: params,
    },
  });
}

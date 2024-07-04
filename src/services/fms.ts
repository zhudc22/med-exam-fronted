import request from '@/utils/request';


/** 查询 POST /api/check/check-fms-po/save */
export async function save(params: API.fms) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-fms-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

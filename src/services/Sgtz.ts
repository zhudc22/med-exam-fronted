import request from '@/utils/request';


/** 查询 POST /api/check/check-height-weight-po/save */
export async function save(params: API.Sgtz) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-height-weight-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}
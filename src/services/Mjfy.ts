import request from '@/utils/request';


/** 查询 POST /api/check/check-responsive-po/save */
export async function save(params: API.Mjfy) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-responsive-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}
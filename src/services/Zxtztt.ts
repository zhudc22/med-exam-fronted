import request from '@/utils/request';


/** POST /api/check/check-special-po/save */
export async function save(params: API.ZxTztt) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-special-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

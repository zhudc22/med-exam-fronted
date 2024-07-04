import request from '@/utils/request';


/** 查询 POST /api/check/check-body-posture-po/save */
export async function save(params: API.Tztt) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-body-posture-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

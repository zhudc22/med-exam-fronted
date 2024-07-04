import request from '@/utils/request';


/** 查询 POST /api/check/check-xfgn-po/save */
export async function save(params: API.Xfgn) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-xfgn-po/save', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

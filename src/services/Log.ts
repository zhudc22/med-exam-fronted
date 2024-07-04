import type { RequestData } from '@ant-design/pro-table';
import request from '@/utils/request';

/** 分页查询 POST /api/sys/log/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Log>> {
  const response = await request<{
    success: boolean;
    data: API.Log[];
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/log/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      start: params.timeRang != undefined?params.timeRang[0]:'',
      end: params.timeRang != undefined?params.timeRang[1]:'',
      username: params.username,
      ip: params.ip,
    }
  });

  if (!response.success) {
    return {
      data: [],
      success: false,
      total: 0,
    };
  }

  return response;
}
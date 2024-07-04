import type { RequestData } from '@ant-design/pro-table';
import request from '@/utils/request';

/** 分页查询 POST /api/check/corrction-addr-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Address>> {
  const response = await request<{
    success: boolean;
    data: API.Address[];
    errorCode: number;
    errorMessage: string;
  }>('/api/check/corrction-addr-po/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      name: params.name,
      addr: params.addr,
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


/** 新增 POST /api/check/corrction-addr-po/add */
export async function add(params: API.Address) {
  return request<{
    success: boolean;
    data: API.Address;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/corrction-addr-po/add', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 更新 POST /api/check/corrction-addr-po/update */
export async function update(params: API.Address) {
  return request<{
    success: boolean;
    data: API.Address;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/corrction-addr-po/update', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 删除 POST /api/check/corrction-addr-po/del */
export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/corrction-addr-po/del', {
    method: 'DELETE',
    params: {
      ids: params,
    }
  });
}

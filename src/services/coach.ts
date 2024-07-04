// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';
import type { RequestData } from '@ant-design/pro-table';

/** 新增 POST /api/check/gzry-po/add */
export async function add(body: API.GzryPO, options?: { [key: string]: any }) {
  return request<{
    data?: API.Gzry;
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  }>('/api/check/gzry-po/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除数据 DELETE /api/check/gzry-po/del */
export async function remove(ids: number[]) {
  return request<API.ResultString_>('/api/check/gzry-po/del', {
    method: 'DELETE',
    params: {ids},
  });
}

/** 查询分页数据 POST /api/check/gzry-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Gzry>> {
  const response = await request<{
    total: number;
    success: boolean;
    data: API.Gzry[];
  }>('/api/check/gzry-po/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      name: params.name,
    },
  });

  if (!response.success) {
    return {
      data: [],
      success: false,
      total: 0,
    };
  }

  return {
    data: response.data,
    success: true,
    total: response.total,
  };
}

/** 更新数据 POST /api/check/gzry-po/update */
export async function update(body: API.GzryPO, options?: { [key: string]: any }) {
  return request<{
    data?: API.Gzry;
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  }>('/api/check/gzry-po/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /api/check/gzry-po/${param0} */
export async function getById(
  params: {
    // path
    /** id */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    data?: API.Gzry;
    errorCode?: number;
    errorMessage?: string;
    success?: boolean;
  }>(`/api/check/gzry-po/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

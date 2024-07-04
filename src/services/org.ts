import type { RequestData } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import request from '@/utils/request';

/** 分页查询 POST /api/check/check-org-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Org>> {
  const response = await request<{
    success: boolean;
    data: API.Org[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-org-po/list', {
    method: 'POST',
    data: {
      ...params,
      pageIndex: params.current,
      current: undefined,
    },
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

/** 查询 POST /api/check/check-org-po/parent/{id} */
export async function queryByParentId(parentId: number): Promise<API.Org[]> {
  if (parentId === undefined) {
    // eslint-disable-next-line no-param-reassign
    parentId = 0;
  }
  const response = await request<{
    success: boolean;
    data: API.Org[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-org-po/parent/${parentId}`, {
    method: 'POST',
  });

  if (!response.success) {
    return [];
  }
  return response.data;
}

/** 查询 POST /api/check/check-org-po/{id} */
export async function queryById(id: number) {
  if (id === undefined) {
    // eslint-disable-next-line no-param-reassign
    id = 0;
  }
  const response = await request<{
    success: boolean;
    data: API.Org;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-org-po/${id}`, {
    method: 'GET',
  });

  if (!response.success) {
    return null;
  }
  return response.data;
}

export function org2Option(item: API.Org): RequestOptionsType {
  return {
    id: item.id,
    parentId: item.parentId,
    label: item.name,
    value: item.id,
    key: item.id,
    isLeaf: item.hasLeaf === 0,
  }
}

/** 新增 POST /api/check/check-org-po/add */
export async function add(params: API.Org) {
  return request<{
    success: boolean;
    data: API.Org;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-org-po/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 更新 POST /api/check/check-org-po/update */
export async function update(params: API.Org) {
  return request<{
    success: boolean;
    data: API.Org;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-org-po/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 删除 POST /api/check/check-org-po/del */
export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-org-po/del', {
    method: 'DELETE',
    params: {
      ids: params,
    },
  });
}

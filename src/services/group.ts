import type { RequestData } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils'
import request from '@/utils/request';

/** 分页查询 POST /api/check/check-group-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Group>> {
  const response = await request<{
    success: boolean;
    data: API.Group[];
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-group-po/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      name: params.name,
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

/** 下拉框查询 POST /api/check/check-group-po/roots */
export async function roots(): Promise<RequestOptionsType[]> {
  const response = await request<{
    success: boolean;
    data: API.Group[];
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-group-po/roots', {
    method: 'POST',
  });

  if (!response.success) {
    return [];
  }

  return response.data.map( org => ({ label: org.name, value: org.id, optionType: 'option' }));
}

/** 新增 POST /api/check/check-group-po/add */
export async function add(params: API.Group) {
  return request<{
    success: boolean;
    data: API.Group;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-group-po/add', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 更新 POST /api/check/check-group-po/update */
export async function update(params: API.Group) {
  return request<{
    success: boolean;
    data: API.Group;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-group-po/update', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 删除 POST /api/check/check-group-po/del */
export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-group-po/del', {
    method: 'DELETE',
    params: {
      ids: params,
    }
  });
}


/** 新增 POST /api/check/check-group-po/add */
export async function findByCheckOrgId(checkOrgId: number) {
  const response = await request<{
    success: boolean;
    data: API.Group[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/check-group-po/findByCheckOrgId/${checkOrgId}`, {
    method: 'GET',
  });

  if (!response.success) {
    return [];
  }
  return response.data.map( group => ({ label: group.name, value: group.mark, optionType: 'option' }));
}
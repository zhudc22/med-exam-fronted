import type { RequestData } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import request from '@/utils/request';


/** 查询 POST /api/sys/role/list */
export async function read(): Promise<RequestData<API.Role>> {
  const response = await request<{
    success: boolean;
    data: API.Role[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/role/list', {
    method: 'POST',
    data: {
      pageIndex: 1,
      pageSize: 100,
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

/** 所有角色 POST /api/sys/role/list */
export async function all(): Promise<RequestOptionsType[]> {
  const response = await request<{
    success: boolean;
    data: API.Role[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/role/list', {
    method: 'POST',
    data: {
      pageIndex: 1,
      pageSize: 100,
    }
  });

  if (!response.success) {
    return [];
  }

  return response.data.map(it => role2Option(it));
}

export function role2Option(item: API.Role): RequestOptionsType {
  return {
    id: item.id,
    label: item.name,
    value: item.id,
    key: item.id,
  }
}


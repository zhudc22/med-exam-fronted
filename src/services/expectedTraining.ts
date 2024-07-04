import type { RequestData } from '@ant-design/pro-table';
import request from '@/utils/request';

/** 分页查询 POST /api/check/correction-expect-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.ExpectedTraining>> {
  return request<{
    success: boolean;
    data: API.ExpectedTraining[];
    errorCode: number;
    errorMessage: string;
  }>('/api/check/correction-expect-po/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      nickName: params.nickName,
      card: params.card,
    }
  });
}

export async function queryByName(name: string) {
  return request<{
    success: boolean;
    data: API.ExpectedTraining[];
    errorCode: number;
    errorMessage: string;
  }>('/api/check/correction-expect-po/search', {
    method: 'POST',
    data: {
      nickName: name,
    }
  });
}

/** 新增 POST /api/check/correction-expect-po/add */
export async function add(params: API.ExpectedTraining) {
  return request<{
    success: boolean;
    data: API.ExpectedTraining;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/correction-expect-po/add', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 更新 POST /api/check/correction-expect-po/update/{id} */
export async function update(id: number, params: API.ExpectedTraining) {
  return request<{
    success: boolean;
    data: API.ExpectedTraining;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/correction-expect-po/update/${id}`, {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 删除 POST /api/check/correction-expect-po/del */
export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/correction-expect-po/del', {
    method: 'DELETE',
    params: {
      ids: params,
    }
  });
}

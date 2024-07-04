import type { RequestData } from '@ant-design/pro-table';
import request from '@/utils/request';

/** 分页查询 POST /api/check/correction-training-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Training>> {
  return request<{
    success: boolean;
    data: API.Training[];
    errorCode: number;
    errorMessage: string;
  }>('/api/check/correction-training-po/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      nickName: params.nickName,
      card: params.card,
    }
  });
}


/** 新增 POST /api/check/correction-training-po/add */
export async function add(params: API.Training) {
  return request<{
    success: boolean;
    data: API.Training;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/correction-training-po/add', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 更新 POST /api/check/correction-training-po/update/{id} */
export async function update(id: number, params: API.Training) {
  return request<{
    success: boolean;
    data: API.Training;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/correction-training-po/update/${id}`, {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 删除 POST /api/check/correction-training-po/del */
export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/correction-training-po/del', {
    method: 'DELETE',
    params: {
      ids: params,
    }
  });
}

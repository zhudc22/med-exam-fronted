import type { RequestData } from '@ant-design/pro-table';
import request from '@/utils/request';

/** 分页查询 POST /api/check/message-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Notice>> {
  const response = await request<{
    success: boolean;
    data: API.Notice[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/message-po/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
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

export async function getNotices() {
  return request<{
    success: boolean;
    data: API.Notice[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/message-po/list', {
    method: 'POST',
    data: { current: 1, pageSize: 5 },
  });
}

/** 查询 POST /api/check/message-po/{id} */
export async function queryById(id: number) {
  if (id === undefined) {
    // eslint-disable-next-line no-param-reassign
    id = 0;
  }
  const response = await request<{
    success: boolean;
    data: API.Notice;
    total: number;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/message-po/${id}`, {
    method: 'GET',
  });

  if (!response.success) {
    return null;
  }
  return response.data;
}

/** 未读消息个数 POST /api/check/message-po/countUnRead */
export async function unreadCount() {
  return request<{
    success: boolean;
    data: number;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/message-po/countUnRead`, {
    method: 'POST',
  });
}

/** 更新 POST /api/check/message-po/read/{id} */
export async function updateReadStatus(id: number) {
  return request<{
    resp_msg: string;
    resp_code: number;
    datas: API.Org;
  }>(`/api/check/message-po/read/${id}`, {
    method: 'POST',
  });
}

/** 清除 POST /api/check/message-po/del */
export async function clear() {
  return request<{
    resp_msg: number;
    resp_code: number;
    datas: any;
  }>('/api/check/message-po/delAll', {
    method: 'DELETE',
  });
}

/** 删除 POST /api/check/message-po/del */
export async function remove(params: number[]) {
  return request<{
    resp_msg: number;
    resp_code: number;
    datas: any;
  }>('/api/check/message-po/del', {
    method: 'DELETE',
    params: {
      ids: params,
    },
  });
}

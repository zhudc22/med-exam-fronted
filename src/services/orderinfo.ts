import request from '@/utils/request';
import type { RequestData } from '@ant-design/pro-table';

/** 分页查询 POST /api/check/check-org-po/list */
export async function read(params: API.PageParams): Promise<RequestData<API.OrderInfoItem>> {
  const response = await request<{
    success: boolean;
    data: API.OrderInfoItem[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/order-info-po/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      orderId: params.orderId,
      nickName: params.nickName,
      checkType1Name: params.checkType1Name,
      orderDate: params.orderDate,
      status: params.status,
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


/** 查询 POST /api/check/order-info-po/{id} */
export async function queryById(id: number) {
  if (id === undefined) {
    // eslint-disable-next-line no-param-reassign
    id = 0;
  }
  return request<{
    success: boolean;
    data: API.OrderInfo;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-info-po/${id}`, {
    method: 'GET',
  });
}

/** 查询 POST /api/check/order-info-po/order/{orderId} */
export async function queryByOrderId(orderId: string) {
  return request<{
    success: boolean;
    data: API.OrderInfo;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-info-po/order/${orderId}`, {
    method: 'GET',
  });
}


export async function update(params: API.OrderInfoItem) {
  return request<{
    success: boolean;
    data: API.OrderInfoItem;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/order-info-po/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


/** POST /med-exam-backend/api/check/order-info-po/update/result/{orderId}/{result} */
export async function finish(orderId: string, result: any) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-info-po/update/result`, {
    method: 'POST',
    data: {
      orderId,
      ...result
    }
  });
}


export async function queryCheckItemsByOrderId(orderId: string) {
  return request(`/api/check/order-po/checkitems/${orderId}`);
}

export async function queryInfoByOrderId(orderId: string) {
  return request<{
    success: boolean;
    data: API.OrderInfoItem;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-info-po/order/info/${orderId}`);
}

/** 分页查询 POST /api/check/order-info-po/archive/list */
export async function archives(params: API.PageParams): Promise<RequestData<API.OrderInfoItem>> {
  const response = await request<{
    success: boolean;
    data: API.OrderInfoItem[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/order-info-po/archive/list', {
    method: 'POST',
    data: {
      orderId: params.orderId,
      nickName: params.nickName,
      card: params.card,
      contactPhone: params.contactPhone,
      checkGroupName: params.checkGroupName,
      pageIndex: params.current,
      pageSize: params.pageSize,
    },
  });

  return response;
}

/** 分页查询 POST /api/check/order-info-po/archive/card */
export async function personalArchives(params: API.PageParams): Promise<RequestData<API.OrderInfoItem>> {
  const response = await request<{
    success: boolean;
    data: API.OrderInfoItem[];
    total: number;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/order-info-po/archive/card', {
    method: 'POST',
    data: {
      card: params.card,
      pageIndex: params.current,
      pageSize: params.pageSize,
      nickName: params.nickName,
    },
  });

  return response;
}

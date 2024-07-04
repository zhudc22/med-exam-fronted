import request from '@/utils/request';
import type { RequestData } from '@ant-design/pro-table';

export async function fetchReserveList(params: API.PageParams, sort): Promise<RequestData<API.ReserveItem>> {

  const data = {
    pageIndex: params.current,
    pageSize: params.pageSize,
    contactPhone: params.contactPhone,
    nickName: params.nickName,
    orderId: params.orderId,
    status: params.status,
  };

  if (sort) {
    const name = Object.keys(sort)[0];
    if (name) {
      const direct = sort[name] === 'ascend' ? 'ASC' : 'DESC';
      data.sort = {
        sort: direct,
        name
      }
    }
  }


  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: API.ReserveItem[];
  }>('/api/check/order-po/list', {
    method: 'POST',
    data
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

export async function print(orderId: string) {
  return request(`/api/guiding/print/${orderId}`, {
    method: 'GET',
    responseType: "blob"
  });
}

export async function fetchPersonalReserve(id: number): Promise<RequestData<API.PersonalReserveInfo>> {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: API.PersonalReserveInfo;
  }>(`/api/check/order-po/${id}`, {
    method: 'GET',
  });
  if (!response.success) {
    return {
      data: {},
      success: false,
    };
  }
  return response;
}

export async function fetchTeamReserveInfo(params: API.PageParams): Promise<RequestData<API.TeamReserveInfo>> {

  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: API.TeamReserveInfo[];
  }>('/api/check/order-po/list/group', {
    method: 'POST',
    data: {
      ordersId: params.ordersId,
      orderId: params.orderId,
      pageIndex: params.current,
      pageSize: params.pageSize,
      card: params.card,
      nickName: params.nickName,
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

export async function updatePersonalReserveTime(params): Promise<boolean> {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: API.ReserveItem[];
  }>('/api/check/order-po/update/person', {
    method: 'POST',
    data: params
  });

  if (!response.success) {
    return false;
  }
  return true;
}

export async function updateTeamReserveTime(params): Promise<boolean> {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: API.ReserveItem[];
  }>('/api/check/order-po/update/group', {
    method: 'POST',
    data: params
  });

  if (!response.success) {
    return false;
  }
  return true;
}

export async function cancelReserve(id: number): Promise {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: string;
  }>(`/api/check/order-po/cancel/${id}`, {
    method: 'GET',
  });
  return response;
}


export async function personalReserve(params): Promise {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-po/addperson`, {
    method: 'POST',
    data: params
  });

  if (!response.success) {
    return false;
  }
  return true;
}

export async function teamReserve(params): Promise {

  const formData = new FormData();
  formData.append('file', params.template.originFileObj);
  formData.append('checkOrgId', params.checkOrgId);
  formData.append('contactName', params.contactName);
  formData.append('contactPhone', params.contactPhone);
  formData.append('orderDate', params.orderDate);
  formData.append('orderTime', params.orderTime);

  if (params.mark) {
    formData.append('mark', params.mark);
  }

  const response = await request(`/api/check/order-po/addgroup`, {
    method: 'POST',
    data: formData
  });

  return response;
}

export async function fetchTeamReserveDetail(id: number) {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-po/group/${id}`, {
    method: 'GET',
  });
  if (!response.success) {
    return {
      data: {},
      success: false,
    };
  }
  return response;
}

export async function teamAppend(params: any) {
  return request<{
    success: boolean;
    data: any;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-po/appendgroup`, {
    method: 'POST',
    data: params,
  });
}

export async function teamCancel(id: number) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/order-po/cancel/group/orderinfo/${id}`);
}

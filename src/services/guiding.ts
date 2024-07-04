import type { RequestData } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import request from '@/utils/request';

export async function fetchGuidingList(params: API.PageParams): Promise<RequestData<API.GuidingItem>> {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: API.GuidingItem[];
  }>('/api/check/check-guide-po/list', {
    method: 'POST',
    data: {
      key:params.name,
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




export async function save(params) {

  const formData = new FormData();
  if (typeof params.template != undefined && typeof params.template != 'undefined' && typeof params.template.originFileObj != undefined && typeof params.template.originFileObj != 'undefined' ) {
    formData.append('file', params.template.originFileObj);
  }
  formData.append('checkOrgId', params.checkOrgId);
  formData.append('name', params.name);
  if (typeof params.id != undefined && typeof params.id != 'undefined' && params.id!=null && params.id!="") {
    formData.append('id', params.id);
  }

  const response = await request(`/api/check/check-guide-po/save`, {
      method: 'POST',
      data: formData
  });

  if (!response.success) {
      return false;
  }
  return true;
}

/** 删除 POST /api/check/check-guide-po/del */
export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/check-guide-po/del', {
    method: 'POST',
    data: params,
  });
}

import type { RequestData } from '@ant-design/pro-table';
import request from '@/utils/request';

export async function fetchReportList(params: API.PageParams): Promise<RequestData<API.ReportItem>> {
  const response = await request<{
    success: boolean;
    errorCode: number;
    errorMessage: string;
    data: API.ReportItem[];
  }>('/api/check/check-template-po/list', {
    method: 'POST',
    data: {
      name: params.name,
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
  if (typeof params.template != undefined && typeof params.template != 'undefined' && typeof params.template.originFileObj != undefined && typeof params.template.originFileObj != 'undefined') {
    formData.append('file', params.template.originFileObj);
  }
  formData.append('checkOrgId', params.checkOrgId);
  formData.append('checkType', params.checkType);
  formData.append('name', params.name);

  if (typeof params.id != undefined && typeof params.id != 'undefined' && params.id != null && params.id != "") {
    formData.append('id', params.id);
  }

  const response = await request(`/api/check/check-template-po/save`, {
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
  }>('/api/check/check-template-po/del', {
    method: 'POST',
    data: params,
  });
}

export async function donwload(params: string) {
  return request(`/api/report/download/${params}`, {
    timeout:600000,
    method: 'GET',
    responseType: 'blob',
  });
}
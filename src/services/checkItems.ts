import type { RequestOptionsType } from '@ant-design/pro-utils';
import request from '@/utils/request';

export async function rootCheckItems() {
    const response = await request<{
        success: boolean;
        data: any[];
        errorCode: number;
        errorMessage: string;
    }>('/api/check/check-item-type-po/roots', {
        method: 'POST',
    });

    if (!response.success) {
        return [];
    }
    return response.data;
}

export async function customCheckItems() {
    const response = await request<{
        success: boolean;
        data: any[];
        errorCode: number;
        errorMessage: string;
    }>('/api/check/check-item-po/list', {
        method: 'POST',
        data: {
            pageIndex: 1,
            pageSize: 100,
        }
    });

    if (!response.success) {
        return [];
    }
    return response.data;
}

export async function checkItems(id: number) {
    if (id === undefined) {
      // eslint-disable-next-line no-param-reassign
      id = 0;
    }
    const response = await request<{
      success: boolean;
      data: API.CheckItems[];
      errorCode: number;
      errorMessage: string;
    }>(`/api/check/check-item-type-po/parent/${id}`, {
      method: 'POST',
    });
  
    if (!response.success) {
      return [];
    }
    return response.data;
  }




export function item2Option(item: API.CheckItems): RequestOptionsType {
    return {
      id: item.id,
      parentId: item.parentId,
      label: item.name,
      value: item.id,
      key: item.id,
      isLeaf: item.hasLeaf === 0,
    }
  }
import type { RequestData } from '@ant-design/pro-table';
import request from '@/utils/request';
import { DEFAULT_PASSWORD } from '@/utils/constant'


/** 用户登录 GET /api/sys/login */
export async function login(params: API.LoginParams) {
  return request<{
    data: API.LoginResult;
    success: boolean;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/login', {
    method: 'POST',
    data: params,
  });
}

/** 用户登录 GET /api/sys/loginByCode */
export async function loginByMobile(params: API.LoginParams) {
  return request<{
    data: API.LoginResult;
    success: boolean;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/loginByCode', {
    method: 'POST',
    data: {
      mobile: params.mobile,
      code: params.captcha,
    },
  });
}

/** 用户登录 GET /api/sys/logout */
export async function logout() {
  return request<{
    data: string;
    success: boolean;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/logout', {
    method: 'GET',
  });
}

/** 用户登录 GET /api/sys/user/signUp */
export async function signup(params: API.LoginParams) {
  return request<{
    data: API.LoginResult;
    success: boolean;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/user/signUp', {
    method: 'POST',
    data: {
      username: params.username,
      password: params.password,
      mark: params.mark,
      code: params.captcha,
    },
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return request<{
    data: API.CurrentUser;
  }>('/api/sys/user/info', {
    method: 'GET',
  });
}

/** 修改密码 GET /api/sys/user/password */
export async function password(oldPassword: string, newPassword: string) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/user/password', {
    method: 'POST',
    data: {
      password: oldPassword,
      newPassword,
    }
  });
}


/** 查询用户 POST /api/sys/user/list */
export async function read(params: API.PageParams): Promise<RequestData<API.Account>> {
  const response = await request<{
    total: number;
    success: boolean;
    data: API.Account[];
  }>('/api/sys/user/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      username: params.username,
    }
  });

  if (!response.success) {
    return {
      data: [],
      success: false,
      total: 0,
    };
  }

  return {
    data: response.data,
    success: true,
    total: response.total,
  };

}

/** 新增用户 POST /api/sys/user/save */
export async function add(params: API.Account) {
  return request<{
    success: boolean;
    data: API.Account;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/user/save', {
    method: 'POST',
    data: {
      ...params,
      roleIdList: [params?.roleIdList],
      password: DEFAULT_PASSWORD,
    }
  });
}

/** 更新用户 POST /api/sys/user/update */
export async function update(params: API.Account) {
  return request<{
    success: boolean;
    data: API.Account;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/user/update', {
    method: 'POST',
    data: {
      id: params.id,
      username: params.username,
      nickName: params.nickName,
      age: params.age,
      card: params.card,
      status: params.status,
      roleIdList: params.roleIdList,
      markList: params.markList,
    }
  });
}

/** 删除用户 POST /api/sys/user/delete */
export async function remove(params: number[]) {
  return request<{
    success: boolean;
    data: string;
    errorCode: number;
    errorMessage: string;
  }>('/api/sys/user/delete', {
    method: 'POST',
    data: params,
  });
}

/** 发送验证码 POST /api/sms/loginCode */
export async function getLoginCaptcha(mobile: string) {
  return request<{
    success: boolean;
    data: any;
    errorCode: number;
    errorMessage: string;
  }>('/api/sms/loginCode', {
    method: 'POST',
    data: {
      mobile
    },
  });
}

/** 发送验证码 POST /api/sms/registCode */
export async function getRegistCaptcha(mobile: string) {
  return request<{
    success: boolean;
    data: any;
    errorCode: number;
    errorMessage: string;
  }>('/api/sms/registCode', {
    method: 'POST',
    data: {
      mobile
    },
  });
}

/** 我的报告 POST /api/check/order-po/report */
export async function reports(params: API.PageParams) {
  params.pageIndex = params.current;
  return request<{
    success: boolean;
    data: any;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/order-po/report', {
    method: 'POST',
    data: params
  });
}

/** 团体报告 POST /api/check/order-po/report/group */
export async function groupReports(params: API.PageParams) {
  return request<{
    success: boolean;
    data: any;
    errorCode: number;
    errorMessage: string;
  }>('/api/check/order-po/report/group', {
    method: 'POST',
    data: {
      id: parseInt(params.id, 10),
      pageIndex: params.current,
      pageSize: params.pageSize,
      orderId: params.orderId,
      nickName: params.nickName,
      contactPhone: params.contactPhone,
    }
  });
}

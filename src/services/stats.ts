import request from '@/utils/request';

/** 新增 GET /api/check/stats/countOrder */
export async function countOrder(params) {
  const response = await request<{
    success: boolean;
    data: API.CountOrder[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/countOrder`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsSpecial(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsSpecial[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/special`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsSpecialAb(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsSpecial[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/specialAb`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsBody(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsBody;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/body`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsBodyAb(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsBodyAb[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/bodyAb`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsResp(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsResp[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/resp`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsRespScore(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsRespScore[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/respScore`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsStcf(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsStcf[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/stcf`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsBalance(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsBalance[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/balance`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsFms(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsFms[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/fms`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsFmsAb(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsFms[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/fmsAb`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsXfgn(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsXfgn[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/xfgn`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsGmd(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsGmd;
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/gmd`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return {};
  }
  return response.data;
}

export async function statsGmdAge(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsGmdAge[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats/gmdByAge`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}



export async function statsBoradTotal(params) {
  const response = await request<{
    success: boolean;
    data: API.StatsBoardTotal[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/total`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsQsn(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/qsn`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsCj(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/cj`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsZx(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/zx`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsGdj(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/gdj`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsSpinal(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/spinal`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsGmdAb(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/gmd`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsFyAb(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/fy`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsXfgnAb(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/xfgn`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}

export async function statsJnzt(params) {
  const response = await request<{
    success: boolean;
    data: any[];
    errorCode: number;
    errorMessage: string;
  }>(`/api/check/stats-board/jnzt`, {
    method: 'POST',
    data: params === undefined ? {} : params
  });
  if (!response.success) {
    return [];
  }
  return response.data;
}
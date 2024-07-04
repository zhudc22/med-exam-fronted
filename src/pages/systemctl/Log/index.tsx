import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { read } from '@/services/Log';


const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Log>[] = [
    {
      title: '时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      renderText: (text, record) => (new Date(record.createTime)).toLocaleTimeString(),
    },
    {
      title: '时间范围',
      dataIndex: 'timeRang',
      valueType: 'dateTimeRange',
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      hideInSearch: true,
    },
    {
      title: '耗时',
      dataIndex: 'time',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.Log, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [ ]}
        request={read}
        columns={columns}
        rowSelection={false}
        tableAlertRender={false}
        options={{
          density: false,
          fullScreen: false,
          reload: false,
        }}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
      />
    </PageContainer>
  );
};

export default TableList;

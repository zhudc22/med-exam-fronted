import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { read } from '@/services/role';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Role>[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '角色代码',
      dataIndex: 'code',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.Role, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolbar={{
            settings: [],
            multipleLine: true,
        }}
        toolBarRender={false}
        request={ read }
        columns={columns}
        tableAlertRender={ () => false }
        rowSelection={false}
        pagination={false}
      />
    </PageContainer>
  );
};

export default TableList;

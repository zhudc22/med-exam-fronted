import React, { useRef } from 'react';
import { useHistory } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { read } from '@/services/orderinfo';

const TableList: React.FC = () => {
  const history = useHistory();

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.OrderInfoItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      valueType: 'index',
      width: '32px',
    },
    {
      title: '预约单号',
      dataIndex: 'orderId',
      width: 150,
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      width: 150,
    },
    {
      title: '身份证',
      dataIndex: 'card',
      hideInSearch: true,
    },
    {
      title: '团体名称',
      dataIndex: 'checkGroupName',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '检测项目',
      dataIndex: 'checkType1Name',
      // hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '80px',
      valueType: 'select',
      initialValue: 0,
      request: async () => [
        {
          label: '全部',
          value: -1,
        },
        {
          label: '待检测',
          value: 0,
        },
        {
          label: '已完成',
          value: 2,
        },
        {
          label: '已取消',
          value: 3,
        },
      ],
      render: (_, record) => {
        
        switch (record.status) {
          case 0:
            return '待检测';
          case 2:
            return '检测完成';
          case 3:
            return '已取消';
          default:
            return '-';
        }
      },
    },
    {
      title: '检测时间',
      dataIndex: 'orderDate',
      hideInTable: true,
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            history.push(`/orderinfo/${record.orderId}`);
          }}
        >
          检测数据录入
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
        <ProTable<API.OrderInfoItem, API.PageParams>
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 75,
          }}
          toolBarRender={() => []}
          request={read}
          columns={columns}
          rowSelection={false}
          tableAlertRender={false}
          options={false}
          pagination={{
            pageSize: DEFAULT_PAGE_SIZE,
          }}
          beforeSearchSubmit={(params) => ({ ...params, orderDate: (new Date(params.orderDate)).getTime() })}
        />
    </PageContainer>
  );
};

export default TableList;

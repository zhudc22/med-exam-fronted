import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Modal } from 'antd';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { archives, personalArchives } from '@/services/orderinfo';

const Page: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>();
  const [showArchives, setShowArchives] = useState<boolean>(false);

  const columns: ProColumns[] = [
    {
      title: '姓名',
      dataIndex: 'nickName',
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'male',
      width: 50,
      renderText: (_, record) => record.male === 0? "男" : '女',
      hideInSearch: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 60,
      hideInSearch: true,
    },
    {
      title: '身份证号',
      dataIndex: 'card',
      width: 150,
    },
    {
      title: '联系方式',
      dataIndex: 'contactPhone',
      width: 130,
    },
    {
      title: '团体名称',
      dataIndex: 'checkGroupName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, record) => {
        return (
          <a
            key="view"
            onClick={async () => {
              const resp = await personalArchives({ current: 0, pageSize: 10, card: record.card });
              if (resp.success) {
                if (resp.total === 1) {
                  history.push(`/orderinfo/${record.orderId}?archive=1`);
                } else {
                  setCurrentRow(record);
                  setShowArchives(true);
                }
              }
            }}
          >
            查看
          </a>
        );
      },
    },
  ];

  const columns2: ProColumns[] = [
    {
      title: '编号',
      dataIndex: 'orderId',
      width: 100,
      fixed: 'left',
    },
    {
      title: '检测日期',
      dataIndex: 'orderDate',
      render: (_, record) => (new Date(record.orderDate)).toLocaleDateString(),
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, record) => {
        return (
          <a
            key="view"
            onClick={ () => {
              history.push(`/orderinfo/${record.orderId}?archive=1`);
            }}
          >
            查看
          </a>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        toolbar={{
          settings: [],
        }}
        request={archives}
        columns={columns}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
      />
      {showArchives && (
        <Modal
          footer={ null }
          visible={showArchives}
          onCancel={() => {
            setShowArchives(false);
          }}
          width='600px'
        >
          <ProTable
            rowKey="id"
            toolbar={{
              settings: [],
            }}
            search={false}
            request={personalArchives}
            params={{card: currentRow.card}}
            columns={columns2}
            pagination={{
              pageSize: DEFAULT_PAGE_SIZE,
            }}
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default Page;

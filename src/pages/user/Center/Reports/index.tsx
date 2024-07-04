import moment from 'moment';
import Moment from 'react-moment';
import React, { useRef, useState } from 'react';
import { useParams, history } from 'umi';
import { Button, Card, Col, Divider, Row, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';

import { groupReports as read } from '@/services/user';
import { donwload } from '@/services/report';

const Page: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState(false);

  const columns: ProColumns<API.ReserveItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      valueType: 'index',
      width: '50px',
    },
    {
      title: '预约单号',
      dataIndex: 'orderId',
      width: '100px',
    },
    {
      title: '预约时间',
      dataIndex: 'orderDate',
      render: (_, record) => (
        <>
          <Moment format="YYYY/MM/DD">{record.orderDate}</Moment>{' '}
          {record.orderTime === 1 ? '上午 09:00-11:30' : '下午 13:30-17:00'}
        </>
      ),
      width: '220px',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
    },
    {
      title: '检测项目',
      dataIndex: 'checkTypeName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '80px',
      valueType: 'select',
      hideInSearch: true,
      initialValue: -1,
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
          label: '预约确认',
          value: 1,
        },
        {
          label: '检测完成',
          value: 2,
        },
        {
          label: '预约取消',
          value: 3,
        },
      ],
      render: (_, record) => {
        switch (record.status) {
          case 0:
            return '待检测';
          case 1:
            return '预约确认';
          case 2:
            return '检测完成';
          case 3:
            return '预约取消';
          default:
            return '-';
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const links = [];
        if (record.status === 2) {
          links.push(
            <a
              key="download"
              onClick={() => {
                setLoading(true);
                donwload(record.orderId).then((resp) => {
                  if (resp.status && resp.status === 500) {
                    message.error("检测报告服务发生异常，请您稍后再试!");
                  } else {
                    const blob = new Blob([resp], { type: 'application/octet-stream' });
                    const blobUrl = URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = `检测报告_${record.orderId}.zip`;
                    a.click();
                    window.URL.revokeObjectURL(blobUrl);
                    a = undefined;
                  }
                  setLoading(false);
                });
              }}
            >
              下载报告
            </a>,
          );
        } else {
          links.push(
            <span key="download" style={{ cursor: 'not-allowed', textDecoration: 'none', opacity: 0.5 }}>
              下载报告
            </span>,
          );
        }
        if (record.type === 1 && record.checkType === 47) {
          links.push(
            <a
              key="record"
              onClick={() => {
                history.push(`/account/center/record/${record.orderId}`);
              }}
            >
              培训记录
            </a>,
          );
        }
        return links;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ReserveItem, API.PageParams>
        style={{ height: '100%' }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          span: 4,
        }}
        toolbar={{
          settings: [],
          multipleLine: true,
        }}
        toolBarRender={() => []}
        request={read}
        params={{ id }}
        columns={columns}
        tableAlertRender={false}
        rowSelection={false}
        loading={loading}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
      />
      <Card bordered={false} style={{ marginTop: '-16px' }}>
        <Divider />
        <Row justify="center">
          <Col>
            <Button
              type="primary"
              onClick={() => {
                history.goBack();
              }}
            >
              返回
            </Button>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Page;

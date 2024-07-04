import React, { useState, useRef } from 'react';
import { Button, Modal, message, Switch } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { read, updateReadStatus, remove } from '@/services/notice';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';

const { confirm } = Modal;

const handleUpdateStatus = async (id: number) => {
  const hide = message.loading('正在更新');
  try {
    await updateReadStatus(id);
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: API.Notice[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await remove(selectedRows.map((row) => row.id));
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const Page: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Notice[]>([]);

  const columns: ProColumns<API.Notice>[] = [
    {
      title: '状态',
      dataIndex: 'isRead',
      // render: (_, record) => (record.isRead === 0 ? "未读":"已读"),
      render: (_, record) => (
        <Switch
          checkedChildren="未读"
          unCheckedChildren="已读"
          checked={record.isRead === 0}
          onChange={ async (checked) => {
            if (!checked) {
              const success = handleUpdateStatus(record.id);
              if (success) {
                actionRef.current?.reload();
              }
            }
          }}
        />
      ),
      width: '10%',
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: '60%',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      render: (_, record) => new Date(record.createTime).toLocaleDateString(),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="del"
          onClick={() => {
            confirm({
              title: '删除',
              icon: <ExclamationCircleOutlined />,
              content: (
                <p>
                  是否删除?
                </p>
              ),
              okType: 'danger',
              onOk() {
                handleRemove([record]).then(() => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                });
              },
              onCancel() {},
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <ProTable<API.Notice, API.PageParams>
      style={{ height: '100%' }}
      actionRef={actionRef}
      rowKey="id"
      search={false}
      toolbar={{
        settings: [],
        multipleLine: true,
      }}
      toolBarRender={() => [
        <Button
          disabled={selectedRowsState.length === 0}
          key="remove"
          onClick={() => {
            confirm({
              title: '批量删除',
              icon: <ExclamationCircleOutlined />,
              content: (
                <p>
                  是否删除选中的<strong>{selectedRowsState.length}</strong>个通知?
                </p>
              ),
              okType: 'danger',
              onOk() {
                handleRemove(selectedRowsState).then(() => {
                  actionRef.current?.reload();
                });
              },
              onCancel() {},
            });
          }}
        >
          <DeleteOutlined /> 删除
        </Button>,
      ]}
      request={read}
      columns={columns}
      tableAlertRender={false}
      rowSelection={{
        onChange: (_, selectedRows) => {
          setSelectedRows(selectedRows);
        },
      }}
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
      }}
    />
  );
};

export default Page;

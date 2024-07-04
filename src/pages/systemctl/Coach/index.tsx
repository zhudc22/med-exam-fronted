import React, { useState, useRef } from 'react';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { getAccessToken } from '@/utils/authority';
import UpdateForm from './components/UpdateForm';
import { read, add, update, remove } from '@/services/coach';

const { confirm } = Modal;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: API.Gzry) => {
  const hide = message.loading('正在添加');

  try {
    await add({ ...fields });
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: API.Gzry) => {
  const hide = message.loading('正在更新');

  try {
    await update({ ...fields });
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

const handleRemove = async (selectedRows: API.Gzry[]) => {
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

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Gzry>();
  const [selectedRowsState, setSelectedRows] = useState<API.Gzry[]>([]);

  const columns: ProColumns<API.Gzry>[] = [
    {
      title: '照片',
      dataIndex: 'avatar',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '级别',
      dataIndex: 'level',
      hideInSearch: true,
    },
    {
      title: '区域',
      dataIndex: 'region',
      hideInSearch: true,
    },
    {
      title: '证件有效期',
      dataIndex: 'expiryDate',
      hideInSearch: true,
    },
    {
      title: '类别',
      dataIndex: 'type',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '未定义',
        },
        1: {
          text: '检测师',
        },
        2: {
          text: '矫正师',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <Upload
          accept={'.png,.jpg'}
          action={`/api/check/gzry-po/uploadImage/${record.id}`}
          headers={{ Authorization: getAccessToken() }}
          showUploadList={false}
          onChange={(info) => {
            if (info.file.status === 'done') {
              actionRef.current?.reload();
            }
          }}
        >
          <a>上传照片</a>
        </Upload>,
        <a
          key="del"
          onClick={() => {
            confirm({
              title: '删除',
              icon: <ExclamationCircleOutlined />,
              content: (
                <p>
                  是否删除<strong>{record.name}</strong>?
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
    <PageContainer>
      <ProTable<API.Gzry, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
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
                    是否删除选中的<strong>{selectedRowsState.length}</strong>个人员?
                  </p>
                ),
                okType: 'danger',
                onOk() {
                  handleRemove(selectedRowsState).then(() => {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  });
                },
                onCancel() {},
              });
            }}
          >
            <DeleteOutlined /> 删除
          </Button>,
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={read}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
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
      <ModalForm
        title="新建"
        // width="600px"
        modalProps={{
          // onCancel: () => console.log('close'),
          destroyOnClose: true,
        }}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        initialValues={setCurrentRow}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.Gzry);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="名称"
          name="name"
          placeholder="请输入名称"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormText
          label="级别"
          name="level"
          placeholder="请输入级别"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormText
          label="区域"
          name="region"
          placeholder="请输入区域"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormText
          label="证件有效期"
          name="expiryDate"
          placeholder="请输入证件有效期"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormSelect
          label="类型"
          name="type"
          request={async () => [
            { label: '检测师', value: 1 },
            { label: '矫正师', value: 2 },
          ]}
          rules={[
            {
              required: true,
              message: '必选项',
            },
          ]}
        />
      </ModalForm>
      {currentRow && (
        <UpdateForm
          onSubmit={(values) => {
            return handleUpdate(values as API.Gzry).then(() => {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            });
          }}
          updateModalVisible={updateModalVisible}
          handleModalVisible={(visible) => handleUpdateModalVisible(visible)}
          values={currentRow}
        />
      )}
    </PageContainer>
  );
};

export default TableList;

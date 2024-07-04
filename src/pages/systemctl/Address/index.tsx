import React, { useState, useRef } from 'react';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormTextArea, ProFormText } from '@ant-design/pro-form';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import UpdateForm from './components/UpdateForm';
import { read, add, update, remove } from '@/services/address';

const { confirm } = Modal;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: API.Address) => {
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

const handleUpdate = async (fields: API.Address) => {
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

const handleRemove = async (selectedRows: API.Address[]) => {
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
  const [currentRow, setCurrentRow] = useState<API.Address>();
  const [selectedRowsState, setSelectedRows] = useState<API.Address[]>([]);

  const columns: ProColumns<API.Address>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 300,
      ellipsis:true,
    },
    {
      title: '地址',
      dataIndex: 'addr',
      ellipsis:true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
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
      <ProTable<API.Address, API.PageParams>
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
                    是否删除选中的<strong>{selectedRowsState.length}</strong>个地址?
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
        title="新建地址"
        // width="600px"
        modalProps={{
          // onCancel: () => console.log('close'),
          destroyOnClose: true,
        }}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        initialValues={setCurrentRow}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.Address);
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
        <ProFormTextArea
          label="地址"
          name="addr"
          placeholder="请输入地址"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
      </ModalForm>
      {currentRow && (
        <UpdateForm
          onSubmit={(values) => {
            return handleUpdate(values as API.Address).then(() => {
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

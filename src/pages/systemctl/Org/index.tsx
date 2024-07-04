import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { getAccessToken } from '@/utils/authority';
import TreeSelect from '@/components/TreeSelect';
import UpdateForm from './components/UpdateForm';
import { read, queryByParentId, org2Option, add, update, remove } from '@/services/org';

const { confirm } = Modal;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  let parentId;
  if (fields.parentId !== undefined && fields.parentId.length > 0) {
    parentId = fields.parentId[fields.parentId.length - 1];
  }
  let deadLine;
  if (fields.deadLine) {
    deadLine = new Date(fields.deadLine).getTime();
  }
  try {
    await add({ ...fields, parentId, deadLine });
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

const handleUpdate = async (fields: API.Org) => {
  const hide = message.loading('正在更新');
  let deadLine;
  if (fields.deadLine) {
    deadLine = new Date(fields.deadLine).getTime();
  }
  try {
    await update({ ...fields, deadLine });
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

const handleRemove = async (selectedRows: API.Org[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    const resp = await remove(selectedRows.map((row) => row.id));
    hide();
    if (!resp.success) {
      message.error(resp.errorMessage);
    }
    return resp.success;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Org>();
  const [selectedRowsState, setSelectedRows] = useState<API.Org[]>([]);

  const columns: ProColumns<API.Org>[] = [
    {
      title: '照片',
      dataIndex: 'imagePath',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '父级名称',
      dataIndex: 'parentName',
      hideInSearch: true,
    },
    {
      title: '授权到期时间',
      dataIndex: 'deadLine',
      hideInSearch: true,
      renderText: (val: number) => (val ? `${new Date(val).toISOString().slice(0, 10)}` : `~`),
    },
    {
      title: '地址',
      dataIndex: 'addr',
      hideInSearch: true,
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
          action={`/api/check/check-org-po/uploadImage/${record.id}`}
          headers={{ Authorization: getAccessToken() }}
          showUploadList={false}
          onChange={(info) => {
            if (info.file.status === 'done') {
              actionRef.current?.reload();
            }
          }}
        >
          <a key="upload">上传图片</a>
        </Upload>,
        <a
          key="del"
          onClick={() => {
            confirm({
              title: '删除',
              icon: <ExclamationCircleOutlined />,
              content: (
                <p>
                  是否删除检测站<strong>{record.name}</strong>?
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
      <ProTable<API.Org, API.PageParams>
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
                    是否删除选中的<strong>{selectedRowsState.length}</strong>个检测站?
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
        title="新建检测站"
        // width="600px"
        modalProps={{
          // onCancel: () => console.log('close'),
          destroyOnClose: true,
        }}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        initialValues={setCurrentRow}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProForm.Item label="父级名称" name="parentId">
          <TreeSelect fetchByParentId={queryByParentId} item2Option={org2Option} />
        </ProForm.Item>
        <ProForm.Group>
          <ProFormText
            label="名称"
            name="name"
            placeholder="请输入检测站名称"
            width="md"
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
          />
          <ProFormDatePicker
            label="授权到期日期"
            name="deadLine"
            placeholder="请选择授权到期日期"
          />
        </ProForm.Group>
        <ProFormText label="联系电话" name="contactPhone" placeholder="请输入检测站地址" />
        <ProFormText label="可检测项目" name="checkItems" placeholder="请输入可检测项目" />
        <ProFormTextArea
          label="地址"
          name="addr"
          placeholder="请输入检测站地址"
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
            return handleUpdate(values as API.Org).then(() => {
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

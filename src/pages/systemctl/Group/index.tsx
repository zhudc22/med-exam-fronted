import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm,ProFormSelect, ProFormText } from '@ant-design/pro-form';
import TreeSelect from '@/components/TreeSelect';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import UpdateForm from './components/UpdateForm';
import { read, roots, add, update, remove } from '@/services/group';
import { queryByParentId, org2Option, } from '@/services/org';

const { confirm } = Modal;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: API.Group) => {
  const hide = message.loading('正在添加');

  try {
    let checkOrgId;
    if (fields.checkOrgIds !== undefined && fields.checkOrgIds.length > 0) {
      checkOrgId = fields.checkOrgIds[fields.checkOrgIds.length - 1];
    }
    const { success, errorMessage } = await add({ ...fields , checkOrgId});
    hide();
    if (!success) {
      message.error(errorMessage);
    }
    return success;
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

const handleUpdate = async (fields: API.Group) => {
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

const handleRemove = async (selectedRows: API.Group[]) => {
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
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Group>();
  const [selectedRowsState, setSelectedRows] = useState<API.Group[]>([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.Group>[] = [
    {
      title: '团体标识',
      dataIndex: 'mark',
      hideInSearch: true,
      width: 150,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '团体名称',
      dataIndex: 'name',
      ellipsis:true,
    },
    {
      title: '父级名称',
      dataIndex: 'parentName',
      hideInSearch: true,
      ellipsis:true,
    },
    {
      title: '所属检测站',
      dataIndex: 'checkOrgName',
      hideInSearch: true,
      ellipsis:true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
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
                  是否删除团体<strong>{record.name}</strong>?
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
      <ProTable<API.Group, API.PageParams>
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
                    是否删除选中的<strong>{selectedRowsState.length}</strong>个团体?
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
        title="新建团体"
        // width="600px"
        modalProps={{
          // onCancel: () => console.log('close'),
          destroyOnClose: true,
        }}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.Group);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return success;
        }}
      >
        <ProFormSelect
          label="父级名称"
          name="parentId"
          placeholder="父级团体"
          allowClear={true}
          request={roots}
        />
        <ProFormText
          label="团体标识"
          name="mark"
          placeholder="请输入团体标识"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormText
          label="团体名称"
          name="name"
          placeholder="请输入团体名称"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProForm.Item label="检测站名称" name="checkOrgIds">
          <TreeSelect fetchByParentId={queryByParentId} item2Option={org2Option} />
        </ProForm.Item>
      </ModalForm>
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<API.Group>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.Group>[]}
          />
        )}
      </Drawer>
      {currentRow && (
        <UpdateForm
          onSubmit={(values) => {
            return handleUpdate(values as API.Group).then(() => {
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

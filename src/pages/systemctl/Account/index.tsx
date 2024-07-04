import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Switch, Tag, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import TreeSelect from '@/components/TreeSelect';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { read, add, update, remove } from '@/services/user';
import { queryByParentId, org2Option } from '@/services/org';
import { findByCheckOrgId } from '@/services/group';
import { checkItems } from '@/services/checkItems';

const { confirm } = Modal;


/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: API.Account) => {
  const hide = message.loading('正在添加');
  let checkOrgId;
  if (fields.orgId) {
    checkOrgId = fields.orgId[fields.orgId.length - 1];
  }
  try {
    await add({ ...fields, checkOrgId, orgId: undefined });
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleUpdateStatus = async (id: number, username: string, status: string) => {
  const hide = message.loading('正在更新');
  try {
    await update({
      id,
      username,
      status,
    });
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleUpdateRoles = async (id: number, username: string, roleIdList: number[], markList: string[]) => {
  const hide = message.loading('正在更新');
  try {
    await update({
      id,
      username,
      roleIdList,
      markList,
    });
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

const handleRemove = async (selectedRows: API.Account[]) => {
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

  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateRolesModalVisible, handleUpdateRolesModalVisible] = useState<boolean>(false);
  const [showGroupVisible, handleShowGroupVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Account>();
  const [selectedRowsState, setSelectedRows] = useState<API.Account[]>([]);

  const [groupOption, setGroupOption] = useState([]);

  const onCheckOrgChange = async (value: number[]) => {
    // let items = [];
    const items = await findByCheckOrgId(value[0]);
    setGroupOption(items);
  };

  const [modifyForm] = Form.useForm();

  const initMarkList = (row) => {
    const groups = row.groups;
    const list = groups.map(group => (group.mark));
    return list;
  };

  const initGroupOption = async (row) => {
    const checkOrgId = row.checkOrgId;
    const items = await findByCheckOrgId(checkOrgId);
    return items;
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.Account>[] = [
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: '所属检测站',
      dataIndex: 'checkOrgName',
      hideInSearch: true,
    },
    {
      title: '所属团体',
      dataIndex: 'groupName',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      // valueEnum: {
      //   DISABLE: {
      //     text: '停用',
      //     status: 'Default',
      //   },
      //   ENABLE: {
      //     text: '启用',
      //     status: 'Processing',
      //   },
      // },
      render: (_, record) => {
        if (record.status === 'ENABLE') {
          return (
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked={true}
              onClick={() =>
                handleUpdateStatus(record.id, record.username, 'DISABLE').then(() => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                })
              }
            />
          );
        }
        if (record.status === 'DISABLE') {
          return (
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked={false}
              onClick={() =>
                handleUpdateStatus(record.id, record.username, 'ENABLE').then(() => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                })
              }
            />
          );
        }
        if (record.status === 'UNACTIVATE') {
          return <Tag>未激活</Tag>;
        }
        return <Tag>未知</Tag>;
      },
    },
    {
      title: '角色',
      dataIndex: 'roles',
      hideInSearch: true,
      render: (_, record) => record.roles?.map((role) => role.name).join(','),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        // <a
        //   key="modify"
        //   onClick={() => {
        //     handleUpdateModalVisible(true);
        //     setCurrentRow(record);
        //   }}
        // >
        //   编辑
        // </a>,
        <a
          key="del"
          onClick={() => {
            confirm({
              title: '删除',
              icon: <ExclamationCircleOutlined />,
              content: (
                <p>
                  是否删除账户<strong>{record.nickName}</strong>?
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
              onCancel() { },
            });
          }}
        >
          删除
        </a>,
        <a
          key="role"
          onClick={async () => {
            setCurrentRow(record);
            handleUpdateRolesModalVisible(true);
            const groupOptinons = await initGroupOption(record);
            const temp = record.roles[0].id;
            if (temp === 4) {
              handleShowGroupVisible(true);
            } else {
              handleShowGroupVisible(false);
            }
            modifyForm.setFieldsValue({ roleId: temp, groupOption: groupOptinons, markList: initMarkList(record) })
          }}
        >
          修改角色
        </a>,
      ],
    },
  ];


  return (
    <PageContainer>
      <ProTable<API.Account, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
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
                    是否删除选中的<strong>{selectedRowsState.length}</strong>个用户?
                  </p>
                ),
                okType: 'danger',
                onOk() {
                  handleRemove(selectedRowsState);
                },
                onCancel() { },
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
        tableAlertRender={false}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
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
        title={'新建账户'}
        modalProps={{
          destroyOnClose: true,
        }}
        // width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.Account);

          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="账户"
          name="username"
          placeholder="请输入账户"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormText
          label="昵称"
          name="nickName"
          placeholder="请输入昵称"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormSelect
          label="角色"
          name="roleIdList"
          placeholder="请选择角色"
          allowClear={true}
          fieldProps={{
            onChange: (value) => {
              if (value === 4) {
                handleShowGroupVisible(true);
              } else {
                handleShowGroupVisible(false);
              }
            },
          }}
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          options={[
            {
              label: '检测员',
              value: 2,
            },
            {
              label: '统计员',
              value: 4,
            },
            {
              label: '系统管理员',
              value: 1,
            },
          ]}
        />
        <ProFormSelect
          label="状态"
          name="status"
          allowClear={false}
          initialValue="ENABLE"
          options={[
            {
              label: '启用',
              value: 'ENABLE',
            },
            {
              label: '禁用',
              value: 'DISABLE',
            },
            {
              label: '未激活',
              value: 'UNACTIVATE',
            },
          ]}
        />
        <ProForm.Item label="所属检测点" name="orgId">
          <TreeSelect fetchByParentId={queryByParentId} onChange={onCheckOrgChange} item2Option={org2Option} />
        </ProForm.Item>
        {showGroupVisible && (
          <ProFormSelect
            label="团体标识"
            name="markList"
            mode="multiple"
            placeholder="请选择团体"
            allowClear={true}
            options={groupOption}
          />
        )}
      </ModalForm>
      {/* 修改角色 */}
      {updateRolesModalVisible && (
        <ModalForm
          title="修改角色"
          // width="600px"
          visible={updateRolesModalVisible}
          onVisibleChange={handleUpdateRolesModalVisible}
          form={modifyForm}
          // initialValues={{roleId: currentRow.roles[0].id, groupOption: initGroupOption(currentRow), markList: initMarkList(currentRow)}}
          onFinish={async (value) => {
            const success = await handleUpdateRoles(currentRow.id, currentRow.username, [value.roleId], value.markList);
            if (success) {
              handleUpdateRolesModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProFormSelect
            label={`${currentRow.nickName}`}
            name="roleId"
            placeholder="请选择角色"
            // mode="multiple"
            allowClear={false}
            fieldProps={{
              onChange: (value) => {
                if (value === 4) {
                  handleShowGroupVisible(true);
                } else {
                  handleShowGroupVisible(false);
                }
              },
            }}
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
            options={[
              {
                label: '检测员',
                value: 2,
              },
              {
                label: '统计员',
                value: 4,
              },
              {
                label: '系统管理员',
                value: 1,
              },
            ]}
          />
          {showGroupVisible && (
            <ProFormSelect
              label="团体标识"
              name="markList"
              mode="multiple"
              placeholder="请选择团体"
              allowClear={true}
              params={currentRow}
              request={initGroupOption}
            // options={groupOption}
            />
          )}
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default TableList;

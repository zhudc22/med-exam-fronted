import moment from 'moment';
import React, { useState, useRef } from 'react';
import { PlusOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Modal, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { read, add, update, remove } from '@/services/training';
import { queryByName } from '@/services/expectedTraining';
import { read as addresses } from '@/services/address';

const { confirm } = Modal;

const handleAdd = async (fields: API.Training) => {
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

const handleUpdate = async (row: API.Training) => {
  const hide = message.loading('正在更新');
  try {
    await update(row.id, row);
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleRemove = async (selectedRows: API.Training[]) => {
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

const createFields = (form) => (
  <>
    <ProForm.Group title="基本情况">
      <ProFormSelect
        label="姓名"
        name="nickName"
        placeholder="请输入待矫正人姓名"
        showSearch
        width="sm"
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        fieldProps={{
          onSelect: (value, option) => {
            if (option.record) {
              const { record } = option;
              form.setFieldsValue({
                male: record.male,
                age: record.age,
                card: record.card,
                anomaly: record.abnormalCondition,
              });
            }
          },
        }}
        request={async ({ keyWords }) => {
          let input = keyWords;
          if (input === undefined) {
            input = '';
          }
          const { data, success } = await queryByName(input);
          if (success) {
            return data.map((it) => ({
              label: it.nickName,
              value: it.nickName,
              key: it.id,
              record: it,
            }));
          }
          return [];
        }}
      />
      <ProFormSelect
        shouldUpdate
        label="性别"
        name="male"
        placeholder="请选择性别"
        width="sm"
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        options={[
          {
            label: '男',
            value: 0,
          },
          {
            label: '女',
            value: 1,
          },
        ]}
      />
      <ProFormText shouldUpdate label="年龄" name="age" placeholder="请输入年龄" width="sm" />
    </ProForm.Group>
    <ProFormText name="card" hidden />
    <ProFormText
      shouldUpdate
      label="异常情况"
      name="anomaly"
      placeholder="请输入"
      width="xl"
      rules={[
        {
          required: true,
          message: '必填项',
        },
      ]}
    />
    <ProForm.Group title="矫正训练">
      <ProFormSelect
        label="参与何种矫正训练"
        name="type"
        placeholder="请选择"
        width="sm"
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        options={[
          {
            label: '高低肩恢复矫正训练',
            value: 1,
          },
          {
            label: '翼状肩胛恢复矫正训练',
            value: 2,
          },
          {
            label: '圆肩驼背恢复矫正训练',
            value: 3,
          },
          {
            label: '足弓塌陷恢复矫正训练',
            value: 4,
          },
          {
            label: '骨盆前倾恢复矫正训练',
            value: 5,
          },
          {
            label: '身体发育迟缓恢复矫正训练',
            value: 6,
          },
          {
            label: '骨密度值偏低恢复矫正训练',
            value: 7,
          },
          {
            label: '肥胖恢复矫正训练',
            value: 8,
          },
          {
            label: '其它',
            value: 9,
          },
        ]}
      />
      <ProFormSelect
        label="矫正地点"
        name="addressId"
        placeholder="请选择"
        width="sm"
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        fieldProps={{
          onSelect: (value, option) => {
            if (option.record) {
              const { record } = option;
              form.setFieldsValue({ address: record.name });
            }
          },
        }}
        request={async () => {
          const { data, success } = await addresses({ current: 1, pageSize: 100000 });
          if (success) {
            return data.map((it) => ({ label: it.name, value: it.id, key: it.id, record: it }));
          }
          return [];
        }}
      />
      <ProFormDatePicker
        label="矫正时间"
        name="time"
        placeholder="请选择"
        width="sm"
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
      />
    </ProForm.Group>
    <ProFormText name="address" hidden />
    <ProFormSelect
      label="与上次相比是否有改善"
      name="isUseful"
      placeholder="请选择"
      width="sm"
      options={[
        {
          label: '是',
          value: 0,
        },
        {
          label: '否',
          value: 1,
        },
      ]}
    />
    <ProFormTextArea label="备注" name="remark" placeholder="请输入" />
  </>
);

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Training>();
  const [selectedRowsState, setSelectedRows] = useState<API.Training[]>([]);

  const columns: ProColumns<API.Training>[] = [
    {
      title: '姓名',
      dataIndex: 'nickName',
    },
    {
      title: '性别',
      dataIndex: 'male',
      hideInSearch: true,
      render: (_, record) => {
        switch (record.male) {
          case 0:
            return '男';
          case 1:
            return '女';
          default:
            return '-';
        }
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      hideInSearch: true,
    },
    {
      title: '矫正时间',
      dataIndex: 'time',
      hideInSearch: true,
      renderText: (text, record) => moment(record.time).format('YYYY/MM/DD'),
    },
    {
      title: '异常情况',
      dataIndex: 'anomaly',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="modify" onClick={() => {
          handleUpdateModalVisible(true);
          setCurrentRow(record);
        }}>
          编辑
        </a>,
        <a
          key="remove"
          onClick={() => {
            confirm({
              title: '删除',
              icon: <ExclamationCircleOutlined />,
              content: (
                <p>
                  是否删除<strong>{record.nickName}</strong>
                  {moment(record.time).format('MM/DD')}的矫正记录?
                </p>
              ),
              okType: 'danger',
              onOk() {
                handleRemove([record]).then(() => {
                  actionRef.current?.reload();
                });
              },
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <PageContainer>
      <ProTable<API.Training, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolbar={{
          settings: [],
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
                    是否删除选中的<strong>{selectedRowsState.length}</strong>个记录?
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
        form={createForm}
        title={'新建矫正记录'}
        modalProps={{
          destroyOnClose: true,
        }}
        // width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const time = moment(value.time).valueOf();
          const success = await handleAdd({ ...value, time });
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        {createFields(createForm)}
      </ModalForm>
      {updateModalVisible && (
        <ModalForm
          form={updateForm}
          title={'更新矫正记录'}
          modalProps={{
            destroyOnClose: true,
          }}
          // width="600px"
          visible={updateModalVisible}
          initialValues={currentRow}
          onVisibleChange={handleUpdateModalVisible}
          onFinish={async (value) => {
            const time = moment(value.time).valueOf();
            const success = await handleUpdate({ ...value, time });
            if (success) {
              handleUpdateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProFormDigit name="id" hidden />
          {createFields(updateForm)}
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default TableList;

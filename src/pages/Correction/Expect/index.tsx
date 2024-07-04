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
} from '@ant-design/pro-form';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { read } from '@/services/expectedTraining';
import { add } from '@/services/training';
import { read as addresses } from '@/services/address';

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
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ExpectedTraining>();

  const columns: ProColumns<API.ExpectedTraining>[] = [
    {
      title: '#',
      dataIndex: 'id',
      valueType: 'index',
      width: 20,
      // width: '20px',
    },
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
      title: '身份证',
      dataIndex: 'card',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '矫正时间',
      dataIndex: 'correctTime',
      hideInSearch: true,
      renderText: (text, record) =>
        record.correctTime ? moment(record.correctTime).format('YYYY/MM/DD') : '-',
    },
    {
      title: '异常情况',
      dataIndex: 'abnormalCondition',
      hideInSearch: true,
    },
    {
      title: '已参加矫正训练',
      dataIndex: 'status',
      hideInSearch: true,
      renderText: (_, record) => (record.status ? '是' : '否'),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="address"
          onClick={() => {
            handleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          矫正记录
        </a>,
      ],
    },
  ];

  const [createForm] = Form.useForm();

  return (
    <PageContainer>
      <ProTable<API.ExpectedTraining, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolbar={{
          settings: [],
        }}
        request={read}
        columns={columns}
        tableAlertRender={false}
        rowSelection={false}
        options={{
          density: false,
          fullScreen: false,
          reload: false,
        }}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
      />
      {createModalVisible && (
        <ModalForm
          form={createForm}
          title={'新建矫正记录'}
          modalProps={{
            destroyOnClose: true,
          }}
          // width="600px"
          initialValues={{ ...currentRow, anomaly: currentRow.abnormalCondition }}
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            const time = moment(value.time).valueOf();
            const success = await handleAdd({ ...value, time });
            if (success) {
              handleModalVisible(false);
            }
          }}
        >
          {createFields(createForm)}
        </ModalForm>
      )}
    </PageContainer>
  );
};

export default TableList;

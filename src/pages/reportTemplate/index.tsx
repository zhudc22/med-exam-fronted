import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Upload, Button, message, Modal, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText,ProFormSelect} from '@ant-design/pro-form';

import TreeSelect from '@/components/TreeSelect';
import UpdateForm from './components/UpdateForm';

import { queryByParentId, org2Option } from '@/services/org';
import { rootCheckItems } from '@/services/checkItems';

import { fetchReportList, save, remove } from '@/services/report';
import styles from './index.less';

const { confirm } = Modal;

const Reserve: React.FC = () => {
  const [form] = Form.useForm();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const [template, setTemplate] = useState();
  
  const columns: ProColumns<API.ReportItem>[] = [
    {
      title: '模版名称',
      dataIndex: 'name',
      width: 350,
    },
    {
      title: '所属检测项目',
      dataIndex: 'checkTypeName',
      width: 350,
    },
    {
      title: '所属检测站',
      dataIndex: 'checkOrgName',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 250,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="download"
          href={`/api/check/check-template-po/download/${record.id}/${record.checkType}`}
          target="_blank"
        >
          下载模版
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ReportItem, API.PageParams>
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
            type="primary"
            key="add"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 上传
          </Button>,
        ]}
        request={fetchReportList}
        columns={columns}
        tableAlertRender={false}
        rowSelection={false}
      />
      <ModalForm
        form={form}
        title={'上传模版'}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          if (!template) {
            message.error('请上传报告单模版');
            return;
          }
          value.template = template;

          const hide = message.loading('正在保存');
          save({
            ...value,
            checkOrgId: value.selectOrgId?.lastItem,
            checkType: value.selectTypeId,
          }).then((resp) => {
            if (resp) {
              message.success('保存成功');
              hide();
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            } else {
              message.error('保存失败');
              hide();
            }
          });
        }}
        layout={'horizontal'}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        modalProps={{
          onCancel: () => {
            form.resetFields();
          },
          centered: true,
          destroyOnClose: true,
        }}
      >
        <ProForm.Item
          label="检测点"
          name="selectOrgId"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        >
          <TreeSelect fetchByParentId={queryByParentId} item2Option={org2Option} />
        </ProForm.Item>
        <ProFormSelect
            name="selectTypeId"
            label="所属检测项目）"
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
            request={async () => {
              const data = await rootCheckItems();
              return data.map((it) => ({ label: it.name, value: it.id }));
            }}
          />

        <ProForm.Item label="模版上传" name="template">
          <Upload
            action={`/api/check/check-template-po/save`}
            accept={'.doc,.docx'}
            maxCount={1}
            onChange={(file) => {
              setTemplate(file.file);
            }}
          >
            <Button icon={<UploadOutlined />}>上传文件</Button>
            <br></br>
            <span className={styles.accep_type}>支持扩展名：.doc .docx</span>
          </Upload>
        </ProForm.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default Reserve;

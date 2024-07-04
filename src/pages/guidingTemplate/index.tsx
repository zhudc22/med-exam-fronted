import { PlusOutlined, DeleteOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Upload, Button, message, Modal, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';

import TreeSelect from '@/components/TreeSelect';
import UpdateForm from './components/UpdateForm';

import { queryByParentId, org2Option, queryById } from '@/services/org';

import { fetchGuidingList, save, remove } from '@/services/guiding';

import styles from './index.less';

const { confirm } = Modal;


const Reserve: React.FC = () => {

  const [form] = Form.useForm();

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const actionRef = useRef<ActionType>();

  const [selectedRowsState, setSelectedRows] = useState<API.GuidingItem[]>([]);
  const [template, setTemplate] = useState();
  const [currentRow, setCurrentRow] = useState<API.GuidingItem>();
  const [showTitle, setShowTitle] = useState();
  const [fileName, setFileName] = useState();
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);


  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.GuidingItem>[] = [
    {
      title: '模版名称',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: '所属检测点',
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
          key="view"
          onClick={async () => {
            setCurrentRow(record);
            handleUpdateModalVisible(true);


          }}
        >
          编辑
        </a>,
        <a href={`/api/check/check-guide-po/download/${record.id}`} target='_blank'>
          下载模版
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ReserveItem, API.PageParams>
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
              setFileName([]);
              handleModalVisible(true); 
              setShowTitle(true);
              
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button
            disabled={selectedRowsState.length === 0}
            key="remove"
            onClick={() => {
              confirm({
                title: '批量删除',
                icon: <ExclamationCircleOutlined />,
                content: (
                  <p>
                    是否删除选中的<strong>{selectedRowsState.length}</strong>条记录?
                  </p>
                ),
                okType: 'danger',
                onOk() {
                  const hide = message.loading('正在删除');
                  if (!selectedRowsState) return true;
                  try {
                    remove(selectedRowsState.map((row) => row.id));
                    hide();
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                    return false;
                  } catch (error) {
                    hide();
                    return true;
                  }

                },
                onCancel() { },
              });
            }}
          >
            <DeleteOutlined /> 删除
          </Button>,
        ]}
        request={fetchGuidingList}
        columns={columns}
        tableAlertRender={false}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

      <ModalForm
        form={form}
        title={showTitle ? "新建模版" : "编辑模版"}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          if (!template) {
            message.error("请上传指引单模版");
            return;
          }
          value.template = template;

          const hide = message.loading('正在保存');
          save({...value,checkOrgId:value.selectOrgId.lastItem}).then(resp => {
            if (resp) {
              message.success("保存成功");
              hide();
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            } else {
              message.error("保存失败");
              hide();
            }

          })


        }}
        layout={'horizontal'}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        modalProps={{ onCancel: () => { form.resetFields() }, centered: true, destroyOnClose: true }}
      >
        <ProFormText
          label="模版名称"
          name="name"
          placeholder="请输入"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProForm.Item label="检测点" name="selectOrgId"  rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}>
          <TreeSelect fetchByParentId={queryByParentId} item2Option={org2Option}  fetchById={queryById}/>
          

        </ProForm.Item>
        <ProForm.Item label="模版上传" name="parentId" >
          <Upload
            defaultFileList={fileName} 
            accept={'.doc,.docx'}
            maxCount={1}
            onChange={(file) => {
              setTemplate(file.file);
            }}
          >
            <Button icon={<UploadOutlined />}>上传文件</Button><br></br>
            <span className={styles.accep_type}>支持扩展名：.doc .docx</span>
          </Upload>
        </ProForm.Item>


      </ModalForm>

      {currentRow && (
        <UpdateForm  onSubmit={(value) => {
 
            const hide = message.loading('正在保存');
            save(value).then(resp => {
              if (resp) {
                message.success("保存成功");
                hide();
                handleUpdateModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
                
              } else {
                message.error("保存失败");
                hide();
              }

            })

          }}
          updateModalVisible={updateModalVisible}
          handleModalVisible={(visible) => handleUpdateModalVisible(visible)}
          values={currentRow}
        />
      )}

    </PageContainer>
  );
};

export default Reserve;

import React, { useState, useRef } from 'react';
import ProForm, { ProFormText, ModalForm, } from '@ant-design/pro-form';
import TreeSelect from '@/components/TreeSelect';
import { UploadOutlined } from '@ant-design/icons';
import { queryByParentId, queryById, org2Option } from '@/services/org';
import { Upload, Button, message, Modal, Form  } from 'antd';
import {  save } from '@/services/guiding';
import styles from '../index.less';

export type UpdateFormProps = {
  onSubmit: (values: Partial<API.GuidingItem>) => Promise<void>;
  updateModalVisible: boolean;
  handleModalVisible: (visible: boolean) => void;
  values: Partial<API.GuidingItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  const { values, updateModalVisible, handleModalVisible } = props;
  const [template, setTemplate] = useState();

  const { treeId } = values;
  const treeList = treeId.split('/');
  treeList.pop(); // remove blank
  const initSelectParentId = treeList.map((it) => parseInt(it, 10));
  
  return (
    <ModalForm
      title="编辑模板"
      modalProps={{
        destroyOnClose: true,
      }}
      visible={updateModalVisible}
      onVisibleChange={handleModalVisible}
      initialValues={{ ...values,  selectOrgId: initSelectParentId}}
      onFinish={async (value) => {
        value.template = template;
        await props.onSubmit({...value,checkOrgId:value.selectOrgId.lastItem,id: values.id});


      }}
      layout={'horizontal'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
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
            // defaultFileList={fileName} 
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
  );
};

export default UpdateForm;

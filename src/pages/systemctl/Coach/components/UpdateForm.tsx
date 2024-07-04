import React from 'react';
import { ProFormSelect, ProFormText, ProFormDigit, ModalForm } from '@ant-design/pro-form';


export type UpdateFormProps = {
  onSubmit: (values: Partial<API.Gzry>) => Promise<void>;
  updateModalVisible: boolean;
  handleModalVisible: (visible: boolean) => void;
  values: Partial<API.Gzry>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { values, updateModalVisible, handleModalVisible } = props;
  return (
    <ModalForm
      title="编辑"
      // width="600px"
      modalProps={{
        destroyOnClose: true,
      }}
      visible={updateModalVisible}
      onVisibleChange={handleModalVisible}
      initialValues={values}
      onFinish={async (value) => {
        await props.onSubmit(value);
      }}
    >
      <ProFormDigit name="id" readonly hidden />
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
        />
        <ProFormText
          label="区域"
          name="region"
          placeholder="请输入"
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
          placeholder="请输入名称"
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
  );
};

export default UpdateForm;

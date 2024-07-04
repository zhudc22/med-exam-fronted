import React from 'react';
import ProForm, { ProFormTextArea, ProFormText, ProFormDigit, ModalForm } from '@ant-design/pro-form';


export type UpdateFormProps = {
  onSubmit: (values: Partial<API.Address>) => Promise<void>;
  updateModalVisible: boolean;
  handleModalVisible: (visible: boolean) => void;
  values: Partial<API.Address>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { values, updateModalVisible, handleModalVisible } = props;
  return (
    <ModalForm
      title="编辑地址"
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
  );
};

export default UpdateForm;

import React from 'react';
import ProForm, {
  ProFormText,
  ProFormDigit,
  ProFormTextArea,
  ModalForm,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import TreeSelect from '@/components/TreeSelect';

import { queryByParentId, queryById, org2Option } from '@/services/org';

export type UpdateFormProps = {
  onSubmit: (values: Partial<API.Org>) => Promise<void>;
  updateModalVisible: boolean;
  handleModalVisible: (visible: boolean) => void;
  values: Partial<API.Org>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { values, updateModalVisible, handleModalVisible } = props;
  let deadLine;
  if (values.deadLine) {
    deadLine = new Date(values.deadLine).toISOString().slice(0, 10);
  }
  const { parentId, treeId } = values;
  const treeList = treeId.split('/');
  treeList.pop(); // remove blank
  treeList.pop(); // remove self
  const initSelectParentId = treeList.map((it) => parseInt(it, 10));
  return (
    <ModalForm
      title="编辑检测站"
      // width="600px"
      modalProps={{
        destroyOnClose: true,
      }}
      visible={updateModalVisible}
      onVisibleChange={handleModalVisible}
      initialValues={{ ...values, selectParentId: initSelectParentId, deadLine }}
      onFinish={async (value) => {
        const { selectParentId } = value;
        await props.onSubmit({ ...value, parentId: selectParentId[selectParentId.length - 1] });
      }}
    >
      <ProFormDigit name="id" readonly hidden />
      <ProForm.Item label="父级名称" name="selectParentId">
        <TreeSelect
          fetchByParentId={queryByParentId}
          fetchById={queryById}
          item2Option={org2Option}
          disabled={parentId === 0}
        />
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
        <ProFormDatePicker label="授权到期日期" name="deadLine" placeholder="请选择授权到期日期" />
      </ProForm.Group>
      <ProFormText
          label="联系电话"
          name="contactPhone"
          placeholder="请输入检测站地址"
        />
        <ProFormText
          label="可检测项目"
          name="checkItems"
          placeholder="请输入可检测项目"
        />
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
  );
};

export default UpdateForm;

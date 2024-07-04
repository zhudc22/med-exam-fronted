import React from 'react';
import ProForm, {
  ProFormSelect,
  ProFormDigit,
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import TreeSelect from '@/components/TreeSelect';

import { roots } from '@/services/group';

import { queryByParentId, queryById, org2Option } from '@/services/org';

export type UpdateFormProps = {
  onSubmit: (values: Partial<API.Group>) => Promise<void>;
  updateModalVisible: boolean;
  handleModalVisible: (visible: boolean) => void;
  values: Partial<API.Group>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { values, updateModalVisible, handleModalVisible } = props;
  const { checkOrgTreeId } = values;
  const treeList = checkOrgTreeId.split('/');
  treeList.pop(); // remove blank
  const initSelectOrgId = treeList.map((it) => parseInt(it, 10));

  return (
    <ModalForm
      title="编辑团体"
      // width="600px"
      modalProps={{
        destroyOnClose: true,
      }}
      visible={updateModalVisible}
      onVisibleChange={handleModalVisible}
      initialValues={{...values, selectOrgId: initSelectOrgId, parentId: values?.parentId === 0 ? undefined : values?.parentId}}
      onFinish={async (value) => {
        const { selectOrgId } = value;
        await props.onSubmit({...value, checkOrgId: selectOrgId[selectOrgId.length-1]});
      }}
    >
      <ProFormDigit name="id" readonly hidden />
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
        <ProForm.Item label="所属检测站" name="selectOrgId">
        <TreeSelect
          fetchByParentId={queryByParentId}
          fetchById={queryById}
          item2Option={org2Option}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default UpdateForm;

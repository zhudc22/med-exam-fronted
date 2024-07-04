import React, { useState } from 'react';
import { useModel, history } from 'umi';
import { LockOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Form, Card, Tabs, message, Alert } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDigit } from '@ant-design/pro-form';

import { password, update } from '@/services/user';

const { TabPane } = Tabs;

const Setting: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [updatePasswordState, setUpdatePasswordState] = useState({
    success: true,
    errorMessage: '',
  });

  if (currentUser === undefined) {
    history.push('/');
    return undefined;
  }

  const isPerson = currentUser.roles.length === 1 && currentUser.roles[0].code === 'USER';

  const doUpdateBasic = async (values) => {
    const { success, data } = await update({ ...values, id: currentUser.id });
    if (success) {
      message.success('基本信息修改成功');
      await setInitialState((s) => ({
        ...s,
        currentUser: { ...currentUser, age: data.age, card: data.card },
      }));
    }
  };

  const [passwordForm] = Form.useForm();

  const doUpdatePassword = async (values) => {
    const { success, errorMessage } = await password(values.oldPassword, values.newPassword);
    setUpdatePasswordState({ success, errorMessage });
    if (success) {
      message.success('修改密码成功');
      passwordForm.setFieldsValue({
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      });
    } else {
      passwordForm.setFieldsValue({ oldPassword: undefined });
    }
    return success;
  };

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey="info">
          <TabPane
            tab={
              <span>
                <InfoCircleOutlined />
                基本信息
              </span>
            }
            key="info"
          >
            <Card style={{ display: 'inline-block', width: 'auto' }}>
              <ProForm
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={doUpdateBasic}
                initialValues={{
                  ...currentUser,
                  age: currentUser.age > 0 ? currentUser.age : undefined,
                }}
                submitter={{
                  searchConfig: {
                    submitText: '更新信息',
                  },
                  submitButtonProps: { style: { float: 'right' } },
                  resetButtonProps: false,
                }}
              >
                <ProFormText label="账户" name="username" readonly width="md" />
                <ProFormText label="姓名" name="nickName" width="md" />
                <ProFormDigit
                  label="年龄"
                  name="age"
                  width="md"
                  min={1}
                  max={120}
                  fieldProps={{ precision: 0 }}
                />
                <ProFormText
                  label="身份证号"
                  name="card"
                  rules={[
                    {
                      required: true,
                      message: '必填项',
                    },
                    {
                      required: false,
                      pattern: new RegExp(
                        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        'g',
                      ),
                      message: '请输入正确的身份证号码',
                    },
                  ]}
                  width="md"
                />
                {/* 帐号是个人时不显示所属团体 */}
                {!isPerson && <ProFormText name="groupName" label="所属团体" width="md" readonly />}
              </ProForm>
            </Card>
          </TabPane>
          <TabPane
            tab={
              <span>
                <LockOutlined />
                修改密码
              </span>
            }
            key="password"
          >
            <Card style={{ display: 'inline-block', width: 'auto' }}>
              {!updatePasswordState.success && (
                <Alert
                  style={{
                    marginBottom: 24,
                  }}
                  message={updatePasswordState.errorMessage}
                  type="error"
                  showIcon
                />
              )}
              <ProForm
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                form={passwordForm}
                onFinish={doUpdatePassword}
                submitter={{
                  searchConfig: {
                    submitText: '保存',
                  },
                  submitButtonProps: { style: { float: 'right' } },
                  resetButtonProps: false,
                }}
              >
                <ProFormText.Password
                  label="原密码"
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项',
                    },
                  ]}
                  width="md"
                />
                <ProFormText.Password
                  label="新密码"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项',
                    },
                    {
                      validator(rule, value: string) {
                        if (value.length < 6 || value.length > 16) {
                          return Promise.reject(new Error(`密码长度6-16位`));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  width="md"
                />
                <ProFormText.Password
                  label="确认密码"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value: string) {
                        const pass = getFieldValue('newPassword');
                        if (pass === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(`两次输入的密码不匹配`));
                      },
                    }),
                  ]}
                  width="md"
                />
              </ProForm>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Setting;

import React, { useState, useRef } from 'react';
import { Link, history, useModel } from 'umi';
import {
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Form, Alert, message, Tabs, Row, Col } from 'antd';
import ProForm, { ProFormCaptcha, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import Captcha from 'react-captcha-code';
import Footer from '@/components/Footer';
import Contacts from '@/components/Contacts';
import { setAuthority } from '@/utils/authority';
import { signup, getRegistCaptcha, login } from '@/services/user';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('mobile');
  const { initialState, setInitialState } = useModel('@@initialState');

  const captchaRef = useRef<any>();
  const codeNum = 4;
  const [code, setCode] = useState<string>();

  const handleCaptchaClick = () => {
    captchaRef.current?.refresh();
  };

  const handleCaptchaChange = (newCode: string) => {
    setCode(newCode);
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);

    try {
      // 登录
      const msg = await signup({ ...values, username: values.mobile, type });

      if (msg.success) {
        const defaultLoginSuccessMessage = '注册成功';
        message.success(defaultLoginSuccessMessage);

        const logined = await login({ username: values.mobile, password: values.password, type });
        setAuthority(logined.data.authorization);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        const { redirect, from } = query as {
          redirect: string;
          from: string;
        };
        if (from === '/') {
          window.location.href = redirect;
        } else {
          history.push(redirect || '/');
        }
        return;
      } // 如果失败去设置用户错误信息

      setUserLoginState({ ...msg, status: 'error', type });
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试';
      message.error(defaultLoginFailureMessage);
    }

    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;
  const [form] = Form.useForm();
  if (userLoginState?.status === 'error') {
    if (form.getFieldValue('pic-captcha') === code) {
      form.setFieldsValue({ 'pic-captcha': undefined });
      const changeCaptcha = new Promise((resolve) => {
        setTimeout(() => {
          captchaRef.current?.refresh();
          resolve('');
        }, 0);
      });
      changeCaptcha.then(() => false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.topbar}></div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/img/logo.png" />
            </Link>
          </div>
          <div className={styles.desc}>生命力康用户登录</div>
        </div>

        <div className={styles.main}>
          <ProForm
            form={form}
            submitter={{
              searchConfig: {
                submitText: '注册',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                disabled: !agreement,
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane key="mobile" tab={'个人注册'}>
                {status === 'error' && loginType === 'mobile' && (
                  <LoginMessage content={userLoginState.errorMessage} />
                )}
                {type === 'mobile' && (
                  <>
                    <ProFormText
                      fieldProps={{
                        size: 'large',
                        prefix: <MobileOutlined className={styles.prefixIcon} />,
                      }}
                      name="mobile"
                      placeholder={'请输入手机号'}
                      rules={[
                        {
                          required: true,
                          message: '必填项',
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: '无效的手机号',
                        },
                        ({ getFieldValue, validateFields }) => ({
                          validator(rule, value, callback) {
                            const picCaptchaValue = getFieldValue('pic-captcha');

                            if (picCaptchaValue === code) {
                              // pass
                            } else {
                              validateFields(['pic-captcha']).catch((err) => {
                                callback(err);
                              });
                            }

                            return Promise.resolve();
                          },
                        }),
                      ]}
                    />
                    <Row gutter={16} justify="center">
                      <Col span={16}>
                        <ProFormText
                          fieldProps={{
                            size: 'large',
                            prefix: <MailOutlined className={styles.prefixIcon} />,
                          }}
                          name="pic-captcha"
                          placeholder="图片验证码"
                          rules={[
                            () => ({
                              validator(rule, value) {
                                if (value === code) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error(`图片验证码错误`));
                              },
                            }),
                          ]}
                        />
                      </Col>
                      <Col span={8} title={'看不清楚?换张图片'}>
                        <Captcha
                          ref={captchaRef}
                          onChange={handleCaptchaChange}
                          charNum={codeNum}
                          onClick={handleCaptchaClick}
                        />
                      </Col>
                    </Row>
                    <ProFormCaptcha
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      captchaProps={{
                        size: 'large',
                      }}
                      placeholder={'请输入验证码'}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${'秒后重新获取'}`;
                        }

                        return '获取验证码';
                      }}
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: '验证码是必填项',
                        },
                      ]}
                      phoneName={['mobile']}
                      onGetCaptcha={async (phone) => {
                        if (!phone) {
                          return;
                        }
                        await getRegistCaptcha(phone);
                      }}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={'请输入密码,密码长度6-16位'}
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
                    />
                    <ProFormText.Password
                      name="confirmPassword"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={'确认密码'}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(rule, value: string) {
                            const pass = getFieldValue('password');
                            if (pass === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(`两次输入的密码不匹配`));
                          },
                        }),
                      ]}
                    />
                    <Row justify="center">
                      <Col>
                        <ProFormCheckbox
                          name="agreement"
                          fieldProps={{
                            onChange: (e) => {
                              setAgreement(e.target.checked);
                            },
                          }}
                        >
                          我已阅读并同意
                          <a href="/agreement.html" target="_blank">
                            《用户注册协议》
                          </a>
                        </ProFormCheckbox>
                      </Col>
                    </Row>
                  </>
                )}
              </Tabs.TabPane>
              <Tabs.TabPane key="group" tab={'团体注册'}>
                {status === 'error' && loginType === 'group' && (
                  <LoginMessage content={userLoginState.errorMessage} />
                )}
                {type === 'group' && (
                  <>
                    <ProFormText
                      fieldProps={{
                        size: 'large',
                        prefix: <MobileOutlined className={styles.prefixIcon} />,
                      }}
                      name="mobile"
                      placeholder={'请输入手机号'}
                      rules={[
                        {
                          required: true,
                          message: '必填项',
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: '无效的手机号',
                        },
                        ({ getFieldValue, validateFields }) => ({
                          validator(rule, value, callback) {
                            const picCaptchaValue = getFieldValue('pic-captcha');

                            if (picCaptchaValue === code) {
                              // pass
                            } else {
                              validateFields(['pic-captcha']).catch((err) => {
                                callback(err);
                              });
                            }

                            return Promise.resolve();
                          },
                        }),
                      ]}
                    />
                    <Row gutter={16} justify="center">
                      <Col span={16}>
                        <ProFormText
                          fieldProps={{
                            size: 'large',
                            prefix: <MailOutlined className={styles.prefixIcon} />,
                          }}
                          name="pic-captcha"
                          placeholder="图片验证码"
                          rules={[
                            () => ({
                              validator(rule, value) {
                                if (value === code) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error(`图片验证码错误`));
                              },
                            }),
                          ]}
                        />
                      </Col>
                      <Col span={8} title={'看不清楚?换张图片'}>
                        <Captcha
                          ref={captchaRef}
                          onChange={handleCaptchaChange}
                          charNum={codeNum}
                          onClick={handleCaptchaClick}
                        />
                      </Col>
                    </Row>
                    <ProFormCaptcha
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      captchaProps={{
                        size: 'large',
                      }}
                      placeholder={'请输入验证码'}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${'秒后重新获取'}`;
                        }

                        return '获取验证码';
                      }}
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: '验证码是必填项',
                        },
                      ]}
                      phoneName={['mobile']}
                      onGetCaptcha={async (phone) => {
                        if (!phone) {
                          return;
                        }
                        await getRegistCaptcha(phone);
                      }}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={'请输入密码,区分大小写'}
                      rules={[
                        {
                          required: true,
                          message: '密码是必填项',
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="confirmPassword"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={'确认密码'}
                      rules={[
                        {
                          required: true,
                          message: '密码是必填项',
                        },
                      ]}
                    />
                    <ProFormText
                      fieldProps={{
                        size: 'large',
                        prefix: <UsergroupAddOutlined className={styles.prefixIcon} />,
                      }}
                      name="mark"
                      placeholder="团体标识"
                      rules={[
                        {
                          required: true,
                          message: '必填项',
                        },
                      ]}
                    />
                    <Row justify="center">
                      <Col>
                        <ProFormCheckbox
                          name="agree"
                          fieldProps={{
                            onChange: (e) => {
                              setAgreement(e.target.checked);
                            },
                          }}
                        >
                          我已阅读并同意
                          <a href="/agreement.html" target="_blank">
                            《用户注册协议》
                          </a>
                        </ProFormCheckbox>
                      </Col>
                    </Row>
                  </>
                )}
              </Tabs.TabPane>
            </Tabs>
          </ProForm>
          <div className={styles.other}>
            <Link to="/user/login">已有账户立即登录</Link>
          </div>
        </div>
      </div>
      <Footer>
        <Contacts />
      </Footer>
    </div>
  );
};

export default Login;

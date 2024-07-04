import { stringify } from 'querystring';
import React, { useState, useRef } from 'react';
import { Link, history, useModel } from 'umi';
import { LockOutlined, MobileOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Alert, message, Tabs, Row, Col } from 'antd';
import ProForm, { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import Captcha from 'react-captcha-code';
import Footer from '@/components/Footer';
import Contacts from '@/components/Contacts';
import { setAuthority } from '@/utils/authority';
import { login, loginByMobile } from '@/services/user';
import { getLoginCaptcha } from '@/services/user';
import access from '@/access';

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
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
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

    return userInfo;
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);

    try {
      // 登录
      let msg;
      if (type === 'account') {
        msg = await login({ ...values, type });
      }
      if (type === 'mobile') {
        msg = await loginByMobile({ ...values, type });
      }
      if (msg.success) {
        const defaultLoginSuccessMessage = '登录成功';
        message.success(defaultLoginSuccessMessage);
        setAuthority(msg.data.authorization);
        const loginedUser = await fetchUserInfo();
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
          const canAccess = access({ currentUser: loginedUser });
          if (canAccess.canAdmin) {
            // pass
          } else if (canAccess.canOperator) {
            if (redirect.startsWith('/admin')) {
              history.push('/');
              return;
            }
          } else if (canAccess.canStatistician) {
            history.push('/');
            return;
          }
          history.push(redirect || '/');
        }
        return;
      } // 如果失败去设置用户错误信息

      setUserLoginState({ status: 'error', type, errorMessage: msg.errorMessage });
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }

    setSubmitting(false);
  };

  const jumpRegister = () => {
    const { query = {}, pathname } = history.location;
    const { redirect } = query;
    if (pathname !== '/user/register') {
      history.push({
        pathname: '/user/register',
        search: stringify({
          redirect,
        }),
      });
    }
  };

  const { status, errorMessage, type: loginType } = userLoginState;
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
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
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
              <Tabs.TabPane key="account" tab={'账户密码登录'}>
                {status === 'error' && loginType === 'account' && (
                  <LoginMessage content={errorMessage} />
                )}
                {type === 'account' && (
                  <>
                    <ProFormText
                      name="username"
                      fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={'用户名'}
                      rules={[
                        {
                          required: true,
                          message: '用户名是必填项',
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={'密码'}
                      rules={[
                        {
                          required: true,
                          message: '密码是必填项',
                        },
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
                  </>
                )}
              </Tabs.TabPane>
              <Tabs.TabPane key="mobile" tab={'手机号登录'}>
                {status === 'error' && loginType === 'mobile' && (
                  <LoginMessage content={errorMessage} />
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
                          message: '手机号是必填项',
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: '不合法的手机号',
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
                        await getLoginCaptcha(phone);
                      }}
                    />
                  </>
                )}
              </Tabs.TabPane>
            </Tabs>
          </ProForm>
          <div className={styles.other}>
            <a onClick={() => jumpRegister()} style={{ cursor: 'pointer' }}>
              注册账号
            </a>
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

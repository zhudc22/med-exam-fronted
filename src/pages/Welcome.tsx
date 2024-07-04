import React from 'react';
import { useModel, history } from 'umi';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './Welcome.less';

export default (): React.ReactNode => {

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};


  let isAdmin = false;
  let isOperator = false;
  let isStatistician = false;
  let isGroup = false;
  let isUser = false;

  currentUser.roles.forEach(role => {
    isAdmin = (role.code === 'ADMIN')
  });

  if (currentUser.roles?.length === 1) {
    isOperator = currentUser.roles[0].code === 'OPERATOR';
    isStatistician = currentUser.roles[0].code === 'STATISTICIAN';
    isGroup = currentUser.roles[0].code === 'GROUP';
    isUser = currentUser.roles[0].code === 'USER';
  }
  // if (isAdmin) {
  //   // history.push('/admin/account');
  //   history.push('/dashboard');
  // }
  // if (isOperator) {
  //   history.push('/reserve');
  // }
  // if (isStatistician) {
  //   history.push('/dashboard');
  // }
  // if (isGroup || isUser) {
  //   history.push('/account/center');
  // }

  return (
    <PageContainer>
      <Card>
        <div className={styles.container}>
          <img alt="logo" className={styles.logo} src="/img/logo.png" />
          <div className={styles.title}>
              欢迎使用生命力康检测平台
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

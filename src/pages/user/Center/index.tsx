import React from 'react';
import { useModel, history } from 'umi';
import { DatabaseOutlined, NotificationOutlined } from '@ant-design/icons';
import { Alert, Space, Card, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ReportList from './components/ReportList';
import NoticeList from './components/NoticeList';

const { TabPane } = Tabs;

const Center: React.FC = () => {
  let activeKey = 'report';
  const { query } = history.location;
  const { key } = query as { key: string };
  if (key) {
    activeKey = key;
  }

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  if (currentUser === undefined) {
    history.push('/');
    return undefined;
  }

  const isPerson = currentUser.roles.length === 1 && currentUser.roles[0].code === 'USER';

  return (
    <PageContainer>
      <Card>
        {isPerson && (currentUser.card === null || currentUser.card.length === 0) && (
          <Alert
            style={{
              marginBottom: 24,
            }}
            message="请尽快完善身份证号,以便查看您的检测报告."
            type="warning"
            showIcon
            closable
            action={
              <Space>
                <a
                  onClick={() => {
                    history.push('/account/setting');
                  }}
                >
                  点击跳转
                </a>
                <span>&nbsp;&nbsp;&nbsp;</span>
              </Space>
            }
          />
        )}
        <Tabs defaultActiveKey={activeKey}>
          <TabPane
            tab={
              <span>
                <DatabaseOutlined />
                我的报告
              </span>
            }
            key="report"
          >
            <ReportList />
          </TabPane>
          <TabPane
            tab={
              <span>
                <NotificationOutlined />
                我的通知
              </span>
            }
            key="notification"
          >
            <NoticeList />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Center;

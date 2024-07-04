import React from 'react';
import { FileSyncOutlined, ProfileOutlined } from '@ant-design/icons';
import { Tabs, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Training from './Training';
import Expect from './Expect';

const { TabPane } = Tabs;

const Page: React.FC = () => {

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  return (
    <PageContainer>
      <Card>
        <Tabs>
          <TabPane
            tab={
              <span>
                <ProfileOutlined />
                矫正记录
              </span>
            }
            key="training"
          >
            <Training />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FileSyncOutlined />
                待矫正列表
              </span>
            }
            key="expect"
          >
            <Expect />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Page;

import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import PersonalReserveForm from '@/components/PersonalReserve';
import { Row, Col, Button } from 'antd';
import React, { useState } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './index.less';


const ReserveForm: React.FC = () => {

  const [showSuccessPage, setShowSuccessPage] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}></div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <img alt="logo" className={styles.logo} src="/img/logo.png" />
          </div>
          <div className={styles.desc}>
            个人检测预约
          </div>
        </div>

        {!showSuccessPage && <div className={styles.main}>
          <PersonalReserveForm callback={(val) => {
            setShowSuccessPage(val);
          }} />
        </div>
        }
        {showSuccessPage &&
          <Row>
            <Col style={{ textAlign: "center", fontSize: "60px", color: "#52C319" }} span={24}><CheckCircleFilled /></Col>
            <Col style={{ textAlign: "center", fontWeight: 500, fontSize: '16px' }} span={24}>您的预约申请提交成功，我们的服务人员确认后，会以短信方式通知您。</Col>
            <Col style={{ textAlign: "center", marginTop: "60px" }} span={24}>
              <Button type="primary" size="large" onClick={() => {
                 window.location.href = "/index.html";
              }}>
                返回首页
              </Button>
            </Col>
          </Row>
        }

      </div>
      <Footer>
        <Contacts />
      </Footer>
    </div>
  );
};

export default ReserveForm;

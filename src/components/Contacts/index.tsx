import { Row, Col } from 'antd';

export default () => {
  return (
    <Row align="middle" justify='center' style={{ minHeight: '80px', backgroundColor: '#F2F2F2' }}>
      <Col span={12}>
        <Row>
          <Col span={4}></Col>
          <Col span={4}>
            <div>
              <img width='96px' src="/img/logo.png" style={{margin: '0 auto'}} />
            </div>
          </Col>
          <Col span={16}></Col>
        </Row>
      </Col>
      <Col span={12}>
        <div style={{ display: 'flex' }}>
          <div>
            <img src="/img/gongzhonghao-sm.png" style={{margin: '0 auto'}} />
          </div>
          <div style={{ paddingLeft: '32px', height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div>检测咨询：<strong>156 2060 6188</strong>&nbsp;&nbsp;&nbsp;&nbsp;李老师</div>
            <div>合作咨询：<strong>138 2171 3406</strong>&nbsp;&nbsp;&nbsp;&nbsp;李经理</div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

import React from 'react';
import { Form, Card, Row, Col, message } from 'antd';
import ProForm, { ProFormDigit } from '@ant-design/pro-form';

import styles from './index.less';

import { save } from '@/services/Mjfy';

export type Props = {
  loading?: boolean;
  data?: API.Mjfy;
  orderId: string;
  readonly?: boolean;
};

const Page: React.FC<Props> = (props) => {
  const { loading, data, orderId, readonly } = props;

  const [form] = Form.useForm();
  if (!loading) {
    form.setFieldsValue(data);
  }
  const doSubmit = async (values) => {
    const resp = await save({ ...values, orderId });
    if (resp.success) {
      message.success('敏捷反应保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  const calcActionFAvgValue = () => {
    const fAValue = form.getFieldValue('actionFBeginValue');
    const fBValue = form.getFieldValue('actionFAValue');
    const fCValue = form.getFieldValue('actionFBValue');
    const fDValue = form.getFieldValue('actionFCValue');
    const fEValue = form.getFieldValue('actionFDValue');


    if (fAValue && fBValue && fCValue && fDValue && fEValue) {
      const fAvgValue =
        (fBValue - fAValue + (fCValue - fBValue) + (fDValue - fCValue) + (fEValue - fDValue)) / 4;
      form.setFieldsValue({ actionFAvgValue: fAvgValue });
    } else if (fAValue && fBValue && fCValue && fDValue) {
      const fAvgValue =
        (fBValue - fAValue + (fCValue - fBValue) + (fDValue - fCValue)) / 3;
      form.setFieldsValue({ actionFAvgValue: fAvgValue });
    }
  };

  const calcActionSAvgValue = () => {
    const fAValue = form.getFieldValue('actionSBeginValue');
    const fBValue = form.getFieldValue('actionSAValue');
    const fCValue = form.getFieldValue('actionSBValue');
    const fDValue = form.getFieldValue('actionSCValue');
    const fEValue = form.getFieldValue('actionSDValue');

    if (fAValue && fBValue && fCValue && fDValue && fEValue) {
      const fAvgValue =
        (fBValue - fAValue + (fCValue - fBValue) + (fDValue - fCValue) + (fEValue - fDValue)) / 4;
      form.setFieldsValue({ actionSAvgValue: fAvgValue });
    } else if (fAValue && fBValue && fCValue && fDValue) {
      const fAvgValue =
        (fBValue - fAValue + (fCValue - fBValue) + (fDValue - fCValue)) / 3;
      form.setFieldsValue({ actionSAvgValue: fAvgValue });
    }
  };

  const calcActionTAvgValue = () => {
    const fAValue = form.getFieldValue('actionTBeginValue');
    const fBValue = form.getFieldValue('actionTAValue');
    const fCValue = form.getFieldValue('actionTBValue');
    const fDValue = form.getFieldValue('actionTCValue');
    const fEValue = form.getFieldValue('actionTDValue');

    if (fAValue && fBValue && fCValue && fDValue && fEValue) {
      const fAvgValue =
        (fBValue - fAValue + (fCValue - fBValue) + (fDValue - fCValue) + (fEValue - fDValue)) / 4;
      form.setFieldsValue({ actionTAvgValue: fAvgValue });
    } else if (fAValue && fBValue && fCValue && fDValue) {
      const fAvgValue =
        (fBValue - fAValue + (fCValue - fBValue) + (fDValue - fCValue)) / 3;
      form.setFieldsValue({ actionTAvgValue: fAvgValue });
    }
  };

  const calcRespAvgValue = () => {
    const fValue = form.getFieldValue('respFValue');
    const gValue = form.getFieldValue('respSValue');
    const hValue = form.getFieldValue('respTValue');

    if (fValue && gValue && hValue) {
      const avgValue = (fValue + gValue + hValue) / 3;
      form.setFieldsValue({ respAvgValue: avgValue });
    } else if (fValue && gValue) {
      const avgValue = (fValue + gValue) / 2;
      form.setFieldsValue({ respAvgValue: avgValue });
    } else if (fValue) {
      form.setFieldsValue({ respAvgValue: fValue });
    }
  };

  return (
    <Card bordered={false} size="small">
      <ProForm
        form={form}
        layout="vertical"
        hideRequiredMark
        submitter={{
          searchConfig: {
            submitText: '保存',
            resetText: '刷新数据',
          },
          submitButtonProps: { style: { float: 'right' }, disabled: readonly },
          resetButtonProps: false,
        }}
        onFinish={doSubmit}
      // onFinishFailed={onFinishFailed}
      >
        <Card title="动作速度" bordered={false} size="small" style={{ fontSize: "16px" }}>
          <Row gutter={0} style={{ minHeight: 50 }} align="middle">
            <Col span={6} className="mjfy-table">
              原始数据
            </Col>
            <Col span={6} className="mjfy-table">
              1st（S）
            </Col>
            <Col span={6} className="mjfy-table">
              2nd（S）
            </Col>
            <Col span={6} className="mjfy-table">
              3rd（S）
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              初始值
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionFBeginValue"
                width="sm"
                placeholder="初始值"
                fieldProps={{ onChange: calcActionFAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionSBeginValue"
                width="sm"
                placeholder="初始值"
                fieldProps={{ onChange: calcActionSAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionTBeginValue"
                width="sm"
                placeholder="初始值"
                fieldProps={{ onChange: calcActionTAvgValue }}
              />
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              a原始值
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionFAValue"
                width="sm"
                placeholder="A"
                fieldProps={{ onChange: calcActionFAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionSAValue"
                width="sm"
                placeholder="A"
                fieldProps={{ onChange: calcActionSAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionTAValue"
                width="sm"
                placeholder="A"
                fieldProps={{ onChange: calcActionTAvgValue }}
              />
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              b原始值
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionFBValue"
                width="sm"
                placeholder="B"
                fieldProps={{ onChange: calcActionFAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionSBValue"
                width="sm"
                placeholder="B"
                fieldProps={{ onChange: calcActionSAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionTBValue"
                width="sm"
                placeholder="B"
                fieldProps={{ onChange: calcActionTAvgValue }}
              />
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              c原始值
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionFCValue"
                width="sm"
                placeholder="C"
                fieldProps={{ onChange: calcActionFAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionSCValue"
                width="sm"
                placeholder="C"
                fieldProps={{ onChange: calcActionSAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionTCValue"
                width="sm"
                placeholder="C"
                fieldProps={{ onChange: calcActionTAvgValue }}
              />
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              d原始值
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionFDValue"
                width="sm"
                placeholder="D"
                fieldProps={{ onChange: calcActionFAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionSDValue"
                width="sm"
                placeholder="D"
                fieldProps={{ onChange: calcActionSAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="actionTDValue"
                width="sm"
                placeholder="D"
                fieldProps={{ onChange: calcActionTAvgValue }}
              />
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              平均值
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit name="actionFAvgValue" width="sm" readonly />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit name="actionSAvgValue" width="sm" readonly />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit name="actionTAvgValue" width="sm" readonly />
            </Col>
          </Row>
        </Card>
        <Card title="反应速度" bordered={false} size="small" style={{ fontSize: "16px" }}>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              原始数据
            </Col>
            <Col span={6} className="mjfy-table">
              1st（S）
            </Col>
            <Col span={6} className="mjfy-table">
              2nd（S）
            </Col>
            <Col span={6} className="mjfy-table">
              3rd（S）
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              平均反应时
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="respFValue"
                width="sm"
                fieldProps={{ onChange: calcRespAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="respSValue"
                width="sm"
                fieldProps={{ onChange: calcRespAvgValue }}
              />
            </Col>
            <Col span={6} className="mjfy-table">
              <ProFormDigit
                name="respTValue"
                width="sm"
                fieldProps={{ onChange: calcRespAvgValue }}
              />
            </Col>
          </Row>
          <Row gutter={0} align="middle">
            <Col span={6} className="mjfy-table">
              平均值
            </Col>
            <Col span={18} className="mjfy-table">
              <ProFormDigit name="respAvgValue" width="sm" readonly />
            </Col>
          </Row>
        </Card>
        <div style={{ minHeight: '16px' }}></div>
      </ProForm>
    </Card>
  );
};

export default Page;

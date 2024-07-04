/* eslint-disable no-lonely-if */
import React from 'react';
import { Form, Card, Row, Col, message } from 'antd';
import ProForm, { ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { save } from '@/services/Xfgn';

export type Props = {
  loading?: boolean;
  data?: API.Xfgn;
  orderId: string;
  tyzk: boolean;
  male: number;
  readonly?: boolean;
};

const Page: React.FC<Props> = (props) => {
  const { loading, data, orderId, tyzk, male, readonly } = props;

  const [form] = Form.useForm();
  if (!loading) {
    form.setFieldsValue(data);
  }
  const doSubmit = async (values) => {
    const resp = await save({ ...values, orderId });
    if (resp.success) {
      message.success('心肺功能保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  const calXfSuggest = (coi) => {
    let xfSuggest;
    if (coi === undefined) {
      xfSuggest = '-';
      return xfSuggest;
    }
    if (coi < 40) { // 不合格
      if (male === 0) { // 男
        xfSuggest = '1000米+50米跑/立定跳';
      } else {
        xfSuggest = '800米+50米跑/立定跳';
      }
    } else if (coi < 50) { // 较差
      if (male === 0) { // 男
        xfSuggest = '1000米+50米跑';
      } else {
        xfSuggest = '800米+50米跑';
      }
    } else if (coi < 60) { // 稍差
      if (male === 0) { // 男
        xfSuggest = '1000米+立定跳/50米跑';
      } else {
        xfSuggest = '800米+立定跳/仰卧起坐';
      }
    } else if (coi < 70) { // 合格
      if (male === 0) { // 男
        xfSuggest = '1000米+50米跑';
      } else {
        xfSuggest = '800米+50米跑/仰卧起坐';
      }
    } else if (coi < 809) { // 良好-
      if (male === 0) { // 男
        xfSuggest = '1000米+50米跑';
      } else {
        xfSuggest = '800米+50米跑';
      }
    } else { // 良好+
      if (male === 0) { // 男
        xfSuggest = '1000米+50米跑';
      } else {
        xfSuggest = '800米+50米跑';
      }
    }
    return xfSuggest;
  };
  if (tyzk) {
    const xfSuggest = calXfSuggest(data?.coi);
    form.setFieldsValue({ xfSuggest });
  }

  return (
    <Card bordered={false} size="small">
      <ProForm
        form={form}
        layout="vertical"
        hideRequiredMark
        submitter={{
          searchConfig: {
            submitText: '保存',
          },
          submitButtonProps: { style: { float: 'right' }, disabled: readonly },
          resetButtonProps: false,
        }}
        onFinish={doSubmit}
        // onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit label="收缩压" name="systolicPressure" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="舒张压" name="diastolicPressure" width="sm" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit label="基础心率" name="baseHeartRhythm" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="运动后心率" name="exerciseHeartRhythm" width="sm" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit label="第一次心率(60S)" name="firstHeartRhythm" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="第二次心率(90S)" name="secHeartRhythm" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="第三次心率(120S)" name="thirdHeartRhythm" width="sm" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit
              label="心功能指数"
              name="coi"
              width="sm"
              fieldProps={{
                onChange: (value) => {
                  if (tyzk) {
                    const xfSuggest = calXfSuggest(value);
                    form.setFieldsValue({ xfSuggest });
                  }
                },
              }}
            />
          </Col>
          <Col span={8}>
            {tyzk && <ProFormText label="建议" name="xfSuggest" width="sm" readonly />}
          </Col>
        </Row>
      </ProForm>
    </Card>
  );
};

export default Page;

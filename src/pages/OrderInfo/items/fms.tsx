import React,{ useState } from 'react';
import { Form, Card, Row, Col, message, Divider } from 'antd';
import ProForm, { ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { save } from '@/services/fms';

export type Props = {
  loading?: boolean;
  data?: API.fms;
  orderId: string;
  tyzk: boolean;
  male: number;
  readonly?: boolean;
};

const Page: React.FC<Props> = (props) => {
  const { loading, data, orderId, tyzk, male, readonly } = props;

  const [tyzkScore, setTyzkScore] = useState<any>();
  const [tyzkSuggest, setTyzkSuggest] = useState<any>();

  // FMS功能性动作
  const [fms] = Form.useForm();
  if (!loading) {
    fms.setFieldsValue(data);
  }
  const doSubmit = async (values) => {
    const resp = await save({ ...values, orderId });
    if (resp.success) {
      message.success('FMS功能性动作评估保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  const calcScore = () => {
    const gdsd = fms.getFieldValue('gdsd') ? fms.getFieldValue('gdsd') : 0;
    const skb = fms.getFieldValue('skb') ? fms.getFieldValue('skb') : 0;
    const zxgjb = fms.getFieldValue('zxgjb') ? fms.getFieldValue('zxgjb') : 0;
    const jgjhdd = fms.getFieldValue('jgjhdd') ? fms.getFieldValue('jgjhdd') : 0;
    const zxtt = fms.getFieldValue('zxtt') ? fms.getFieldValue('zxtt') : 0;
    const wdxfwc = fms.getFieldValue('wdxfwc') ? fms.getFieldValue('wdxfwc') : 0;
    const xzwdx = fms.getFieldValue('xzwdx') ? fms.getFieldValue('xzwdx') : 0;

    if (tyzk) {
      const fmsRrxScore = ( gdsd + skb + zxgjb + jgjhdd + zxtt ) / 5;
      const fmsXtxScore = ( gdsd + skb + zxgjb + wdxfwc + xzwdx ) / 5;
      const fmsWdxScore = ( gdsd + skb + zxgjb + wdxfwc + xzwdx ) / 5;
      const score = (fmsRrxScore + fmsXtxScore + fmsWdxScore) / 3;
      setTyzkScore({fmsRrxScore, fmsXtxScore, fmsWdxScore, score});

      let fmsRrxSuggest;
      if (male === 0) { // 男
        if (fmsRrxScore < 55) {
          fmsRrxSuggest = '1000米+50米跑';
        } else if (fmsRrxScore < 80) {
          fmsRrxSuggest = '1000米+50米跑';
        } else { // fmsRrxScore >= 80
          fmsRrxSuggest = '1000米+立定跳';
        }
      }
      if (male === 1) { // 女
        if (fmsRrxScore < 55) {
          fmsRrxSuggest = '800米+立定跳/50米跑';
        } else if (fmsRrxScore < 80) {
          fmsRrxSuggest = '800米+50米跑/仰卧起坐';
        } else { // fmsRrxScore >= 80
          fmsRrxSuggest = '800米+立定跳';
        }
      }
      let fmsXtxSuggest;
      if (male === 0) { // 男
        if (fmsXtxScore < 55) {
          fmsXtxSuggest = '1000米+50米跑';
        } else if (fmsXtxScore < 80) {
          fmsXtxSuggest = '1000米+立定跳';
        } else { // fmsXtxScore >= 80
          fmsXtxSuggest = '1000米+50米跑';
        }
      }
      if (male === 1) { // 女
        if (fmsXtxScore < 55) {
          fmsXtxSuggest = '800米+50米跑';
        } else if (fmsXtxScore < 80) {
          fmsXtxSuggest = '800米+立定跳/仰卧起坐';
        } else { // fmsXtxScore >= 80
          fmsXtxSuggest = '800米+50米跑/仰卧起坐';
        }
      }
      let fmsWdxSuggest;
      if (male === 0) { // 男
        if (fmsWdxScore < 55) {
          fmsWdxSuggest = '1000米+立定跳';
        } else if (fmsWdxScore < 80) {
          fmsWdxSuggest = '1000米+50米跑';
        } else { // fmsWdxScore >= 80
          fmsWdxSuggest = '1000米+50米跑/立定跳';
        }
      }
      if (male === 1) { // 女
        if (fmsWdxScore < 55) {
          fmsWdxSuggest = '800米+50米跑/立定跳';
        } else if (fmsWdxScore < 80) {
          fmsWdxSuggest = '800米+50米跑/仰卧起坐';
        } else { // fmsWdxScore >= 80
          fmsWdxSuggest = '800米+50米跑/立定跳';
        }
      }

      let fmsSuggest;
      if (male === 0) { // 男
        if (score < 55) {
          fmsSuggest = '1000米+50米跑/立定跳';
        } else if (score < 80) {
          fmsSuggest = '1000米+立定跳';
        } else { // score >= 80
          fmsSuggest = '1000米+50米跑/立定跳';
        }
      }
      if (male === 1) { // 女
        if (score < 55) {
          fmsSuggest = '800米+立定跳/仰卧起坐';
        } else if (score < 80) {
          fmsSuggest = '800米+立定跳/50米跑';
        } else { // score >= 80
          fmsSuggest = '800米+50米跑/立定跳/仰卧起坐';
        }
      }      
      setTyzkSuggest({fmsRrxSuggest, fmsXtxSuggest, fmsWdxSuggest, fmsSuggest});
      return;
    } 

    const score = gdsd + skb + zxgjb + jgjhdd + zxtt + wdxfwc + xzwdx;
    fms.setFieldsValue({ score });
  };

  if (tyzkScore) {
    fms.setFieldsValue({...tyzkScore});
    fms.setFieldsValue({...tyzkSuggest});
  }

  return (
    <Card bordered={false} size="small">
      <ProForm
        form={fms}
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
        <Row gutter={16}>
          <Col span={6}>
            <ProFormDigit
              label="过顶深蹲"
              name="gdsd"
              width="sm"
              fieldProps={{ onChange: () => calcScore() }}
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <ProFormDigit
              label="上跨步"
              name="skb"
              width="sm"
              fieldProps={{ onChange: () => calcScore() }}
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <ProFormDigit
              label="直线弓箭步"
              name="zxgjb"
              width="sm"
              fieldProps={{ onChange: () => calcScore() }}
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <ProFormDigit
              label="肩关节活动度"
              name="jgjhdd"
              width="sm"
              fieldProps={{ onChange: () => calcScore() }}
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <ProFormDigit
              label="直膝抬腿"
              name="zxtt"
              width="sm"
              fieldProps={{ onChange: () => calcScore() }}
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <ProFormDigit
              label="稳定性俯卧撑"
              name="wdxfwc"
              width="sm"
              fieldProps={{ onChange: () => calcScore() }}
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <ProFormDigit
              label="旋转稳定性"
              name="xzwdx"
              width="sm"
              fieldProps={{ onChange: () => calcScore() }}
            />
          </Col>
          <Col span={6}>{!tyzk && <ProFormDigit label="总分" name="score" width="sm" />}</Col>
        </Row>
        <Divider />
        {tyzk && (
          <>
            <Row gutter={0} style={{ minHeight: 50 }} align="middle">
              <Col span={6} className="mjfy-table">
                #
              </Col>
              <Col span={6} className="mjfy-table">
                柔软性
              </Col>
              <Col span={6} className="mjfy-table">
                协调性
              </Col>
              <Col span={6} className="mjfy-table">
                稳定性
              </Col>
            </Row>
            <Row gutter={0} align="middle">
              <Col span={6} className="mjfy-table">
                汇总得分
              </Col>
              <Col span={6} className="mjfy-table">
                <ProFormDigit name="fmsRrxScore" width="sm" readonly />
              </Col>
              <Col span={6} className="mjfy-table">
                <ProFormDigit name="fmsXtxScore" width="sm" readonly />
              </Col>
              <Col span={6} className="mjfy-table">
                <ProFormDigit name="fmsWdxScore" width="sm" readonly />
              </Col>
            </Row>
            <Row gutter={0} align="middle">
              <Col span={6} className="mjfy-table">
                汇总建议
              </Col>
              <Col span={6} className="mjfy-table">
                <ProFormText name="fmsRrxSuggest" width="sm" readonly />
              </Col>
              <Col span={6} className="mjfy-table">
                <ProFormText name="fmsXtxSuggest" width="sm" readonly />
              </Col>
              <Col span={6} className="mjfy-table">
                <ProFormText name="fmsWdxSuggest" width="sm" readonly />
              </Col>
            </Row>
            <Row gutter={0} align="middle">
              <Col span={6} className="mjfy-table">
                综合得分
              </Col>
              <Col span={18} className="mjfy-table">
                <ProFormDigit name="score" width="sm" readonly />
              </Col>
             </Row>
             <Row gutter={0} align="middle">
              <Col span={6} className="mjfy-table">
                综合建议
              </Col>
              <Col span={18} className="mjfy-table">
                <ProFormText name="fmsSuggest" width="sm" readonly />
              </Col>
             </Row>
          </>
        )}
      </ProForm>
    </Card>
  );
};

export default Page;

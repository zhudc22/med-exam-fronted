/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-lonely-if */
import React, { useState } from 'react';
import { useRequest } from 'umi';
import { Form, Card, Row, Col, message, Image, Empty, Checkbox } from 'antd';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { save, queryByOrderId } from '@/services/Stcf';
import { ReloadOutlined } from '@ant-design/icons';

export type Props = {
  loading?: boolean;
  data?: API.Stcf;
  orderId: string;
  hasZx: boolean;
  tyzk: boolean;
  male: number;
  age: number;
  readonly?: boolean;
};

const Page: React.FC<Props> = (props) => {
  const { loading, data, orderId, hasZx, tyzk, male, age, readonly } = props;

  const [report, setReport] = useState<API.Stcf>();
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isOk, setIsOk] = useState<boolean>(false);
  const [checkResults, setChechResults] = useState([]);
  const [stjhSzVal, setStjhSzVal] = useState<number>();
  const [stjhXzVal, setStjhXzVal] = useState<number>();
  const [stjhXxzVal, setStjhXxzVal] = useState<number>();
  const [stjhQsVal, setStjhQsVal] = useState<number>();
  const [jhdVal, setJhdVal] = useState<number>();

  const { run } = useRequest(() => queryByOrderId(orderId), {
    onSuccess: (result) => {
      
      if (result) {
        setReport(result);
        setIsFirst(false);
        const tmp = [];
        result.stjhPgjg.forEach((i) => {
          tmp.push(i.pgjgId);
        });
        setChechResults(tmp);
        
    setStjhSzVal(result.stjhSz);
    setStjhXzVal(result.stjhXz);
    setStjhXxzVal(result.stjhXxz);
    setStjhQsVal(result.stjhQs);
    setJhdVal(result.jhd);
      }
      if (!isFirst) {
        message.success('刷新成功');
      }
    },
  });

  // 身体成分
  const [stcf] = Form.useForm();
  if (!loading) {
    stcf.setFieldsValue({"stjhSzVal":stjhSzVal,"stjhXzVal":stjhXzVal,"stjhXxzVal":stjhXxzVal,"stjhQsVal":stjhQsVal,"jhdVal":jhdVal});
  }

  const results = [
    { label: '正常', value: 0 },
    { label: '身体发育迟缓', value: 1 },
    { label: '骨骼肌缺乏', value: 2 },
    { label: '上肢肌肉不均衡', value: 3 },
    { label: '下肢肌肉不均衡', value: 4 },
    { label: '上下肢肌肉不均衡', value: 5 },
    { label: '上肢脂肪不均衡', value: 6 },
    { label: '下肢脂肪不均衡', value: 7 },
    { label: '上下肢脂肪不均衡', value: 8 },
    { label: '蛋白质缺乏', value: 9 },
    { label: '无机盐缺乏', value: 10 },
    { label: '体脂肪缺乏', value: 11 },
    { label: '肥胖', value: 12 },
  ];

  const doSubmit = async (values) => {
    const items = [];
    checkResults.forEach((cr) => {
      const tmp = results.find((r) => r.value === cr);
      items.push({
        pgjgId: cr,
        pgjgName: tmp.label,
      });
    });
    values.stjhPgjg = items;
    values.stjhSz = stjhSzVal;
    values.stjhXz = stjhXzVal;
    values.stjhXxz = stjhXxzVal;
    values.stjhQs = stjhQsVal;
    values.jhd = jhdVal;
    
    const resp = await save({ ...values, orderId });
    if (resp.success) {
      message.success('保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  let calcSuggest = () => { };
  const calJhdSuggest = (jhd: any, male: number) => {
    let jhdSuggest;
    if (jhd === '0') {
      if (male === 0) {
        jhdSuggest = '1000米+50米跑/立定跳';
      } else {
        jhdSuggest = '800米立定跳/仰卧起坐';
      }
    } else if (jhd === '1') {
      if (male === 0) {
        jhdSuggest = '1000米+立定跳';
      } else {
        jhdSuggest = '800米+50米跑';
      }
    } else if (jhd === '2') {
      if (male === 0) {
        jhdSuggest = '1000米+50米跑/立定跳';
      } else {
        jhdSuggest = '800米+50米跑/立定跳';
      }
    } else if (jhd === '3') {
      if (male === 0) {
        jhdSuggest = '1000米+立定跳';
      } else {
        jhdSuggest = '800米+立定跳';
      }
    } else if (jhd === '4') {
      if (male === 0) {
        jhdSuggest = '1000米+50米跑';
      } else {
        jhdSuggest = '800米+50米跑/仰卧起坐';
      }
    }
    return jhdSuggest;
  };
  if (tyzk) {
    calcSuggest = () => {
      if (data != undefined && data != null) {
        const sg = data.userHeight;
        if (!sg) {
          return;
        }
        const tz = data.wt;
        let weightSuggest;
        const sgScale = sg - 100;

        if (tz + 10 <= sgScale) { // 瘦
          if (male === 0) { // 男
            weightSuggest = '1000米+立定跳';
          } else { // 女
            weightSuggest = '800米+立定跳/50米跑';
          }
        } else if (sgScale > tz + 5) { // 偏瘦
          if (male === 0) { // 男
            weightSuggest = '1000米+立定跳';
          } else { // 女
            weightSuggest = '800米+立定跳';
          }
        } else if (sgScale > tz - 5) { // 标准
          if (male === 0) { // 男
            weightSuggest = '1000米+任选一项';
          } else { // 女
            weightSuggest = '800米+50米跑或仰卧起坐';
          }
        } else if (sgScale > tz - 10) { // 偏胖
          if (male === 0) { // 男
            weightSuggest = '1000米+立定跳';
          } else { // 女
            weightSuggest = '800米+50米跑';
          }
        } else { // 肥胖
          if (male === 0) { // 男
            weightSuggest = '1000米+立定跳';
          } else { // 女
            weightSuggest = '800米+50米跑/立定跳';
          }
        }

        let heightSuggest;
        if (male === 0) {
          if (age === 13) {
            if (sg > 175.1) { // +2SD以上
              heightSuggest = '1000米+立定跳';
            } else if (sg > 167.3) { // +1SD~+2SD
              heightSuggest = '1000米+50米跑/立定跳';
            } else if (sg > 151.8) { // -1SD~+1SD
              heightSuggest = '1000米+50米跑';
            } else if (sg > 144.0) { // -1SD~-2SD
              heightSuggest = '1000米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '1000米+50米跑';
            }
          }
          if (age === 14) {
            if (sg > 180.2) { // +2SD以上
              heightSuggest = '1000米+立定跳';
            } else if (sg > 173.1) { // +1SD~+2SD
              heightSuggest = '1000米+50米跑/立定跳';
            } else if (sg > 158.7) { // -1SD~+1SD
              heightSuggest = '1000米+50米跑';
            } else if (sg > 151.5) { // -1SD~-2SD
              heightSuggest = '1000米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '1000米+50米跑';
            }
          }
          if (age === 15) {
            if (sg > 182.8) { // +2SD以上
              heightSuggest = '1000米+立定跳';
            } else if (sg > 176.3) { // +1SD~+2SD
              heightSuggest = '1000米+50米跑/立定跳';
            } else if (sg > 163.3) { // -1SD~+1SD
              heightSuggest = '1000米+50米跑';
            } else if (sg > 156.7) { // -1SD~-2SD
              heightSuggest = '1000米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '1000米+50米跑';
            }
          }
          if (age === 16) {
            if (sg > 184.0) { // +2SD以上
              heightSuggest = '1000米+立定跳';
            } else if (sg > 177.8) { // +1SD~+2SD
              heightSuggest = '1000米+50米跑/立定跳';
            } else if (sg > 165.4) { // -1SD~+1SD
              heightSuggest = '1000米+50米跑';
            } else if (sg > 159.1) { // -1SD~-2SD
              heightSuggest = '1000米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '1000米+50米跑';
            }
          }
          if (age === 17) {
            if (sg > 184.5) { // +2SD以上
              heightSuggest = '1000米+立定跳';
            } else if (sg > 178.4) { // +1SD~+2SD
              heightSuggest = '1000米+50米跑/立定跳';
            } else if (sg > 166.3) { // -1SD~+1SD
              heightSuggest = '1000米+50米跑';
            } else if (sg > 160.1) { // -1SD~-2SD
              heightSuggest = '1000米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '1000米+50米跑';
            }
          }
        } else { // 女
          if (age === 13) {
            if (sg > 168.3) { // +2SD以上
              heightSuggest = '800米+立定跳';
            } else if (sg > 162.3) { // +1SD~+2SD
              heightSuggest = '800米+50米跑/立定跳';
            } else if (sg > 150.3) { // -1SD~+1SD
              heightSuggest = '800米+立定跳';
            } else if (sg > 144.2) { // -1SD~-2SD
              heightSuggest = '800米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '800米+仰卧起坐/50米跑';
            }
          }
          if (age === 14) {
            if (sg > 169.9) { // +2SD以上
              heightSuggest = '800米+立定跳';
            } else if (sg > 164.3) { // +1SD~+2SD
              heightSuggest = '800米+50米跑/立定跳';
            } else if (sg > 152.9) { // -1SD~+1SD
              heightSuggest = '800米+立定跳';
            } else if (sg > 147.2) { // -1SD~-2SD
              heightSuggest = '800米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '800米+仰卧起坐/50米跑';
            }
          }
          if (age === 15) {
            if (sg > 170.8) { // +2SD以上
              heightSuggest = '800米+立定跳';
            } else if (sg > 165.3) { // +1SD~+2SD
              heightSuggest = '800米+50米跑/立定跳';
            } else if (sg > 154.3) { // -1SD~+1SD
              heightSuggest = '800米+立定跳';
            } else if (sg > 148.8) { // -1SD~-2SD
              heightSuggest = '800米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '800米+仰卧起坐/50米跑';
            }
          }
          if (age === 16) {
            if (sg > 171.0) { // +2SD以上
              heightSuggest = '800米+立定跳';
            } else if (sg > 165.5) { // +1SD~+2SD
              heightSuggest = '800米+50米跑/立定跳';
            } else if (sg > 154.7) { // -1SD~+1SD
              heightSuggest = '800米+立定跳';
            } else if (sg > 149.2) { // -1SD~-2SD
              heightSuggest = '800米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '800米+仰卧起坐/50米跑';
            }
          }
          if (age === 17) {
            if (sg > 171.0) { // +2SD以上
              heightSuggest = '800米+立定跳';
            } else if (sg > 165.7) { // +1SD~+2SD
              heightSuggest = '800米+50米跑/立定跳';
            } else if (sg > 154.9) { // -1SD~+1SD
              heightSuggest = '800米+立定跳';
            } else if (sg > 149.5) { // -1SD~-2SD
              heightSuggest = '800米+50米跑';
            } else {                 // -2SD以下
              heightSuggest = '800米+仰卧起坐/50米跑';
            }
          }
        }

        const tzlSuggest = weightSuggest;
        const jhdSuggest = calJhdSuggest(stcf.getFieldValue('jhd'), male);
        let zzlSuggest;
        const { smm } = data;
        if (smm < tz * 0.3) { // 很低
          if (male === 0) {
            zzlSuggest = '1000米+立定跳';
          } else {
            zzlSuggest = '800米+立定跳';
          }
        } else if (smm < tz * 0.35) { // 低于10%
          if (male === 0) {
            zzlSuggest = '1000米+立定跳';
          } else {
            zzlSuggest = '800米+立定跳';
          }
        } else if (smm < tz * 0.40) { // 低于5%
          if (male === 0) {
            zzlSuggest = '1000米+立定跳';
          } else {
            zzlSuggest = '800米+立定跳';
          }
        } else if (smm < tz * 0.50) { // 正常
          if (male === 0) {
            zzlSuggest = '1000米+50米跑/立定跳';
          } else {
            zzlSuggest = '800米+50米跑/立定跳/仰卧起坐';
          }
        } else { // 高标准
          if (male === 0) {
            zzlSuggest = '1000米+立定跳';
          } else {
            zzlSuggest = '800米+50米跑/仰卧起坐';
          }
        }

        stcf.setFieldsValue({ weightSuggest, heightSuggest, tzlSuggest, jhdSuggest, zzlSuggest });
      }
    }
    calcSuggest();
  }


  return (
    <Card bordered={false} size="small">
      <ProForm
        form={stcf}
        layout="vertical"
        hideRequiredMark
        submitter={{
          searchConfig: {
            submitText: '保存',
            resetText: '刷新数据',
          },
          submitButtonProps: { disabled: readonly },
          resetButtonProps: {
            icon: <ReloadOutlined />,
            disabled: readonly,
            onClick: () => {
              run();
            },
          },
        }}
        onFinish={doSubmit}
      // onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={24}>
            {report && report.report ? (
              <Image
                preview={false}
                src={`data:image/jpeg;base64,${report.report}`}
                style={{ width: '100%' }}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Col>
        </Row>
        {hasZx && (
          <>
            <Row gutter={16}>
              <Col span={8}>
                <ProFormSelect
                  label="骨骼肌均衡度-上肢"
                  name="stjhSzVal"
                  value={stjhSzVal===undefined?0:stjhSzVal}
                  request={async () => [
                    { label: '均衡', value: 0 },
                    { label: '轻度不均衡', value: 1 },
                    { label: '严重不均衡', value: 2 },
                  ]}
                  fieldProps={{
                    onChange: (value) => {
                      setStjhSzVal(value);
                    }
                  }}
                  rules={[
                    {
                      required: true,
                      message: '必选项',
                    },
                  ]}
                  width="sm"
                />
              </Col>
              <Col span={8}>
                <ProFormSelect
                  label="骨骼肌均衡度-下肢"
                  name="stjhXzVal"
                  value={stjhXzVal===undefined?0:stjhXzVal}
                  request={async () => [
                    { label: '均衡', value: 0 },
                    { label: '轻度不均衡', value: 1 },
                    { label: '严重不均衡', value: 2 },
                  ]}
                  fieldProps={{
                    onChange: (value) => {
                      setStjhXzVal(value);
                    }
                  }}
                  rules={[
                    {
                      required: true,
                      message: '必选项',
                    },
                  ]}
                  width="sm"
                />
              </Col>
              <Col span={8}>
                <ProFormSelect
                  label="骨骼肌均衡度-上下肢"
                  name="stjhXxzVal"
                  value={stjhXxzVal===undefined?0:stjhXxzVal}
                  request={async () => [
                    { label: '均衡', value: 0 },
                    { label: '轻度不均衡', value: 1 },
                    { label: '严重不均衡', value: 2 },
                  ]}
                  fieldProps={{
                    onChange: (value) => {
                      setStjhXxzVal(value);
                    }
                  }}
                  rules={[
                    {
                      required: true,
                      message: '必选项',
                    },
                  ]}
                  width="sm"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <ProFormSelect
                  label="骨骼肌均衡度-全身"
                  name="stjhQsVal"
                  value={stjhQsVal===undefined?0:stjhQsVal}
                  request={async () => [
                    { label: '均衡', value: 0 },
                    { label: '躯干肌肉缺乏', value: 1 },
                  ]}
                  fieldProps={{
                    onChange: (value) => {
                      setStjhQsVal(value);
                    }
                  }}
                  rules={[
                    {
                      required: true,
                      message: '必选项',
                    },
                  ]}
                  width="sm"
                />
              </Col>
            </Row>
          </>
        )}
        {tyzk && (
          <Row gutter={16}>
            <Col span={8}>
              <ProFormSelect
                label="骨骼肌均衡度"
                name="jhdVal"
                value={jhdVal===undefined?0:jhdVal}
                request={async () => [
                  { label: '均衡', value: '0' },
                  { label: '不均衡', value: '1' },
                  { label: '上下肢不均衡', value: '2' },
                  { label: '上肢左右不均衡', value: '3' },
                  { label: '下肢左右不均衡', value: '4' },
                ]}
                rules={[
                  {
                    required: true,
                    message: '必选项',
                  },
                ]}
                fieldProps={{
                  onChange: (value) => {
                    setJhdVal(value);
                    if (tyzk) {
                      const jhdSuggest = calJhdSuggest(value, male);
                      stcf.setFieldsValue({ jhdSuggest });
                    }
                  }
                }}
                width="sm"
              />
            </Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            {!tyzk && (
              <Card bordered={false} title="评估结果">
                <Checkbox.Group
                  value={checkResults}
                  onChange={
                    (checkedValues) => setChechResults(checkedValues)
                  }
                >
                  <Row className="results">
                    <Col span={24}>
                      <Checkbox
                        value={0}
                        onChange={(target) => {
                          setIsOk(target.target.checked);
                        }}
                      >
                        正常
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={1} disabled={isOk}>
                        身体发育迟缓
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={2} disabled={isOk}>
                        骨骼肌缺乏
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={3} disabled={isOk}>
                        上肢肌肉不均衡
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={4} disabled={isOk}>
                        下肢肌肉不均衡
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={5} disabled={isOk}>
                        上下肢肌肉不均衡
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={6} disabled={isOk}>
                        上肢脂肪不均衡
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={7} disabled={isOk}>
                        下肢脂肪不均衡
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={8} disabled={isOk}>
                        上下肢脂肪不均衡
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={9} disabled={isOk}>
                        蛋白质缺乏
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={10} disabled={isOk}>
                        无机盐缺乏
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={11} disabled={isOk}>
                        体脂肪缺乏
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value={12} disabled={isOk}>
                        肥胖
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Card>
            )}
            {tyzk && ( // 体育中考
              <Card bordered={false}>
                <>
                  <Row gutter={0} style={{ minHeight: 50 }} align="middle">
                    <Col span={5} className="mjfy-table">
                      体重建议
                    </Col>
                    <Col span={5} className="mjfy-table">
                      身高建议
                    </Col>
                    <Col span={5} className="mjfy-table">
                      体脂率建议
                    </Col>
                    <Col span={5} className="mjfy-table">
                      骨骼肌均衡度建议
                    </Col>
                    <Col span={5} className="mjfy-table">
                      骨骼肌总质量建议
                    </Col>
                  </Row>
                  <Row gutter={0} align="middle">
                    <Col span={5} className="mjfy-table mjfy-table-content">
                      <ProFormText name="weightSuggest" width="sm" readonly />
                    </Col>
                    <Col span={5} className="mjfy-table">
                      <ProFormText name="heightSuggest" width="sm" readonly />
                    </Col>
                    <Col span={5} className="mjfy-table">
                      <ProFormText name="tzlSuggest" width="sm" readonly />
                    </Col>
                    <Col span={5} className="mjfy-table">
                      <ProFormText name="jhdSuggest" width="sm" readonly />
                    </Col>
                    <Col span={5} className="mjfy-table">
                      <ProFormText name="zzlSuggest" width="sm" readonly />
                    </Col>
                  </Row>
                </>
              </Card>
            )}
          </Col>
        </Row>
      </ProForm>
    </Card>
  );
};

export default Page;

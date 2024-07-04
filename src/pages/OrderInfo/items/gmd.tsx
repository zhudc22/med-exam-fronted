/* eslint-disable no-lonely-if */
import React, { useState } from 'react';
import { useRequest } from 'umi';
import { Form, Card, Row, Col, message, Empty, Image, Upload, Button } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ProForm, { ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { queryByOrderId, queryDataByOrderId, updateZValue } from '@/services/gmd';
import { getAccessToken } from '@/utils/authority';

export type Props = {
  loading?: boolean;
  data?: API.gmd;
  orderId: string;
  tyzk: boolean;
  male: number;
  readonly?: boolean;
};

const Page: React.FC<Props> = (props) => {
  const { loading, orderId, tyzk, male, readonly } = props;

  const [report, setReport] = useState<API.gmd>();
  const [detail, setDetail] = useState<any>();
  const [isFirst, setIsFirst] = useState<boolean>(true);

  const fetch = async (id) => {
    const resp1 = await queryByOrderId(id);
    const resp2 = await queryDataByOrderId(id);

    if (resp1.success && resp2.success) {
      return {
        success: true,
        data: {
          raw: resp1.data,
          detail: resp2.data,
        },
      };
    }
    return {
      success: false,
      errorMessage: resp1.errorMessage || resp2.errorMessage,
    };
  };

  const { run } = useRequest(() => fetch(orderId), {
    onSuccess: ({ raw, detail: newDetail }) => {
      if (raw) {
        setReport(raw);
        setDetail(newDetail);
        setIsFirst(false);
      }
      if (!isFirst) {
        message.success('刷新成功');
      }
    },
  });

  const [form] = Form.useForm();
  if (!loading) {
    form.setFieldsValue(detail);
  }
  const doSubmit = async (values) => {
    const resp = await updateZValue(orderId, values);
    if (resp.success) {
      message.success('保存成功');
    } else {
      message.error(resp.errorMessage);
    }
    return resp.success;
  };

  const calGmdSuggest = (value) => {
    let gmdSuggest;
    if (value <= -1) { // 不合格
      if (male === 0) { // 男
        gmdSuggest = '1000米+立定跳远';
      } else {
        gmdSuggest = '800米+仰卧起坐';
      }
    } else if (value < 0.5) { // 较差
      if (male === 0) { // 男
        gmdSuggest = '1000米+立定跳远';
      } else {
        gmdSuggest = '800米+立定跳远';
      }
    } else if (value < 0) { // 稍差
      if (male === 0) { // 男
        gmdSuggest = '1000米+50米跑/立定跳远';
      } else {
        gmdSuggest = '800米+50米跑/仰卧起坐';
      }
    } else if (value < 1.5) { // 合格
      if (male === 0) { // 男
        gmdSuggest = '1000米+50米跑/立定跳远';
      } else {
        gmdSuggest = '800米+50米跑/仰卧起坐';
      }
    } else { // 良好
      if (male === 0) { // 男
        gmdSuggest = '1000米+50米跑';
      } else {
        gmdSuggest = '800米+50米跑/立定跳远';
      }
    } 
    return gmdSuggest;
  }
  if (tyzk) {
    const gmdSuggest = calGmdSuggest(detail?.zvalue);
    form.setFieldsValue({ gmdSuggest });
  }

  return (
    <Card bordered={false} size="small">
      <ProForm
        form={form}
        layout="horizontal"
        hideRequiredMark
        submitter={{
          // searchConfig: {
          //   submitText: '保存',
          //   resetText: '刷新数据',
          // },
          submitButtonProps: false,
          resetButtonProps: false,

          render: (buttonsProps) => {
            return [
              <Button type="default" key="rest" onClick={() => run()}>
                <ReloadOutlined /> 刷新数据
              </Button>,
              <Upload
                accept={'.png,.jpg,.jpeg'}
                action={`/api/check/check-gmd-po/uploadImage/${orderId}`}
                headers={{ Authorization: getAccessToken() }}
                multiple={false}
                maxCount={1}
                showUploadList={false}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    message.success(`${info.file.name}上传成功`);
                    run();
                  }
                }}
                disabled={readonly}
              >
                <Button type="default">
                  <PlusOutlined /> 上传文件
                </Button>
              </Upload>,
              <Button
                type="primary"
                key="submit"
                disabled={readonly}
                onClick={() => buttonsProps.form?.submit?.()}
              >
                保存
              </Button>,
            ];
          },
        }}
        onFinish={doSubmit}
        // onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: 'left' }}>
            {report && report.report ? (
              <Image
                preview={false}
                style={{ width: '100%' }}
                src={`data:image/jpeg;base64,${report.report}`}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Col>
        </Row>
        {/* <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit label="检测部位" name="weight" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="SOS(米/秒)" name="weight1" width="sm" />
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit label="T值" name="weight" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="Z值" name="weight1" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="百分比" name="weight1" width="sm" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit label="检查所见" name="weight1" width="sm" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="医生意见" name="weight2" width="sm" />
          </Col>
        </Row> */}
        <Row style={{ paddingTop: '16px' }}>
          <Col></Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <ProFormDigit
              label="Z值"
              min={-100}
              fieldProps={{ step: 0.5, onChange: (value) => {
                if (tyzk) {
                  const gmdSuggest = calGmdSuggest(value);
                  form.setFieldsValue({gmdSuggest});
                }
              }}}
              name="zvalue"
              width="sm"
            />
          </Col>
          <Col span={8}>{tyzk && <ProFormText label="建议" name="gmdSuggest" width="sm" readonly />}</Col>
          <Col span={8}></Col>
        </Row>
      </ProForm>
    </Card>
  );
};

export default Page;

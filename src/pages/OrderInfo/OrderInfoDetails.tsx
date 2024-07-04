import React, { useEffect, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { Card, Form, message, Row, Col, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { finish, update, queryByOrderId, queryCheckItemsByOrderId } from '@/services/orderinfo';
import { save as saveSgtz } from '@/services/Sgtz';

import FmsItem from './items/fms';
import GmdItem from './items/gmd';
import JzwqItem from './items/jzwq';
import MjfyItem from './items/mjfy';
import PhItem from './items/ph';
import StcfItem from './items/stcf';
import TzttItem from './items/tztt';
import XfgnItem from './items/xfgn';
import ZxtzttItem from './items/zxtztt';

import styles from './index.less';

const { TabPane } = Tabs;

const Page: React.FC = () => {
  const { query } = history.location;
  const isArchive = query.archive === '1';
  const { id } = useParams<{ id?: string }>();
  const { data, loading } = useRequest(() => queryByOrderId(id));

  const [items, setItems] = useState([]);

  useEffect(() => {
    queryCheckItemsByOrderId(id).then((resp) => {
      setItems(resp);
    });
  }, [id]);

  const [basic] = Form.useForm();

  let needConrrectInitValue = [false];
  if (!loading) {
    if (data.orderInfo) {
      if (data.orderInfo.needCorrect === true) {
        needConrrectInitValue = [true];
      }
    }

    let type;
    if (data?.orderInfo.checkType2Name === null) {
      type = data?.orderInfo.checkType1Name;
    } else {
      type = `${data?.orderInfo.checkType1Name}; ${data?.orderInfo.checkType2Name}`;
    }

    basic.setFieldsValue({
      ...data?.orderInfo,
      type,
    });
  }
  const hasItem = (itemId) => {
    const tmp = items.find((item) => item.itemId === itemId);
    return tmp;
  };

  // 身高体重
  const [sgtz] = Form.useForm();
  if (!loading) {
    sgtz.setFieldsValue({
      ...data?.heightWeight,
    });
  }

  const submitBasic = async (values) => {
    const resp = await update({
      ...values,
      id: data?.orderInfo.id,
      orderId: undefined,
      orderDate: undefined,
      type: undefined,
    });
    if (resp.success) {
      message.success('基本信息保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  const submitSgtz = async (values) => {
    const resp = await saveSgtz({ ...values, orderId: id });
    if (resp.success) {
      message.success('身高体重保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  let hasStcf = true;
  let hasZxtztt = true;
  let isCj = false;
  let isGreaterTwelve = true; // 是否大于12岁
  if (data) {
    hasStcf = data.orderInfo.hasStcf;
    hasZxtztt = data.orderInfo.zx;
    isCj = data.orderInfo.cj;
    // isGreaterTwelve = !isCj || (data.orderInfo.age > 12);
  }
  return (
    <PageContainer className={styles.orderinfo} title={data?.orderInfo.checkType1Name}>
      <Card title="受测人信息" bordered={false} size="small" className="base-info">
        <ProForm
          form={basic}
          size="small"
          layout="vertical"
          hideRequiredMark
          submitter={{
            searchConfig: {
              submitText: '保存',
            },
            submitButtonProps: { size: 'middle', style: { float: 'right' }, disabled: isArchive },
            resetButtonProps: false,
          }}
          // onValuesChange={() => { setUpdated(true) }}
          onFinish={submitBasic}
        >
          <Row gutter={16}>
            <Col span={5}>
              <ProFormText label="预约单号" name="orderId" width="sm" readonly />
            </Col>
            <Col span={5}>
              <ProFormDateTimePicker label="检测时间" name="orderDate" width="sm" readonly />
            </Col>
            <Col span={5}>
              <ProFormText label="检测项目" name="type" readonly />
            </Col>
          </Row>
          <div style={{ paddingTop: '16px' }}></div>
          <Row gutter={16}>
            <Col span={5}>
              <ProFormText label="姓名" name="nickName" width="sm" readonly={isArchive} />
            </Col>
            <Col span={5}>
              <ProFormDigit label="年龄" name="age" width="sm" readonly={isArchive} />
            </Col>
            <Col span={5}>
              <ProFormSelect
                label="性别"
                name="male"
                width="sm"
                request={async () => [
                  { label: '男', value: 0 },
                  { label: '女', value: 1 },
                ]}
                readonly={isArchive}
              />
            </Col>
          </Row>
          <div style={{ paddingTop: '16px' }}></div>
          <Row gutter={16}>
            <Col span={5}>
              <ProFormText label="身份证" name="card" width="sm" readonly={isArchive} />
            </Col>
            <Col span={5}>
              <ProFormText label="联系人" name="contactName" width="sm" readonly={isArchive} />
            </Col>
            <Col span={5}>
              <ProFormText label="联系人电话" name="contactPhone" width="sm" readonly={isArchive} />
            </Col>
          </Row>
        </ProForm>
      </Card>
      <Card bordered={false} size="small">
        <Tabs size="small" id="tabsContainer">
          {hasItem(1) && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>身高测量</span>}
              key="heightWeight"
            >
              <Card bordered={false} size="small">
                <ProForm
                  form={sgtz}
                  layout="vertical"
                  hideRequiredMark
                  submitter={{
                    searchConfig: {
                      submitText: '保存',
                    },
                    submitButtonProps: { style: { float: 'right' }, disabled: isArchive },
                    resetButtonProps: false,
                  }}
                  onFinish={submitSgtz}
                // onFinishFailed={onFinishFailed}
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <ProFormDigit label="身高" name="height" width="sm" />
                    </Col>
                    {!hasStcf && (
                      <Col span={6}>
                        <ProFormDigit label="体重" name="weight" width="sm" />
                      </Col>
                    )}
                    {data?.orderInfo.checkType1 === 47 && ( // 体育中考项目
                      <Col span={6}>
                        <ProFormDigit label="腿长" name="legLength" width="sm" />
                      </Col>
                    )}
                  </Row>
                </ProForm>
              </Card>
            </TabPane>
          )}
          {!hasZxtztt && hasItem(2) && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>体姿体态检测</span>}
              key="tztt"
            >
              <TzttItem loading={loading} data={data?.body} orderId={id} readonly={isArchive} />
            </TabPane>
          )}
          {hasItem(3) && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>脊柱弯曲检测</span>}
              key="jzwq"
            >
              <JzwqItem loading={loading} data={data?.spinal} orderId={id} readonly={isArchive} />
            </TabPane>
          )}
          {
            /* 身体成分检测 */ hasStcf && hasItem(5) && (
              <TabPane
                tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>身体成分检测</span>}
                key="Stcf"
              >
                <StcfItem
                  loading={loading}
                  data={data?.stcf}
                  orderId={id}
                  hasZx={hasZxtztt}
                  tyzk={data?.orderInfo.checkType1 === 47}
                  male={data?.orderInfo.male}
                  age={data?.orderInfo.age}
                  readonly={isArchive}
                />
              </TabPane>
            )
          }
          {hasItem(4) && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>超声骨密度检测</span>}
              key="gmd"
            >
              <GmdItem
                loading={loading}
                data={data?.gmd}
                orderId={id}
                tyzk={data?.orderInfo.checkType1 === 47}
                male={data?.orderInfo.male}
                readonly={isArchive}
              />
            </TabPane>
          )}
          {hasItem(6) && isGreaterTwelve && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>FMS功能性动作评估检测</span>}
              key="fms"
            >
              <FmsItem
                loading={loading}
                data={data?.fms}
                orderId={id}
                tyzk={data?.orderInfo.checkType1 === 47}
                male={data?.orderInfo.male}
                readonly={isArchive}
              />
            </TabPane>
          )}
          {hasItem(7) && isGreaterTwelve && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>运动心肺功能检测</span>}
              key="xfgn"
            >
              <XfgnItem
                loading={loading}
                data={data?.xfgn}
                orderId={id}
                tyzk={data?.orderInfo.checkType1 === 47}
                male={data?.orderInfo.male}
                readonly={isArchive}
              />
            </TabPane>
          )}
          {hasItem(8) && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>敏捷反应检测</span>}
              key="mjfy"
            >
              <div id="mjfy">
                <MjfyItem
                  loading={loading}
                  data={data?.responsive}
                  orderId={id}
                  readonly={isArchive}
                />
              </div>
            </TabPane>
          )}
          {hasItem(9) && isGreaterTwelve && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>平衡功能检测</span>}
              key="balance"
            >
              <PhItem loading={loading} data={data?.balance} orderId={id} readonly={isArchive} />
            </TabPane>
          )}
          {hasZxtztt && hasItem(2) && (
            <TabPane
              tab={<span style={{ fontSize: '14px', fontWeight: 400 }}>形态测量</span>}
              key="zxtztt"
            >
              <ZxtzttItem
                loading={loading}
                data={data?.special}
                orderId={id}
                checkType2={data?.orderInfo.checkType2}
                readonly={isArchive}
              />
            </TabPane>
          )}
        </Tabs>
      </Card>
      <Card
        title="总评价"
        bordered={false}
        size="small"
        style={{ borderTop: '2px dashed rgba(0, 0, 0, 0.3)' }}
      >
        <ProForm
          layout="vertical"
          labelCol={{ span: 6 }}
          hideRequiredMark
          submitter={{
            searchConfig: {
              submitText: '生成报告',
            },
            submitButtonProps: { style: { float: 'right' }, disabled: isArchive },
            resetButtonProps: false,
          }}
          onFinish={async (formData) => {
            const { success } = await finish(id, {
              ...formData,
              needCorrect: (formData.needCorrect === undefined || formData.needCorrect.length === 0) ? false : formData.needCorrect[0],
            });
            if (success) {
              message.success('生成报告成功');
            }
            return success;
          }}
        >
          <Row>
            <Col span={6}>
              {data?.orderInfo.checkType1 === 1 && ( // 青少年
                <ProFormSelect
                  name="checkResult"
                  initialValue={data.orderInfo.checkResult}
                  width="sm"
                  request={async () => [
                    { key: 'zpj1', label: '合格', value: 1 },
                    { key: 'zpj2', label: '不合格', value: 2 },
                  ]}
                />
              )}
              {(data?.orderInfo.checkType1 === 2 || data?.orderInfo.checkType1 === 5) && ( // 初级,自选
                <ProFormSelect
                  name="checkResult"
                  initialValue={data.orderInfo.checkResult}
                  width="sm"
                  request={async () => [
                    { key: 'zpj1', label: '合格', value: 1 },
                    { key: 'zpj2', label: '不合格', value: 2 },
                    { key: 'zpj3', label: '良好', value: 3 },
                    { key: 'zpj4', label: '优秀', value: 4 },
                  ]}
                />
              )}
              {data?.orderInfo.checkType1 === 3 && ( // 专项
                <ProFormSelect
                  name="checkResult"
                  initialValue={data.orderInfo.checkResult}
                  width="sm"
                  request={async () => [
                    { key: 'zpj0', label: '-', value: 0 },
                    { key: 'zpj1', label: '合格', value: 1 },
                    { key: 'zpj2', label: '不合格', value: 2 },
                    { key: 'zpj3', label: '良好', value: 3 },
                    { key: 'zpj4', label: '优秀', value: 4 },
                  ]}
                />
              )}
              {data?.orderInfo.checkType1 === 4 && ( // 艺术培训
                <ProFormSelect
                  name="checkResult"
                  initialValue={data.orderInfo.checkResult}
                  width="sm"
                  request={async () => [
                    { key: 'zpj1', label: '合格', value: 1 },
                    { key: 'zpj2', label: '不合格', value: 2 },
                  ]}
                />
              )}

              {/* 男生：1000米跑；立定跳远
                  1000米跑；50米跑
                  1000米跑；50米跑或立定跳远均可
                  女生：800米跑；50米跑
                  800米跑；立定跳远
                  800米跑；1分钟仰卧起坐
                  800米跑；50米跑或立定跳远均可
                  800米跑；50米跑或1分钟仰卧起坐均可
                  800米跑；立定跳远或1分钟仰卧起坐均可
                  800米跑；50米跑、立定跳远或1分钟仰卧起坐均可 */
              }
              {data?.orderInfo.checkType1 === 47 && data?.orderInfo.male === 0 && ( //体育中考
                <ProFormSelect
                  name="checkResult"
                  initialValue={data.orderInfo.checkResult}
                  width="sm"
                  request={async () => [
                    { key: 'zpj1', label: '1000米跑；立定跳远', value: 1 },
                    { key: 'zpj2', label: '1000米跑；50米跑', value: 2 },
                    { key: 'zpj2', label: '1000米跑；50米跑或立定跳远均可', value: 3 },
                  ]}
                />
              )}
              {data?.orderInfo.checkType1 === 47 && data?.orderInfo.male === 1 && ( //体育中考
                <ProFormSelect
                  name="checkResult"
                  initialValue={data.orderInfo.checkResult}
                  width="sm"
                  request={async () => [
                    { key: 'zpj1', label: '800米跑；50米跑', value: 1 },
                    { key: 'zpj2', label: '800米跑；立定跳远', value: 2 },
                    { key: 'zpj2', label: '800米跑；1分钟仰卧起坐', value: 3 },
                    { key: 'zpj2', label: '800米跑；50米跑或立定跳远均可', value: 4 },
                    { key: 'zpj2', label: '800米跑；50米跑或1分钟仰卧起坐均可', value: 5 },
                    { key: 'zpj2', label: '800米跑；立定跳远或1分钟仰卧起坐均可', value: 6 },
                    { key: 'zpj2', label: '800米跑；50米跑、立定跳远或1分钟仰卧起坐均可', value: 7 },
                  ]}
                />
              )}
            </Col>
            {(hasItem(1) || hasItem(2) || hasItem(4)) && (
              <Col span={6}>
                <ProFormCheckbox.Group
                  name="needCorrect"
                  value={needConrrectInitValue}
                  options={[{ label: '需参加矫正训练', value: true }]}
                />
              </Col>
            )}
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Page;

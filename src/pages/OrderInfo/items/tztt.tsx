import React from 'react';
import { Form, Card, Row, Col, message } from 'antd';
import ProForm, { ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { save } from '@/services/Tztt';

export type Props = {
  loading?: boolean;
  data?: API.Tztt;
  orderId: string;
  readonly?: boolean;
};

const abnormalOptions = [
  { label: '一级', value: 1 },
  { label: '二级', value: 2 },
  { label: '三级', value: 3 },
];

const fbHeadNormalOptions = [
  { label: '正常', value: 0 },
  { label: '左倾', value: 1 },
  { label: '右倾', value: 2 },
];

const fbShoulderOptions = [
  { label: '正常', value: 0 },
  { label: '耸肩', value: 1 },
  { label: '塌肩', value: 2 },
  { label: '左肩高(高低肩)', value: 3 },
  { label: '右肩高(高低肩)', value: 4 },
];

const fbShoulderBladeOptions = [
  { label: '正常', value: 0 },
  { label: '翼状肩胛', value: 1 },
]

const fbChestWaistOptions = [
  { label: '正常', value: 0 },
  { label: 'S型', value: 1 },
  { label: 'C型', value: 2 },
]

const fbLegOptions = [
  { label: '正常', value: 0 },
  { label: 'X型', value: 1 },
  { label: 'O型', value: 2 },
]

const fbFootOptions = [
  { key: "tztt1", label: '正常', value: 0 },
  { key: "tztt2", label: '内翻', value: 1 },
  { key: "tztt3", label: '外翻', value: 2 },
  { key: "tztt4", label: '扁平足', value: 3 },
]

const sideHeadNormalOptions = [
  { label: '正常', value: 0 },
  { label: '前倾', value: 1 },
  { label: '后倾', value: 2 },
];

const sideChestOptions = [
  { label: '正常', value: 0 },
  { label: '圆肩', value: 1 },
  { label: '驼背', value: 2 },
]

const sideWaistOptions = [
  { label: '正常', value: 0 },
  { label: '过于后曲', value: 1 },
]

const sideHipOptions = [
  { label: '正常', value: 0 },
  { label: '超伸', value: 1 },
  { label: '伸展', value: 2 },
]

const sideKneeOptions = [
  { label: '正常', value: 0 },
  { label: '超伸', value: 1 },
]

const sideAnkleOptions = [
  { label: '正常', value: 0 },
  { label: '大于90度', value: 1 },
  { label: '小于90度', value: 2 },
]

const getLabelByValue = (options: { label: string, value: number }[], value: number) => {
  const found = options.find((option) => option.value === value);
  if (found) {
    return found.label;
  }
  return "";
}

const Page: React.FC<Props> = (props) => {
  const { loading, data, orderId, readonly } = props;

  // 体姿体态检测
  const [tztt] = Form.useForm();
  if (!loading) {
    tztt.setFieldsValue(data);
  }
  const doSubmit = async (values) => {
    const resp = await save({ ...values, orderId });
    if (resp.success) {
      message.success('体姿体态检测保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  const generateReport = () => {
    const fbHead = tztt.getFieldValue('fbHead') ? tztt.getFieldValue('fbHead') : 0;
    const fbNeck = tztt.getFieldValue('fbNeck') ? tztt.getFieldValue('fbNeck') : 0;
    const fbShoulder = tztt.getFieldValue('fbShoulder') ? tztt.getFieldValue('fbShoulder') : 0;
    const fbShoulderBlade = tztt.getFieldValue('fbShoulderBlade')
      ? tztt.getFieldValue('fbShoulderBlade')
      : 0;
    const fbChestWaist = tztt.getFieldValue('fbChestWaist')
      ? tztt.getFieldValue('fbChestWaist')
      : 0;
    const fbPelvis = tztt.getFieldValue('fbPelvis') ? tztt.getFieldValue('fbPelvis') : 0;
    const fbLeg = tztt.getFieldValue('fbLeg') ? tztt.getFieldValue('fbLeg') : 0;
    const fbFoot = tztt.getFieldValue('fbFoot') ? tztt.getFieldValue('fbFoot') : 0;

    const sideHead = tztt.getFieldValue('sideHead') ? tztt.getFieldValue('sideHead') : 0;
    const sideNeck = tztt.getFieldValue('sideNeck') ? tztt.getFieldValue('sideNeck') : 0;
    const sideChest = tztt.getFieldValue('sideChest') ? tztt.getFieldValue('sideChest') : 0;
    const sideWaist = tztt.getFieldValue('sideWaist') ? tztt.getFieldValue('sideWaist') : 0;
    const sidePelvis = tztt.getFieldValue('sidePelvis') ? tztt.getFieldValue('sidePelvis') : 0;
    const sideHip = tztt.getFieldValue('sideHip') ? tztt.getFieldValue('sideHip') : 0;
    const sideKnee = tztt.getFieldValue('sideKnee') ? tztt.getFieldValue('sideKnee') : 0;
    const sideAnkle = tztt.getFieldValue('sideAnkle') ? tztt.getFieldValue('sideAnkle') : 0;

    if (
      fbHead === 0 &&
      fbNeck === 0 &&
      fbShoulder === 0 &&
      fbShoulderBlade === 0 &&
      fbChestWaist === 0 &&
      fbPelvis === 0 &&
      fbLeg === 0 &&
      fbFoot === 0 &&
      sideHead === 0 &&
      sideNeck === 0 &&
      sideChest === 0 &&
      sideWaist === 0 &&
      sidePelvis === 0 &&
      sideHip === 0 &&
      sideKnee === 0 &&
      sideAnkle === 0
    ) {
      tztt.setFieldsValue({ report: '正常' });
      return;
    }

    let report = '';
    if (fbHead > 0) {
      const abnormal = tztt.getFieldValue('fbHeadAbnormal') ? tztt.getFieldValue('fbHeadAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}头部${getLabelByValue(fbHeadNormalOptions, fbHead)};`;
    }
    if (fbNeck > 0) {
      const abnormal = tztt.getFieldValue('fbNeckAbnormal') ? tztt.getFieldValue('fbNeckAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}颈椎${getLabelByValue(fbHeadNormalOptions, fbNeck)};`;
    }
    if (fbShoulder > 0) {
      const abnormal = tztt.getFieldValue('fbShoulderAbnormal') ? tztt.getFieldValue('fbShoulderAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}肩部${getLabelByValue(fbShoulderOptions, fbShoulder)};`;
    }
    if (fbShoulderBlade > 0) {
      const abnormal = tztt.getFieldValue('fbShoulderBladeAbnormal') ? tztt.getFieldValue('fbShoulderBladeAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}肩胛骨${getLabelByValue(fbShoulderBladeOptions, fbShoulderBlade)};`;
    }
    if (fbChestWaist > 0) {
      const abnormal = tztt.getFieldValue('fbChestWaistAbnormal') ? tztt.getFieldValue('fbChestWaistAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}胸腰椎${getLabelByValue(fbChestWaistOptions, fbChestWaist)};`;
    }
    if (fbPelvis > 0) {
      const abnormal = tztt.getFieldValue('fbChestWaistAbnormal') ? tztt.getFieldValue('fbChestWaistAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}骨盆${getLabelByValue(fbChestWaistOptions, fbPelvis)};`;
    }
    if (fbLeg > 0) {
      const abnormal = tztt.getFieldValue('fbLegAbnormal') ? tztt.getFieldValue('fbLegAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}下肢${getLabelByValue(fbLegOptions, fbLeg)};`;
    }
    if (fbFoot > 0) {
      const abnormal = tztt.getFieldValue('fbFootAbnormal') ? tztt.getFieldValue('fbFootAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}足${getLabelByValue(fbFootOptions, fbFoot)};`;
    }

    if (sideHead > 0) {
      const abnormal = tztt.getFieldValue('sideHeadAbnormal') ? tztt.getFieldValue('sideHeadAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}头部${getLabelByValue(sideHeadNormalOptions, sideHead)};`;
    }
    if (sideNeck > 0) {
      const abnormal = tztt.getFieldValue('sideNeckAbnormal') ? tztt.getFieldValue('sideNeckAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}颈椎${getLabelByValue(sideHeadNormalOptions, sideNeck)};`;
    }
    if (sideChest > 0) {
      const abnormal = tztt.getFieldValue('sideChestAbnormal') ? tztt.getFieldValue('sideChestAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}胸椎${getLabelByValue(sideChestOptions, sideChest)};`;
    }
    if (sideWaist > 0) {
      const abnormal = tztt.getFieldValue('sideWaistAbnormal') ? tztt.getFieldValue('sideWaistAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}腰椎${getLabelByValue(sideWaistOptions, sideWaist)};`;
    }
    if (sidePelvis > 0) {
      const abnormal = tztt.getFieldValue('sidePelvisAbnormal') ? tztt.getFieldValue('sidePelvisAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}骨盆${getLabelByValue(sideHeadNormalOptions, sidePelvis)};`;
    }
    if (sideHip > 0) {
      const abnormal = tztt.getFieldValue('sideHipAbnormal') ? tztt.getFieldValue('sideHipAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}髋关节${getLabelByValue(sideHipOptions, sideHip)};`;
    }
    if (sideKnee > 0) {
      const abnormal = tztt.getFieldValue('sideKneeAbnormal') ? tztt.getFieldValue('sideKneeAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}膝关节${getLabelByValue(sideKneeOptions, sideKnee)};`;
    }
    if (sideAnkle > 0) {
      const abnormal = tztt.getFieldValue('sideAnkleAbnormal') ? tztt.getFieldValue('sideAnkleAbnormal') : 0;
      report += `${getLabelByValue(abnormalOptions, abnormal)}踝关节${getLabelByValue(sideAnkleOptions, sideAnkle)};`;
    }

    tztt.setFieldsValue({ report });
  };

  return (
    <Card bordered={false} size="small">
      <ProForm
        form={tztt}
        layout="vertical"
        hideRequiredMark
        submitter={{
          searchConfig: {
            submitText: '保存',
          },
          submitButtonProps: { style: { float: 'right' }, disabled: readonly },
          resetButtonProps: false,
        }}
        initialValues={{
          fbHead: 0,
          fbNeck: 0,
          fbShoulder: 0,
          fbShoulderBlade: 0,
          fbChestWaist: 0,
          fbPelvis: 0,
          fbLeg: 0,
          fbFoot: 0,

          sideHead: 0,
          sideNeck: 0,
          sideChest: 0,
          sideWaist: 0,
          sidePelvis: 0,
          sideHip: 0,
          sideKnee: 0,
          sideAnkle: 0,

          report: '正常'
        }}
        onFinish={doSubmit}
      // onFinishFailed={onFinishFailed}
      >
        <Row gutter={16} style={{ paddingBottom: '16px' }}>
          <Col span={12}>
            <Card title="正背面观" size="small" bordered={false}>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="头部"
                    name="fbHead"
                    request={async () => fbHeadNormalOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbHeadAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbHeadAbnormal"
                          disabled={form.getFieldValue('fbHead') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbHead');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="颈椎"
                    name="fbNeck"
                    request={async () => fbHeadNormalOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbNeckAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbNeckAbnormal"
                          disabled={form.getFieldValue('fbNeck') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbNeck');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="肩部"
                    name="fbShoulder"
                    request={async () => fbShoulderOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbShoulderAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbShoulderAbnormal"
                          disabled={form.getFieldValue('fbShoulder') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbShoulder');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="肩胛骨"
                    name="fbShoulderBlade"
                    request={async () => fbShoulderBladeOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbShoulderBladeAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbShoulderBladeAbnormal"
                          disabled={form.getFieldValue('fbShoulderBlade') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbShoulderBlade');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="胸腰椎"
                    name="fbChestWaist"
                    request={async () => fbChestWaistOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbChestWaistAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbChestWaistAbnormal"
                          disabled={form.getFieldValue('fbChestWaist') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbChestWaist');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="骨盆"
                    name="fbPelvis"
                    request={async () => fbHeadNormalOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbPelvisAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbPelvisAbnormal"
                          disabled={form.getFieldValue('fbPelvis') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbPelvis');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="下肢"
                    name="fbLeg"
                    request={async () => fbLegOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbLegAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbLegAbnormal"
                          disabled={form.getFieldValue('fbLeg') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbLeg');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    key="tzttFbFoot"
                    label="足"
                    name="fbFoot"
                    request={async () => fbFootOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ fbFootAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="fbFootAbnormal"
                          disabled={form.getFieldValue('fbFoot') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('fbFoot');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="侧面观" size="small" bordered={false}>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect                    
                    label="头部"
                    name="sideHead"
                    request={async () => sideHeadNormalOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sideHeadAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sideHeadAbnormal"
                          disabled={form.getFieldValue('sideHead') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sideHead');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="颈椎"
                    name="sideNeck"
                    request={async () => sideHeadNormalOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sideNeckAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sideNeckAbnormal"
                          disabled={form.getFieldValue('sideNeck') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sideNeck');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="胸椎"
                    name="sideChest"
                    request={async () => sideChestOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sideChestAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sideChestAbnormal"
                          disabled={form.getFieldValue('sideChest') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sideChest');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="腰椎"
                    name="sideWaist"
                    request={async () => sideWaistOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sideWaistAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sideWaistAbnormal"
                          disabled={form.getFieldValue('sideWaist') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sideWaist');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="骨盆"
                    name="sidePelvis"
                    request={async () => sideHeadNormalOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sidePelvisAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sidePelvisAbnormal"
                          disabled={form.getFieldValue('sidePelvis') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sidePelvis');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="髋关节"
                    name="sideHip"
                    request={async () => sideHipOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sideHipAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sideHipAbnormal"
                          disabled={form.getFieldValue('sideHip') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sideHip');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="膝关节"
                    name="sideKnee"
                    request={async () => sideKneeOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sideKneeAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sideKneeAbnormal"
                          disabled={form.getFieldValue('sideKnee') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sideKnee');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormSelect
                    label="踝关节"
                    name="sideAnkle"
                    request={async () => sideAnkleOptions}
                    fieldProps={{
                      onChange: (value) => {
                        if (value === 0) {
                          tztt.setFieldsValue({ sideAnkleAbnormal: null });
                        }
                        generateReport();
                      },
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
                <Col span={12}>
                  <Form.Item noStyle shouldUpdate>
                    {(form) => {
                      return (
                        <ProFormSelect
                          label="异常程度"
                          name="sideAnkleAbnormal"
                          disabled={form.getFieldValue('sideAnkle') === 0}
                          request={async () => abnormalOptions}
                          fieldProps={{
                            onChange: () => {
                              generateReport();
                            },
                          }}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                const normal = getFieldValue('sideAnkle');
                                if (normal === 0) {
                                  return Promise.resolve();
                                }
                                if (value === undefined || value === null || value === 0) {
                                  return Promise.reject(new Error("必选项"));
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          width="sm"
                        />
                      );
                    }}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <ProFormTextArea
              name="report"
              placeholder="综合评价"
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
              fieldProps={{ rows: 3 }}
            />
          </Col>
        </Row>
      </ProForm>
    </Card>
  );
};

export default Page;

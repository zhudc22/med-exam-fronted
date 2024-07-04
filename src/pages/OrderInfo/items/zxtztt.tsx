import React from 'react';
import { Form, Card, Row, Col, message } from 'antd';
import ProForm, { ProFormDigit, ProFormSelect } from '@ant-design/pro-form';
import { save } from '@/services/Zxtztt';

export type Props = {
  loading?: boolean;
  data?: API.ZxTztt;
  orderId: string;
  checkType2: number;
  readonly?: boolean;
};

const Page: React.FC<Props> = (props) => {
  const { loading, data, orderId, checkType2, readonly } = props;

  const [form] = Form.useForm();
  if (!loading) {
    form.setFieldsValue({ ...data, zxtzttFbFoot: data?.fbFoot });
  }
  const doSubmit = async (values) => {
    const resp = await save({ ...values, fbFoot: values.zxtzttFbFoot, orderId });
    if (resp.success) {
      message.success('形态保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
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
          },
          submitButtonProps: { style: { float: 'right' }, disabled: readonly },
          resetButtonProps: false,
        }}
        onFinish={doSubmit}
        // onFinishFailed={onFinishFailed}
      >
        {(checkType2 === 7 || checkType2 === 12 || checkType2 === 31) && ( // 短跑、中长跑;跨栏;足球
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="踝围" name="ankleSurround" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="跟腱" name="tendon" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormSelect
                key="zxtzttFbFoot"
                label="扁平足"
                name="zxtzttFbFoot"
                request={async () => [
                  { key: 'zxtztt1', label: '合格', value: 0 },
                  { key: 'zxtztt2', label: '不合格', value: 1 },
                ]}
                width="sm"
              />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {(checkType2 === 24 || checkType2 === 6 || checkType2 === 14 || checkType2 === 30) && ( // 跳跃;棒球;垒球;自行车
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="踝围" name="ankleSurround" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="跟腱" name="tendon" width="sm" />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 10 && ( // 竞走
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="髋宽" name="hipWidth" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormSelect
                label="腿型"
                name="legType"
                request={async () => [
                  { label: '正常', value: 0 },
                  { label: 'X型', value: 1 },
                  { label: 'O型', value: 2 },
                ]}
                width="sm"
              />
            </Col>
            <Col span={6}>
              <ProFormSelect
                key="zxtzttFbFoot"
                label="扁平足"
                name="zxtzttFbFoot"
                request={async () => [
                  { key: 'zxtztt1', label: '合格', value: 0 },
                  { key: 'zxtztt2', label: '不合格', value: 1 },
                ]}
                width="sm"
              />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 25 && ( // 投掷（标枪）
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="纵跳摸高" name="jumpHigh" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="下桥" name="underBridge" width="sm" />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 26 && ( // 投掷（铅球、铁饼）
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="肩宽" name="shoulderWidth" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="胸围" name="chestSurround" width="sm" />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 13 && ( // 蓝球
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="踝围" name="ankleSurround" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="跟腱" name="tendon" width="sm" />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 15 && ( // 排球
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="手长" name="handLength" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="跟腱" name="tendon" width="sm" />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {(checkType2 === 16 || checkType2 === 17 || checkType2 === 20 || checkType2 === 23) && ( // 乒乓球;曲棍球;跳水;水球
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        )}
        {(checkType2 === 27 || checkType2 === 32) && ( // 网球;羽毛球
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="跟腱" name="tendon" width="sm" />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 28 && ( // 游泳
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="肩宽" name="shoulderWidth" width="sm" />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 11 && ( // 举重
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="胸围" name="chestSurround" width="sm" />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        )}
        {(checkType2 === 9 || checkType2 === 18) && ( // 拳击;击剑
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="踝围" name="ankleSurround" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="跟腱" name="tendon" width="sm" />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 29 && ( // 中国式摔跤
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="肩宽" name="shoulderWidth" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 21 && ( // 跆拳道
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="踝围" name="ankleSurround" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="跟腱" name="tendon" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="下肢长" name="legLength" width="sm" />
            </Col>
            <Col span={6}></Col>
          </Row>
        )}
        {checkType2 === 22 && ( // 体操、艺术体操、健美操
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="髋宽" name="hipWidth" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="肩宽" name="shoulderWidth" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="胸围" name="chestSurround" width="sm" />
            </Col>
          </Row>
        )}
        {checkType2 === 19 && ( // 射击、射箭
          <Row gutter={16}>
            <Col span={6}>
              <ProFormDigit label="指距" name="fingerDistance" width="sm" />
            </Col>
            <Col span={6}>
              <ProFormDigit label="肩宽" name="shoulderWidth" width="sm" />
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Row>
        )}
        {/* {( // 其他
            <>
              <Row gutter={16}>
                <Col span={6}>
                  <ProFormDigit label="踝围" name="ankleSurround" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="跟腱" name="tendon" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="髋宽" name="hipWidth" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="胸围" name="chestSurround" width="sm" />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <ProFormSelect
                    label="腿型"
                    name="legType"
                    request={async () => [
                      { label: '正常', value: 0 },
                      { label: 'X型', value: 1 },
                      { label: 'O型', value: 2 },
                    ]}
                    width="sm"
                  />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="指距" name="fingerDistance" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="肩宽" name="shoulderWidth" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="纵跳摸高" name="jumpHigh" width="sm" />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <ProFormDigit label="下桥" name="underBridge" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="手长" name="handLength" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="下肢长" name="legLength" width="sm" />
                </Col>
                <Col span={6}>
                  <ProFormDigit label="髂宽" name="iliacWidth" width="sm" />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <ProFormSelect
                    key="zxtzttFbFoot"
                    label="扁平足"
                    name="zxtzttFbFoot"
                    request={async () => [
                      { key: 'zxtztt1', label: '合格', value: 0 },
                      { key: 'zxtztt2', label: '不合格', value: 1 },
                    ]}
                    width="sm"
                  />
                </Col>
              </Row>
            </>
          )} */}
      </ProForm>
    </Card>
  );
};

export default Page;

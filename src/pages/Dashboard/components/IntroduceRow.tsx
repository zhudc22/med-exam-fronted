import { Col, Row } from 'antd';
import { ChartCard } from './Charts';
const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 9,
  lg: 9,
  xl: 6,
  xxl: 6,
  style: { marginBottom: 24 },
};

// const IntroduceRow: React.FC = () => {
const IntroduceRow = ({ loading, visitData, visitTotal }: { loading: boolean; visitData: API.CountOrder[]; visitTotal: number }) => {

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={'累计人次'}
          action={false}
          loading={loading}
          total={() => `${visitTotal}`}
          contentHeight={46}
        >
        </ChartCard>
      </Col>
      {visitData && visitData.map(visit => {
        return (
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={visit.name}
              action={false}
              loading={loading}
              total={() => `${visit.cnt}`}
              contentHeight={46}
            >
            </ChartCard>
          </Col>
        )
      })
      }
    </Row>
  );
};

export default IntroduceRow;

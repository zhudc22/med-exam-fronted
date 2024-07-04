import React from 'react';
import { DonutChart } from 'bizcharts';
import DataSet from '@antv/data-set';

const Pie: React.FC<any> = (props) => {
  const { data, meta, title, description, typeField, valueField } = props;
  return (
    <DonutChart
      data={data || []}
      meta={meta}
      title={{
        visible: true,
        text: title,
      }}
      description={{
        visible: false,
        text: description,
      }}
      autoFit
      height={350}
      radius={0.8}
      padding="auto"
      angleField={valueField}
      colorField={typeField}
      pieStyle={{ stroke: 'white', lineWidth: 5 }}
      statistic={{
        title: {
          formatter: (datum, data) => {
            if (data != undefined && data.length > 0 && data[0].name) {
              return data[0].name;
            }
            return undefined;
          },
        },
        content: false,
      }}
    />
  );
};

export default Pie;

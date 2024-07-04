import numeral from 'numeral';
import Bar from './Bar';
import Pie from './Pie';
import Pie2 from './Pie2';
import Bubble from './Bubble';
import ChartCard from './ChartCard';
import Field from './Field';
import TimelineChart from './TimelineChart';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Bar,
  Pie,
  Pie2,
  Bubble,
  ChartCard,
  Field,
  TimelineChart,
};

export { Charts as default, yuan, Bar, Pie, Pie2, Bubble, ChartCard, Field, TimelineChart };

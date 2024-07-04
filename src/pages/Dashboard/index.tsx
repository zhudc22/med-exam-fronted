import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Menu, Row, Button } from 'antd';

import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { rootCheckItems, checkItems } from '@/services/checkItems';

import { GridContent } from '@ant-design/pro-layout';

import IntroduceRow from './components/IntroduceRow';
import TableCount from './components/TableCount';
import QsnTable from './components/QsnTable';
import CjTable from './components/CjTable';
import ZxTable from './components/ZxTable';
import QsnAbTable from './components/QsnAbTable';
import CjAbTable from './components/CjAbTable';
import ZxAbTable from './components/ZxAbTable';
import GdjAbTable from './components/GdjAbTable';
import YzjjAbTable from './components/YzjjAbTable';
import YjtbAbTable from './components/YjtbAbTable';
import GupenAbTable from './components/GupenAbTable';
import SpinalAbTable from './components/SpinalAbTable';
import GmdAbTable from './components/GmdAbTable';
import FyAbTable from './components/FyAbTable';
import XfgnAbTable from './components/XfgnAbTable';
import JnztTable from './components/JnztTable';

import {
  countOrder, statsBoradTotal, statsQsn, statsCj, statsZx, statsGdj, statsSpinal, statsGmdAb, statsFyAb, statsXfgnAb, statsJnzt
} from '@/services/stats';

export type Props = {
  ['key']: any;
};

const Page: React.FC<Props> = (props) => {
  //人次统计
  const [visitData, setVisitData] = useState<API.CountOrder[]>([]);
  const [visitTotal, setVisitTotal] = useState<number>();

  const [rootId, setRootId] = useState<number>(-1);
  const [checkType1, setCheckType1] = useState<number>(-1);
  const [checkType2, setCheckType2] = useState<number>(-1);
  const [male, setMale] = useState<number>(-1);
  const [age, setAge] = useState<number>(-1);
  //专项
  const [total, setTotal] = useState<API.StatsBoardTotal[]>([]);
  const [totalName, setTotalName] = useState<string>();
  const [totalCols, setTotalCols] = useState([])
  const [qsn, setQsn] = useState([]);
  const [qsnName, setQsnName] = useState<string>();
  const [cj, setCj] = useState([]);
  const [cjName, setCjName] = useState<string>();
  const [zx, setZx] = useState([]);
  const [zxName, setZxName] = useState<string>();
  const [qsnAb, setQsnAb] = useState([]);
  const [qsnAbName, setQsnAbName] = useState<string>();
  const [cjAb, setCjAb] = useState([]);
  const [cjAbName, setCjAbName] = useState<string>();
  const [zxAb, setZxAb] = useState([]);
  const [zxAbName, setZxAbName] = useState<string>();
  const [gdjAb, setGdjAb] = useState([]);
  const [gdjAbName, setGdjAbName] = useState<string>();
  const [gdjTotalNum, setGdjTotalNum] = useState<number>();
  const [gdjZNum, setGdjZNum] = useState<number>();
  const [gdjYNum, setGdjYNum] = useState<number>();
  const [yzjjAb, setYzjjAb] = useState([]);
  const [yzjjAbName, setYzjjName] = useState<string>();
  const [yjtbAb, setYjtbAb] = useState([]);
  const [yjtbAbName, setYjtbName] = useState<string>();
  const [gupenAb, setGupenAb] = useState([]);
  const [gupenAbName, setGupenName] = useState<string>();
  const [spinalAb, setSpinalAb] = useState([]);
  const [spinalAbName, setSpinalAbName] = useState<string>();

  const [fyAb, setFyAb] = useState([]);
  const [fyAbName, setFyAbName] = useState<string>();

  const [gmdAb, setGmdAb] = useState([]);
  const [gmdAbName, setGmdAbName] = useState<string>();

  const [xfgnAb, setXfgnAb] = useState([]);
  const [xfgnAbName, setXfgnAbName] = useState<string>();

  const [jnzt, setJnzt] = useState([]);
  const [jnztName, setJnztName] = useState<string>();

  // const [checkTypewOptions, setCheckTypeOptions] = useState();
  // const checkType1Change = async (value) => {
  //   if (value === 5) {
  //     setRootId(-1);
  //   } else if (value === 2 || value === 3) {
  //     setRootId(value);
  //     const its = await checkItems(value);
  //     let res = [];
  //     its.forEach((item) => {
  //       res.push({ label: item.name, value: item.id });
  //     });
  //     setCheckTypeOptions(res);
  //   } else {
  //     setRootId(-1);
  //   }
  //   if (value === undefined) {
  //     setCheckType1(-1);
  //     setCheckType2(-1);
  //   } else {
  //     setCheckType1(value);
  //     setCheckType2(-1);
  //   }
  // };

  useEffect(() => {
    stats();
  }, []);

  const stats = () => {
    let query = {};
    // query["male"] = male;
    // query["checkType1"] = checkType1;
    // query["checkType2"] = checkType2;
    // query["age"] = age;
    // countOrder(query).then((resp) => {
    //   setVisitData(resp);
    //   let num = 0;
    //   if (resp != undefined) {
    //     resp.forEach((visit) => {
    //       num += visit.cnt;
    //     });
    //     setVisitTotal(num);
    //   }
    // });
    let totalData = [
      {
        "name": "6岁-9岁",
        "totalNum": 3217,
        "fmaleNum": 1470,
        "maleNum": 1747,
        "orgNum": 27,
        "proNum": 21
      },
      {
        "name": "10岁-13岁",
        "totalNum": 1162,
        "fmaleNum": 466,
        "maleNum": 696,
        "orgNum": 37,
        "proNum": 23
      },
      {
        "name": "14岁-17岁",
        "totalNum": 324,
        "fmaleNum": 113,
        "maleNum": 211,
        "orgNum": 27,
        "proNum": 22
      },
      {
        "name": "总计",
        "totalNum": 4703,
        "fmaleNum": 2049,
        "maleNum": 2654,
        "orgNum": 37,
        "proNum": 23
      }
    ];
    // var date = new Date();
    // setTotalName('总检测人数截止至' + date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日');
    setTotalName('总检测人数截止至2021年12月29日');
    setTotal(totalData);
    // statsBoradTotal(query).then((resp) => {
    //   setTotal(resp);
    //   var date = new Date();
    //   setTotalName('总检测人数截止至' + date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日');
    // });
    let qsnData = [{
      "age": 6,
      "totalNum": 443,
      "countNum": 228,
      "hgNum": 175,
      "bhgNum": 53,
      "male": 0,
      "gmdNum": 9,
      "zuojiangaoLevel1": 31,
      "zuojiangaoLevel2": 4,
      "youjiangaoLevel1": 14,
      "youjiangaoLevel2": 1,
      "spinalLevel1": 34,
      "spinalLevel2": 8,
      "yizhuangjianjia": 2,
      "gupenZy": 1,
      "bianpingzu": 2,
      "jingzhuiQq": 1,
      "ageCol": "6岁",
      "maleCol": "男"
    },
    {
      "age": 6,
      "totalNum": 443,
      "countNum": 215,
      "hgNum": 175,
      "bhgNum": 40,
      "male": 1,
      "gmdNum": 14,
      "zuojiangaoLevel1": 27,
      "zuojiangaoLevel2": 2,
      "youjiangaoLevel1": 10,
      "youjiangaoLevel2": 1,
      "spinalLevel1": 26,
      "spinalLevel2": 12,
      "spinalLevel3": 0,
      "yizhuangjianjia": 0,
      "gupenZy": 0,
      "gupenQh": 0,
      "yuanjianTuobei": 0,
      "fy": 0,
      "bianpingzu": 0,
      "jingzhuiQq": 0,
      "ageCol": "6岁",
      "maleCol": "女"
    },
    {
      "age": 7,
      "totalNum": 782,
      "countNum": 432,
      "hgNum": 383,
      "bhgNum": 49,
      "male": 0,
      "gmdNum": 22,
      "zuojiangaoLevel1": 14,
      "zuojiangaoLevel2": 6,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 7,
      "youjiangaoLevel2": 14,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 26,
      "spinalLevel2": 5,
      "spinalLevel3": 0,
      "yizhuangjianjia": 5,
      "gupenZy": 1,
      "gupenQh": 0,
      "yuanjianTuobei": 2,
      "fy": 0,
      "bianpingzu": 5,
      "jingzhuiQq": 0,
      "ageCol": "7岁",
      "maleCol": "男"
    },
    {
      "age": 7,
      "totalNum": 782,
      "countNum": 350,
      "hgNum": 302,
      "bhgNum": 48,
      "male": 1,
      "gmdNum": 7,
      "zuojiangaoLevel1": 22,
      "zuojiangaoLevel2": 0,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 11,
      "youjiangaoLevel2": 8,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 28,
      "spinalLevel2": 7,
      "spinalLevel3": 0,
      "yizhuangjianjia": 6,
      "gupenZy": 0,
      "gupenQh": 1,
      "yuanjianTuobei": 0,
      "fy": 0,
      "bianpingzu": 1,
      "jingzhuiQq": 0,
      "ageCol": "7岁",
      "maleCol": "女"
    },
    {
      "age": 8,
      "totalNum": 779,
      "countNum": 418,
      "hgNum": 365,
      "bhgNum": 53,
      "male": 0,
      "gmdNum": 10,
      "zuojiangaoLevel1": 15,
      "zuojiangaoLevel2": 13,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 7,
      "youjiangaoLevel2": 9,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 23,
      "spinalLevel2": 11,
      "spinalLevel3": 0,
      "yizhuangjianjia": 8,
      "gupenZy": 1,
      "gupenQh": 0,
      "yuanjianTuobei": 0,
      "fy": 0,
      "bianpingzu": 4,
      "jingzhuiQq": 0,
      "ageCol": "8岁",
      "maleCol": "男"
    },
    {
      "age": 8,
      "totalNum": 779,
      "countNum": 361,
      "hgNum": 309,
      "bhgNum": 52,
      "male": 1,
      "gmdNum": 11,
      "zuojiangaoLevel1": 24,
      "zuojiangaoLevel2": 9,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 13,
      "youjiangaoLevel2": 2,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 39,
      "spinalLevel2": 4,
      "spinalLevel3": 0,
      "yizhuangjianjia": 2,
      "gupenZy": 0,
      "gupenQh": 1,
      "yuanjianTuobei": 1,
      "fy": 0,
      "bianpingzu": 1,
      "jingzhuiQq": 0,
      "ageCol": "8岁",
      "maleCol": "女"
    },
    {
      "age": 9,
      "totalNum": 1213,
      "countNum": 669,
      "hgNum": 522,
      "bhgNum": 147,
      "male": 0,
      "gmdNum": 37,
      "zuojiangaoLevel1": 67,
      "zuojiangaoLevel2": 9,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 38,
      "youjiangaoLevel2": 11,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 48,
      "spinalLevel2": 11,
      "spinalLevel3": 0,
      "yizhuangjianjia": 19,
      "gupenZy": 1,
      "gupenQh": 2,
      "yuanjianTuobei": 0,
      "fy": 14,
      "bianpingzu": 5,
      "jingzhuiQq": 0,
      "ageCol": "9岁",
      "maleCol": "男"
    },
    {
      "age": 9,
      "totalNum": 1213,
      "countNum": 544,
      "hgNum": 417,
      "bhgNum": 127,
      "male": 1,
      "gmdNum": 30,
      "zuojiangaoLevel1": 81,
      "zuojiangaoLevel2": 7,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 29,
      "youjiangaoLevel2": 4,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 47,
      "spinalLevel2": 11,
      "spinalLevel3": 0,
      "yizhuangjianjia": 5,
      "gupenZy": 0,
      "gupenQh": 0,
      "yuanjianTuobei": 1,
      "fy": 30,
      "bianpingzu": 1,
      "jingzhuiQq": 0,
      "ageCol": "9岁",
      "maleCol": "女"
    },
    {
      "age": -1,
      "totalNum": 3217,
      "bhgTotalNum": 569,
      "countNum": 1747,
      "hgNum": 1445,
      "bhgNum": 302,
      "male": 0,
      "gmdNum": 78,
      "zuojiangaoLevel1": 127,
      "zuojiangaoLevel2": 32,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 66,
      "youjiangaoLevel2": 35,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 131,
      "spinalLevel2": 35,
      "spinalLevel3": 0,
      "yizhuangjianjia": 34,
      "gupenZy": 4,
      "gupenQh": 2,
      "yuanjianTuobei": 2,
      "fy": 14,
      "bianpingzu": 16,
      "jingzhuiQq": 1,
      "ageCol": "6-9岁总计",
      "maleCol": "男"
    },
    {
      "age": -1,
      "totalNum": 3217,
      "bhgTotalNum": 569,
      "countNum": 1470,
      "hgNum": 1203,
      "bhgNum": 267,
      "male": 1,
      "gmdNum": 62,
      "zuojiangaoLevel1": 154,
      "zuojiangaoLevel2": 18,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 63,
      "youjiangaoLevel2": 15,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 140,
      "spinalLevel2": 34,
      "spinalLevel3": 0,
      "yizhuangjianjia": 13,
      "gupenZy": 0,
      "gupenQh": 2,
      "yuanjianTuobei": 2,
      "fy": 30,
      "bianpingzu": 3,
      "jingzhuiQq": 0,
      "ageCol": "6-9岁总计",
      "maleCol": "女"
    }
    ];

    setQsn(qsnData);
    setQsnName('基础选材部分6岁-9岁（10周岁以内）身体形态机能健康发育检测评价统计');
    let qsnAbData=[ {
      "age": -1,
      "totalNum": 3217,
      "bhgTotalNum": 569,
      "countNum": 1747,
      "hgNum": 1445,
      "bhgNum": 302,
      "male": 0,
      "gmdNum": 78,
      "zuojiangaoLevel1": 127,
      "zuojiangaoLevel2": 32,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 66,
      "youjiangaoLevel2": 35,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 131,
      "spinalLevel2": 35,
      "spinalLevel3": 0,
      "yizhuangjianjia": 34,
      "gupenZy": 4,
      "gupenQh": 2,
      "yuanjianTuobei": 2,
      "fy": 15,
      "bianpingzu": 16,
      "jingzhuiQq": 1,
      "ageCol": "6-9岁总计",
      "maleCol": "男"
    },
    {
      "age": -1,
      "totalNum": 3217,
      "bhgTotalNum": 569,
      "countNum": 1470,
      "hgNum": 1203,
      "bhgNum": 267,
      "male": 1,
      "gmdNum": 62,
      "zuojiangaoLevel1": 154,
      "zuojiangaoLevel2": 18,
      "zuojiangaoLevel3": 0,
      "youjiangaoLevel1": 63,
      "youjiangaoLevel2": 15,
      "youjiangaoLevel3": 0,
      "spinalLevel1": 140,
      "spinalLevel2": 34,
      "spinalLevel3": 0,
      "yizhuangjianjia": 13,
      "gupenZy": 0,
      "gupenQh": 2,
      "yuanjianTuobei": 2,
      "fy": 32,
      "bianpingzu": 3,
      "jingzhuiQq": 0,
      "ageCol": "6-9岁总计",
      "maleCol": "女"
    }
    ];

    setQsnAb(qsnAbData);
    setQsnAbName('基础选材（男、女）——6岁-9岁年龄组身体形态机能健康发育检测异常情况统计');
    // statsQsn(query).then((resp) => {
    //   setQsn(resp);
    //   setQsnName('基础选材部分6岁-10岁(10周岁以内)身体形态,机能健康发育基础检测评估');

    //   setQsnAb(resp.slice(-2));
    //   setQsnAbName('基础选材(男、女)————6岁-10岁年龄组身体形态,机能健康发育异常情况统计');
    // });

    let cjData = [{"age":10,"totalNum":402,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":219,"hgNum":219,"bhgNum":0,"lhNum":0,"yxNum":0,"male":0,"xfgnNum":0,"fmsNum":0,"respNum":0,"spinalNum":0,"gmdNum":0,"balanceNum":0,"ageCol":"10岁","maleCol":"男"},{"age":10,"totalNum":402,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":183,"hgNum":181,"bhgNum":2,"lhNum":0,"yxNum":0,"male":1,"xfgnNum":0,"fmsNum":0,"respNum":2,"spinalNum":0,"gmdNum":0,"balanceNum":0,"ageCol":"10岁","maleCol":"女"},{"age":11,"totalNum":196,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":124,"hgNum":97,"bhgNum":21,"lhNum":5,"yxNum":1,"male":0,"xfgnNum":8,"fmsNum":3,"respNum":8,"spinalNum":0,"gmdNum":4,"balanceNum":0,"ageCol":"11岁","maleCol":"男"},{"age":11,"totalNum":196,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":72,"hgNum":56,"bhgNum":9,"lhNum":6,"yxNum":1,"male":1,"xfgnNum":2,"fmsNum":0,"respNum":5,"spinalNum":1,"gmdNum":1,"balanceNum":0,"ageCol":"11岁","maleCol":"女"},{"age":12,"totalNum":184,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":122,"hgNum":82,"bhgNum":23,"lhNum":14,"yxNum":3,"male":0,"xfgnNum":9,"fmsNum":4,"respNum":5,"spinalNum":2,"gmdNum":5,"balanceNum":0,"ageCol":"12岁","maleCol":"男"},{"age":12,"totalNum":184,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":62,"hgNum":42,"bhgNum":15,"lhNum":4,"yxNum":1,"male":1,"xfgnNum":7,"fmsNum":0,"respNum":5,"spinalNum":0,"gmdNum":2,"balanceNum":1,"ageCol":"12岁","maleCol":"女"},{"age":13,"totalNum":168,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":106,"hgNum":49,"bhgNum":33,"lhNum":23,"yxNum":1,"male":0,"xfgnNum":14,"fmsNum":2,"respNum":7,"spinalNum":1,"gmdNum":7,"balanceNum":2,"ageCol":"13岁","maleCol":"男"},{"age":13,"totalNum":168,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":62,"hgNum":40,"bhgNum":20,"lhNum":2,"yxNum":0,"male":1,"xfgnNum":8,"fmsNum":2,"respNum":9,"spinalNum":0,"gmdNum":1,"balanceNum":1,"ageCol":"13岁","maleCol":"女"},{"age":-1,"totalNum":950,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":571,"hgNum":447,"bhgNum":77,"lhNum":42,"yxNum":5,"male":0,"xfgnNum":31,"fmsNum":9,"respNum":20,"spinalNum":3,"gmdNum":16,"balanceNum":2,"ageCol":"10-13岁总计","maleCol":"男"},{"age":-1,"totalNum":950,"bhgTotalNum":0,"bhgAgeNum":0,"countNum":379,"hgNum":319,"bhgNum":46,"lhNum":12,"yxNum":2,"male":1,"xfgnNum":17,"fmsNum":2,"respNum":21,"spinalNum":1,"gmdNum":4,"balanceNum":2,"ageCol":"10-13岁总计","maleCol":"女"}];
    setCj(cjData);
    setCjName('初级选材10岁-13岁（13周岁以内）身体机能健康成长检测评价统计');

    let cjAbData = [{"age":10,"totalNum":0,"bhgTotalNum":49,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":26,"lhNum":0,"yxNum":0,"male":0,"xfgnNum":0,"fmsNum":0,"respNum":0,"spinalNum":0,"gmdNum":4,"balanceNum":0,"ageCol":"10岁","zuojiangaoLevel1":4,"zuojiangaoLevel2":10,"zuojiangaoLevel3":0,"youjiangaoLevel1":4,"youjiangaoLevel2":6,"youjiangaoLevel3":0,"spinalLevel1":18,"spinalLevel2":3,"spinalLevel3":0,"yizhuangjianjia":1,"gupenQx":1,"yuanjianTuobei":0,"fy":4,"bianpingzu":2,"maleCol":"男"},{"age":10,"totalNum":0,"bhgTotalNum":49,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":23,"lhNum":0,"yxNum":0,"male":1,"xfgnNum":0,"fmsNum":0,"respNum":2,"spinalNum":0,"gmdNum":3,"balanceNum":0,"ageCol":"10岁","zuojiangaoLevel1":4,"zuojiangaoLevel2":8,"zuojiangaoLevel3":0,"youjiangaoLevel1":4,"youjiangaoLevel2":4,"youjiangaoLevel3":0,"spinalLevel1":14,"spinalLevel2":3,"spinalLevel3":0,"yizhuangjianjia":1,"gupenQx":0,"yuanjianTuobei":0,"fy":13,"bianpingzu":3,"maleCol":"女"},{"age":11,"totalNum":0,"bhgTotalNum":83,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":53,"lhNum":0,"yxNum":0,"male":0,"xfgnNum":8,"fmsNum":3,"respNum":8,"spinalNum":0,"gmdNum":9,"balanceNum":0,"ageCol":"11岁","zuojiangaoLevel1":6,"zuojiangaoLevel2":9,"zuojiangaoLevel3":0,"youjiangaoLevel1":7,"youjiangaoLevel2":5,"youjiangaoLevel3":0,"spinalLevel1":15,"spinalLevel2":7,"spinalLevel3":0,"yizhuangjianjia":3,"gupenQx":1,"yuanjianTuobei":1,"fy":4,"bianpingzu":3,"maleCol":"男"},{"age":11,"totalNum":0,"bhgTotalNum":83,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":30,"lhNum":0,"yxNum":0,"male":1,"xfgnNum":2,"fmsNum":0,"respNum":5,"spinalNum":1,"gmdNum":3,"balanceNum":0,"ageCol":"11岁","zuojiangaoLevel1":8,"zuojiangaoLevel2":3,"zuojiangaoLevel3":0,"youjiangaoLevel1":4,"youjiangaoLevel2":2,"youjiangaoLevel3":0,"spinalLevel1":13,"spinalLevel2":5,"spinalLevel3":0,"yizhuangjianjia":1,"gupenQx":2,"yuanjianTuobei":1,"fy":3,"bianpingzu":1,"maleCol":"女"},{"age":12,"totalNum":0,"bhgTotalNum":83,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":50,"lhNum":0,"yxNum":0,"male":0,"xfgnNum":9,"fmsNum":4,"respNum":5,"spinalNum":2,"gmdNum":9,"balanceNum":0,"ageCol":"12岁","zuojiangaoLevel1":6,"zuojiangaoLevel2":5,"zuojiangaoLevel3":0,"youjiangaoLevel1":5,"youjiangaoLevel2":9,"youjiangaoLevel3":0,"spinalLevel1":9,"spinalLevel2":7,"spinalLevel3":0,"yizhuangjianjia":0,"gupenQx":2,"yuanjianTuobei":0,"fy":8,"bianpingzu":4,"maleCol":"男"},{"age":12,"totalNum":0,"bhgTotalNum":83,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":43,"lhNum":0,"yxNum":0,"male":1,"xfgnNum":7,"fmsNum":0,"respNum":5,"spinalNum":0,"gmdNum":3,"balanceNum":1,"ageCol":"12岁","zuojiangaoLevel1":17,"zuojiangaoLevel2":4,"zuojiangaoLevel3":0,"youjiangaoLevel1":2,"youjiangaoLevel2":2,"youjiangaoLevel3":0,"spinalLevel1":14,"spinalLevel2":7,"spinalLevel3":0,"yizhuangjianjia":1,"gupenQx":1,"yuanjianTuobei":1,"fy":2,"bianpingzu":3,"maleCol":"女"},{"age":-1,"totalNum":0,"bhgTotalNum":110,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":73,"lhNum":0,"yxNum":0,"male":0,"xfgnNum":14,"fmsNum":2,"respNum":7,"spinalNum":1,"gmdNum":15,"balanceNum":2,"ageCol":"10-13岁总计","zuojiangaoLevel1":10,"zuojiangaoLevel2":8,"zuojiangaoLevel3":0,"youjiangaoLevel1":10,"youjiangaoLevel2":3,"youjiangaoLevel3":0,"spinalLevel1":21,"spinalLevel2":7,"spinalLevel3":0,"yizhuangjianjia":5,"gupenQx":3,"yuanjianTuobei":1,"fy":6,"bianpingzu":4,"maleCol":"男"},{"age":-1,"totalNum":0,"bhgTotalNum":110,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":37,"lhNum":0,"yxNum":0,"male":1,"xfgnNum":8,"fmsNum":2,"respNum":9,"spinalNum":0,"gmdNum":5,"balanceNum":1,"ageCol":"10-13岁总计","zuojiangaoLevel1":6,"zuojiangaoLevel2":7,"zuojiangaoLevel3":0,"youjiangaoLevel1":0,"youjiangaoLevel2":1,"youjiangaoLevel3":0,"spinalLevel1":7,"spinalLevel2":1,"spinalLevel3":0,"yizhuangjianjia":1,"gupenQx":1,"yuanjianTuobei":1,"fy":1,"bianpingzu":1,"maleCol":"女"},{"age":-1,"totalNum":0,"bhgTotalNum":335,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":202,"lhNum":0,"yxNum":0,"male":0,"xfgnNum":31,"fmsNum":9,"respNum":20,"spinalNum":3,"gmdNum":37,"balanceNum":2,"ageCol":"10-13岁总计","zuojiangaoLevel1":26,"zuojiangaoLevel2":32,"zuojiangaoLevel3":0,"youjiangaoLevel1":26,"youjiangaoLevel2":23,"youjiangaoLevel3":0,"spinalLevel1":63,"spinalLevel2":24,"spinalLevel3":0,"yizhuangjianjia":9,"gupenQx":7,"yuanjianTuobei":2,"fy":22,"bianpingzu":13,"maleCol":"男"},{"age":-1,"totalNum":0,"bhgTotalNum":335,"bhgAgeNum":0,"countNum":0,"hgNum":0,"bhgNum":133,"lhNum":0,"yxNum":0,"male":1,"xfgnNum":17,"fmsNum":2,"respNum":21,"spinalNum":1,"gmdNum":14,"balanceNum":2,"ageCol":"10-13岁总计","zuojiangaoLevel1":35,"zuojiangaoLevel2":22,"zuojiangaoLevel3":0,"youjiangaoLevel1":10,"youjiangaoLevel2":9,"youjiangaoLevel3":0,"spinalLevel1":48,"spinalLevel2":16,"spinalLevel3":0,"yizhuangjianjia":4,"gupenQx":4,"yuanjianTuobei":3,"fy":19,"bianpingzu":8,"maleCol":"女"}];
    setCjAb(cjAbData);
    setCjAbName('初级选材（男、女）——10-13岁年龄组身体机能健康成长检测异常情况统计');

    // statsCj(query).then((resp) => {
    //   setCj(resp);
    //   setCjName('初级选材11岁-13岁(13周岁以内)身体形态,机能成长发育初级选材检测评估');
    //   setCjAb(resp);
    //   setCjAbName('11岁-13岁年龄组身体形态,机能成长异常情况统计');
    // });
    let zxData = [{"age":14,"totalNum":102,"bhgTotalNum":0,"countNum":68,"hgNum":20,"bhgNum":8,"lhNum":32,"yxNum":8,"male":0,"xfgnNum":3,"fmsNum":0,"respNum":3,"stcfNum":0,"gmdNum":7,"balanceNum":0,"specialNum":2,"ageCol":"14岁","maleCol":"男"},{"age":14,"totalNum":102,"bhgTotalNum":0,"countNum":34,"hgNum":13,"bhgNum":9,"lhNum":5,"yxNum":7,"male":1,"xfgnNum":4,"fmsNum":0,"respNum":0,"stcfNum":1,"gmdNum":3,"balanceNum":0,"specialNum":5,"ageCol":"14岁","maleCol":"女"},{"age":15,"totalNum":74,"bhgTotalNum":0,"countNum":43,"hgNum":14,"bhgNum":4,"lhNum":13,"yxNum":12,"male":0,"xfgnNum":2,"fmsNum":0,"respNum":0,"stcfNum":0,"gmdNum":3,"balanceNum":0,"specialNum":2,"ageCol":"15岁","maleCol":"男"},{"age":15,"totalNum":74,"bhgTotalNum":0,"countNum":31,"hgNum":13,"bhgNum":3,"lhNum":10,"yxNum":5,"male":1,"xfgnNum":1,"fmsNum":0,"respNum":0,"stcfNum":0,"gmdNum":0,"balanceNum":1,"specialNum":1,"ageCol":"15岁","maleCol":"女"},{"age":16,"totalNum":86,"bhgTotalNum":0,"countNum":64,"hgNum":18,"bhgNum":14,"lhNum":26,"yxNum":6,"male":0,"xfgnNum":5,"fmsNum":0,"respNum":2,"stcfNum":0,"gmdNum":4,"balanceNum":1,"specialNum":3,"ageCol":"16岁","maleCol":"男"},{"age":16,"totalNum":86,"bhgTotalNum":0,"countNum":22,"hgNum":7,"bhgNum":2,"lhNum":10,"yxNum":3,"male":1,"xfgnNum":1,"fmsNum":0,"respNum":0,"stcfNum":0,"gmdNum":1,"balanceNum":0,"specialNum":0,"ageCol":"16岁","maleCol":"女"},{"age":17,"totalNum":62,"bhgTotalNum":0,"countNum":36,"hgNum":16,"bhgNum":5,"lhNum":10,"yxNum":5,"male":0,"xfgnNum":1,"fmsNum":0,"respNum":1,"stcfNum":1,"gmdNum":1,"balanceNum":0,"specialNum":2,"ageCol":"17岁","maleCol":"男"},{"age":17,"totalNum":62,"bhgTotalNum":0,"countNum":26,"hgNum":6,"bhgNum":9,"lhNum":10,"yxNum":1,"male":1,"xfgnNum":3,"fmsNum":0,"respNum":1,"stcfNum":1,"gmdNum":1,"balanceNum":0,"specialNum":3,"ageCol":"17岁","maleCol":"女"},{"age":-1,"totalNum":324,"bhgTotalNum":0,"countNum":211,"hgNum":68,"bhgNum":31,"lhNum":81,"yxNum":31,"male":0,"xfgnNum":11,"fmsNum":0,"respNum":6,"stcfNum":1,"gmdNum":15,"balanceNum":1,"specialNum":9,"ageCol":"14-17岁","maleCol":"男"},{"age":-1,"totalNum":324,"bhgTotalNum":0,"countNum":113,"hgNum":39,"bhgNum":23,"lhNum":35,"yxNum":16,"male":1,"xfgnNum":9,"fmsNum":0,"respNum":1,"stcfNum":2,"gmdNum":5,"balanceNum":1,"specialNum":9,"ageCol":"14-17岁","maleCol":"女"}];

    setZx(zxData);
    setZxName('专项选材14岁-17岁（14周岁以上-18岁周岁以下）各运动项目青少年形态、机能检测评价统计');
    let zxAbData = [{"age":-1,"totalNum":24,"bhgTotalNum":0,"countNum":0,"hgNum":0,"bhgNum":0,"lhNum":0,"yxNum":0,"male":0,"xfgnNum":11,"fmsNum":0,"respNum":6,"stcfNum":1,"gmdNum":15,"balanceNum":1,"specialNum":9,"ageCol":"14-17岁","maleCol":"男"},{"age":-1,"totalNum":24,"bhgTotalNum":0,"countNum":0,"hgNum":0,"bhgNum":0,"lhNum":0,"yxNum":0,"male":1,"xfgnNum":9,"fmsNum":0,"respNum":1,"stcfNum":2,"gmdNum":5,"balanceNum":1,"specialNum":9,"ageCol":"14-17岁","maleCol":"女"}];
    setZxAb(zxAbData);
    setZxAbName('专项选材（男、女）——14岁-17岁年龄组各运动项目青少年形态、机能检测不合格情况统计');
    // statsZx(query).then((resp) => {
    //   setZx(resp);
    //   setZxName('专项选材14岁-17岁(14周岁以上-18周岁以下)专项选材检测评估');
    //   let abData = [];
    //   let zxAbNum = 0;
    //   for (let i = resp.length - 2; i <= resp.length - 1; i++) {
    //     zxAbNum += resp[i].bhgNum;
    //     abData.push(resp[i]);
    //   }
    //   for (let i = 0; i < abData.length; i++) {
    //     abData[i].totalNum = zxAbNum;
    //   }
    //   setZxAb(abData);
    //   setZxAbName('专项选材(男、女)————14岁-17岁年龄组专项选材不合格情况统计');
    // });

    let gdjData = [{"age":6,"totalNum":443,"bhgTotalNum":90,"countNum":228,"bhgNum":50,"male":0,"ageCol":"6岁","zuojiangaoLevel1":31,"zuojiangaoLevel2":4,"zuojiangaoLevel3":0,"youjiangaoLevel1":14,"youjiangaoLevel2":1,"youjiangaoLevel3":0,"maleCol":"男"},{"age":6,"totalNum":90,"bhgTotalNum":90,"countNum":215,"bhgNum":40,"male":1,"ageCol":"6岁","zuojiangaoLevel1":27,"zuojiangaoLevel2":2,"zuojiangaoLevel3":0,"youjiangaoLevel1":10,"youjiangaoLevel2":1,"youjiangaoLevel3":0,"maleCol":"女"},{"age":7,"totalNum":782,"bhgTotalNum":82,"countNum":432,"bhgNum":41,"male":0,"ageCol":"7岁","zuojiangaoLevel1":14,"zuojiangaoLevel2":6,"zuojiangaoLevel3":0,"youjiangaoLevel1":7,"youjiangaoLevel2":14,"youjiangaoLevel3":0,"maleCol":"男"},{"age":7,"totalNum":82,"bhgTotalNum":82,"countNum":350,"bhgNum":41,"male":1,"ageCol":"7岁","zuojiangaoLevel1":22,"zuojiangaoLevel2":0,"zuojiangaoLevel3":0,"youjiangaoLevel1":11,"youjiangaoLevel2":8,"youjiangaoLevel3":0,"maleCol":"女"},{"age":8,"totalNum":779,"bhgTotalNum":92,"countNum":418,"bhgNum":44,"male":0,"ageCol":"8岁","zuojiangaoLevel1":15,"zuojiangaoLevel2":13,"zuojiangaoLevel3":0,"youjiangaoLevel1":7,"youjiangaoLevel2":9,"youjiangaoLevel3":0,"maleCol":"男"},{"age":8,"totalNum":92,"bhgTotalNum":92,"countNum":361,"bhgNum":48,"male":1,"ageCol":"8岁","zuojiangaoLevel1":24,"zuojiangaoLevel2":9,"zuojiangaoLevel3":0,"youjiangaoLevel1":13,"youjiangaoLevel2":2,"youjiangaoLevel3":0,"maleCol":"女"},{"age":9,"totalNum":1213,"bhgTotalNum":246,"countNum":669,"bhgNum":125,"male":0,"ageCol":"9岁","zuojiangaoLevel1":67,"zuojiangaoLevel2":9,"zuojiangaoLevel3":0,"youjiangaoLevel1":38,"youjiangaoLevel2":11,"youjiangaoLevel3":0,"maleCol":"男"},{"age":9,"totalNum":246,"bhgTotalNum":246,"countNum":544,"bhgNum":121,"male":1,"ageCol":"9岁","zuojiangaoLevel1":81,"zuojiangaoLevel2":7,"zuojiangaoLevel3":0,"youjiangaoLevel1":29,"youjiangaoLevel2":4,"youjiangaoLevel3":0,"maleCol":"女"},{"age":10,"totalNum":449,"bhgTotalNum":44,"countNum":245,"bhgNum":24,"male":0,"ageCol":"10岁","zuojiangaoLevel1":4,"zuojiangaoLevel2":10,"zuojiangaoLevel3":0,"youjiangaoLevel1":4,"youjiangaoLevel2":6,"youjiangaoLevel3":0,"maleCol":"男"},{"age":10,"totalNum":44,"bhgTotalNum":44,"countNum":204,"bhgNum":20,"male":1,"ageCol":"10岁","zuojiangaoLevel1":4,"zuojiangaoLevel2":8,"zuojiangaoLevel3":0,"youjiangaoLevel1":4,"youjiangaoLevel2":4,"youjiangaoLevel3":0,"maleCol":"女"},{"age":11,"totalNum":249,"bhgTotalNum":44,"countNum":156,"bhgNum":27,"male":0,"ageCol":"11岁","zuojiangaoLevel1":6,"zuojiangaoLevel2":9,"zuojiangaoLevel3":0,"youjiangaoLevel1":7,"youjiangaoLevel2":5,"youjiangaoLevel3":0,"maleCol":"男"},{"age":11,"totalNum":44,"bhgTotalNum":44,"countNum":93,"bhgNum":17,"male":1,"ageCol":"11岁","zuojiangaoLevel1":8,"zuojiangaoLevel2":3,"zuojiangaoLevel3":0,"youjiangaoLevel1":3,"youjiangaoLevel2":3,"youjiangaoLevel3":0,"maleCol":"女"},{"age":12,"totalNum":239,"bhgTotalNum":50,"countNum":149,"bhgNum":25,"male":0,"ageCol":"12岁","zuojiangaoLevel1":6,"zuojiangaoLevel2":5,"zuojiangaoLevel3":0,"youjiangaoLevel1":5,"youjiangaoLevel2":9,"youjiangaoLevel3":0,"maleCol":"男"},{"age":12,"totalNum":50,"bhgTotalNum":50,"countNum":90,"bhgNum":25,"male":1,"ageCol":"12岁","zuojiangaoLevel1":17,"zuojiangaoLevel2":4,"zuojiangaoLevel3":0,"youjiangaoLevel1":2,"youjiangaoLevel2":2,"youjiangaoLevel3":0,"maleCol":"女"},{"age":13,"totalNum":225,"bhgTotalNum":45,"countNum":146,"bhgNum":31,"male":0,"ageCol":"13岁","zuojiangaoLevel1":10,"zuojiangaoLevel2":8,"zuojiangaoLevel3":0,"youjiangaoLevel1":10,"youjiangaoLevel2":3,"youjiangaoLevel3":0,"maleCol":"男"},{"age":13,"totalNum":45,"bhgTotalNum":45,"countNum":79,"bhgNum":14,"male":1,"ageCol":"13岁","zuojiangaoLevel1":6,"zuojiangaoLevel2":7,"zuojiangaoLevel3":0,"youjiangaoLevel1":0,"youjiangaoLevel2":1,"youjiangaoLevel3":0,"maleCol":"女"},{"age":-1,"totalNum":4379,"bhgTotalNum":693,"countNum":2443,"bhgNum":367,"male":0,"ageCol":"6-13岁总计","zuojiangaoLevel1":153,"zuojiangaoLevel2":64,"zuojiangaoLevel3":0,"youjiangaoLevel1":92,"youjiangaoLevel2":58,"youjiangaoLevel3":0,"maleCol":"男"},{"age":-1,"totalNum":693,"bhgTotalNum":693,"countNum":1936,"bhgNum":326,"male":1,"ageCol":"6-13岁总计","zuojiangaoLevel1":189,"zuojiangaoLevel2":40,"zuojiangaoLevel3":0,"youjiangaoLevel1":72,"youjiangaoLevel2":25,"youjiangaoLevel3":0,"maleCol":"女"},{"age":-1,"totalNum":4379,"bhgTotalNum":0,"countNum":0,"bhgNum":0,"male":0,"ageCol":"总计","zuojiangaoLevel1":446,"zuojiangaoLevel2":0,"zuojiangaoLevel3":0,"youjiangaoLevel1":247,"youjiangaoLevel2":0,"youjiangaoLevel3":0,"maleCol":"男"},{"age":-1,"totalNum":4379,"bhgTotalNum":0,"countNum":0,"bhgNum":0,"male":0,"ageCol":"总计","zuojiangaoLevel1":693,"zuojiangaoLevel2":0,"zuojiangaoLevel3":0,"youjiangaoLevel1":0,"youjiangaoLevel2":0,"youjiangaoLevel3":0,"maleCol":"男"}];
    setGdjAb(gdjData);
    setGdjAbName('高低肩发育异常统计');

    let spinalData = [{"age":6,"totalNum":443,"bhgTotalNum":80,"countNum":228,"bhgNum":42,"male":0,"gmdNum":0,"spinalLevel1":34,"spinalLevel2":8,"spinalLevel3":0,"ageCol":"6岁","maleCol":"男"},{"age":6,"totalNum":80,"bhgTotalNum":80,"countNum":215,"bhgNum":38,"male":1,"gmdNum":0,"spinalLevel1":26,"spinalLevel2":12,"spinalLevel3":0,"ageCol":"6岁","maleCol":"女"},{"age":7,"totalNum":782,"bhgTotalNum":66,"countNum":432,"bhgNum":31,"male":0,"gmdNum":0,"spinalLevel1":26,"spinalLevel2":5,"spinalLevel3":0,"ageCol":"7岁","maleCol":"男"},{"age":7,"totalNum":66,"bhgTotalNum":66,"countNum":350,"bhgNum":35,"male":1,"gmdNum":0,"spinalLevel1":28,"spinalLevel2":7,"spinalLevel3":0,"ageCol":"7岁","maleCol":"女"},{"age":8,"totalNum":779,"bhgTotalNum":77,"countNum":418,"bhgNum":34,"male":0,"gmdNum":0,"spinalLevel1":23,"spinalLevel2":11,"spinalLevel3":0,"ageCol":"8岁","maleCol":"男"},{"age":8,"totalNum":77,"bhgTotalNum":77,"countNum":361,"bhgNum":43,"male":1,"gmdNum":0,"spinalLevel1":39,"spinalLevel2":4,"spinalLevel3":0,"ageCol":"8岁","maleCol":"女"},{"age":9,"totalNum":1213,"bhgTotalNum":117,"countNum":669,"bhgNum":59,"male":0,"gmdNum":0,"spinalLevel1":48,"spinalLevel2":11,"spinalLevel3":0,"ageCol":"9岁","maleCol":"男"},{"age":9,"totalNum":117,"bhgTotalNum":117,"countNum":544,"bhgNum":58,"male":1,"gmdNum":0,"spinalLevel1":47,"spinalLevel2":11,"spinalLevel3":0,"ageCol":"9岁","maleCol":"女"},{"age":10,"totalNum":449,"bhgTotalNum":38,"countNum":245,"bhgNum":21,"male":0,"gmdNum":0,"spinalLevel1":18,"spinalLevel2":3,"spinalLevel3":0,"ageCol":"10岁","maleCol":"男"},{"age":10,"totalNum":38,"bhgTotalNum":38,"countNum":204,"bhgNum":17,"male":1,"gmdNum":0,"spinalLevel1":14,"spinalLevel2":3,"spinalLevel3":0,"ageCol":"10岁","maleCol":"女"},{"age":11,"totalNum":249,"bhgTotalNum":40,"countNum":156,"bhgNum":22,"male":0,"gmdNum":0,"spinalLevel1":15,"spinalLevel2":7,"spinalLevel3":0,"ageCol":"11岁","maleCol":"男"},{"age":11,"totalNum":40,"bhgTotalNum":40,"countNum":93,"bhgNum":18,"male":1,"gmdNum":0,"spinalLevel1":13,"spinalLevel2":5,"spinalLevel3":0,"ageCol":"11岁","maleCol":"女"},{"age":12,"totalNum":239,"bhgTotalNum":37,"countNum":149,"bhgNum":16,"male":0,"gmdNum":0,"spinalLevel1":9,"spinalLevel2":7,"spinalLevel3":0,"ageCol":"12岁","maleCol":"男"},{"age":12,"totalNum":37,"bhgTotalNum":37,"countNum":90,"bhgNum":21,"male":1,"gmdNum":0,"spinalLevel1":14,"spinalLevel2":7,"spinalLevel3":0,"ageCol":"12岁","maleCol":"女"},{"age":13,"totalNum":225,"bhgTotalNum":36,"countNum":146,"bhgNum":28,"male":0,"gmdNum":0,"spinalLevel1":21,"spinalLevel2":7,"spinalLevel3":0,"ageCol":"13岁","maleCol":"男"},{"age":13,"totalNum":36,"bhgTotalNum":36,"countNum":79,"bhgNum":8,"male":1,"gmdNum":0,"spinalLevel1":7,"spinalLevel2":1,"spinalLevel3":0,"ageCol":"13岁","maleCol":"女"},{"age":14,"totalNum":102,"bhgTotalNum":12,"countNum":68,"bhgNum":10,"male":0,"gmdNum":0,"spinalLevel1":8,"spinalLevel2":2,"spinalLevel3":0,"ageCol":"14岁","maleCol":"男"},{"age":14,"totalNum":12,"bhgTotalNum":12,"countNum":34,"bhgNum":2,"male":1,"gmdNum":0,"spinalLevel1":2,"spinalLevel2":0,"spinalLevel3":0,"ageCol":"14岁","maleCol":"女"},{"age":-1,"totalNum":4481,"bhgTotalNum":503,"countNum":2511,"bhgNum":263,"male":0,"gmdNum":0,"spinalLevel1":202,"spinalLevel2":61,"spinalLevel3":0,"ageCol":"6-14岁","maleCol":"男"},{"age":-1,"totalNum":503,"bhgTotalNum":503,"countNum":1970,"bhgNum":240,"male":1,"gmdNum":0,"spinalLevel1":190,"spinalLevel2":50,"spinalLevel3":0,"ageCol":"6-14岁","maleCol":"女"},{"age":-1,"totalNum":4481,"bhgTotalNum":0,"countNum":0,"bhgNum":503,"male":0,"gmdNum":0,"spinalLevel1":392,"spinalLevel2":111,"spinalLevel3":0,"ageCol":"总计","maleCol":"男"}];
    setSpinalAb(spinalData);
    setSpinalAbName('脊柱弯曲异常情况统计');
    // statsSpinal(query).then((resp) => {
    //   setSpinalAb(resp);
    //   setSpinalAbName('脊柱弯曲异常情况统计');
    // });

    let yzjjData = [{"age":6,"totalNum":443,"bhgTotalNum":2,"male":0,"yizhuangjianjia":2,"ageCol":"6岁","maleCol":"男"},{"age":6,"totalNum":443,"bhgTotalNum":2,"male":1,"yizhuangjianjia":0,"ageCol":"6岁","maleCol":"女"},{"age":7,"totalNum":782,"bhgTotalNum":11,"male":0,"yizhuangjianjia":5,"ageCol":"7岁","maleCol":"男"},{"age":7,"totalNum":782,"bhgTotalNum":11,"male":1,"yizhuangjianjia":6,"ageCol":"7岁","maleCol":"女"},{"age":8,"totalNum":779,"bhgTotalNum":10,"male":0,"yizhuangjianjia":8,"ageCol":"8岁","maleCol":"男"},{"age":8,"totalNum":779,"bhgTotalNum":10,"male":1,"yizhuangjianjia":2,"ageCol":"8岁","maleCol":"女"},{"age":9,"totalNum":1213,"bhgTotalNum":24,"male":0,"yizhuangjianjia":19,"ageCol":"9岁","maleCol":"男"},{"age":9,"totalNum":1213,"bhgTotalNum":24,"male":1,"yizhuangjianjia":5,"ageCol":"9岁","maleCol":"女"},{"age":10,"totalNum":449,"bhgTotalNum":2,"male":0,"yizhuangjianjia":1,"ageCol":"10岁","maleCol":"男"},{"age":10,"totalNum":449,"bhgTotalNum":2,"male":1,"yizhuangjianjia":1,"ageCol":"10岁","maleCol":"女"},{"age":11,"totalNum":249,"bhgTotalNum":4,"male":0,"yizhuangjianjia":3,"ageCol":"11岁","maleCol":"男"},{"age":11,"totalNum":249,"bhgTotalNum":4,"male":1,"yizhuangjianjia":1,"ageCol":"11岁","maleCol":"女"},{"age":12,"totalNum":239,"bhgTotalNum":1,"male":0,"yizhuangjianjia":0,"ageCol":"12岁","maleCol":"男"},{"age":12,"totalNum":239,"bhgTotalNum":1,"male":1,"yizhuangjianjia":1,"ageCol":"12岁","maleCol":"女"},{"age":13,"totalNum":225,"bhgTotalNum":6,"male":0,"yizhuangjianjia":5,"ageCol":"13岁","maleCol":"男"},{"age":13,"totalNum":225,"bhgTotalNum":6,"male":1,"yizhuangjianjia":1,"ageCol":"13岁","maleCol":"女"},{"age":-1,"totalNum":4379,"bhgTotalNum":60,"male":0,"yizhuangjianjia":43,"ageCol":"6-13岁","maleCol":"男"},{"age":-1,"totalNum":4379,"bhgTotalNum":60,"male":1,"yizhuangjianjia":17,"ageCol":"6-13岁","maleCol":"女"},{"age":-1,"totalNum":4379,"bhgTotalNum":0,"male":0,"yizhuangjianjia":60,"ageCol":"总计","maleCol":"男"}];
    setYzjjAb(yzjjData);
    setYzjjName('翼状肩胛异常情况统计');

    let gupenData = [

      {
        "age": -1,
        "totalNum": 4379,
        "bhgTotalNum": 20,
        "bhgNum": 14,
        "male": 0,
        "gupenQh": 6,
        "gupenZy": 8,
        "ageCol": "6-13岁",
        "maleCol": "男"
      },
      {
        "age": -1,
        "totalNum": 4379,
        "bhgTotalNum": 20,
        "bhgNum": 6,
        "male": 1,
        "gupenQh": 4,
        "gupenZy": 2,
        "ageCol": "6-13岁",
        "maleCol": "女"
      }
    ];
    setGupenAb(gupenData.slice(-2));
    setGupenName('骨盆异常情况统计');
    let yjtbData = [

      {
        "age": -1,
        "totalNum": 4379,
        "bhgTotalNum": 9,
        "male": 0,
        "yuanjianTuobei": 4,
        "gupenZy": 8,
        "ageCol": "6-13岁",
        "maleCol": "男"
      },
      {
        "age": -1,
        "totalNum": 4379,
        "bhgTotalNum": 9,
        "male": 1,
        "yuanjianTuobei": 5,
        "ageCol": "6-13岁",
        "maleCol": "女"
      }
    ];
    setYjtbAb(yjtbData.slice(-2));
    setYjtbName('圆肩驼背异常情况统计');

    let gmdData = [{"age":7,"totalNum":782,"bhgTotalNum":29,"fmaleNum":7,"maleNum":22,"ageCol":"7岁"},{"age":8,"totalNum":779,"bhgTotalNum":21,"fmaleNum":11,"maleNum":10,"ageCol":"8岁"},{"age":9,"totalNum":1213,"bhgTotalNum":67,"fmaleNum":30,"maleNum":37,"ageCol":"9岁"},{"age":10,"totalNum":449,"bhgTotalNum":7,"fmaleNum":3,"maleNum":4,"ageCol":"10岁"},{"age":11,"totalNum":249,"bhgTotalNum":12,"fmaleNum":3,"maleNum":9,"ageCol":"11岁"},{"age":12,"totalNum":239,"bhgTotalNum":12,"fmaleNum":3,"maleNum":9,"ageCol":"12岁"},{"age":13,"totalNum":225,"bhgTotalNum":20,"fmaleNum":5,"maleNum":15,"ageCol":"13岁"},{"age":14,"totalNum":102,"bhgTotalNum":10,"fmaleNum":3,"maleNum":7,"ageCol":"14岁"},{"age":15,"totalNum":74,"bhgTotalNum":3,"fmaleNum":0,"maleNum":3,"ageCol":"15岁"},{"age":16,"totalNum":86,"bhgTotalNum":5,"fmaleNum":1,"maleNum":4,"ageCol":"16岁"},{"age":17,"totalNum":62,"bhgTotalNum":2,"fmaleNum":1,"maleNum":1,"ageCol":"17岁"},{"age":-1,"totalNum":4703,"bhgTotalNum":211,"fmaleNum":81,"maleNum":130,"ageCol":"6-17岁总计"}];
    setGmdAb(gmdData);
    setGmdAbName('骨密度异常情况统计');
    // statsGmdAb(query).then((resp) => {
    //   setGmdAb(resp);
    //   setGmdAbName('骨密度异常情况统计');
    // });

    let fyData =[{"age":9,"totalNum":1213,"bhgTotalNum":44,"male":0,"fy":14,"ageCol":"9岁","maleCol":"男"},{"age":9,"totalNum":1213,"bhgTotalNum":44,"male":1,"fy":30,"ageCol":"9岁","maleCol":"女"},{"age":10,"totalNum":449,"bhgTotalNum":17,"male":0,"fy":4,"ageCol":"10岁","maleCol":"男"},{"age":10,"totalNum":449,"bhgTotalNum":17,"male":1,"fy":13,"ageCol":"10岁","maleCol":"女"},{"age":11,"totalNum":249,"bhgTotalNum":7,"male":0,"fy":4,"ageCol":"11岁","maleCol":"男"},{"age":11,"totalNum":249,"bhgTotalNum":7,"male":1,"fy":3,"ageCol":"11岁","maleCol":"女"},{"age":12,"totalNum":239,"bhgTotalNum":10,"male":0,"fy":8,"ageCol":"12岁","maleCol":"男"},{"age":12,"totalNum":239,"bhgTotalNum":10,"male":1,"fy":2,"ageCol":"12岁","maleCol":"女"},{"age":13,"totalNum":225,"bhgTotalNum":7,"male":0,"fy":6,"ageCol":"13岁","maleCol":"男"},{"age":13,"totalNum":225,"bhgTotalNum":7,"male":1,"fy":1,"ageCol":"13岁","maleCol":"女"},{"age":14,"totalNum":102,"bhgTotalNum":10,"male":0,"fy":5,"ageCol":"14岁","maleCol":"男"},{"age":14,"totalNum":102,"bhgTotalNum":10,"male":1,"fy":5,"ageCol":"14岁","maleCol":"女"},{"age":15,"totalNum":74,"bhgTotalNum":1,"male":0,"fy":1,"ageCol":"15岁","maleCol":"男"},{"age":15,"totalNum":74,"bhgTotalNum":1,"male":1,"fy":0,"ageCol":"15岁","maleCol":"女"},{"age":16,"totalNum":86,"bhgTotalNum":2,"male":0,"fy":1,"ageCol":"16岁","maleCol":"男"},{"age":16,"totalNum":86,"bhgTotalNum":2,"male":1,"fy":1,"ageCol":"16岁","maleCol":"女"},{"age":-1,"totalNum":2637,"bhgTotalNum":98,"male":0,"fy":43,"ageCol":"9-16岁总计","maleCol":"男"},{"age":-1,"totalNum":2637,"bhgTotalNum":98,"male":1,"fy":55,"ageCol":"9-16岁总计","maleCol":"女"}];
    setFyAb(fyData);
    setFyAbName('身高、体重发育迟缓情况统计');
    // statsFyAb(query).then((resp) => {
    //   setFyAb(resp);
    //   setFyAbName('发育迟缓异常情况统计');
    // });
    let xfgnData = [{"age":12,"totalNum":239,"bhgTotalNum":23,"male":0,"xfgnNum":13,"ageCol":"12岁","maleCol":"男"},{"age":12,"totalNum":239,"bhgTotalNum":23,"male":1,"xfgnNum":10,"ageCol":"12岁","maleCol":"女"},{"age":13,"totalNum":225,"bhgTotalNum":34,"male":0,"xfgnNum":11,"ageCol":"13岁","maleCol":"男"},{"age":13,"totalNum":225,"bhgTotalNum":34,"male":1,"xfgnNum":23,"ageCol":"13岁","maleCol":"女"},{"age":14,"totalNum":102,"bhgTotalNum":21,"male":0,"xfgnNum":6,"ageCol":"14岁","maleCol":"男"},{"age":14,"totalNum":102,"bhgTotalNum":21,"male":1,"xfgnNum":15,"ageCol":"14岁","maleCol":"女"},{"age":15,"totalNum":74,"bhgTotalNum":11,"male":0,"xfgnNum":6,"ageCol":"15岁","maleCol":"男"},{"age":15,"totalNum":74,"bhgTotalNum":11,"male":1,"xfgnNum":5,"ageCol":"15岁","maleCol":"女"},{"age":16,"totalNum":86,"bhgTotalNum":5,"male":0,"xfgnNum":5,"ageCol":"16岁","maleCol":"男"},{"age":16,"totalNum":86,"bhgTotalNum":5,"male":1,"xfgnNum":0,"ageCol":"16岁","maleCol":"女"},{"age":17,"totalNum":62,"bhgTotalNum":3,"male":0,"xfgnNum":2,"ageCol":"17岁","maleCol":"男"},{"age":17,"totalNum":62,"bhgTotalNum":3,"male":1,"xfgnNum":1,"ageCol":"17岁","maleCol":"女"},{"age":-1,"totalNum":788,"bhgTotalNum":97,"male":0,"xfgnNum":43,"ageCol":"12-17岁总计","maleCol":"男"},{"age":-1,"totalNum":788,"bhgTotalNum":97,"male":1,"xfgnNum":54,"ageCol":"12-17岁总计","maleCol":"女"}];
    setXfgnAb(xfgnData);
    setXfgnAbName('12周岁以上心肺功能不合格情况统计');
    // statsXfgnAb(query).then((resp) => {
    //   setXfgnAb(resp);
    //   setXfgnAbName('12周岁以上心肺功能不合格情况统计');
    // });

    // statsGdj(query).then((resp) => {

    //   let gdjTotalNum = 0;
    //   let gdjZTotalNum = 0;
    //   let gdjYTotalNum = 0;
    //   //高低肩
    //   let gdjDatas = [];
    //   //骨盆
    //   let gupenMap = {};
    //   let gupenDatas = [];
    //   //圆肩驼背
    //   let yjtbMap = {};
    //   let yjtbDatas = [];

    //   for (let j = 0; j < resp.length; j++) {
    //     let gdjData = resp[j];
    //     let num = resp[j].youjiangaoLevel1 + resp[j].youjiangaoLevel2 + resp[j].youjiangaoLevel3 + resp[j].zuojiangaoLevel1 + resp[j].zuojiangaoLevel2 + resp[j].zuojiangaoLevel3;
    //     gdjTotalNum += num;
    //     gdjData.bhgNum = num;
    //     gdjDatas.push(gdjData);
    //     gdjZTotalNum += resp[j].zuojiangaoLevel1 + resp[j].zuojiangaoLevel2 + resp[j].zuojiangaoLevel3;
    //     gdjYTotalNum += resp[j].youjiangaoLevel1 + resp[j].youjiangaoLevel2 + resp[j].youjiangaoLevel3;

    //     let age = resp[j].age;

    //     let gupenData = resp[j];
    //     let gupenNum = resp[j].gupenQh + resp[j].gupenZy;
    //     gupenData.bhgNum = gupenNum;
    //     gupenDatas.push(gupenData);
    //     if (gupenMap[age] == undefined) {
    //       gupenMap[age] = gupenNum;
    //     } else {
    //       gupenMap[age] = gupenMap[age] + gupenNum;
    //     }

    //     let yjtbData = resp[j];
    //     yjtbDatas.push(yjtbData);
    //     let yjtbNum = resp[j].yuanjianTuobei;
    //     if (yjtbMap[age] == undefined) {
    //       yjtbMap[age] = yjtbNum;
    //     } else {
    //       yjtbMap[age] = yjtbMap[age] + yjtbNum;
    //     }

    //   }
    //   setGdjTotalNum(gdjTotalNum);
    //   setGdjZNum(gdjZTotalNum);
    //   setGdjYNum(gdjYTotalNum);
    //   let zj = { 'ageCol': '总计', 'zuojiangaoLevel1': gdjZTotalNum, 'youjiangaoLevel1': gdjYTotalNum };
    //   let zj1 = { 'ageCol': '总计', 'zuojiangaoLevel1': gdjTotalNum };
    //   gdjDatas.push(zj);
    //   gdjDatas.push(zj1);
    //   setGdjAb(gdjDatas);
    //   setGdjAbName('高低肩发育异常统计');

    //   setYzjjAb(resp);
    //   setYzjjName('翼状肩胛异常情况统计');

    //   for (let k = 0; k < yjtbDatas.length; k++) {
    //     let data = yjtbDatas[k];
    //     let age = data.age;
    //     data.totalNum = yjtbMap[age];
    //   }
    //   setYjtbAb(yjtbDatas.slice(-2));
    //   setYjtbName('圆肩驼背异常情况统计');

    //   for (let k = 0; k < gupenDatas.length; k++) {
    //     let data = gupenDatas[k];
    //     let age = data.age;
    //     data.totalNum = gupenMap[age];
    //   }
    //   setGupenAb(gupenDatas.slice(-2));
    //   setGupenName('骨盆异常情况统计');
    // });

    // statsGmdAb(query).then((resp) => {
    //   setGmdAb(resp);
    //   setGmdAbName('骨密度异常情况统计');
    // });

    // statsFyAb(query).then((resp) => {
    //   setFyAb(resp);
    //   setFyAbName('发育迟缓异常情况统计');
    // });

    // statsXfgnAb(query).then((resp) => {
    //   setXfgnAb(resp);
    //   setXfgnAbName('12周岁以上心肺功能不合格情况统计');
    // });

    // statsJnzt(query).then((resp) => {
    //   setJnzt(resp.slice(-2));
    //   setJnztName('14周岁以上机能状态不合格情况统计');
    // });

  };
  return (

    <GridContent>

      {/* <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={3} lg={24} md={24} sm={24} xs={24}>
          {(
            <ProFormSelect
              name="male"
              label="性别"
              fieldProps={{
                onChange: (value) => {
                  if (value === undefined) {
                    setMale(-1);
                  } else {
                    setMale(value);
                  }
                }
              }}
              request={async () => {
                let males = [];
                males.push({ label: "男", value: 0 });
                males.push({ label: "女", value: 1 });
                return males;
              }}
            />
          )}
        </Col>
        <Col xl={4} lg={24} md={24} sm={24} xs={24}>
          {(
            <ProFormText
              placeholder={'请输入数字'}
              name="age"
              label="年龄"
              fieldProps={{
                maxLength: 2,
                onChange: (value) => {
                  if (value === undefined) {
                    setAge(-1);
                  } else if (value.target.value === undefined || value.target.value === '') {
                    setAge(-1);
                  } else {
                    setAge(parseInt(value.target.value));
                  }
                }
              }}
            />
          )}
        </Col>
        <Col xl={9} lg={24} md={24} sm={24} xs={24}>
          <ProFormSelect
            request={async () => {
              const data = await rootCheckItems();
              const res = [];
              data.map((item) => {
                if (item.code === 'QingShaoNian') {
                  res.push({ label: item.name + ' (6-9岁)', value: item.id });
                } else if (item.code === 'ChuJiYunDong') {
                  res.push({ label: item.name + ' (10-13岁)', value: item.id });
                } else if (item.code === 'ZhuanXiangYunDong') {
                  res.push({ label: item.name + ' (14-17岁)', value: item.id });
                } else {
                  res.push({ label: item.name, value: item.id });
                }
              });
              return res;
            }}
            name="checkType1"
            label="检测项目（一级）"
            fieldProps={{
              onChange: (value) => {
                checkType1Change(value);
              },
            }}
          />
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          {rootId > 0 && (
            <ProFormSelect
              name="checkType2"
              label="检测项目（二级）"
              fieldProps={{
                onChange: (value) => {
                  if (value === undefined) {
                    setCheckType2(-1);
                  } else {
                    setCheckType2(value);
                  }
                }
              }}
              options={checkTypewOptions}
            />
          )}
        </Col>
        <Col xl={2} lg={24} md={24} sm={24} xs={24}>
          {(
            <Button type="primary" danger onClick={stats}>
              查询
            </Button>
          )}
        </Col>
      </Row>

      <IntroduceRow loading={false} visitData={visitData} visitTotal={visitTotal} /> */}

      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <TableCount loading={false} tableName={totalName} data={total} />
        </Col>
      </Row>

      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <QsnTable loading={false} tableName={qsnName} data={qsn} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <CjTable loading={false} tableName={cjName} data={cj} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <ZxTable loading={false} tableName={zxName} data={zx} />
        </Col>
      </Row>

      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <QsnAbTable loading={false} tableName={qsnAbName} data={qsnAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <CjAbTable loading={false} tableName={cjAbName} data={cjAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <ZxAbTable loading={false} tableName={zxAbName} data={zxAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <GdjAbTable loading={false} tableName={gdjAbName} data={gdjAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <SpinalAbTable loading={false} tableName={spinalAbName} data={spinalAb} />
        </Col></Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <YzjjAbTable loading={false} tableName={yzjjAbName} data={yzjjAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <GupenAbTable loading={false} tableName={gupenAbName} data={gupenAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <YjtbAbTable loading={false} tableName={yjtbAbName} data={yjtbAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <GmdAbTable loading={false} tableName={gmdAbName} data={gmdAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <FyAbTable loading={false} tableName={fyAbName} data={fyAb} />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <XfgnAbTable loading={false} tableName={xfgnAbName} data={xfgnAb} />
        </Col>
      </Row>
      {/* <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <JnztTable loading={false} tableName={jnztName} data={jnzt} />
        </Col>
      </Row> */}

    </GridContent>
  );
};

export default Page;

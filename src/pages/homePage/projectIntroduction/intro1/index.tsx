import Head from '@/pages/homePage/components/Head';
import logo from '@/pages/homePage/images/logo.png';
import background from '@/pages/homePage/images/shebeibackground.jpg';
import '@/pages/homePage/MyRouteStyles.less';

const IntroPage1 = () => {
  const pageStyle = {
    background: `url(${background}) no-repeat center top fixed`,
    backgroundSize: 'cover',
    OBackgroundSize: 'cover',
    WebkitBackgroundSize: 'cover',
    width: '100%',
    height: '100%',
  };
  return (
    <div style={pageStyle}>
      <Head imgs={{ logo }} />
      <div className="xiangmujieshaobox">
        <div className="xiangmujieshao_l">
          深入贯彻落实习近平总书记关于促进青少年健康发展，建设体育强国的指示精神，全面推进健康中国发展战略，树立青少年健康第一的理念，切实在服务于青少年健康成长方面多下功夫，下实功夫，力求实效。针对近年来6岁-13岁青少年身体形态机能发育异常的情况，适时推出青少年身体形态机能健康发育筛查检测评估项目，充分地，创造性地发掘出先进检测仪器的性能，本着早预防、早发现、早评估、早矫正康复的宗旨，牢牢把住青少年身体形态机能健康发育的关口，把检测，评估，矫正康复训练的关口前移，为青少年健康发育和以良好体魄参加体育运动训练，把住青少年6岁-13岁形态机能发育的关键节点和要素保驾护航。
        </div>
        <div className="xiangmujieshao_r">
          <img src="images/zhengshu-01.jpg" alt="Certificate" />
        </div>
        <div className="cls" />
      </div>
    </div>
  );
};

export default IntroPage1;

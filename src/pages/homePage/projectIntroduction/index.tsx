import Body from '@/pages/homePage/components/Body';
import background from '@/pages/homePage/images/bg1.jpg';
import img1 from '../images/projectintro-01.png';
import img2 from '../images/projectintro-02.png';
import img3 from '../images/projectintro-03.png';
import img4 from '../images/projectintro-04.png';
import img5 from '../images/projectintro-05.png';
import img6 from '../images/projectintro-06.png';
import img7 from '../images/projectintro-07.png';
import img8 from '../images/projectintro-08.png';
import Head from '../components/Head';
import logo from '@/pages/homePage/images/logo.png';

const MainPage = () => {
  const pageStyle = {
    background: `url(${background}) no-repeat center top fixed`,
    backgroundSize: 'cover',
    OBackgroundSize: 'cover',
    WebkitBackgroundSize: 'cover',
    width: '100%',
    height: '100%',
  };
  const projectData = [
    {
      id: 1,
      link: '/home/introduction/intro1',
      color: '#009AC0',
      imgSrc: img1,
      description: '青少年身体形态机能健康发育基础选材检测评估',
    },
    {
      id: 2,
      link: 'xiangmujieshao-2.html',
      color: '#E95514',
      imgSrc: img2,
      description: '青少年身体机能健康成长初级选材检测评估',
    },
    {
      id: 3,
      link: 'xiangmujieshao-3.html',
      color: '#7C2A8B',
      imgSrc: img3,
      description: '青少年专项运动选材检测评估',
    },
    {
      id: 4,
      link: 'xiangmujieshao-4.html',
      color: '#0eab67',
      imgSrc: img4,
      description: '身高预测',
    },
    {
      id: 5,
      link: 'xiangmujieshao-5.html',
      color: '#6cb82e',
      imgSrc: img5,
      description: '初中生运动机能检测',
    },
    {
      id: 6,
      link: 'xiangmujieshao-6.html',
      color: '#EEE110',
      imgSrc: img6,
      description: '形体艺术训练机构身体形态检测评估',
    },
    {
      id: 7,
      link: 'xiangmujieshao-7.html',
      color: '#D3AE76',
      imgSrc: img7,
      description: '形态异常恢复矫正训练',
    },

    {
      id: 8,
      link: '/',
      color: '#0099DF',
      imgSrc: img8,
    },
  ];

  return (
    <div style={pageStyle}>
      <Head imgs={{ logo }} />
      <Body projectData={projectData} />
    </div>
  );
};

export default MainPage;

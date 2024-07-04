import '@/pages/homePage/MyRouteStyles.less';
const Body = ({ projectData }) => {
  return (
    <div className="mainbox">
      <h2 className="topic" style={{ marginLeft: '10px' }}>
        项目介绍<span>Project Introduction</span>
      </h2>
      <ul className="projectintro">
        {projectData.map((project) => (
          <li key={project.id}>
            <a href={project.link}>
              <div
                className="projectintrocolor"
                style={{ background: project.color, opacity: 0.5 }}
              />
              <div className="projectintroimg">
                <img src={project.imgSrc} alt="Project Introduction" />
              </div>
              <div className="projectintrotxt">{project.description}</div>
            </a>
          </li>
        ))}
      </ul>
      <div className="cls" />
    </div>
  );
};
export default Body;

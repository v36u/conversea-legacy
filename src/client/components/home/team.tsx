import { FC } from 'react';
import data from '../../data/data.json';

const Team: FC = () => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Echipa Noastră</h2>
          <p>
            Echipa noastră este formată dintr-un grup de studenți entuziaști și
            dornici de a aduce inovație în domeniul învățării limbilor străine.
          </p>
        </div>
        <div id="row">
          {data.Team.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
              <div className="thumbnail">
                <img src={d.img} alt="..." className="team-img" />
                <div className="caption">
                  <h4>{d.name}</h4>
                  <p>{d.job}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

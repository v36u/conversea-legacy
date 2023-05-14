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
        <div id="row" className="team-image-container">
          <div key={`${data.Team.name}`}>
            <div className="rounded">
              <img src={data.Team.img} alt="..." className="team-img" />
              <div>
                <h4 className="team-caption">{data.Team.name}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

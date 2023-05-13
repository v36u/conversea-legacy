import { FC } from 'react';
import data from '../data/data.json';

const About: FC = () => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {' '}
            <img
              src="/assets/converseaBanner.png"
              className="img-responsive"
              style={{ borderRadius: '70px' }}
              alt=""
            />{' '}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Despre Noi</h2>
              <p>{data.About.paragraph}</p>
              <h3>Motive sa alegeti serviciile noastre?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data.About.Why.map((d, i) => (
                      <li key={`${d}-${i}`}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data.About.Why2.map((d, i) => (
                      <li key={`${d}-${i}`}> {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

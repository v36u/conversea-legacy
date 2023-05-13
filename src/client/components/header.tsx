import ParticlesBg from 'particles-bg';
import { FC } from 'react';
import data from '../data/data.json';

type Props = {
  data: typeof data;
};

const Header: FC<Props> = ({ data }) => {
  return (
    <header id="header">
      <div className="intro">
        <ParticlesBg
          type="circle"
          bg={{ zIndex: 0, position: 'absolute', top: 0 }}
        />
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <img src="/assets/converseaLogo.png" alt="logo" width={350} />
                <p style={{ fontWeight: '600' }}>
                  {data ? data.Header.paragraph : 'Loading'}
                </p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Află mai multe
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

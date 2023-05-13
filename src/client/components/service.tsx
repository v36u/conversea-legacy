import data from '../data/data.json';

const Services = () => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Servicii</h2>
          <p>
            Conversea oferă o gamă largă de servicii pentru a susține învățarea
            limbilor străine. Iată câteva dintre aceste servicii:
          </p>
        </div>
        <div className="row">
          {data.Services.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4">
              {' '}
              <i className={d.icon}></i>
              <div className="service-desc">
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

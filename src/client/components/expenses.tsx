import { FC, useCallback, useState } from 'react';
import { Pie, PieChart, Sector } from 'recharts';

const data = [
  { name: 'Salarii', value: 1800000, color: '#F95F19' },
  { name: 'Software', value: 240000, color: '#00C49F' },
  { name: 'Bonități', value: 240000, color: '#DA1919' },
  { name: 'Utilități', value: 90000, color: '#0088FE' },
  { name: 'Marketing', value: 24000, color: '#673E95' },
  { name: 'Infrastructură', value: 18000, color: '#67BBA1' },
];

const renderActiveShape = (props: Record<string, any>) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={payload.color}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={payload.color}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} RON`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={payload.color}
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const Expenses: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );
  return (
    <div id="expenses" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Cheltuieli</h2>
        </div>
        <div className="row ">
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <PieChart width={700} height={400}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                innerRadius={100}
                outerRadius={145}
                fill="#6791D3"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;

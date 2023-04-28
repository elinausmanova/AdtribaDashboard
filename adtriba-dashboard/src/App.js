import { useEffect, useState } from 'react';
import './App.css';
import { getData, getPartitions } from './utils/requests';
import PieChart from './components/PieChart/PieChart';
import LineChart from './components/LineChart/LineChart';
import { totalPerParameter, getVariantList, averagePerSource, getVariantListByType } from './utils/calculations';
import TypeCard from './components/TypeCard/TypeCard';
import ValueCard from './components/ValueCard/ValueCard';
import BarChart from './components/BarChart/BarChart';

function App() {

  // colors for bar chart
  const colors = [
    '#D0B9BD',
    '#C2D8DE',
    '#C6B694',
    '#CCDEC2',
    '#FF8877',
    '#73A79C',
    '#E5B829',
    '#B389A1',
    '#D1D9EF',
    '#FFC2AF',
    '#9FE2D0',
    '#F9F2BC',
    '#A4BA8D',
    '#E7C6B9',
    '#F7E2CB',
  ];

  const [brand, setBrand] = useState();
  const [country, setCountry] = useState();
  const [sourceList, setSourceList] = useState([]);
  const [indexedSourceList, setIndexedSourceList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [sourceListByType, setSourceListByType] = useState({ incrementality: [], baseline: [] });
  const [dayList, setDayList] = useState([]);
  const [revenuePerSourceSwitch, setRevenuePerSourceSwitch] = useState('total');
  const [conversionPerSourceSwitch, setConversionPerSourceSwitch] = useState('total');
  const [spendPerSourceSwitch, setSpendPerSourceSwitch] = useState('total');
  // total per source
  const [totalRevenuePerSource, setTotalRevenuePerSource] = useState([]);
  const [totalConversionPerSource, setTotalConversionPerSource] = useState([]);
  const [totalSpendPerSource, setTotalSpendPerSource] = useState([]);
  // total per type
  const [totalRevenuePerType, setTotalRevenuePerType] = useState([]);
  const [totalConversionPerType, setTotalConversionPerType] = useState([]);
  const [totalSpendPerType, setTotalSpendPerType] = useState([]);
  // total per day
  const [totalRevenuePerDay, setTotalRevenuePerDay] = useState([]);
  const [totalConversionPerDay, setTotalConversionPerDay] = useState([]);
  const [totalSpendPerDay, setTotalSpendPerDay] = useState([]);
  // average per source
  const [averageRevenuePerSource, setAverageRevenuePerSource] = useState([]);
  const [averageConversionPerSource, setAverageConversionPerSource] = useState([]);
  const [averageSpendPerSource, setAverageSpendPerSource] = useState([]);
  // totals 
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalConversion, setTotalConversion] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  const onRevenuePerSourceSwitch = (value) => {
    setRevenuePerSourceSwitch(value);
  }

  const onConversionPerSourceSwitch = (value) => {
    setConversionPerSourceSwitch(value);
  }

  const onSpendPerSourceSwitch = (value) => {
    setSpendPerSourceSwitch(value);
  }

  useEffect(() => {
    async function fetchData() {
      // get partition id
      let partition = await getPartitions('https://demo-api.adtriba.app/v1/api/partitions');

      setBrand(partition[0].brand);
      setCountry(partition[0].country);

      // get data
      let data = await getData(`https://demo-api.adtriba.app/v1/api/partitions/${partition[0].id}/data`);

      let sources = getVariantList(data, 'source');
      setSourceList(sources);
      let indexedSources = Array.from({ length: sources.length }, (_, i) => i + 1)
      setIndexedSourceList(indexedSources);

      let types = getVariantList(data, 'type');
      setTypeList(types);

      let days = getVariantList(data, 'date');
      setDayList(days);

      // total per source
      let totalRevenuePerSource = totalPerParameter(sources, 'source', data, 'attributed_revenue');
      setTotalRevenuePerSource(totalRevenuePerSource);

      let totalConversionPerSource = totalPerParameter(sources, 'source', data, 'attributed_conversions');
      setTotalConversionPerSource(totalConversionPerSource);

      let totalSpendPerSource = totalPerParameter(sources, 'source', data, 'spends');
      setTotalSpendPerSource(totalSpendPerSource);

      // total per type
      let totalRevenuePerType = totalPerParameter(types, 'type', data, 'attributed_revenue');
      setTotalRevenuePerType(totalRevenuePerType);

      let totalConversionPerType = totalPerParameter(types, 'type', data, 'attributed_conversions');
      setTotalConversionPerType(totalConversionPerType);

      let totalSpendPerType = totalPerParameter(types, 'type', data, 'spends');
      setTotalSpendPerType(totalSpendPerType);

      // average per source
      let averageRevenuePerSource = averagePerSource(sources, days.length, data, 'attributed_revenue');
      setAverageRevenuePerSource(averageRevenuePerSource);

      let averageConversionPerSource = averagePerSource(sources, days.length, data, 'attributed_conversions');
      setAverageConversionPerSource(averageConversionPerSource);

      let averageSpendPerSource = averagePerSource(sources, days.length, data, 'spends');
      setAverageSpendPerSource(averageSpendPerSource);

      // total per day
      let totalRevenuePerDay = totalPerParameter(days, 'date', data, 'attributed_revenue');
      setTotalRevenuePerDay(totalRevenuePerDay);

      let totalConversionPerDay = totalPerParameter(days, 'date', data, 'attributed_conversions');
      setTotalConversionPerDay(totalConversionPerDay);

      let totalSpendPerDay = totalPerParameter(days, 'date', data, 'spends');
      setTotalSpendPerDay(totalSpendPerDay);

      // totals
      let totalRevenue = totalRevenuePerSource.reduce((partialSum, a) => partialSum + a, 0);
      setTotalRevenue(totalRevenue);
      let totalConversion = totalConversionPerSource.reduce((partialSum, a) => partialSum + a, 0);
      setTotalConversion(totalConversion);
      let totalSpend = totalSpendPerSource.reduce((partialSum, a) => partialSum + a, 0);
      setTotalSpend(totalSpend);

      let sourceListByType = getVariantListByType(data, 'source');
      let sourceIndexed = Object.values(sourceListByType).map(typedSources => typedSources.map(source => (sources.indexOf(source) + 1).toString() + '. ' + source));
      Object.keys(sourceListByType).map((key, index) => sourceListByType[key] = sourceIndexed[index]);
      setSourceListByType(sourceListByType);
    }

    fetchData();


  }, [])

  return (
    <div className="App">
      <div className='header'>
        <div className='logo'>
          <img src='https://www.adtriba.com/hubfs/adtriba/logos/adtriba.svg' alt='logo' />
        </div>
        <div className='companyInfo'>
          <div className='companyName'>
            {brand}
            <div className='brandTag'>Brand</div>
          </div>
          <div className='country'>
            {country}
            <div className='countryTag'>Country</div>
          </div>
        </div>
      </div>

      <div className='content'>

        <div className='content4columns'>
          {/* row 1, col 1 */}
          <div className='column4'>
            <TypeCard type='Paid channels' sources={sourceListByType.incrementality} colors={colors} />
            {/* } */}
            <TypeCard type='Organic channels' sources={sourceListByType.baseline} colors={colors} />
          </div>

          {/* row 1, col 2 */}
          <div className='column4'>
            <ValueCard title='Total Revenue' value={totalRevenue} />
            <div className='pieChartCard'>
              <PieChart labels={typeList} values={totalRevenuePerType} title='Total Revenue' />
            </div>
          </div>



          {/* row 1, col 3 */}
          <div className='column4'>
            <ValueCard title='Total Conversion' value={totalConversion} />
            <div className='pieChartCard'>
              <PieChart labels={typeList} values={totalConversionPerType} title='Total Amount of Conversions' />
            </div>
          </div>


          {/* row 1, col 4 */}
          <div className='column4'>
            <ValueCard title='Total Spends' value={totalSpend} />
            <div className='pieChartCard'>
              <PieChart labels={typeList} values={totalSpendPerType} title='Total Spends' />
            </div>
          </div>
        </div>

        <div className='content3columns'>

          {/* row 3, col 1 */}
          <div className='barChartLayout'>
            <div className='barChartBtn'>
              <p className='barBtn' onClick={() => onRevenuePerSourceSwitch('total')}>Total</p>
              <p className='barBtn' onClick={() => onRevenuePerSourceSwitch('average')}>Average</p>
            </div>
            {revenuePerSourceSwitch === 'total' ?
              <div style={{ width: '100%', height: '100%' }}>
                <BarChart labels={indexedSourceList} values={totalRevenuePerSource} colors={colors} title="Total Revenue" />
              </div>
              :
              <div style={{ width: '100%', height: '100%' }}>
                <BarChart labels={indexedSourceList} values={averageRevenuePerSource} colors={colors} title="Average Revenue" />
              </div>
            }
          </div>

          {/* row 3, col 2 */}
          <div className='barChartLayout'>
            <div className='barChartBtn'>
              <p className='barBtn' onClick={() => onConversionPerSourceSwitch('total')}>Total</p>
              <p className='barBtn' onClick={() => onConversionPerSourceSwitch('average')}>Average</p>
            </div>
            {conversionPerSourceSwitch === 'total' ?
              <div style={{ width: '100%', height: '100%' }}>
                <BarChart labels={indexedSourceList} values={totalConversionPerSource} colors={colors} title="Total Amount of Conversions" />
              </div>
              :
              <div style={{ width: '100%', height: '100%' }}>
                <BarChart labels={indexedSourceList} values={averageConversionPerSource} colors={colors} title="Average Amount of Conversions" />
              </div>
            }
          </div>


          {/* row 3, col 3 */}
          <div className='barChartLayout'>
            <div className='barChartBtn'>
              <p className='barBtn' onClick={() => onSpendPerSourceSwitch('total')}>Total</p>
              <p className='barBtn' onClick={() => onSpendPerSourceSwitch('average')}>Average</p>
            </div>
            {spendPerSourceSwitch === 'total' ?
              <div style={{ width: '100%', height: '100%' }}>
                <BarChart labels={indexedSourceList} values={totalSpendPerSource} colors={colors} title="Total Spends" />
              </div>
              :
              <div style={{ width: '100%', height: '100%' }}>
                <BarChart labels={indexedSourceList} values={averageSpendPerSource} colors={colors} title="Average Spends" />
              </div>
            }
          </div>

        </div>


        {/* Total per day */}
        <div className='lineChartLayout' style={{ width: '100%', height: '100%' }}>
          <LineChart labels={dayList} values={totalRevenuePerDay} title='Total Revenue' />
        </div>

        <div className='lineChartLayout' style={{ width: '100%', height: '100%' }}>
          <LineChart labels={dayList} values={totalConversionPerDay} title='Total Amount of Conversions' />
        </div>

        <div className='lineChartLayout' style={{ width: '100%', height: '100%' }}>
          <LineChart labels={dayList} values={totalSpendPerDay} title='Total Spends' />
        </div>
      </div>
    </div>
  );
}

export default App;
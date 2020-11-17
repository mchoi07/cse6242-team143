import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './App.scss';

import ChartContainer from './component/ChartContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">Sentiment Analysis for Stockmarket</header>
      <Tabs>
        <TabList>
          <Tab>Tesla</Tab>
          <Tab>Apple</Tab>
          <Tab>Netflix</Tab>
        </TabList>

        <TabPanel>
          <p><ChartContainer /></p>
        </TabPanel>
        <TabPanel>
          <p>what is this 2</p>
        </TabPanel>
        <TabPanel>
          <p>what is this 3</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;

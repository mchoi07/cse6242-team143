import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const preprocessData = (rawData) => {
  let processed = {};
  rawData.map((data) => {
    const {
      date,
      company,
      source,
      sent_score_textblob,
      sent_score_custom,
      positives_textblob,
      negatives_textblob,
      positives_custom,
      negatives_custom,
      price,
      price_change,
    } = data;
    let marketDate = date.split('-');
    const x = new Date(`${marketDate[2]}-${marketDate[0]}-${marketDate[1]}T20:00:00.000Z`);
    const initCompanyData = {
      stock: [],
      sentiment: {
        twitter: {
          textblob: [],
          custom: [],
        },
        nytimes: {
          textblob: [],
          custom: [],
        },
      },
    };
    processed[company] = processed[company] || initCompanyData;
    if (source === 'TWITTER') {
      processed[company].stock.push({
        x,
        price,
        y: price && price_change ? price_change / price : 0,
      });
    }

    processed[company].sentiment[source.toLowerCase()].textblob.push({
      x,
      y: sent_score_textblob,
      source,
      positives: positives_textblob,
      negatives: negatives_textblob,
    });

    processed[company].sentiment[source.toLowerCase()].custom.push({
      x,
      y: sent_score_custom,
      source,
      positives: positives_custom,
      negatives: negatives_custom,
    });
  });
  return processed;
};

fetch('data/aggregated.json')
  .then((r) => r.json())
  .then((data) => {
    const appData = preprocessData(data);
    ReactDOM.render(<App appData={appData} />, document.getElementById('root'));
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

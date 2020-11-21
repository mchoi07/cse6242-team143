import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const preprocessData = (rawData, processed = {}, isLarge = false) => {
  rawData.map((data) => {
    const {
      date,
      company,
      source,
      sent_score_textblob,
      sent_score_custom,
      positives_textblob,
      neutrals_textblob,
      negatives_textblob,
      positives_custom,
      neutrals_custom,
      negatives_custom,
      price,
    } = data;
    let marketDate = date.split('-');
    const x = new Date(`${marketDate[2]}-${marketDate[0]}-${marketDate[1]}T20:00:00.000Z`);
    const initCompanyData = {
      stock: [],
      sentiment: {
        twitter: {
          textblob: [],
          small: [],
          large: [],
        },
        nytimes: {
          textblob: [],
          small: [],
          large: [],
        },
      },
    };
    processed[company] = processed[company] || initCompanyData;
    if (isLarge) {
      processed[company].sentiment[source.toLowerCase()].large.push({
        x,
        y: sent_score_custom,
        source,
        positives: positives_custom,
        neutrals: neutrals_custom,
        negatives: negatives_custom,
      });
      return;
    }
    if (source === 'TWITTER') {
      processed[company].stock.push({
        x,
        price,
      });
    }

    processed[company].sentiment[source.toLowerCase()].textblob.push({
      x,
      y: sent_score_textblob,
      source,
      positives: positives_textblob,
      neutrals: neutrals_textblob,
      negatives: negatives_textblob,
    });

    processed[company].sentiment[source.toLowerCase()].small.push({
      x,
      y: sent_score_custom,
      source,
      positives: positives_custom,
      neutrals: neutrals_custom,
      negatives: negatives_custom,
    });
  });

  return processed;
};

Promise.all([fetch('data/aggregated.json'), fetch('data/aggregated_large.json')])
  .then(([s, l]) => Promise.all([s.json(), l.json()]))
  .then(([sdata, ldata]) => {
    const appData = preprocessData(sdata);
    preprocessData(ldata, appData, true);
    for (const company in appData) {
      const stockPrice = appData[company].stock;
      let prevPrice = stockPrice.find((el) => el.price > 0).price;
      prevPrice = Math.round(prevPrice * 100) / 100;
      stockPrice.map((el) => {
        el.price = el.price ? Math.round(el.price * 100) / 100 : Math.round(prevPrice * 100) / 100;
        el.y = (el.price - prevPrice) / prevPrice;
        prevPrice = el.price;
      });
    }

    ReactDOM.render(<App appData={appData} />, document.getElementById('root'));
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

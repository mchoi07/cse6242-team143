import React, { Component } from 'react';
import { Brush, d3 } from 'react-d3-components';
//import LineChart from '../LineChart';
import { LineChart } from 'react-d3-components';

import './index.scss';

import config from '../../config/config.json';

export class ChartPanel extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
    this._tooltipHtml = this._tooltipHtml.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  getStateFromProps(props) {
    const { sentimentHeight, chartWidth, chartMargin, brushMargin } = config;
    const { minX, maxX } = this._getXRange(props.data[0]);
    return {
      dataStock: {
        label: '',
        values: props.data[0].values.map((el) => {
          return { ...el, y: el.price };
        }),
      },
      dataMovement: props.data[0],
      dataSentiment: props.data.slice(1),
      xScale: d3.time
        .scale()
        .domain([minX, maxX])
        .range([0, chartWidth - chartMargin?.left - chartMargin?.right]),
      xScaleBrush: d3.time
        .scale()
        .domain([minX, maxX])
        .range([0, chartWidth - brushMargin?.left - brushMargin?.right]),
      yScaleMovement: d3.scale
        .linear()
        .domain(this._getYRange(props.data[0]))
        .range([sentimentHeight - chartMargin?.top - chartMargin?.bottom, 0]),
      yScaleSentiment: d3.scale
        .linear()
        .domain(this._getYRange(props.data.slice(1)))
        .range([sentimentHeight - chartMargin?.top - chartMargin?.bottom, 0]),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const newState = this.getStateFromProps(this.props);
      this.setState(newState);
    }
  }

  _getXRange(data) {
    let minX, maxX;
    minX = data.values?.length > 0 ? data.values[0].x : 0;
    maxX = data.values?.length > 0 ? data.values[data.values.length - 1].x : 0;
    return { minX, maxX };
  }

  _getMaxAbs(arr) {
    return arr.reduce((max, cur) => Math.max(max, Math.abs(cur)), 0);
  }

  _getYRange(data) {
    let maxAbs = 0;
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        maxAbs = Math.max(maxAbs, this._getMaxAbs(data[i].values.map((el) => el.y)));
      }
    } else {
      maxAbs = Math.max(maxAbs, this._getMaxAbs(data.values.map((el) => el.y)));
    }

    return [-maxAbs, maxAbs];
  }

  _tooltipHtml(label, data) {
    if (label === 'stock') {
      return <div>price: ${data.price}</div>;
    } else {
      return (
        <div>
          positives: {data.positives}
          <br />
          neutrals: {data.neutrals}
          <br />
          negatives: {data.negatives}
        </div>
      );
    }
  }

  _onChange(extent) {
    const { chartWidth, chartMargin } = config;
    this.setState({
      xScale: d3.time
        .scale()
        .domain([extent[0], extent[1]])
        .range([0, chartWidth - chartMargin?.left - chartMargin?.right]),
    });
  }

  render() {
    const {
      chartWidth,
      chartHeight,
      sentimentHeight,
      chartMargin,
      brushHeight,
      brushMargin,
      colorStock,
      colorBlob,
      colorSmall,
      colorLarge
    } = config;
    const { minX, maxX } = this._getXRange(this.state.dataStock);
    const customColorScale = (x) => { 
       let color;
       switch(x) {
         case 'stock':
          color = colorStock;
           break;
         case 'textblob':
          color = colorBlob;
           break;
          case 'small':
            color = colorSmall
            break;
          case 'large':
            color = colorLarge
            break;
          default:
            color = '#1f77b4'
        }
        return color;
    };
    return (
      <div>
        <div className="sentimentChart">
          <div className="title">Sentiment Score & Price Change</div>
          <div className="leftY">
            <LineChart
              data={this.state.dataMovement}
              width={chartWidth}
              height={sentimentHeight}
              margin={chartMargin}
              xScale={this.state.xScale}
              yScale={this.state.yScaleMovement}
              xAxis={{
                tickValues: this.state.xScale.ticks(10),
                tickFormat: d3.time.format('%m/%d'),
                zero: 0,
              }}
              yAxis={{ label: 'price changes' }}
              tooltipHtml={this._tooltipHtml}
              colorScale={customColorScale}
            />
          </div>
          {this.state.dataSentiment.length > 0 && (
            <div className="rightY" style={{ bottom: sentimentHeight + 3 }}>
              <LineChart
                data={this.state.dataSentiment}
                width={chartWidth}
                height={sentimentHeight}
                margin={chartMargin}
                xScale={this.state.xScale}
                yScale={this.state.yScaleSentiment}
                xAxis={{
                  tickValues: this.state.xScale.ticks(10),
                  tickFormat: d3.time.format(''),
                  zero: 0,
                }}
                yAxis={{ orientation: 'right', label: 'sentiment score' }}
                tooltipHtml={this._tooltipHtml}
                colorScale={customColorScale}
              />
            </div>
          )}
        </div>

        <div className="brush nofloat">
          <div className="title brush">Date Range Selector</div>
          <Brush
            width={chartWidth}
            height={brushHeight}
            margin={brushMargin}
            xScale={this.state.xScaleBrush}
            extent={[minX, maxX]}
            onChange={this._onChange}
            xAxis={{
              tickValues: this.state.xScaleBrush.ticks(20),
              tickFormat: d3.time.format('%m/%d'),
            }}
          />
        </div>
        <div className="title">Stock Price</div>
        <LineChart
          data={this.state.dataStock}
          width={chartWidth}
          height={chartHeight}
          margin={chartMargin}
          xScale={this.state.xScale}
          xAxis={{
            tickValues: this.state.xScale.ticks(10),
            tickFormat: d3.time.format('%m/%d'),
          }}
          yAxis={{ label: 'stock price' }}
        />
      </div>
    );
  }
}

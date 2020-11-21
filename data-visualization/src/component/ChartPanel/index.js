import React, { Component } from 'react';
import { LineChart, Brush, d3 } from 'react-d3-components';

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
    const { chartWidth, chartMargin, brushMargin } = config;
    const { minX, maxX } = this._getRange(props.data);
    return {
      data: props.data,
      xScale: d3.time
        .scale()
        .domain([minX, maxX])
        .range([0, chartWidth - chartMargin?.left - chartMargin?.right]),
      xScaleBrush: d3.time
        .scale()
        .domain([minX, maxX])
        .range([0, chartWidth - brushMargin?.left - brushMargin?.right]),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const newState = this.getStateFromProps(this.props);
      this.setState(this.getStateFromProps(newState));
    }
  }

  _getRange(data) {
    let minX, maxX;
    if (data.length > 0) {
      minX = data[0].values?.length > 0 ? data[0].values[0].x : 0;
      maxX = data[0].values?.length > 0 ? data[0].values[data[0].values.length - 1].x : 0;
    }
    return { minX, maxX };
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
    const { chartWidth, chartHeight, chartMargin, brushHeight, brushMargin } = config;
    const { minX, maxX } = this._getRange(this.state.data);

    /*
    const xScaleBrush = d3.time
      .scale()
      .domain([minX, maxX])
      .range([0, chartWidth - brushMargin?.left - brushMargin?.right]); */

    return (
      <div>
        <LineChart
          data={this.state.data}
          width={chartWidth}
          height={chartHeight}
          margin={chartMargin}
          xScale={this.state.xScale}
          xAxis={{
            tickValues: this.state.xScale.ticks(20),
            tickFormat: d3.time.format('%m/%d'),
          }}
          tooltipHtml={this._tooltipHtml}
        />
        <div className="brush" style={{ float: 'none' }}>
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
      </div>
    );
  }
}

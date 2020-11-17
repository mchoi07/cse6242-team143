import React, { Component } from 'react';
import { LineChart, Brush, d3 } from 'react-d3-components';

import './index.scss';

export class ChartPanel extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        label: 'Stock',
        values: [
          { x: new Date(2015, 2, 5), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 6), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 7), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 8), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 9), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 10), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 11), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 12), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 13), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 14), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 15), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 16), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 16), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 18), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 19), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 20), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 21), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 22), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 23), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 24), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 25), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 26), y: Math.random() * 2 - 1 },
        ],
      },
      {
        label: 'Sentiment',
        values: [
          { x: new Date(2015, 2, 5), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 6), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 7), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 8), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 9), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 10), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 11), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 12), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 13), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 14), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 15), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 16), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 16), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 18), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 19), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 20), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 21), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 22), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 23), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 24), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 25), y: Math.random() * 2 - 1 },
          { x: new Date(2015, 2, 26), y: Math.random() * 2 - 1 },
        ],
      },
    ];
    //TODO: read from config
    this.chartMargin = { top: 10, bottom: 50, left: 50, right: 20 };
    this.brushMargin = { top: 0, bottom: 30, left: 50, right: 20 };
    this.chartWidth = 1200;
    this.chartHeight = 400;
    this.brushHeight = 50;

    this.state = this.getInitialState(props);
    this._tooltipHtml = this._tooltipHtml.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  getInitialState(props) {
    return {
      data: this.data,
      xScale: d3.time
        .scale()
        .domain([this.data[0].values[0].x, this.data[0].values[this.data[0].values.length - 1].x])
        .range([0, this.chartWidth - this.chartMargin.left - this.chartMargin.right]),
      xScaleBrush: d3.time
        .scale()
        .domain([this.data[0].values[0].x, this.data[0].values[this.data[0].values.length - 1].x])
        .range([
          0,
          (this.brushWidth ?? this.chartWidth) - this.brushMargin.left - this.brushMargin.right,
        ]),
    };
  }

  _tooltipHtml(label, data) {
    return 'this is a test';
  }

  _onChange(extent) {
    this.setState({
      xScale: d3.time
        .scale()
        .domain([extent[0], extent[1]])
        .range([0, this.chartWidth - this.chartMargin.left - this.chartMargin.right]),
    });
  }

  render() {
    return (
      <div>
        <LineChart
          data={this.state.data}
          width={this.chartWidth}
          height={this.chartHeight}
          margin={this.chartMargin}
          xScale={this.state.xScale}
          xAxis={{
            tickValues: this.state.xScale.ticks(d3.time.day, 2),
            tickFormat: d3.time.format('%m/%d'),
          }}
          tooltipHtml={this._tooltipHtml}
        />
        <div className="brush" style={{ float: 'none' }}>
          <Brush
            width={this.brushWidth ?? this.chartWidth}
            height={this.brushHeight}
            margin={this.brushMargin}
            xScale={this.state.xScaleBrush}
            extent={[
              this.data[0].values[0].x,
              this.data[0].values[this.data[0].values.length - 1].x,
            ]}
            onChange={this._onChange}
            xAxis={{
              tickValues: this.state.xScaleBrush.ticks(d3.time.day, 2),
              tickFormat: d3.time.format('%m/%d'),
            }}
          />
        </div>
      </div>
    );
  }
}

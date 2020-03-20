import React, { Component } from 'react';
import _ from "underscore";
import './App.css';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, Legend } from "react-timeseries-charts";
import { TimeSeries } from "pondjs";
import Moment from "moment";
import { styler } from "react-timeseries-charts";

//
// Color scheme
//

const style = styler([
  { key: "peter", color: "#CA4040" },
  { key: "utility", color: "#9467bd" },
  { key: "outside", color: "#987951" },
  { key: "weather", color: "#CC862A" }
]);

//
// Render weather charts
//

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      graphdata: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.GetGraphData();
  }

  GetGraphData() {
    this.setState({ isLoading: true });
    fetch("http://graphapp-api:9000/getGraphData")
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => {
          const tempPoints = [];
          _.each(data, readings => {
            const time = new Moment(readings.Timestamp).toDate().getTime();
            tempPoints.push([time, readings.Peter, readings.Utility, readings.Outside, readings.Weather]);
          });

          this.setState({ graphdata: new TimeSeries({
                  name: "temps",
                  columns: ["time", "peter", "utility", "outside", "weather" ],
                  points: tempPoints
              }), 
              isLoading: false
            }
          );
        })
        .catch(error => this.setState({ error, isLoading: false }));
  }  
  
  render() {

    const { graphdata, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading || graphdata.length === 0) {
      return <p>Loading ...</p>;
    }

    return (
        <div>
            <div className="row">
              <div className="col-md-10">
                <h4>House Temperatures</h4>
              </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-10">
                    <Resizable>
                        <ChartContainer
                            timeRange={graphdata.timerange()}
                            showGridPosition="under"
                            trackerPosition={this.state.tracker}
                            trackerTimeFormat="%X"
                            onTrackerChanged={tracker => this.setState({ tracker })}
                        >
                            <ChartRow height="150">
                                <YAxis
                                    id="temp"
                                    label="Temperature (°C)"
                                    labelOffset={5}
                                    style={style.axisStyle("peter")}
                                    min={-10}
                                    max={40.0}
                                    width="80"
                                    type="linear"
                                    format=",.1f"
                                />
                                <Charts>
                                    <LineChart
                                        axis="temp"
                                        series={graphdata}
                                        columns={["peter", "utility", "outside", "weather"]}
                                        style={style}
                                    />
                                </Charts>
                            </ChartRow>

                        </ChartContainer>
                    </Resizable>
                </div>
                <div className="col-md-2">
                    <Legend
                        type="line"
                        align="right"
                        stack={true}
                        style={style}
                        categories={[
                            { key: "peter", label: "Peter" },
                            { key: "utility", label: "Utility" },
                            { key: "outside", label: "Outside" },
                            { key: "weather", label: "Weather" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
  }
}

export default App;

import React, {Component} from 'react'
import "./results.css"
import '../../node_modules/react-vis/dist/style.css';
import {
    BarSeries, Crosshair,
    HorizontalGridLines, LabelSeries,
    LineSeries, VerticalBarSeries,
    VerticalBarSeriesCanvas,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from "react-vis";


class Results extends Component {
    constructor(props) {
        super(props)
        console.log("RESULTS CONSTRUCTOR")
        this.DATA = null
    }
    state = {
        crosshairValues: []
    };

    onMouseLeave = () => this.setState({crosshairValues: []});
    onNearestX = (value, {index}) =>
        // console.log(value)


        // console.log(value + " dsadsa " + index)
        this.setState({
            crosshairValues: [value]
        });


    generateChart() {
        console.log("gernerate chart called")
        // const data = [
        //     {x: 0, y: 8},
        //     {x: 1, y: 5},
        //     {x: 2, y: 4},
        //     {x: 3, y: 9},
        //     {x: 4, y: 1},
        //     {x: 5, y: 7},
        //     {x: 6, y: 6},
        //     {x: 7, y: 3},
        //     {x: 8, y: 2},
        //     {x: 9, y: 0}
        // ]
        if (Object.keys(this.props.analysisResults).length === 0) {
            return (
                <img src="no-chart.png"/>
            )
        }
        console.log("this.props.analysisResults")
        console.log(this.props.analysisResults)
        const data = [
            {x: "caesar", y: this.props.analysisResults["caesar"]},
            {x: "cicero", y: this.props.analysisResults["cicero"]},
            {x: "columella", y: this.props.analysisResults["columella"]},
            {x: "horace", y: this.props.analysisResults["horace"]},
            {x: "hyginus", y: this.props.analysisResults["hyginus"]},
            {x: "juvenal", y: this.props.analysisResults["juvenal"]},
            {x: "livy", y: this.props.analysisResults["livy"]},
            {x: "lucan", y: this.props.analysisResults["lucan"]},
            {x: "lucretius", y: this.props.analysisResults["lucretius"]},
            {x: "martial", y: this.props.analysisResults["martial"]},
            {x: "nepos", y: this.props.analysisResults["nepos"]},
            {x: "ovid", y: this.props.analysisResults["ovid"]},
            {x: "quintilian", y: this.props.analysisResults["quintilian"]},
            {x: "sen", y: this.props.analysisResults["sen"]},
            {x: "silius", y: this.props.analysisResults["silius"]},
            {x: "statius", y: this.props.analysisResults["statius"]},
            {x: "tacitus", y: this.props.analysisResults["tacitus"]},
            {x: "vergil", y: this.props.analysisResults["vergil"]},
        ]

        this.DATA = data

        const labelData = data.map((d, idx) => ({
            x: d.x,
            y: data[idx].y
        }));
        console.log("datra")
        console.log(data)

        const BarSeries = VerticalBarSeriesCanvas // : VerticalBarSeries;
        const chart = (
            <XYPlot xType="ordinal" xDistance={100} height={600} width={900}  onMouseLeave={this.onMouseLeave}>
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis/>
                <YAxis/>
                {/*<BarSeries data={[{x: 2, y: 10}, {x: 4, y: 5}, {x: 5, y: 15}]}/>*/}
                <BarSeries data={data}/>
                <LabelSeries
                    data={labelData}
                    onNearestX={this.onNearestX}
                />
                <Crosshair values={this.state.crosshairValues} />
            </XYPlot>
        )
        console.log("returning chart")
        return chart

    }

    render() {
        console.log("resultsA")
        console.log(this.props.analysisResults)
        console.log(this.props.analysisResults[0])
        console.log(this.props.analysisResults["cicero"])
        console.log("resultsB")

        return(
            <div className="center">
            <p className="results-text"> Analysis Results</p>
            {this.generateChart()}
            </div>
        )

    }
}
export default Results

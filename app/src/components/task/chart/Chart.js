import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import useChart from './useChart';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";


export default function Chart() {
    const theme = useTheme();
    const [loading, data] = useChart();

    return (
        <React.Fragment>
            {/*<Title>Today</Title>*/}
            <ResponsiveContainer>
                <LineChart
                    data={loading ? [] : data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="day" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Tasks Done ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="doneTask" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
            {loading && <LinearProgress/>}
        </React.Fragment>
    );
}
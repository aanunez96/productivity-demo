import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Chart from "../../components/task/chart/Chart";
import DoneTable from "../../components/task/tableDone/TableDoneTask";
import CardInProgressTask from '../../components/task/cardTask/CardInProgressTask';
import Container from "@material-ui/core/Container";
import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 350,
    },
}));

export default function Home() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={2}>
                {/* Chart */}
                <Grid item xs={12} md={7} lg={8}>
                    <Paper className={fixedHeightPaper}>
                        <Chart/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <CardInProgressTask className={fixedHeightPaper}/>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <DoneTable limit={8}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Chart from "../../components/task/chart/Chart";
import DoneTable from "../../components/task/tableDone/TableDoneTask";
import Container from "@material-ui/core/Container";
import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Home() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return(
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item lg={6} xs={12}>
                    <Paper className={classes.paper}>
                        <DoneTable />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
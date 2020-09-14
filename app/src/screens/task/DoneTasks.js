import React from "react";
import Container from "@material-ui/core/Container";
import TableDoneTasks from "../../components/task/tableDone/TableDoneTask";
import Paper from "@material-ui/core/Paper/Paper";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',

    },
}));

export default function DoneTask() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.paper}>
            <TableDoneTasks/>
            </Paper>
        </Container>
    );
}
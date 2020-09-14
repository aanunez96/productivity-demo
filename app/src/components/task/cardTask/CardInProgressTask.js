import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import {Box, Divider, makeStyles} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import DoneIcon from '@material-ui/icons/Done';
import RestoreIcon from '@material-ui/icons/Restore';
import useTimer from "../../../utils/useTimer";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
    root: {
        height: 350,
        textAlign: 'center',
    },
    header: {
        textAlign: 'center',
        // spacing: 5,
    },
    margin: {
        margin: theme.spacing(2),
    },
    action: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));


export default function CardInProgressTask() {
    const classes = useStyles();
    const [timeLeft, status, play, pause, stop, reset, done, loading, data] = useTimer();
    const [running, setRunning] = useState((status === "play"));

    return (
        (!loading && !data) ?
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Sorry, there is no pending task ,please
                </Typography>
                <Button vertical-align="middle" component={Link} to={"/create-task"} size="small">
                    Add Task
                </Button>
            </Paper>
            :
            (loading && !data) ?
                <>
                    <LinearProgress/>
                    <Box>
                        <Skeleton variant="rect" width={"100%"} height={300}/>
                        <Skeleton animation="wave" width={"70%"}/>
                        <Skeleton animation="wave" width={"30%"}/>
                        <Skeleton animation="wave" width={"100%"}/>
                    </Box>
                </>
                :
                <Card className={classes.root}>
                    <CardHeader
                        className={classes.header}
                        title={data.title}
                        subheader={data.realizationDate}
                    />
                    <Divider variant="middle"/>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Typography variant="h4" align="center">
                                    {(loading) ? "" : timeLeft}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {status}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton onClick={() => reset()} aria-label="play">
                                    <RestoreIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {data.description}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>

                    </CardContent>
                    <Divider variant="middle"/>
                    <CardActions className={classes.action}>
                        <IconButton aria-label="play" onClick={() => {
                            (running) ? pause() : play();
                            setRunning(!running);
                        }} className={classes.margin}>
                            {(running) ? <PauseIcon/> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton aria-label="stop" onClick={() => stop()} className={classes.margin}>
                            <StopIcon/>
                        </IconButton>
                        <IconButton aria-label="stop" onClick={() => done()} className={classes.margin}>
                            <DoneIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
    );
}
import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import {Divider, makeStyles} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CachedIcon from '@material-ui/icons/Cached';
import useCard from './useCard';
import Alert from "@material-ui/lab/Alert/Alert";
import {Link} from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper/Paper";
import Button from '@material-ui/core/Button';

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
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        width: 400,
        padding: theme.spacing(2, 4, 3),
    }
}));


export default function CardPendingTask(props) {
    const {data, refetch, change, taskForChange} = props;
    const classes = useStyles();
    const [deleteTask, invalidSubmit] = useCard(data._id);
    const [modal, setModal] = useState(false);
    const minutesDuration = Math.floor(data.duration / 60);
    const secondsDuration = data.duration % 60;


    return (
        <>
            <Card className={classes.root}>
                {invalidSubmit && <Alert severity="error">Something has gone wrong try again</Alert>}
                <CardHeader
                    className={classes.header}
                    title={data.title}
                    subheader={data.realizationDate}
                    action={
                        <IconButton component={Link} to={`/edit-task/${data._id}`} aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                    }
                />
                <Divider variant="middle"/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">
                                {`${(minutesDuration < 10) ? `0${minutesDuration}` : minutesDuration}:
                                ${(secondsDuration < 10) ? `0${secondsDuration}` : secondsDuration}`}
                            </Typography>
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
                    <IconButton
                        aria-label="change"
                        className={classes.margin}
                        onClick={() => change(data._id)}
                        color={(taskForChange)? (data._id === taskForChange)? "secondary": "primary" : "inherit"}
                    >
                        <CachedIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => setModal(true)}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>
            </Card>
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center" component="p" className={classes.margin}>
                        Are you sure you want to delete the task
                    </Typography>
                    <div className={classes.action}>
                        <Button variant="contained" onClick={() => {
                            deleteTask(refetch);
                            setModal(false);
                        }}>Accept</Button>
                        <Button variant="contained" onClick={() => setModal(false)}>Cancel</Button>
                    </div>
                </Paper>
            </Modal>
        </>
    );
}
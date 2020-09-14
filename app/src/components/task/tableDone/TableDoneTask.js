import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useTableDone from "../tableDone/useTableDone";
import moment from 'moment';
import {Link as RouterLink} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {Box} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    div: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

export default function PendingTable(props) {
    const classes = useStyles();
    const {limit} = props;
    const [loading, data, generateRandomTask] = useTableDone(limit);
    return (
        (!loading && data.length === 0) ?
            <div className={classes.div}>
                <Typography variant="h6" align="center">
                    Sorry, there is no done task ,If you want to generate random tasks, please click
                </Typography>
                <Button vertical-align="middle" onClick={() => generateRandomTask()}>
                    here
                </Button>
            </div>
            :
            (loading && !data) ?
                <>
                    <LinearProgress/>
                    <Box>
                        <Skeleton variant="rect" width={"100%"} height={80}/>
                        <Skeleton variant="rect" width={"100%"} height={80}/>
                        <Skeleton variant="rect" width={"100%"} height={80}/>
                        <Skeleton variant="rect" width={"100%"} height={80}/>
                    </Box>
                </>
                :
                <>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Done Tasks
                    </Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Creation</TableCell>
                                <TableCell>Estimated</TableCell>
                                <TableCell>Realization</TableCell>
                                <TableCell>Done In</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.creationDate}</TableCell>
                                    <TableCell>{moment.duration(row.duration, 's').humanize()}</TableCell>
                                    <TableCell>{row.realizationDate}</TableCell>
                                    <TableCell>{moment.duration(row.progress, 's').humanize(true)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {
                        limit &&
                        <div className={classes.seeMore}>
                            <Link component={RouterLink} to={`/done-tasks`} color="primary">
                                See more orders
                            </Link>
                        </div>
                    }
                </>
    );
}
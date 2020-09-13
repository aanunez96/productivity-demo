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


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function PendingTable(props) {
    const classes = useStyles();
    const {limit} = props;
    const [loading, data] = useTableDone(limit);
    return (
        <React.Fragment>
            {/*<Title>Recent Orders</Title>*/}
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
                    <Link component={RouterLink} to={`/done-tasks`} color="primary" >
                        See more orders
                    </Link>
                </div>
            }
        </React.Fragment>
    );
}
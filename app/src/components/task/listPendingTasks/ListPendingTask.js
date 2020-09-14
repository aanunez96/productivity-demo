import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React from "react";
import CardPendingTask from '../cardTask/CardPendingTask';
import Skeleton from '@material-ui/lab/Skeleton';
import {Box} from "@material-ui/core";
import useListPending from "./useListPending";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardInProgress from '../cardTask/CardInProgressTask';

const categories = ['short', 'medium', 'long', 'none'];

export default function ListPending() {
    const [loading, data, category, setCategory, refetch, change, taskForChange] = useListPending();
    return (
        < Grid container spacing={2}>
            <Grid item md={3} xs={4}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Pending Tasks
                </Typography>
            </Grid>
            <Grid item md={9} xs={8}>
                <Select
                    labelId="select-outlined"
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                    label="Category"
                >
                    {categories.map(e =>
                        <MenuItem key={e}
                                  value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
                <CardInProgress/>
            </Grid>
            {(loading ? Array.from(new Array(4)) : data).map((item, index) => (
                <Grid key={index} item lg={4} md={6} xs={12}>
                    {item ?
                        <CardPendingTask data={item} refetch={refetch} change={change} taskForChange={taskForChange}/>
                        :
                        (
                            <Box>
                                <Skeleton variant="rect" width={"100%"} height={300}/>
                                <Skeleton animation="wave" width={"70%"}/>
                                <Skeleton animation="wave" width={"30%"}/>
                                <Skeleton animation="wave" width={"100%"}/>
                            </Box>
                        )
                    }

                </Grid>
            ))}
        </Grid>
    );
}
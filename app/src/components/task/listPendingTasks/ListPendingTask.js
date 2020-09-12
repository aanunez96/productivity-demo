import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React from "react";
import CardTask from '../cardTask/CardTask';
import Skeleton from '@material-ui/lab/Skeleton';
import {Box} from "@material-ui/core";
import useListPending from "./useListPending";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";

const categories = ['short', 'medium', 'long', 'none'];

export default function ListPending() {
    const [loading, data, category, setCategory,refetch] = useListPending();
    return (
        < Grid container spacing={2}>
            <Grid item xs={12}>
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
            {(loading ? Array.from(new Array(4)) : data).map((item, index) => (
                <Grid key={index} item lg={4} md={6} xs={12}>
                    {item ?
                        <CardTask data={item} refetch={refetch}/>
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
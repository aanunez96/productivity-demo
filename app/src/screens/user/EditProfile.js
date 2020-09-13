import React from 'react';
import {Grid} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import UpdateProfile from '../../components/user/update/UpdateProfile';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
}));

export default function EditProfile() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={3} className={classes.margin}>
                <UpdateProfile/>
            </Grid>
        </Container>

    );
};
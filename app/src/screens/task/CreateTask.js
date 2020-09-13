import React from 'react';
import {Grid} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import TaskDetails from "../../components/task/createUpdate/TaskDetails";
import useCreateTask from "../../components/task/createUpdate/useCreateTask";



export default function CreateTask() {
    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={3}>
                <TaskDetails fetchHook={useCreateTask()} isUpdate={false}/>
            </Grid>
        </Container>

    );
};

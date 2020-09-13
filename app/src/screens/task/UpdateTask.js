import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import TaskDetails from "../../components/task/createUpdate/TaskDetails";
import useUpdateTask from "../../components/task/createUpdate/useUpdateTask";
import React from "react";
import {useParams} from "react-router-dom";


export default function UpdateTask() {
    const {taskId} = useParams();

    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={3}>
                <TaskDetails fetchHook={useUpdateTask(taskId)} isUpdate={true}/>
            </Grid>
        </Container>

    );
};
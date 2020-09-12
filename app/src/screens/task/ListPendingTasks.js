import React from "react";
import Container from "@material-ui/core/Container";
import PendingList from "../../components/task/listPendingTasks/ListPendingTask";


export default function Pending() {
    return (
        <Container component="main" maxWidth="lg">
            <PendingList/>
        </Container>
    );
}
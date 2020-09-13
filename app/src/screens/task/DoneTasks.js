import React from "react";
import Container from "@material-ui/core/Container";
import TableDoneTasks from "../../components/task/tableDone/TableDoneTask";


export default function DoneTask() {
    return (
        <Container component="main" maxWidth="lg">
            <TableDoneTasks/>
        </Container>
    );
}
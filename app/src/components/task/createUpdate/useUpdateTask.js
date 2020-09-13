import {gql, useMutation, useQuery} from "@apollo/client";
import { useState} from "react";

const GET_AD = gql`
query task(
  $taskId:ID!
){
  task(taskId:$taskId){
    _id
    description
    title
    classification
    duration
  }
}`;

const UPDATE_AD = gql`
mutation updateTask(
  $taskId: ID!
  $title: String
  $description: String
  $classification: Category
  $duration: Int
){
  modifyTask(
    title: $title,
    taskId: $taskId,
    description: $description,
    duration: $duration,
    classification:$classification
    ){
    _id
    title
    classification
    duration
    description
  }
}
`;

export default function useUpdateTask(taskId) {
    const {loading, data} = useQuery(GET_AD, {variables: {taskId}});
    const [UpdateTask, {data: dataMutation}] = useMutation(UPDATE_AD);
    const [invalidSubmit, setInvalidSubmit] = useState(false);


    const modify = async ({title, description, duration, classification}) => {
        let variables = {
            title,
            description,
            duration,
            classification,
            taskId: data.task._id
        };
        try {
            await UpdateTask({variables})
        } catch (e) {
            setInvalidSubmit(true);
        }
    };
    return [
        loading,
        data ? data.task : data,
        modify,
        dataMutation ? (taskId) ? dataMutation.modifyTask : dataMutation.createTask : dataMutation,
        invalidSubmit
    ];
}
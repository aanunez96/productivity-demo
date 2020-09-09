import {gql, useMutation, useQuery} from "@apollo/client";
import { useState} from "react";

const GET_AD = gql`
query task(
  $taskId:ID!
){
  task(taskId:$taskId){
    _id
    description
    tittle
    classification
    duration
    date
  }
}`;

const UPDATE_AD = gql`
mutation updateTask(
  $taskId: ID!
  $tittle: String
  $description: String
  $classification: Category
  $duration: Int
){
  modifyTask(
    tittle: $tittle,
    taskId: $taskId,
    description: $description,
    duration: $duration,
    classification:$classification
    ){
    classification
    _id
    tittle
    classification
    duration
    date
  }
}
`;

export default function useUpdateTask(taskId) {
    const {loading, data} = useQuery(GET_AD, {variables: {taskId}});
    const [createUpdateAd, {data: dataMutation}] = useMutation(UPDATE_AD);
    const [invalidSubmit, setInvalidSubmit] = useState(false);


    const modify = async ({tittle, description, duration, classification}) => {
        let variables = {
            tittle,
            description,
            duration,
            classification,
            taskId: data.task._id
        };
        try {
            await createUpdateAd({variables})
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
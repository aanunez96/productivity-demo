import {gql, useMutation} from "@apollo/client";
import { useState} from "react";

const UPDATE_AD = gql`
mutation updateTask(
  $taskId: ID!
  $isDelete: Boolean
  $progress: Int
){
  modifyTask(
    taskId: $taskId,
    isDelete: $isDelete,
    progress: $progress,
    ){
    _id
    progress
    isDelete
  }
}
`;
export default function useCard(taskId) {
    const [createUpdateAd] = useMutation(UPDATE_AD);
    const [invalidSubmit, setInvalidSubmit] = useState(false);

    const deleteTask = async (refetch) => {
        setInvalidSubmit(false);
        try {
            await createUpdateAd({variables:{taskId: taskId,isDelete: true}});
            refetch();
        } catch (e) {
            setInvalidSubmit(true);
        }
    };
    return [
        deleteTask,
        invalidSubmit,
    ];
}
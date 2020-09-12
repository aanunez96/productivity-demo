import {gql, useMutation} from "@apollo/client";
import {useState} from "react";

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
    const [createUpdateAd, {data: dataMutation}] = useMutation(UPDATE_AD);
    const [invalidSubmit, setInvalidSubmit] = useState(false);

    const modify = async (action,refetch) => {
        setInvalidSubmit(false);
        let variables = {taskId};
        if (action === "refresh"){
            variables.progress = 0;
        }
        if (action === "delete"){
            variables.isDelete = true;
        }
        try {
            await createUpdateAd({variables});
            refetch();
        } catch (e) {
            setInvalidSubmit(true);
        }
    };
    return [
        modify,
        invalidSubmit,
    ];
}
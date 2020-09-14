import {gql, useMutation, useQuery} from "@apollo/client";
import {useContext} from "react";
import {Context} from "../../../utils/Store";
import {useState} from "react";

const PENDING = gql`
query Pendingtask(
  $userId: ID!
  $pending: Boolean!
  $category: Category
){
tasks(
  pending: $pending
  userId: $userId
  sort: "order"
  category: $category
){
  _id
  title
  creationDate
  description
  duration
  progress
  order
}
}`;
const CHANGE_TASK = gql`
mutation change(
$taskId1: ID!
$taskId2: ID!
){
  reorder(taskId1:$taskId1,taskId2:$taskId2){
    _id
    order
  }
}
`;


export default function useListPending() {
    const [state] = useContext(Context);
    const [category, setCategory] = useState("none");
    const {loading, data, refetch} = useQuery(PENDING,
        {
            variables: {pending: true, userId: state.user.id, category},
            fetchPolicy: "network-only"
        }
    );
    const [change] = useMutation(CHANGE_TASK);

    const [taskForChange, setTaskForChange] = useState(false);

    const changeTask = async (taskId) => {
        if (taskForChange) {
            if (taskForChange !== taskId) {
                try{
                    await change({variables:{taskId1: taskForChange, taskId2: taskId}});
                    setTaskForChange(false)
                } catch (e) {
                    console.log(e);
                }

            } else {
                setTaskForChange(false);
            }
        } else {
            setTaskForChange(taskId);
        }
    };

    return [
        loading,
        data ? data.tasks : [],
        category,
        setCategory,
        refetch,
        changeTask,
        taskForChange
    ];
}

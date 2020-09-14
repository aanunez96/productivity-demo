import {gql, useMutation, useQuery} from "@apollo/client";
import {useContext} from "react";
import {Context} from "../../../utils/Store";

const DONE = gql`
query donetask(
  $userId: ID!
  $pending: Boolean!
  $limit: Int
){
tasks(
  pending: $pending
  userId: $userId
  limit: $limit
  sort: "realizationDate"
){
  _id
  title
  creationDate
  realizationDate
  duration
  progress
  status
}
}`;

const GENARATE_RANDOM = gql`
mutation randomTask(
  $owner : ID!
){
  randomDoneTask(owner: $owner){
    _id
  }
}`;

export default function useChart(limit) {
    const [state] = useContext(Context);
    const [randomTasks] = useMutation(GENARATE_RANDOM);
    const {loading, data, refetch} = useQuery(DONE, {variables: {pending: false, userId: state.user.id, limit}});
    const generateRandomTask = async () => {
        try {
            await randomTasks({variables: {owner: state.user.id}});
            refetch();
        } catch (e) {
            console.log(e);
        }
    };


    return [
        loading,
        data ? data.tasks : [],
        generateRandomTask
    ];
}

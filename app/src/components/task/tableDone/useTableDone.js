import {gql, useQuery} from "@apollo/client";
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

export default function useChart(limit) {
    const [state] = useContext(Context);

    const {loading, data} = useQuery(DONE, {variables: {pending:false, userId: state.user.id, limit}});

    return [
        loading,
        data ? data.tasks : [],
    ];
}

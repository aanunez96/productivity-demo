import {gql, useQuery} from "@apollo/client";
import {useContext} from "react";
import {Context} from "../../../utils/Store";

const DONE = gql`
query donetask(
  $userId: ID!
  $pending: Boolean!
){
tasks(
  pending: $pending
  userId: $userId
  limit: 10
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

export default function useChart() {
    const [user] = useContext(Context);

    const {loading, data} = useQuery(DONE, {variables: {pending:false, userId: user.id}});

    return [
        loading,
        data ? data.tasks : [],
    ];
}

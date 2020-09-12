import {gql, useQuery} from "@apollo/client";
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
  sort: "creationDate"
  category: $category
){
  _id
  title
  creationDate
  description
  duration
  progress
}
}`;

export default function useListPending() {
    const [user] = useContext(Context);
    const [category, setCategory] = useState("none");
    const {loading, data, refetch} = useQuery(PENDING,
        {
            variables: {pending: true, userId: user.id, category},
            fetchPolicy: "network-only"
        }
    );

    return [
        loading,
        data ? data.tasks : [],
        category,
        setCategory,
        refetch,
    ];
}

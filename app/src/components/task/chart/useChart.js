import {gql, useQuery} from "@apollo/client";
import {useContext, useState} from "react";
import {Context} from "../../../utils/Store";
import moment from 'moment';

const Productivity = gql`
query productivity(
  $start: Date!
  $end: Date!
  $owner: ID!
){
productivity(
  start: $start,
  end: $end
  owner: $owner
){
  doneTask
  day
}
}`;

export default function useChart() {
    const [end, setEnd] = useState(moment().format("YYYY-MM-DD"));
    const [start, setStart] = useState(moment(moment(end).subtract(7, "days")).format("YYYY-MM-DD"));
    const [user] = useContext(Context);

    const {loading, data} = useQuery(Productivity, {variables: {start, end, owner: user.id}});

    return [
        loading,
        data ? data.productivity : data,
    ];
}

import {gql, useQuery} from "@apollo/client";
import {useContext} from "react";
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
    const end = moment().format("YYYY-MM-DD");
    const start = moment(moment(end).subtract(7, "days")).format("YYYY-MM-DD");
    const [state] = useContext(Context);

    const {loading, data} = useQuery(Productivity, {variables: {start, end, owner: state.user.id}});

    return [
        loading,
        data ? data.productivity : data,
    ];
}

import {gql, useMutation} from "@apollo/client";
import {useContext, useState} from "react";
import {Context} from "../../../utils/Store";

const CREATE_AD = gql`
mutation createTask(
  $title: String!
  $description: String
  $duration: Int!
  $owner : ID!
  $classification: Category!
){
createTask(
  title: $title,
  owner: $owner,
  description: $description,
  classification: $classification,
  duration: $duration
){
  _id
  classification
  title
  description
  duration
 }
}`;

export default function useCreateTask() {
    const [createUpdateAd, {data: dataMutation}] = useMutation(CREATE_AD);
    const [state] = useContext(Context);

    const [invalidSubmit, setInvalidSubmit] = useState(false);

    const modify = async ({title, description, duration, classification}) => {
        let variables = {
            title,
            description,
            duration,
            classification,
            owner: state.user.id
        };
        try {
            await createUpdateAd({variables})
        } catch (e) {
            setInvalidSubmit(true);
        }
    };
    return [
        false,
        false,
        modify,
        dataMutation ? dataMutation.createTask : dataMutation,
        invalidSubmit
    ];
}
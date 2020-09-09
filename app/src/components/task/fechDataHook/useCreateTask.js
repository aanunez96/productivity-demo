import {gql, useMutation} from "@apollo/client";
import {useContext, useState} from "react";
import {Context} from "../../../utils/Store";

const CREATE_AD = gql`
mutation createTask(
  $tittle: String!
  $description: String
  $duration: Int!
  $owner : ID!
  $classification: Category!
){
createTask(
  tittle: $tittle,
  owner: $owner,
  description: $description,
  classification: $classification,
  duration: $duration
){
  _id
  classification
  tittle
  classification
  duration
  date
 }
}`;

export default function useCreateTask() {
    const [createUpdateAd, {data: dataMutation}] = useMutation(CREATE_AD);
    const [user] = useContext(Context);
    const [invalidSubmit, setInvalidSubmit] = useState(false);

    const modify = async ({tittle, description, duration, classification}) => {
        let variables = {
            tittle,
            description,
            duration,
            classification,
            owner: user.id
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
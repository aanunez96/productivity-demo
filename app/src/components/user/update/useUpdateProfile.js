import {gql, useMutation} from "@apollo/client";
import {useContext, useEffect} from "react";
import {Context} from "../../../utils/Store";

const UPDATE_USER = gql`
mutation updateUser(
  $userId: ID!
  $name: String
  $lastName: String
){
  modifyUser(
    userId: $userId,
    lastName: $lastName,
    name: $name){
    profile{
      name
      lastName
    }
  }
}
`;
export default function useUpdateProfile() {
    const [updateUser, {data}] = useMutation(UPDATE_USER);
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        data && dispatch({
            type: "GET_USER",
            payload: {...state.user, profile: data.modifyUser.profile}
        });
    },[data]);


    const update = async (values, error) => {
        try {
            await updateUser({
                variables: {
                    userId: state.user.id,
                    name: values.name,
                    lastName: values.lastName,
                }
            })

        } catch (e) {
            error(true);
        }
    };

    return update;
}
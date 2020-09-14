import {useContext, useState, useEffect} from "react";
import {Context} from "./Store";
import moment from 'moment';
import {gql, useMutation, useQuery} from "@apollo/client";

const UPDATE_AD = gql`
mutation updateTask(
  $taskId: ID!
  $progress: Int
  $status: Status
  $realizationDate: Date
){
  modifyTask(
    taskId: $taskId,
    status: $status,
    progress: $progress,
    realizationDate: $realizationDate
    ){
    _id
    status
    progress
    realizationDate
  }
}
`;
const GET_IN_PROGRESS = gql`
{
  task(inProgress:true){
    _id
    title
    description
    duration
    progress
  }
}`;
export default function useTimer() {
    const [state, dispatch] = useContext(Context);
    const {loading, data, refetch} = useQuery(GET_IN_PROGRESS,{fetchPolicy:"no-cache"});

    const initial = moment(state.timer.initial);
    const [UpdateTask] = useMutation(UPDATE_AD);


    if (data?.task && !state.taskInProgress) {
        dispatch({
            type: "SET_TASK",
            payload: data.task

        })
    }

    const play = () => {
        dispatch({
            type: "SET_TIMER",
            payload: {
                status: 'play',
                initial: moment(),
            }
        });
    };

    const pause = () => {
        const progress = state.taskInProgress.duration - timeLeft.asSeconds();
        dispatch({
            type: "SET_TIMER",
            payload: {
                status: 'pause',
                initial: null,
            }
        });

        dispatch({
            type: "SET_TASK",
            payload: {
                ...state.taskInProgress,
                progress,
            }
        });
        update({progress: Math.round(progress)});

    };

    const stop = () => {
        const progress = state.taskInProgress.duration - timeLeft.asSeconds();

        dispatch({
            type: "SET_TIMER",
            payload: {
                status: 'stop',
                initial: null,
            }
        });
        dispatch({
            type: "SET_TASK",
            payload: null,
        });
        update({progress: Math.round(progress)})
    };

    const reset = () => {
        dispatch({
            type: "SET_TASK",
            payload: {
                ...state.taskInProgress,
                progress: 0,
            }
        });
        if (state.timer.status === 'play') {
            play();
        }
        update({progress: 0});
    };

    const done = async (outtime) => {

        dispatch({
            type: "SET_TIMER",
            payload: {
                status: 'stop',
                initial: null,
            }
        });
        dispatch({
            type: "SET_TASK",
            payload: null,
        });

        const progress = state.taskInProgress.duration - timeLeft.asSeconds();
        try {
            console.log(progress);

            await update({
                status: "done",
                progress: (outtime)?state.taskInProgress.duration: Math.round(progress),
                realizationDate: moment().format('YYYY-MM-DD'),
            });
            refetch();
        }catch (e) {
            console.log(e);
        }

    };

    const calculateTimeLeft = () => {
        const task = (state.taskInProgress || data.task);
        if (state.timer.status !== 'play') {
            return moment.duration(task.duration - task.progress, "s")
        } else {
            let actual = new moment();
            let elapsed = moment.duration(actual.diff(initial));
            let difference = moment.duration(task.duration - task.progress - elapsed.asSeconds(), "s");
            if (difference.asSeconds() < 0) {
                done();
            } else {
                return difference
            }
        }
    };

    const update = async (variables) => {
        try {
            await UpdateTask({variables: {...variables, taskId: data.task._id}})
        } catch (e) {
            console.log(e)
        }
    };

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!loading && data?.task) {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearTimeout(timer);
        }
    });

    window.addEventListener('beforeunload', async function (e) {
        const progress = state.taskInProgress.duration - timeLeft.asSeconds();
        localStorage.setItem("statusTimer", 'stop');
        localStorage.setItem("initialTimer", null);
        await update({progress: Math.round(progress)});
    });

    return [
        (moment.isDuration(timeLeft)) ? `${timeLeft.minutes()}: ${timeLeft.seconds()}` : timeLeft,
        state.timer.status,
        play,
        pause,
        stop,
        reset,
        done,
        loading,
        (data)? data.task: data
    ]

}
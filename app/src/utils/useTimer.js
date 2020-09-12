import {useContext, useState, useEffect} from "react";
import {Context} from "./Store";
import moment from 'moment';

export default function useTimer() {
    const [state, dispatch] = useContext(Context);
    const initial = moment(state.timer.initial);
    const task = state.task;
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
                ...state.task,
                progress: state.task.duration - timeLeft.asSeconds(),
            }
        })
    };

    const stop = () => {
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
    };

    const reset = () => {
        dispatch({
            type: "SET_TASK",
            payload: {
                ...state.task,
                progress: 0,
            }
        });
        if (state.timer.status === 'play') {
            play();
        }
    };

    const done = () => {

    };

    const calculateTimeLeft = () => {
        if (state.timer.status !== 'play') {
            return moment.duration(task.duration - task.progress,"s");
        } else {
            let actual = new moment();
            let elapsed = moment.duration(actual.diff(initial));
            let difference = moment.duration(task.duration - task.progress - elapsed.asSeconds(),"s");
            if (difference.asSeconds() === 0) {
                stop();
                return false
            } else {
                return difference
            }
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(state));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return [
        (moment.isDuration(timeLeft)) ? `${timeLeft.minutes()}: ${timeLeft.seconds()}` : timeLeft,
        state.timer.status,
        play,
        pause,
        stop,
        reset,
        done
    ]

}
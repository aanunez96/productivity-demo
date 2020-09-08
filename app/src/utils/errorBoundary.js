import React from "react";
import Error from "../screens/Error";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }


    render() {
        if (this.state.hasError) {
            return <Error content={"Sorry, an unexpected error has occurred"}/>;
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
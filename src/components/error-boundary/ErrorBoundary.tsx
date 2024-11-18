import React from "react";
import errorHandler from "../../utils/error-handler";
import ErrorIndicator from "../indicators/error-indicator/ErrorIndicator";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, error: "" };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: error.message });
    errorHandler(error);
  }

  render() {
    try {
      return this.props.children;
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ hasError: true, error: error.message });
      }
    }

    if (this.state.hasError) {
      return <ErrorIndicator error={this.state.error} />;
    }

    return null;
  }
}

export default ErrorBoundary;

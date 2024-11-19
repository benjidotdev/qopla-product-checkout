import React from "react";
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
    // This is where I would send the error to a logging service
    this.setState({ hasError: true, error: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-bg-image bg-cover bg-fixed bg-center bg-no-repeat flex items-center justify-center">
          <ErrorIndicator error={this.state.error} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

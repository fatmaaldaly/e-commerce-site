import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught component error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-rose-50 px-4">
          <h1 className="text-3xl font-bold text-rose-800">Something went wrong</h1>
          <p className="text-gray-600 text-center max-w-md">
            An unexpected error occurred. Please refresh the page or return home.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-full bg-rose-800 text-white font-semibold hover:bg-rose-700 transition"
            >
              Refresh
            </button>
            <Link
              to="/"
              className="px-5 py-2 rounded-full border border-rose-800 text-rose-800 font-semibold hover:bg-rose-50 transition"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

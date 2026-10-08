import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="container section center">
        <h2>Something went wrong</h2>
        <p className="muted">{this.state.error.message}</p>
        <button className="btn btn-primary" onClick={() => window.location.assign('/')}>Back home</button>
      </div>
    );
  }
}

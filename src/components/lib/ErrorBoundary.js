import React from 'react'

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  handleUnhandled = () => {
    this.setState({ hasError: true })
  }
  componentDidMount() {
    window.addEventListener('unhandledrejection', this.handleUnhandled)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandled)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

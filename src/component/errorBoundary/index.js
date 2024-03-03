import Image from 'next/image';
import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div 
        className="errorPage no-page-found"
        >
          <Image alt="Error" style={{width: '130px', opacity: '.8'}} width={130} height={100} src="/assets/images/404.png"/>
          {/* <h1 style={{ fontSize: "12rem", lineHeight: "0" }}></h1> */}
          <div className="no-page-title">Page Not Found</div>
          {/* <img style={{margin:"10px"}} src="https://t4.ftcdn.net/jpg/05/24/04/51/360_F_524045110_UXnCx4GEDapddDi5tdlY96s4g0MxHRvt.jpg"/> */}
          {/* <h2>Oops, there is an error!</h2> */}
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from "react";

const Sitefooter = () => {
    const footerStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    };
  
    return (
      <footer className="bg-light text-center">
        <div className="p-4 pb-0">
          <section>
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up with us! </strong>
                  </p>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary mb-4 bg-black text-white">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
        <div className="text-center p-3" style={footerStyle}>
          © {new Date().getFullYear()} Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    );
  };


  
  export default Sitefooter;
import React from 'react';

import './notfound.css';
import logo from './logo_label_blanc.png';


export  default  class NotFoundPage extends React.Component{
    

    render(){

return (<div className="error-content">
  <a href="/" className="aligncenter">
            <img className="logo_h_91" src={logo} /><br />
          </a>
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="error-text">
                <h1 className="error">PAGE NOT FOUND!</h1>
                <div className="im-sheep">
                  <div className="top">
                    <div className="body" />
                    <div className="head">
                      <div className="im-eye one" />
                      <div className="im-eye two" />
                      <div className="im-ear one" />
                      <div className="im-ear two" />
                    </div>
                  </div>
                  <div className="im-legs">
                    <div className="im-leg" />
                    <div className="im-leg" />
                    <div className="im-leg" />
                    <div className="im-leg" />
                  </div>
                </div>
                <h4>Oops! This page Could Not Be Found!</h4>
                <p >Sorry bit the page you are looking for does not exist, have been removed or name changed or you're connected!.</p>
                <a href="/" className="btn btn-primary btn-round">HOME</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
        

    }}

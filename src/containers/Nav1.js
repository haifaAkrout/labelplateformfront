import { Link } from 'react-router-dom';


import React from 'react';
import axios from "axios";
import logo from './logo_label.png';


class Nav1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Sessions:[]
        } ;



    };
    componentDidMount() {
        this.loadJudges();
    }

    loadJudges = ()=> {
        axios.get('https://labelplatform.herokuapp.com/sessions').then(res => {

            this.setState({Sessions: res.data});
        })
    }
    render() {
        return (

            <nav id="mainnav-container">

                <div className="navbar-header">
                    <a href="/" className="navbar-brand h_108">
                       
                        <div className="brand-title">
                            <img className="logo_h_91 signin_html_wrap btm_0" src={logo} />
                        </div>
                    </a>
                </div>

                <div id="mainnav">


                    <div id="mainnav-menu-wrap">
                        <div className="nano">
                            <div className="nano-content">
                                <ul id="mainnav-menu" className="list-group txt_left">

                                    <li className="list-header txt_center">MENU</li>

                                    <li><Link to={"/front"}> <i className="fa fa-home"></i> <span
                                        className="menu-title"> Home </span> </Link></li>
                                    <li><Link > <i className="fa fa-home"></i> <span
                                        className="menu-title"> Dashboard </span> </Link></li>
                                  
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-th"></i>
                                            <span className="menu-title">
                                               Judges Management
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">
                                            <li><a href="https://labelplateformfront.herokuapp.com/Judges/sendEmail"><i className="fa fa-caret-right"></i>
                                                Add Judge  </a></li>
                                            <li><a href="/judges/demandes"><i className="fa fa-caret-right"></i>
                                                Show Judges  </a></li>



                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-th"></i>
                                            <span className="menu-title">
                                             Sessions Management
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">
                                            <li><a href="https://labelplateformfront.herokuapp.com/addSession"><i className="fa fa-caret-right"></i>
                                                Add Session </a></li>
                                            <li><a href="https://labelplateformfront.herokuapp.com/Sessions2"><i className="fa fa-caret-right"></i>
                                             Show Sessions  </a></li>



                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-th"></i>
                                            <span className="menu-title">
                                             Questions Management
                                            </span>
                                            <i className="arrow"></i>
                                        </a>

                                        <ul className="collapse">
                                            <li><a href="https://labelplateformfront.herokuapp.com/addQuestion"><i className="fa fa-caret-right"></i>
                                                Add Question </a></li>




                                        </ul>
                                    </li>



                                     <li><a href="/logout"> <i className="fa fa-sign-out"></i> <span
                                        className="menu-title"> Logout </span> </a></li>










                                </ul>

                                

                            </div>
                        </div>


                    </div>


                </div>
            </nav>




        );
    }
}


export default Nav1;

import React, { Component, Suspense } from 'react';
import { connect } from "react-redux";
import 'react-notifications/lib/notifications.css';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
    addCompte,

} from "../../../store/actions";
import Moment from 'moment';
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav1 from '../../../containers/Nav1.js';

import logo from "../../login/logo_label_blanc.png";

import Header2 from "../../Front/front2";
import {Link} from "react-router-dom";

class showSessionsBack extends Component{

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    constructor(props) {
        super(props);
        this.state = {

         session:[]


        } ;



    };
    componentDidMount(){
        axios.get(`https://labelplatform.herokuapp.com/sessionsWij/getSession`)
            .then(response => {
                this.setState({ session: response.data });
                console.log(response.data)
            })

    }
    handleclick(id){


        axios.delete('https://labelplatform.herokuapp.com/sessionsWij/del/'+id
        ).then((res)=>{

            console.log(res.data)


        }).catch(()=>{

        })}

        render(){

        return(

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <div className="boxed">
                    <Header/>
                    <div id="content-container">
                        <ContentContainer/>


                                <div className="panel">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">     <a href="/Judges/demandes"><strong>Judges </strong></a><strong>->all</strong></h3>
                                    </div>
                                    <div className="panel-body" className="td">
                                        <table ref="table2" id="demo-dt-basic" className="table table-striped table-bordered">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>StartDate</th>
                                                <th className="min-tablet">EndDate</th>

                                                <th className="min-desktop">Action</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.session.map(function(d, idx){
                                                return (

                                                    <tr key={idx}>
                                                        <td>{d.Name }</td>
                                                        <td> {Moment(d.StartDate).format('DD-MM-YYYY')}</td>
                                                        <td> {Moment(d.EndDate).format('DD-MM-YYYY')}</td>

                                                        <td>    <button
                                                            onClick={() => this.handleclick(d._id)}

                                                            href="/"
                                                            className="btn btn-info"
                                                        >Delete
                                                        </button>

                                                        </td>
                                                    </tr>
                                                )
                                            }.bind(this))}


                                            </tbody>
                                        </table>




                                    </div>
                                </div>



                    </div>
                    <Nav1/>


                </div>

            </div>




        )
    }
}



const mapDispatchToProps = {
    addCompte

};

export default connect(
    null,
    mapDispatchToProps
)(showSessionsBack);
import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { Table } from 'reactstrap';
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav3 from "../../../containers/Nav1";
import {Link} from "react-router-dom";
import "../../../App.css"
export default class listSessions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            sessions:[]} ;



    };


    componentDidMount() {
        axios.get('https://labelplatform.herokuapp.com/sessions')
            .then(response => {
                this.setState({sessions: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {


        //render
        return (

            <div                id = "container"
                                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>



                        <div className="panel">
                            <div className="panel-body">

                                <Table striped id={"tableSession"} className="td">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {   this.state.sessions.map(function (session,idx) {
                                        if(this.state.sessions.length == 0)
                                            return (
                                                <label>Aucune session disponible</label>
                                            )
                                        else
                                            return(
                                                <tr  key={idx}>
                                                    <td   >

                                                        <Link style={{color:"Black"}} to={"/sessions/listeProjetsparIdSes/"+ session._id} params={{ idSession: session._id}}>{session.Name}</Link>
                                                    </td>
                                                    <td>
                                                        {Moment(session.StartDate).format('DD-MM-YYYY')}
                                                    </td>
                                                    <td>
                                                        {Moment(session.EndDate).format('DD-MM-YYYY')}
                                                    </td>
                                                    <td>
                                                        {session.Status}
                                                    </td>

                                                </tr>
                                            )

                                    }.bind(this))}
                                    </tbody>
                                </Table>

                            </div>

                        </div>


                    </div>

                    <Nav3/>

                </div>

            </div>)
    }}



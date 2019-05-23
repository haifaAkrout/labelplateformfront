import React from 'react';
import axios from 'axios';
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav1 from "../../../containers/Nav1";
import Moment from 'moment';
import {Link} from "react-router-dom";
import {Table,Col,Row,Container} from "reactstrap";

import {Button} from "reactstrap";
export default class ListeEquipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            members: [],
            idProj: '',
            idSess: '',
            idM: '',
            NomSession: '',
            DateFinSession: '',
        };

    };


    componentDidMount() {
        const {idSession} = this.props.match.params
        const {idProjet} = this.props.match.params
        console.log(idSession)
        console.log(idProjet)
        console.log("hello from liste membres")
        this.loadMembers();
    }

    loadMembers = () => {
        this.setState({loading: true})
        const {idSessionP} = this.props.match.params
        const {idProjet} = this.props.match.params
        console.log("isession")
        console.log(idSessionP)
        console.log("idProjet");
        console.log(idProjet)
        axios.get('https://labelplatform.herokuapp.com/projects/ListeMembres/'+idSessionP+'/'+idProjet)
            .then(response => {
                this.setState({
                    loading: false,
                    members: response.data.data.members,
                    idProj: response.data.data._id,
                    idSession: response.data.idSessionBack,
                    NomSession: response.data.NomSession,
                    DateFinSession: response.data.DateFinSession
                });
                console.log(response.data.data.members)

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    supprimerMembre = (idSession, idProjet, idMember) => {

        axios.get('https://labelplatform.herokuapp.com/members/deleteMember/' + idSession + '/' + idProjet + '/' + idMember
        ).then((response) => {
            console.log(response);

            if(response.data.done === true)
            {
                alert('membre supprimer avec success')
                this.loadMembers()
            }
        }).catch(() => {

        })
    }

    definirLeader(idSession, idProjet, idMember) {
        console.log({idSession, idProjet, idMember})
        axios.put('https://labelplatform.herokuapp.com/members/leader/' + idSession + '/' + idProjet + '/' + idMember).then(
        ).then((response) => {
            console.log(response)
            console.log("definir comme leader");

            if(response.data.done === true)
            {
                alert('membre defini comme leader')
                this.loadMembers()
            }
        }).catch(() => {

        })
    }


    render() {
        return (

            <div
                id="container"
                className="effect mainnav-sm navbar-fixed mainnav-fixed">

                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>


                        <div className="panel">

                            <div className="panel-body">
                                <div className="panel-heading" id={"divtitle"}>
                                            <label id={"label1"}>
                                                {this.state.NomSession} &nbsp;
                                                <span>
                                                    {Moment(this.state.DateFinSession).format('YYYY')}
                                                </span>
                                            </label>

                                            <label>
                                                Deadline : {Moment(this.state.DateFinSession).format('DD/MM/YYYY')}
                                            </label>
                                </div>
                                <Table striped id={"table"}>

                                    <thead>
                                    <tr>

                                        <th>Name Prenom</th>
                                        <th>Role</th>
                                        <th>Action</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {/*{this.state.loading ? 'Loading .......... ' : <>*/}
                                        {this.state.members.map((member, idx) => {
                                            if (member.Role === 'lead') {
                                                return (

                                                    <tr key={idx}>
                                                        <td>
                                                            {member.FirstName}{member.LastName}{member.Email}
                                                        </td>
                                                        <td>
                                                            {member.Role}
                                                        </td>


                                                        <td>
                                                            <Link to={"/members/editMember/"+this.state.idSession+"/"+this.state.idProj+"/" + member._id}
                                                                  params={{
                                                                      idMembre: member._id,
                                                                      idSession: this.state.idSession,
                                                                      idProjet: this.state.idProj}}>
                                                                Editer
                                                            </Link>

                                                            <Button color="link"
                                                                onClick={() => this.supprimerMembre(this.state.idSession, this.state.idProj, member._id)}>
                                                                Supprimer
                                                            </Button>

                                                        </td>


                                                    </tr>

                                                )
                                            }
                                            else {
                                                return (

                                                    <tr key={idx}>
                                                        <td>
                                                            {member.FirstName}{member.LastName}{member.Password}
                                                        </td>
                                                        <td>
                                                            {member.Role}
                                                        </td>
                                                        <td>
                                                            <Button color="link"
                                                                onClick={() => this.definirLeader(this.state.idSession, this.state.idProj, member._id)}>
                                                                Definir comme leader
                                                            </Button>
                                                            &nbsp;
                                                            <Link to={"/members/editMember/"+this.state.idSession+"/"+this.state.idProj+"/" + member._id}
                                                                params={{
                                                                    idMembre: member._id,
                                                                    idSession: this.state.idSession,
                                                                    idProjet: this.state.idProj}}>
                                                                Editer
                                                            </Link>
                                                            <Button color="link"
                                                                    onClick={() => this.supprimerMembre(this.state.idSession, this.state.idProj, member._id)}>
                                                                Supprimer
                                                            </Button>

                                                        </td>


                                                    </tr>

                                                )
                                            }

                                        })}

                                    {/*</>*/}
                                    {/*}*/}

                                    </tbody>
                                </Table>
                                <div id={"btnajout"}>
                                    <Link to={"/members/addMember/"+this.state.idSession+"/"+this.state.idProj}
                                    params={{

                                    idSession: this.state.idSession,
                                    idProjet: this.state.idProj}}>

                                    Ajouter un nouveau membre</Link>

                                </div>
                            </div>
                        </div>


                    </div>

                    <Nav1/>

                </div>

            </div>

        );
    }

}

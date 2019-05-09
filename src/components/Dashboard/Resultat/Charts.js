import React from 'react';
import axios from 'axios';
import {Bar,Line,Pie,Doughnut} from "react-chartjs-2";
import "../../../App.css"
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav3 from "../../../containers/Nav3";
import Moment from 'moment';

import {Link} from "react-router-dom";
import classnames from 'classnames';

export  default  class Resultat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            StartDate:'',
            nomSession :'',
            Project:[],
            nomProjet:[]

        };


    }





    componentDidMount=event=> {
        // const {idSession} = this.props.match.params
        // console.log(idSession)
        var listeProjet=[];
        axios.get(`http://localhost:6003/sessions/charts/5cc2207f99c9a41200baaee1`)
            .then(response => {
                const projets=response.data;
                let listePValide=[];
                let labelListe=[' Projet valide','Projet invalide'];
                let listePInvalide =[];
                listePValide.push(projets.valide);
                listePInvalide.push(projets.invalide);


                console.log("listePValide")
                console.log(listePValide)
                console.log("listePInvalide")
                console.log(listePInvalide)
                this.setState({
                    StartDate:response.data.data.StartDate,
                    nomSession:response.data.data.Name ,
                    chartData :{
                        //labels:  listePValide+listePInvalide ,
                        labels: labelListe,
                        datasets:[{
                            // label:'Project',
                            data:listePValide+listePInvalide,
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderColor:[
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 5,
                            hoverBorderColor:'#000',
                            hoverBorderWidth:5

                        }
                        ]
                    }
                })

            });







    }

    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right',
        labelsLegend: {
            fontColor:'#000'
        }
    }





    render() {
        return (

            <div id = "container" className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>

                        <div className="panel">
                            <div className="panel-body">
                                <div className="panel-heading" id={"divtitle"}>
                                    <label>

                                    </label>
                                </div>


                                <div className="panel-body">
                                    <Pie
                                        data={this.state.chartData}
                                        options={{
                                            title:{
                                                display:this.props.displayTitle,
                                                text: this.state.nomSession +' '
                                                    + Moment(this.state.StartDate).format('YYYY'),
                                                fontSize:25
                                            },
                                            legend:{
                                                // display:true,
                                                // position:true,
                                                labels:this.props.labelsLegend
                                            },
                                            // layout:{
                                            //     padding:{
                                            //         left:50,
                                            //         right:0,
                                            //         bottom:0,
                                            //         top:0
                                            //     }
                                            // }
                                        }}
                                    />
                                </div>



                            </div>

                        </div>


                    </div>

                    <Nav3/>

                </div>

            </div>
        )
    }}
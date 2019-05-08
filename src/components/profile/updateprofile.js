import React from 'react';
import Nav1 from '../../containers/Nav1.js';
import Header from '../../containers/Header.js';
import ContentContainer from '../../containers/ContentContainer';
import Nav from '../../containers/Nav.js';

import axios from "axios";
import './profile.css';

import { Redirect } from 'react-router-dom'


export default class updateprofile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            cfpassword:'',
            oldpassword:'',
            firstName:'',
            lastName:'',
            bio:'',
            tel:'',
            gender:'',
            color_password_input:'',
            color_cfpassword_input:'',
            error: 'true',
            error_msg: '',
            errors: {},

        } ;

 

        this.handleChange = this.handleChange.bind(this);

        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

    };



handleChange(event) {
   if (event.target.name === 'username')
          this.setState({username: event.target.value})

       if (event.target.name === 'password')
          this.setState({password: event.target.value})

       if (event.target.name === 'firstName')
          this.setState({firstName: event.target.value})
      
       if (event.target.name === 'lastName')
          this.setState({lastName: event.target.value})

       if (event.target.name === 'password')
          this.setState({password: event.target.value})
       if (event.target.name === 'cfpassword')
          this.setState({cfpassword: event.target.value})

       if (event.target.name === 'oldpassword')
          this.setState({oldpassword: event.target.value})
       if (event.target.name === 'bio')
          this.setState({bio: event.target.value})
       if (event.target.name === 'tel')
          this.setState({tel: event.target.value})
       if (event.target.name === 'gender')
          this.setState({gender: event.target.value})
       
}

 handleClick2 = event => {
   
   if(this.state.password.length != 0 && this.state.password == this.state.cfpassword){
 axios.post('https://labelplatform.herokuapp.com/users/update/pwd', {
   user_id: localStorage.user_id,
   
   password:this.state.password, 
  })
                .then(res => {
                   //  const {token} = res.data;
                   //  localStorage.setItem('jwtToken', token);
                   //  setAuthToken(token);
                   //  const decoded = jwt_decode(token);
                   // const user1 =setCurrentUser(decoded)
                   if(res.data.error == false){
                       this.setState({error: 'true'})
                       
                        this.props.history.push("/logout");
                        
                       
                        
                      

                   }
                   console.log(res.data)
                })

 
}else {
  if(this.state.password != this.state.cfpassword && this.state.cfpassword.length!=0 && this.state.password.length!=0){
 this.setState({color_password_input: 'rgb(39, 129, 42)'}) 
  this.setState({color_cfpassword_input: 'rgb(39, 129, 42)'}) 
  }
}
 }
 handleClick = event => {


console.log(localStorage.user_id)
console.log(this.state.username)
console.log(this.state.firstName)
 axios.post('http://localhost:6003/users/update', {
   user_id: localStorage.user_id,
   email:this.state.username , 
   password:this.state.password, 
   firstName:this.state.firstName, 
   tel:this.state.tel, 
   bio:this.state.bio, 
   lastName: this.state.lastName})
                .then(res => {
                   //  const {token} = res.data;
                   //  localStorage.setItem('jwtToken', token);
                   //  setAuthToken(token);
                   //  const decoded = jwt_decode(token);
                   // const user1 =setCurrentUser(decoded)
                   if(res.data.error == false){
                       this.setState({error: 'true'})
                       
                        localStorage.setItem('user_email', res.data.user.Email);
                         localStorage.setItem('user_fistname', res.data.user.FirstName);
                         localStorage.setItem('user_lastname', res.data.user.LastName);
                         
                         if(res.data.user.tel)
                         localStorage.setItem('user_tel', res.data.user.tel);

                         if(res.data.user.bio)
                         localStorage.setItem('user_bio', res.data.user.bio);

                        

                        console.log(res.data)
                        window.location.reload();
                        
                       
                        
                      

                   }
                   console.log(res.data)
                })

 }

    render(){
       if(!localStorage.user_id)
        return <Redirect to='/login' />

         return (
            <div id = "container"   className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
             <Header/>

                <div className="boxed">

 <div className="boxed">
        {/*CONTENT CONTAINER*/}
        {/*===================================================*/}
        <div id="content-container">
          <div className="pageheader hidden-xs">
            <br/>
            <div className="breadcrumb-wrapper">
              <span className="label">You are here:</span>
              <ol className="breadcrumb">
                <li> <a href="/"> Home </a> </li>
                <li className="active"> Update User Profile </li>
              </ol>
            </div>
          </div>
          {/*Page content*/}
          {/*===================================================*/}
          <div id="page-content">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div className="userWidget-1">
                  <div className="avatar bg-info">
                    <img src="../../img/av1.png" alt="avatar" />
                    <div className="name osLight td"> {localStorage.user_fistname} {localStorage.user_lastname} </div>
                  </div>
                  <div className="title"> Username/Email : {localStorage.user_email} </div>
                  <ul className="fullstats">
                   
                  </ul>
                  <div className="clearfix"> </div>
                </div>
              
                <div className="panel">
                  <div className="panel-heading">
                    <h4 className="panel-title td"> <i className="fa fa-users" /> My Team membre </h4>
                  </div>
                  <div className="panel-body">
                   <ul className="list-inline">
                      <li>
                        <a href="#AddTeam" className="pull-left avatar">
                          <button  className="button label label-sm label-info" >Add Team membre</button>
                        </a>
                      </li>
                      </ul>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-heading">
                    <h4 className="panel-title td"> <i className="fa fa-address-book-o" /> Statut </h4>
                  </div>
                  <div className="panel-body">
                   <ul className="list-inline">
                      <li>
                        <a href="#AddTeam" className="pull-left avatar">
                          <button  className="button label label-sm label-info" >Candidat</button>
                        </a>
                      </li>
                      </ul>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">
                    <h3 className="panel-title"><i className="fa fa-user"> </i> User Information</h3>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                       

                       

                        <tr className="td">
                   
                          <td className="td"><a href="/disable/profile" className="label label-sm label-info" style={{backgroundColor: 'red'}}>Remove my candidature</a></td>
                        </tr>
                     
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                <div className="panel">
                  <div className="">
                    {/*Default Tabs (Left Aligned)*/} 
                    {/*===================================================*/}
                    <div className="">
                      <div className="panel-body form-horizontal td">
        {/*Static*/}
        <div className="form-group">
          <label className="col-md-3 control-label"></label>
          <div className="col-md-9">
            <p className="form-control-static">Username</p>
          </div>
        </div>
        {/*Text Input*/}
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-text-input">Username / Email</label>
          <div className="col-md-9">
            <input type="text" id="demo-text-input" className="form-control" placeholder={localStorage.user_email} name="username"  value={this.state.username} onChange={this.handleChange.bind(this)} />
       
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-text-input">FirstName</label>
          <div className="col-md-9">
            <input type="text" id="demo-text-input" className="form-control" placeholder={localStorage.user_fistname} name="firstName"  value={this.state.firstName} onChange={this.handleChange.bind(this)} />
       
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-text-input">LastName</label>
          <div className="col-md-9">
            <input type="text" id="demo-text-input" className="form-control" placeholder={localStorage.user_lastname} name="lastName"  value={this.state.lastName} onChange={this.handleChange.bind(this)} />
       
          </div>
        </div>
           {/*Textarea*/}
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-textarea-input">BIO</label>
          <div className="col-md-9">
            <textarea id="demo-textarea-input" rows={9} className="form-control" placeholder={localStorage.user_bio} defaultValue={""}  name="bio"  value={this.state.bio} onChange={this.handleChange.bind(this)}/>
          </div>
        </div>
           {/*Textarea*/}

         {/*Textarea*/}
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-textarea-input" >Num° Telephone</label>
          <div className="col-md-9">
            <input type="texte" className="form-control" placeholder={localStorage.user_tel} defaultValue={""} name="tel"  value={this.state.tel} onChange={this.handleChange.bind(this)} />
          </div>
        </div>

           <div className="form-group pad-ver-5">
          <label className="col-md-3 control-label">Gender</label>
          <div className="col-md-9">
            <div className="col-md-6 pad-no left_op">
              {/* Icon Radio Buttons */}
              <div className="radio">
                <label className="form-radio form-icon active">
                  <input type="radio" defaultChecked name="ico-blk" /> Male</label>
              </div>
              <div className="radio">
                <label className="form-radio form-icon">
                  <input type="radio" name="ico-blk" /> Female</label>
              </div>
              <div className="radio">
                <label className="form-radio form-icon">
                  <input type="radio" name="ico-blk" /> Other</label>
              </div>
            </div>
          </div>
        </div>
   
        {/*Password*/}
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-password-input" name="oldpassword"  value={this.state.oldpassword} onChange={this.handleChange.bind(this)}>Old Password</label>
          <div className="col-md-9">
            <input type="password" id="demo-password-input" className="form-control" placeholder="Your old Password" />
            
          </div>
        </div>
      {/*Password*/}
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-password-input">New Password</label>
          <div className="col-md-9">
            <input type="password" id="demo-password-input" className="form-control" placeholder="New Password" name="password" style={{backgroundColor: this.state.color_password_input}} value={this.state.password} onChange={this.handleChange.bind(this)} />
            
          </div>
        </div>
      {/*Password*/}
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="demo-password-input">Confirm Password</label>
          <div className="col-md-9">
            <input type="password" id="demo-password-input2" className="form-control" placeholder="Confirm Password" style={{backgroundColor: this.state.color_cfpassword_input}} name="cfpassword"  value={this.state.cfpassword} onChange={this.handleChange.bind(this)} />
            
          </div>
        </div>
        
        
        
        <div className="panel-footer text-right">
                                                <button className="btn btn-info" type="submit"  onClick={this.handleClick}>Update my profile</button>
                                                <button className="btn btn-warning" type="submit"  onClick={this.handleClick2}>Change my password</button>
                                            </div>
      </div>
                    </div>
                    {/*===================================================*/} 
                    {/*End Default Tabs (Left Aligned)*/} 
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===================================================*/}
          {/*End page content*/}
        </div>
        {/*===================================================*/}
        {/*END CONTENT CONTAINER*/}
        {/*MAIN NAVIGATION*/}
        {/*===================================================*/}
        <nav id="mainnav-container">
          {/*Brand logo & name*/}
          {/*================================*/}
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <i className="fa fa-forumbee brand-icon" />
              <div className="brand-title">
                <span className="brand-text">WOW</span>
              </div>
            </a>
          </div>
          {/*================================*/}
          {/*End brand logo & name*/}
          <div id="mainnav">
            {/*Menu*/}
            {/*================================*/}
            <div id="mainnav-menu-wrap">
              <div className="nano">
                <div className="nano-content">
                  <ul id="mainnav-menu" className="list-group">
                    {/*Category name*/}
                    <li className="list-header">Navigation</li>
                    {/*Menu list item*/}
                    <li> <a href="index.html"> <i className="fa fa-home" /> <span className="menu-title"> Dashboard </span> </a> </li>
                    {/*Category name*/}
                    <li className="list-header">Components</li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-th" />
                        <span className="menu-title">
                          Layouts
                        </span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="layout-blank.html"><i className="fa fa-caret-right" /> Blank Page </a></li>
                        <li><a href="layout-boxed.html"><i className="fa fa-caret-right" /> Boxed Version </a></li>
                        <li><a href="layout-collapsed-sidebar.html"><i className="fa fa-caret-right" /> Collapsed Sidebar </a></li>
                        <li><a href="layout-push-menu.html"><i className="fa fa-caret-right" /> Push Menu </a></li>
                        <li><a href="layout-slide-menu.html"><i className="fa fa-caret-right" /> Slide Menu </a></li>
                        <li><a href="layout-horizontal-menu.html"><i className="fa fa-caret-right" /> Horizontal Menu </a></li>
                        <li><a href="layout-horizontal-menu-boxed.html"><i className="fa fa-caret-right" /> Boxed Horizontal </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-briefcase" />
                        <span className="menu-title">UI Elements</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="ui-animation.html"><i className="fa fa-caret-right" /> CSS3 Animation </a></li>
                        <li><a href="ui-panel.html"><i className="fa fa-caret-right" /> Panel </a></li>
                        <li><a href="ui-xeditable.html"><i className="fa fa-caret-right" /> Xeditable </a></li>
                        <li><a href="ui-button.html"><i className="fa fa-caret-right" /> Buttons </a></li>
                        <li><a href="ui-fontawesome.html"><i className="fa fa-caret-right" /> Fontawesome </a></li>
                        <li><a href="ui-icons.html"><i className="fa fa-caret-right" /> Icons </a></li>
                        <li><a href="ui-components.html"><i className="fa fa-caret-right" /> Components </a></li>
                        <li><a href="ui-timeline.html"><i className="fa fa-caret-right" /> Timeline </a></li>
                        <li><a href="ui-nested-lists.html"><i className="fa fa-caret-right" /> Nested Lists </a></li>
                        <li><a href="ui-grids.html"><i className="fa fa-caret-right" /> Grids </a></li>
                        <li><a href="ui-tab.html"><i className="fa fa-caret-right" /> Tab </a></li>
                        <li><a href="ui-accordions.html"><i className="fa fa-caret-right" /> Accordions </a></li>
                        <li><a href="ui-dragdrop.html"><i className="fa fa-caret-right" /> Draggable Panel</a></li>
                        <li><a href="ui-typography.html"><i className="fa fa-caret-right" /> Typography </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-file" />
                        <span className="menu-title">Pages</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="pages-faq.html"><i className="fa fa-caret-right" /> FAQ </a></li>
                        <li><a href="pages-gallery.html"><i className="fa fa-caret-right" /> Gallery </a></li>
                        <li><a href="pages-directory.html"><i className="fa fa-caret-right" /> Directory </a></li>
                        <li><a href="pages-profile.html"><i className="fa fa-caret-right" /> User Profile </a></li>
                        <li><a href="pages-invoice.html"><i className="fa fa-caret-right" /> Invoice </a></li>
                        <li><a href="pages-login.html"><i className="fa fa-caret-right" /> Login </a></li>
                        <li><a href="pages-register.html"><i className="fa fa-caret-right" /> Register </a></li>
                        <li><a href="pages-password-reminder.html"><i className="fa fa-caret-right" /> Password Reminder </a></li>
                        <li><a href="pages-lock-screen.html"><i className="fa fa-caret-right" /> Lock Screen </a></li>
                        <li><a href="pages-404.html"><i className="fa fa-caret-right" /> 404 Error </a></li>
                        <li><a href="pages-500.html"><i className="fa fa-caret-right" /> 500 Error </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-table" />
                        <span className="menu-title">Tables</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="table-static.html"><i className="fa fa-caret-right" /> Static Table <span className="label label-info pull-right">New</span></a></li>
                        <li><a href="table-datatable.html"><i className="fa fa-caret-right" /> Datatable Table </a></li>
                        <li><a href="table-footable.html"><i className="fa fa-caret-right" /> Footable Table </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-edit" />
                        <span className="menu-title">Forms</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="forms-layout.html"><i className="fa fa-caret-right" /> Form Layout </a></li>
                        <li><a href="forms-switchery.html"><i className="fa fa-caret-right" /> Form Switchery </a></li>
                        <li><a href="forms-components.html"><i className="fa fa-caret-right" /> Form Components </a></li>
                        <li><a href="forms-validation.html"><i className="fa fa-caret-right" /> Form Validation </a></li>
                        <li><a href="forms-wizard.html"><i className="fa fa-caret-right" /> Form Wizard </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-line-chart" />
                        <span className="menu-title">Charts</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="charts-flot.html"><i className="fa fa-caret-right" /> Flot Chart </a></li>
                        <li><a href="charts-morris.html"><i className="fa fa-caret-right" /> Morris Chart </a></li>
                      </ul>
                    </li>
                    <li className="list-divider" />
                    {/*Category name*/}
                    <li className="list-header">Extra</li>
                    {/*Menu list item*/}
                    <li>
                      <a href="calendar.html">
                        <i className="fa fa-calendar" />
                        <span className="menu-title">
                          Calendar
                        </span>
                      </a>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="ui-widgets.html">
                        <i className="fa fa-flask" />
                        <span className="menu-title">
                          Widgets
                          <span className="label label-pink pull-right">New</span>
                        </span>
                      </a>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope-o" />
                        <span className="menu-title">Mail</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="mail-inbox.html"><i className="fa fa-caret-right" /> Inbox </a></li>
                        <li><a href="mail-compose.html"><i className="fa fa-caret-right" /> Compose </a></li>
                        <li><a href="mail-mailview.html"><i className="fa fa-caret-right" /> Mail View </a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-map-marker" />
                        <span className="menu-title">
                          Maps
                          <span className="label label-mint pull-right">New</span>
                        </span>
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="maps-gmap.html">Google Maps</a></li>
                        <li><a href="maps-vectormap.html">Vector Maps</a></li>
                      </ul>
                    </li>
                    {/*Menu list item*/}
                    <li>
                      <a href="#">
                        <i className="fa fa-plus-square" />
                        <span className="menu-title">Menu Level</span>
                        <i className="arrow" />
                      </a>
                      {/*Submenu*/}
                      <ul className="collapse">
                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                        <li className="list-divider" />
                        <li>
                          <a href="#">Third Level<i className="arrow" /></a>
                          {/*Submenu*/}
                          <ul className="collapse">
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">Third Level<i className="arrow" /></a>
                          {/*Submenu*/}
                          <ul className="collapse">
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li className="list-divider" />
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                            <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  {/*Widget*/}
                  {/*================================*/}
                  <div className="mainnav-widget">
                    {/* Show the button on collapsed navigation */}
                    <div className="show-small">
                      <a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
                        <i className="fa fa-desktop" />
                      </a>
                    </div>
                    {/* Hide the content on collapsed navigation */}
                    <div id="demo-wg-server" className="hide-small mainnav-widget-content">
                      <ul className="list-group">
                        <li className="list-header pad-no pad-ver">Server Status</li>
                        <li className="mar-btm">
                          <span className="label label-primary pull-right">15%</span>
                          <p>CPU Usage</p>
                          <div className="progress progress-sm">
                            <div className="progress-bar progress-bar-primary" style={{width: '15%'}}>
                              <span className="sr-only">15%</span>
                            </div>
                          </div>
                        </li>
                        <li className="mar-btm">
                          <span className="label label-purple pull-right">75%</span>
                          <p>Bandwidth</p>
                          <div className="progress progress-sm">
                            <div className="progress-bar progress-bar-purple" style={{width: '75%'}}>
                              <span className="sr-only">75%</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*================================*/}
                  {/*End widget*/}
                </div>
              </div>
            </div>
            {/*================================*/}
            {/*End menu*/}
          </div>
        </nav>
        {/*===================================================*/}
        {/*END MAIN NAVIGATION*/}
      </div>
             <Nav1/>

                </div>

            </div>

     
    );

    
   
  

}}

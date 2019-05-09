import React from 'react';
import './auth.css';
import './register.css';
import axios from "axios";
import logo from './logo_label_blanc.png';
import { Redirect } from 'react-router-dom'

export  default  class register extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            cfpassword:'',
            firstName:'',
            lastName:'',
            error: 'true',
            color_user_input:'',
            color_pwd_input:'',
            color_firstName_input:'',
            color_lastName_input:'',
            color_cfpassword_input:'',
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

       if (event.target.name === 'cfpassword')
          this.setState({cfpassword: event.target.value})
     
}

reset(){
                         this.setState({username: ''})  
                         this.setState({password: ''})  
                         this.setState({firstName: ''})  
                         this.setState({lastName: ''})  
                         this.setState({cfpassword: ''}) 

}

 handleClick = event => {
   console.log(this.state.username)
   console.log(this.state.password)
   console.log(this.state.FirstName)
   console.log(this.state.LastName)
   console.log(this.state.cfpassword)
   
   if(this.state.username.length == 0){
       console.log("vide")
   this.setState({color_user_input: '#ff0000ba'})
   }else {
   this.setState({color_user_input: 'rgb(39, 129, 42)'})  
   }

    if(this.state.password.length == 0){
       console.log("vide")
   this.setState({color_pwd_input: '#ff0000ba'})
   }else {
   this.setState({color_pwd_input: 'rgb(39, 129, 42)'})  
   }

    if(this.state.firstName.length == 0){
       console.log("vide")
   this.setState({color_firstName_input: '#ff0000ba'})
   }else {
   this.setState({color_firstName_input: 'rgb(39, 129, 42)'})  
   }

    if(this.state.lastName.length == 0){
       console.log("vide")
   this.setState({color_lastName_input: '#ff0000ba'})
   }else {
   this.setState({color_lastName_input: 'rgb(39, 129, 42)'})  
   }
    if(this.state.cfpassword.length == 0){
       console.log("vide")
   this.setState({color_cfpassword_input: '#ff0000ba'})
   }else {
   this.setState({color_cfpassword_input: 'rgb(39, 129, 42)'})  
   }



   if(this.state.password.length != 0 && this.state.cfpassword.length !=0 && this.state.username.length !=0 && this.state.firstName.length !=0 && this.state.lastName.length !=0){
            
   if(this.state.cfpassword != this.state.password){
        this.setState({color_cfpassword_input: '#ff0000ba'})
         this.setState({color_pwd_input: '#ff0000ba'})    
         this.setState({error: ''})
          this.setState({error_msg: 'Check your password and confirm password fields!'})
   }else{
         this.setState({error: 'true'})
          this.setState({error_msg: ''})
              console.log(this.state.username)
              console.log(this.state.password)
              console.log(this.state.firstName)
              console.log(this.state.lastName)

            axios.post('https://labelplatform.herokuapp.com/signin/candidat', {email:this.state.username , password:this.state.password, firstName:this.state.firstName, lastName: this.state.lastName})
                .then(res => {
                   //  const {token} = res.data;
                   //  localStorage.setItem('jwtToken', token);
                   //  setAuthToken(token);
                   //  const decoded = jwt_decode(token);
                   // const user1 =setCurrentUser(decoded)
                   if(res.data.error == false){
                       this.setState({error: 'true'})
                        localStorage.setItem('user_id', res.data.user_id);
                        localStorage.setItem('user_email', res.data.user.email);
                        localStorage.setItem('user_fistname', res.data.user.firstName);
                        localStorage.setItem('user_lastname', res.data.user.lastName);
                        console.log(res.data)
                        
                       
                        this.props.history.push("/Dashboard");
                      

                   }else{


                        this.setState({error: ''})
                         this.setState({error_msg: res.data.error})
                        //this.reset() 
                   }
                   console.log(res.data)
                })

   }
          
   }else{
          this.setState({error: ''})
          this.setState({error_msg: 'Check your fields!'})
   }


}




    render(){
        if(localStorage.user_id)
        return <Redirect to='/Dashboard' />
        return (
           <div className="login-wrap sign_in_wrap">
        <div className="login-html">
          <a href="/" className="aligncenter">
            <img className="logo_h_91 signin_html_wrap" src={logo} /><br />
          </a>
          <div hidden={this.state.error} className="alert alert-danger" role="alert">{this.state.error_msg}</div>
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign Up</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab" />
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="text-center social-btn" hidden='true'>
                <a href="https://labelplatform.herokuapp.com/auth/facebook" className="btn btn-primary btn-block"><i className="fa fa-facebook" /> Sign up with <b>Facebook</b></a>
                <a href="#" className="btn btn-danger btn-block"><i className="fa fa-google" /> Sign up with <b>Google</b></a>
              </div>
              <div className="hr2" />
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="username" className="label">Username or EMail</label>
                  <input id="username" type="text" style={{backgroundColor: this.state.color_user_input}} name="username" className="input"  value={this.state.username} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="group row col-12">
                <div className="col-6">
                  <label htmlFor="firstName" className="label">First name</label>
                  <input id="firstName" type="text" style={{backgroundColor: this.state.color_firstName_input}} name="firstName" className="input"  value={this.state.firstName} onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="col-6">
                  <label htmlFor="lastName" className="label">Last name</label>
                  <input id="lastName" type="text" style={{backgroundColor: this.state.color_lastName_input}} name="lastName" className="input"  value={this.state.lastName} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
             
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="password" className="label">Password</label>
                  <input id="password" type="password" className="input" style={{backgroundColor: this.state.color_pwd_input}} name="password"  value={this.state.password} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="group row col-12">
                <div className="col-12">
                  <label htmlFor="cfPassword" className="label">Confirm Password</label>
                  <input id="cfPassword" type="password" className="input" style={{backgroundColor: this.state.color_cfpassword_input}} name="cfpassword"  value={this.state.cfpassword} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="group">
                 <button  className="button" onClick={this.handleClick}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
        

    }}

import React, { Component } from 'react';
import { Button, FormGroup, Label, Input ,FormFeedback,Alert} from 'reactstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn} from '../actions';
class LoginPage extends Component {
    componentDidUpdate(){
        //console.log(this.props);
        const {error,isAuth} = this.props;
        if(error && this.bag){
            this.bag.setSubmitting(false);
        }
        if(isAuth){
            this.props.history.push('/');
        }
    }
    handleFormSubmit(values,bag){
        //console.log(values)
        this.props.signIn(values);
        this.bag = bag;
    }
    _renderErrorIfAny(){
        const {error} = this.props;
        if(error){
           return(
               <Alert color="danger">{error}</Alert>
           );
        }
    }
  render() {
    return (
      <div style={{padding:20}}>
        <h1>Sign In </h1>
        {this._renderErrorIfAny()}
        <Formik
            initialValues = {{email:'',password:''}}
            onSubmit = {this.handleFormSubmit.bind(this)}
            validationSchema = {Yup.object().shape({
                email:Yup.string().email().required(),
                password:Yup.string().min(4).required()
            })}
            render={({
                handleChange,
                handleSubmit,
                isValid,
                isSubmitting,
                handleBlur,
                errors,
                touched
            })=>(
                <div>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input invalid={errors.email && touched.email} type="email" name="email" placeholder="your email..." onChange={handleChange} onBlur={handleBlur}/>
                        {/* <Input type="email" name="email" placeholder="your email..." onChange={e=>console.log(e.target.value)}/>*/}
                        {errors.email && touched.email?<FormFeedback>{errors.email}</FormFeedback> :null}
                    </FormGroup>
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input invalid={errors.password && touched.password} type="password" name="password" placeholder="your password..." onChange={handleChange} onBlur={handleBlur}/>
                        {errors.password && touched.password?<FormFeedback>{errors.password}</FormFeedback> :null}
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting}>Sign In</Button>
                </div>
            )}
        />
        <Link to="/signup">DO not have an account? Sign Up now</Link>
      </div>
    );
  }
}
const mapStateToProps =({auth})=>{
    return {
        attemptting:auth.attemptting,
        error:auth.error,
        isAuth:auth.isAuth
    }
}
const Login = connect(mapStateToProps,{signIn})(LoginPage);
export {Login};

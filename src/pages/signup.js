import React, { Component } from 'react';
import { Button, FormGroup, Label, Input ,FormFeedback,Alert} from 'reactstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../actions';
class SignupComponent extends Component {
    componentDidUpdate(){
        //console.log(this.props);
        const {error,user} = this.props;
        if(error && this.bag){
            this.bag.setSubmitting(false);
        }
        if(user){
            this.props.history.push('/login');
        }
    }
    handleFormSubmit(values,bag){
        //console.log(values)
        this.props.signUp(values);
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
        <h1>Sign Up </h1>
        {/* {this._renderErrorIfAny()} */}
        <Formik
            initialValues = {{email:'',password:'',name:''}}
            onSubmit = {this.handleFormSubmit.bind(this)}
            validationSchema = {Yup.object().shape({
                email:Yup.string().email().required(),
                password:Yup.string().min(5).required(),
                name:Yup.string().min(3).required()
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
                        <Label>Name:</Label>
                        <Input invalid={errors.name && touched.name} type="text" name="name" placeholder="your name..." onChange={handleChange} onBlur={handleBlur}/>
                        {errors.name && touched.name?<FormFeedback>{errors.name}</FormFeedback> :null}
                    </FormGroup>
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
                    <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting}>Sign Up</Button>
                </div>
            )}
        />
        <Link to="/login">Have an account? Sign In now</Link>
      </div>
    );
  }
}
const mapStateToProps =({auth})=>{
    return {
        user:auth.user,
        error:auth.error
    }
}
const   Signup = connect(mapStateToProps,{signUp})(SignupComponent);
export {Signup};

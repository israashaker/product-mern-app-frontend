import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody,Input,FormGroup,Label,FormFeedback} from 'reactstrap';
import {Formik} from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import {saveProduct,resetSaved,fetchProduct} from '../actions/product_actions';
import { FloatButton,ErrorMessage } from '../components';
//import {clearErrorMessages} from '../actions/error_actions';
class AddFormComponent extends Component{
    constructor(props){
        super(props);
        this.state={modal: false};
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      componentDidUpdate(){
          const {saved,message,resetSaved,fetchProduct,selected} = this.props;
          const {modal} = this.state;
          if(message && this.bag){
              this.bag.setSubmitting(false);
          }
          //console.log(saved);
          if(saved && modal){
              resetSaved();
              fetchProduct(selected);
              this.toggle();
              this.bag.resetForm();
          }
      }
      _handleSubmitForm(values,bag){
        //console.log(values)
        this.props.saveProduct(values);
        this.bag = bag;
      }
      render() {
          const now = moment().format('YYYY-MM-DD');
        return (
          <div>
            <FloatButton clickMe={this.toggle}/>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
              <ModalBody>
                <Formik
                initialValues={{amount:'',created:now,description:''}}
                onSubmit ={this._handleSubmitForm.bind(this)} 
                validationSchema = {Yup.object().shape({
                    amount:Yup.number().min(1).required(),
                    created:Yup.date().required(),
                    description:Yup.string().min(3)
                })}
                render={({
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    values,
                    handleSubmit,
                    isValid,
                    isSubmitting})=>(
                    <div>
                        <ErrorMessage/>
                        <FormGroup>
                            <Label>Description:</Label>
                            <Input invalid={errors.description && touched.description} 
                             type="string"
                             name="description"
                             value={values.description} 
                             placeholder="Enter Product description..." 
                             onChange={handleChange}
                             onBlur={handleBlur}/>
                            {errors.description && touched.description && <FormFeedback>{errors.description}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Amount:</Label>
                            <Input invalid={errors.amount && touched.amount} 
                             type="number"
                             name="amount"
                             value={values.amount} 
                             placeholder="Enter Product amount..." 
                             onChange={handleChange}
                             onBlur={handleBlur}/>
                            {errors.amount && touched.amount && <FormFeedback>{errors.amount}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Date:</Label>
                            <Input invalid={errors.created && touched.created} 
                             type="date"
                             name="created"
                             value={values.created}
                             onChange={handleChange}
                             onBlur={handleBlur}/>
                            {errors.created && touched.created && <FormFeedback>{errors.created}</FormFeedback>}
                        </FormGroup>
                        <Button color="primary" onClick={handleSubmit}disabled={!isValid || isSubmitting}>Save Product</Button>
                    </div>
                )}/>
              </ModalBody>
            </Modal>
          </div>
        );
      }
}
const mapStateToProps = ({productv1,errors})=>{
    return {
        saved:productv1.saved,
        message:errors.message,
        selected:productv1.month
    }
}
const AddForm = connect(mapStateToProps,{saveProduct,resetSaved,fetchProduct})(AddFormComponent)
export {AddForm};

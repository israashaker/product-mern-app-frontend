import React,{Component} from 'react';
import {ListGroupItem ,Badge,Button} from 'reactstrap';
import moment from 'moment';
import {connect} from 'react-redux';
import {DeleteProduct,fetchProduct,EditProduct,resetSaved, resetEdited,resetDeleted} from '../actions/product_actions';
import {Modal, ModalHeader, ModalBody,Input,FormGroup,Label,FormFeedback} from 'reactstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from '../components';
class ProductItemComponent extends Component{
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
      _handleSubmitForm(values,bag){
        //console.log(values);
        const{EditProduct}=this.props;
        //console.log(this.props.item._id)
        EditProduct(this.props.item._id,values);
      }
     componentDidUpdate(){
        const {selected,edited,fetchProduct,resetEdited,deleted}=this.props;
         if (edited){
            resetEdited();
            fetchProduct(selected);
         }
         if(deleted){
             resetDeleted();
             fetchProduct(selected);
         }
     }
    handleDelete(id){
        var conf =window.confirm("Are you sure you want to delete this product?");
       if(conf){
           
                const {DeleteProduct} =this.props;
                DeleteProduct(id);
                }
    }
    render(){
        //const now = moment().format('YYYY-MM-DD');
        return(
            <ListGroupItem>
              <div className="float-left">
                    <span style={{marginRight:5}}>{this.props.item.description?this.props.item.description:"Product Item"}</span>
                    <Badge color="dark">${this.props.item.amount}</Badge>
                    <div>
                        {moment(this.props.item.created).format('LL')}
                    </div>
              </div>
              <div className="float-right">
                <Button color="success" onClick={this.toggle}>Edit</Button>{' '}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Edit Product</ModalHeader>
                <ModalBody>
                    <Formik
                    initialValues={{amount:this.props.item.amount,created:moment(this.props.item.created).format('YYYY-MM-DD'),description:this.props.item.description}}
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
                            <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting}>Edit Product</Button>
                        </div>
                    )}/>
                </ModalBody>
            </Modal>
                <Button color="danger" onClick={()=>this.handleDelete(this.props.item._id)}>Delete</Button>
              </div>
            </ListGroupItem>
        )
    }
}
const mapStateToProps =({productv1,errors})=>{
    return {
      selected:productv1.month,
      saved:productv1.saved,
      message:errors.message,
      edited:productv1.edited,
      deleted:productv1.deleted
    }
  }

const ProductItem = connect(mapStateToProps,{DeleteProduct,fetchProduct,resetSaved,EditProduct,resetEdited,resetDeleted})(ProductItemComponent);
export {ProductItem}
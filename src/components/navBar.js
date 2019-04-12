import React , {Component} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem } from 'reactstrap';
import {logUserOut} from '../actions'
class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen:false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  _renderLoginOrLogout(){
      const {isAuth,logUserOut,profile} = this.props;
      if(isAuth){
          return(
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
              <DropdownToggle caret outline color="info" size="sm">
                Welcome, {profile.name}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={()=> logUserOut()}>Logout</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          );
      }
      return(
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      );
  }
  render() {
    return (
      <div>
        <Navbar color="light" light  expand="md">
          <NavbarBrand href="/">Manage Product</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this._renderLoginOrLogout()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = ({auth})=>{
  return{
    isAuth:auth.isAuth,
    profile:auth.profile
  };
}
const NavBar  = connect(mapStateToProps,{logUserOut})(NavBarComponent);
export {NavBar};
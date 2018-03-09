import emojione from 'emojione';
import React, {PropTypes} from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {Row, Column} from 'hedron';

import Button from '../Button';
import J from '../J';
import LoginLink from './LoginLink';
import LogoutLink from './LogoutLink';
import Nav from './Nav';


const svg = styled.img`
  width: 250px;
`;

const Header = (props) => {
  return (
    <Nav {...props}/>
  );
};

Header.propTypes = {
  auth: React.PropTypes.object.isRequired,
  register: React.PropTypes.func.isRequired,
  signInwithEmailPassword: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
};

export default Header;

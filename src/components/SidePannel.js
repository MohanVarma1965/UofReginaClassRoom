import React from 'react';
import {Link} from 'react-router';

class SidePannel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='sidePannel'>

        {this.props.auth.isLogged ?
          "" :
          <Link to='/login'>
            <div className='sidePannel-item'> Login</div>
          </Link>
        }
        {this.props.auth.isLogged ?
          "" :
          <Link to='/register'>
            <div className='sidePannel-item'> Register</div>
          </Link>
        }

        {this.props.auth.isLogged ?

          <Link to='/lecturerHomepage'>
            <div className='sidePannel-item'> Lecturer Homepage</div>
          </Link>
        : ""
        }

        <Link to='/joinClassRoom'>
          <div className='sidePannel-item'> Join a Room</div>
        </Link>

      </div>
    );
  }
}


SidePannel.propTypes = {
  auth: React.PropTypes.object,
};


export default SidePannel;


import React, { Component } from 'react'
import './Header.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginWithTwitter, logoutWithTwitter } from '../../store'
import { Button, Dropdown, Icon } from 'semantic-ui-react'
import fetch from 'cross-fetch'
// import {Link} from 'react-router'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    this.props.connectLoginWithTwitter()
  }

  render () {
    return (
      <div>
        { this.props.user.username
          ? <div> <Dropdown text={this.props.user.username} icon='ellipsis vertical' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item>

                <Link to={'/user'}> My Saved Quotes </Link>

              </Dropdown.Item>
              <Dropdown.Item onClick={this.props.connectLogoutWithTwitter}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
          : <a href={'http://localhost:8080/login'}>
            <Button>
              <Icon name='twitter' size='big' />
          Login with Twitter
            </Button>
          </a>}
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return ({
    user: state.user
  })
}

const mapDispatchToProps = function (dispatch) {
  return {
    connectLoginWithTwitter (login) {
      dispatch(loginWithTwitter(login))
    },
    connectLogoutWithTwitter (login) {
      dispatch(logoutWithTwitter(login))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Header)

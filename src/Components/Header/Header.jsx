import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Button, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Header.css'
import { loginWithTwitter, logoutWithTwitter } from '../../store/header'

class Header extends Component {
  componentDidMount () {
    this.props.connectLoginWithTwitter()
  }

  render () {
    return (
      <div>
        { this.props.user.username
          ? (
            <div>
              <Dropdown
                text={this.props.user.username}
                icon="ellipsis vertical"
                floating
                labeled
                button
                className="icon"
              >
                <Dropdown.Menu>

                  <Dropdown.Item>
                    <Link to="/user"> My Saved Quotes </Link>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={this.props.connectLogoutWithTwitter}>
                Logout
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </div>
          )
          : (
            <a href="http://localhost:8080/login">
              <Button>
                <Icon name="twitter" size="big" />
          Login with Twitter
              </Button>
            </a>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.header.user
})

const mapDispatchToProps = dispatch => ({
  connectLoginWithTwitter (login) {
    dispatch(loginWithTwitter(login))
  },
  connectLogoutWithTwitter (login) {
    dispatch(logoutWithTwitter(login))
  }
})

Header.defaultProps = {
  user: {}
}
Header.propTypes = {
  connectLoginWithTwitter: propTypes.func.isRequired,
  connectLogoutWithTwitter: propTypes.func.isRequired,
  user: propTypes.shape({ username: propTypes.string })
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

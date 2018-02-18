import React, { Component } from 'react'
import './Header.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginWithTwitter } from '../../store'
import { Button, Icon } from 'semantic-ui-react'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
    this.getUser = this.getUser.bind(this)
  }

  getUser () {
    axios.get('http://localhost:8080/', {mode: 'cors', 'Cache-Control': 'no-cache'})
      .then(res =>
        console.log(res)
      )
      // .then(user =>
      //   this.setState({
      //     user: user
      //   })
      // )
      .catch(console.error())
  }

  render () {
    console.log(this.state.user)
    // if (!this.state.user) {
    this.getUser()
    // }
    return (
      <div>
        {(this.state.user.username) ? <p>{this.state.user.username}</p>
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

  })
}

const mapDispatchToProps = function (dispatch) {
  return {
    // connectLoginWithTwitter (login) {
    //   dispatch(loginWithTwitter(login))
  //   }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Header)

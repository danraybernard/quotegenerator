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
      user: null
    }
    this.getUser = this.getUser.bind(this)
  }

  async getUser () {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/',
      responseType: 'json',
      headers: {'Access-Control-Allow-Origin': '*'}
    })
      .then(res =>
        res.data
      )
      .then(user =>
        this.setState({
          user: user
        })
      )
      .catch(console.error())
  }

  componentDidMount () {
    // this.props.connectLoginWithTwitter()
  }
  componentDidUpdate () {
    // if (this.state.user !== null) {
    //   this.setState({user: this.props.user})
    // }

    if (this.state.user == null) {
      async function main () {
        try {
          var quote = await this.getUser()
          console.log(quote)
        } catch (error) {
          console.error(error)
        }
      }
    }
    // What is the best way to consistently check for a successful request on the server?

    // if (this.state.user == null) {
    //   async () => {
    //     try {
    //       this.getUser()
    //     } catch (e) { console.log(e) }
    //   }
    // }
  }

  componentWillReceiveProps () {
    // if (this.props !== undefined) {
    //   this.setState({user: this.props.user})
    // }
  }

  render () {
    if (this.state.user == null) { this.getUser() }
    // console.log(this.state)
    return (
      <div>
        {(this.state.user) ? <div> <p>{this.state.user.username}</p></div>
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
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Header)

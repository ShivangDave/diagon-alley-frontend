import { Modal, Grid, Form, Segment, Button, Divider } from 'semantic-ui-react';
import { useState } from 'react';
import { withRouter } from 'react-router';

const Auth = ({ loginView, setLoginView, history }) => {

  const [ secondOpen, setSecondOpen ] = useState(false)

  const [ email, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const logMeIn = () => {
    const user = {
      email, password
    }
    fetch('http://localhost:3000/api/v1/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user })
    }).then(res => res.json())
    .then(({data}) => {
      Object.keys(data.attributes).forEach(key => {
        localStorage.setItem(key,data.attributes[key])
      })
      setLoginView(false)
      setSecondOpen(false)
      history.push('/')
    })
  }

  const render = () => (
    <Segment placeholder className={'auth-form'}>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form>
            <Form.Input
              icon='user'
              iconPosition='left'
              label='Email'
              placeholder='Email'
              name='email'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              label='Password'
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button content='Login' primary onClick={logMeIn} />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Modal.Actions>
            <Button content='Sign up' icon='signup' size='big' onClick={() => setSecondOpen(true)} primary />
          </Modal.Actions>
        </Grid.Column>

      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  )

  const renderSignUp = () => {
    return (
      <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
      >
        <Segment placeholder className={'auth-form'}>
          <Form>
            <Form.Group unstackable widths={2}>
              <Form.Input label='First name' name='first_name' placeholder='First name' />
              <Form.Input label='Last name' name='last_name' placeholder='Last name' />
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Email' name='email' placeholder='Email' />
              <Form.Input label='Password' name='password' type='password' placeholder='Password' />
            </Form.Group>
            <Form.Checkbox label='I agree to the Terms and Conditions' name='agreement' />
            <Button type='submit' onClick={() => setSecondOpen(false)}>Submit</Button>
          </Form>
        </Segment>
      </Modal>
    )
  }

  return (
    <>
      <Modal
        onClose={() => setLoginView(false)}
        onOpen={() => setLoginView(true)}
        open={loginView}
        dimmer={'blurring'}
        closeIcon
        id={'auth-modal-container'}
      >
        {
          loginView && render()
        }
      </Modal>
      {
        renderSignUp()
      }
    </>
  )
}

export default withRouter(Auth);

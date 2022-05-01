import { Container, GridColumn, GridRow, Button, Form } from "semantic-ui-react";
import { Signup } from "./actions";

export default () => {
  const onSignup = ev => {
    const { email, password, confirmPassword } = ev.target.elements;
    const values = {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };
    Signup(values);
  };
  return (
    <Container>
      <GridRow columns={1}>
        <GridColumn>
          <Form size="large" onSubmit={onSignup}>
            <Form.Field>
              <label>Email</label>
              <input name="email" placeholder="Email" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" placeholder="Confirm Password" />
            </Form.Field>
            <Container textAlign="center">
              <Button type="submit">Signup</Button>
            </Container>
          </Form>
        </GridColumn>
      </GridRow>
    </Container>
  );
};

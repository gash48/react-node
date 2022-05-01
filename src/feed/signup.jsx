import { useNavigate } from "react-router-dom";
import { Container, GridColumn, GridRow, Button, Form } from "semantic-ui-react";
import { Signup } from "./actions";

export default () => {
  const navigate = useNavigate();

  const onSignup = ev => {
    const { name, email, password, confirmPassword } = ev.target.elements;
    const values = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };
    Signup(values).then(() => navigate("/login"));
  };
  return (
    <Container>
      <GridRow columns={1}>
        <GridColumn>
          <Form size="large" onSubmit={onSignup}>
            <Form.Field>
              <label>Name</label>
              <input name="name" placeholder="Name" />
            </Form.Field>
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

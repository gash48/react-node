import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, GridColumn, GridRow, Button, Checkbox, Form } from "semantic-ui-react";
import { Login } from "./actions";
import { GlobalContext } from "./global-context";

export default () => {
  const { login } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onLogin = ({ target }) => {
    const { email, password } = target.elements;
    const data = {
      email: email.value,
      password: password.value
    };
    Login(data).then(data => {
      login(data);
      navigate("/");
    });
  };
  return (
    <Container>
      <GridRow columns={1}>
        <GridColumn>
          <Form size="large" onSubmit={onLogin}>
            <Form.Field>
              <label>Email</label>
              <input name="email" placeholder="Email" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" />
            </Form.Field>
            <Container textAlign="center">
              <Button type="submit">Submit</Button>
            </Container>
          </Form>
        </GridColumn>
      </GridRow>
    </Container>
  );
};

import { Container, GridColumn, GridRow, Button, Form } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { ChangePassword } from "./actions";

export default () => {
  const { token } = useParams();

  const onChangePassword = ev => {
    const { token, password } = ev.target.elements;
    const values = {
      token: token.value,
      password: password.value
    };
    ChangePassword(values);
  };
  return (
    <Container>
      <GridRow columns={1}>
        <GridColumn>
          <Form size="large" onSubmit={onChangePassword}>
            <input type="text" hidden name="token" value={token} />
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" placeholder="Confirm Password" />
            </Form.Field>
            <Container textAlign="center">
              <Button type="submit">Confirm</Button>
            </Container>
          </Form>
        </GridColumn>
      </GridRow>
    </Container>
  );
};

import { useState } from "react";
import { Container, GridColumn, GridRow, Button, Form, Segment } from "semantic-ui-react";
import { ForgotPassword } from "./actions";

export default () => {
  const [sent, setSent] = useState(false);

  const onForgotPassword = ev => {
    const { email } = ev.target.elements;
    const values = {
      email: email.value
    };
    ForgotPassword(values).then(res => {
      setSent(true);
    });
  };
  return (
    <Container>
      <GridRow columns={1}>
        <GridColumn>
          {sent ? (
            <Segment textAlign="center" inverted color="green" padded="very">
              Email Sent Successfully !
              <br />
              <Button basic color="blue" onClick={onForgotPassword}>
                Send Again
              </Button>
            </Segment>
          ) : (
            <Form size="large" onSubmit={onForgotPassword}>
              <Form.Field>
                <label>Email</label>
                <input name="email" placeholder="Email" />
              </Form.Field>
              <Container textAlign="center">
                <Button type="submit">Send Mail</Button>
              </Container>
            </Form>
          )}
        </GridColumn>
      </GridRow>
    </Container>
  );
};

import { useEffect, useState } from "react";
import { Container, Header, Input, Button, Loader } from "semantic-ui-react";

import { CreateUser, FetchUsersCount } from "./actions";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default () => {
  const [total, setTotal] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    FetchUsersCount().then(setTotal);
  }, []);

  const onEmailChange = ev => setEmail(ev.target.value);

  const onSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      setLoading(true);
      CreateUser(email)
        .then(total => {
          setTotal(total);
          // setEmail("");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Container fluid>
      <Header size="huge" textAlign="center">
        JOIN US
      </Header>
      <Header size="medium" textAlign="center">
        Enter you email to join {total} others on our waitlist. We are not 100% a cult.
      </Header>
      <Container textAlign="center">
        <Input value={email} onChange={onEmailChange} placeholder="Enter your email" />
        <Button primary onClick={onSubmit} loading={loading} disabled={!email}>
          Primary
        </Button>
      </Container>
    </Container>
  );
};

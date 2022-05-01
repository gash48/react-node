import { useContext, useState } from "react";
import { Container, Header, Button, Card, Icon } from "semantic-ui-react";
import { FetchProfile } from "./actions";

import { GlobalContext } from "./global-context";

const defaultObj = {};

export default () => {
  const {
    data: { user },
    updateUser
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const fetchProfile = () => {
    setLoading(true);
    FetchProfile()
      .then(updateUser)
      .finally(() => setLoading(false));
  };

  const { name, email } = user || defaultObj;

  return (
    <Container fluid>
      <Header size="large">Profile</Header>
      <Container>
        <Card image="https://react.semantic-ui.com/images/avatar/large/elliot.jpg" header={name} meta={email} />

        <Button onClick={fetchProfile} loading={loading} icon>
          <Icon name="redo" /> Refetch
        </Button>
      </Container>
    </Container>
  );
};

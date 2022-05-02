import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Button, Card, Icon } from "semantic-ui-react";

import { FetchPost } from "./actions";

const defaultObj = {};

export default () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { postId } = useParams();

  const fetchPost = () => {
    setLoading(true);
    FetchPost(postId)
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(fetchPost, []);

  const { id, title, content, imageUrl, creator } = data || defaultObj;

  return (
    <Container fluid>
      <Header size="large">Product</Header>
      <Container>
        <Card
          key={`post-${id}`}
          image={imageUrl}
          header={title}
          meta={creator}
          description={content}
          fluid
        />
        <Button onClick={fetchPost} loading={loading} icon>
          <Icon name="redo" /> Refetch
        </Button>
      </Container>
    </Container>
  );
};

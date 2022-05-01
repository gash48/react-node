import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Button, Card, Icon } from "semantic-ui-react";

import { usCurrFormatter } from "../services/intl";
import { FetchProduct } from "./actions";

const defaultObj = {};

export default () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  const fetchProduct = () => {
    setLoading(true);
    FetchProduct(productId)
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(fetchProduct, []);

  const { id, title, imageUrl, price, description } = data || defaultObj;

  return (
    <Container fluid>
      <Header size="large">Product</Header>
      <Container>
        <Card
          key={`product-${id}`}
          image={imageUrl}
          header={title}
          meta={usCurrFormatter(price)}
          description={description}
          fluid
        />
        <Button onClick={fetchProduct} loading={loading} icon>
          <Icon name="redo" /> Refetch
        </Button>
      </Container>
    </Container>
  );
};

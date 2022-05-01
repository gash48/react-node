import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  GridColumn,
  Header,
  GridRow,
  Icon,
  Image,
  List,
  Advertisement,
  Label
} from "semantic-ui-react";
import { FetchCart, CheckoutOrder, DeleteFromCart, AddToCart, RemoveFromCart } from "./actions";

const defaultObj = {};

export default () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCart = () => {
    FetchCart().then(setData);
  };

  const addToCart = id => {
    setIsLoading(`add-${id}`);
    AddToCart(id)
      .then(fetchCart)
      .finally(() => setIsLoading(false));
  };

  const deleteFromCart = id => {
    setIsLoading(`delete-${id}`);
    DeleteFromCart(id)
      .then(fetchCart)
      .finally(() => setIsLoading(false));
  };

  const removeFromCart = id => {
    setIsLoading(`remove-${id}`);
    RemoveFromCart(id)
      .then(fetchCart)
      .finally(() => setIsLoading(false));
  };

  const onCheckout = () => {
    // CheckoutOrder();
    navigate("/checkout");
  };

  useEffect(fetchCart, []);

  const { cart, products = [] } = data || defaultObj;

  return (
    <Container fluid>
      <Container fluid>
        <Grid>
          <GridRow>
            <GridColumn width="12">
              <Header as="h2">Cart #{cart?.id}</Header>
            </GridColumn>
            <GridColumn width="4" textAlign="right">
              <Button color="orange" onClick={fetchCart} icon>
                <Icon name="redo" /> Refetch
              </Button>
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
      <br />
      <hr />
      <br />
      <Container>
        {products.length ? (
          <>
            <List divided verticalAlign="middle">
              {products.map(({ id, title, imageUrl, quantity }) => {
                const adding = isLoading == `add-${id}`;
                const deleting = isLoading == `delete-${id}`;
                const removing = isLoading == `remove-${id}`;
                return (
                  <List.Item key={`cart-item-${id}`}>
                    <List.Content floated="right">
                      <Label>
                        Quantity
                        <Label.Detail>{quantity}</Label.Detail>
                      </Label>
                      <Button icon onClick={() => addToCart(id)} disabled={adding} loading={adding}>
                        <Icon name="plus" />
                      </Button>
                      <Button icon onClick={() => deleteFromCart(id)} disabled={deleting} loading={deleting}>
                        <Icon name="minus" />
                      </Button>
                      <Button icon onClick={() => removeFromCart(id)} disabled={removing} loading={removing}>
                        <Icon name="trash" />
                      </Button>
                    </List.Content>
                    <Image avatar src={imageUrl} />
                    <List.Content>{title}</List.Content>
                  </List.Item>
                );
              })}
            </List>
            <Container>
              <Button primary onClick={onCheckout}>
                Checkout
              </Button>
            </Container>
          </>
        ) : (
          <Advertisement unit="banner" centered test="Cart Empty" />
        )}
      </Container>
    </Container>
  );
};

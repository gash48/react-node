import { useState, useEffect } from "react";
import { Button, Container, Grid, GridColumn, Header, GridRow, Icon, Image, Table } from "semantic-ui-react";
import CheckoutForm from "./checkout-form";
import { usCurrFormatter } from "../services/intl";
import { FetchCart } from "./actions";

const defaultObj = {};

export default () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = () => {
    setIsLoading(true);
    FetchCart()
      .then(setData)
      .finally(() => setIsLoading(false));
  };

  useEffect(fetchCart, []);

  const { cart, products = [], totalPrice = 0 } = data || defaultObj;
  const hasProducts = Boolean(products.length);

  return (
    <Container fluid>
      <Container fluid>
        <Grid>
          <GridRow>
            <GridColumn width="12">
              <Header as="h2">Checkout #{cart?.id}</Header>
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
        {!isLoading && hasProducts ? (
          <>
            <Table inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Net Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {products.map(({ id, title, imageUrl, quantity, price }) => (
                  <Table.Row key={`checkout-item-${id}`}>
                    <Table.Cell>
                      <Image avatar src={imageUrl} /> {title}
                    </Table.Cell>
                    <Table.Cell>{quantity}</Table.Cell>
                    <Table.Cell>{usCurrFormatter(quantity * price)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell>
                    Total Price: <span className="bold">{usCurrFormatter(totalPrice)}</span>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
            <Container>
              <CheckoutForm amount={totalPrice} />
            </Container>
          </>
        ) : null}
      </Container>
    </Container>
  );
};

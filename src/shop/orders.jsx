import { useState, useEffect } from "react";
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
  Label,
  Segment
} from "semantic-ui-react";
import { FetchOrders, DownloadInvoice } from "./actions";

const defaultObj = {};

export default () => {
  const [data, setData] = useState(null);

  const fetchOrders = () => {
    FetchOrders().then(setData);
  };

  const onDownloadInvoice = id => {
    DownloadInvoice(id);
  };

  useEffect(fetchOrders, []);

  const orders = data || defaultObj;

  return (
    <Container fluid>
      <Container fluid>
        <Grid>
          <GridRow>
            <GridColumn width="12">
              <Header as="h2">Orders</Header>
            </GridColumn>
            <GridColumn width="4" textAlign="right">
              <Button color="orange" onClick={fetchOrders} icon>
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
        {orders.length ? (
          <Segment color="teal" inverted>
            <List divided verticalAlign="middle">
              {orders.map(({ id, products }) => (
                <List.Item key={`order-${id}`}>
                  <List.Content floated="right" className="order-content">
                    <Button icon onClick={() => onDownloadInvoice(id)}>
                      <Icon name="download" />
                    </Button>
                  </List.Content>
                  <List.Content className="order-content">
                    <List.Header>Order #{id}</List.Header>
                    <Label>
                      Items
                      <Label.Detail>{products.length}</Label.Detail>
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        ) : (
          <Advertisement unit="banner" centered test="No Orders" />
        )}
      </Container>
    </Container>
  );
};

import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Container,
  Dimmer,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Loader,
  Card,
  Advertisement,
  Icon,
  Pagination,
  Label
} from "semantic-ui-react";
import { usCurrFormatter } from "../services/intl";
import { FetchProducts, AddToCart, RemoveProduct } from "./actions";
import { GlobalContext } from "./global-context";

const emptyObj = {};
const ITEMS_PER_PAGE = 3;

const usePage = (initPage = 1) => {
  const [search, setSearch] = useSearchParams({ initPage });
  const page = search.get("page") || initPage;
  const setPage = page => {
    setSearch({ page });
  };
  return [page, setPage];
};

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const {
    data: { isLoggedIn }
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [page, setPage] = usePage();

  const fetchProducts = () => {
    setIsLoading(true);
    FetchProducts(page)
      .then(setData)
      .finally(() => setIsLoading(false));
  };

  const onAddProduct = () => {
    navigate("/addProduct");
  };

  const addToCart = id => {
    setIsLoading(true);
    AddToCart(id).finally(() => setIsLoading(false));
  };

  const viewDetails = id => {
    navigate(`/product/${id}`);
  };

  const editProduct = id => {
    navigate(`/editProduct/${id}`);
  };

  const removeProduct = id => {
    setIsLoading(true);
    RemoveProduct(id)
      .then(fetchProducts)
      .finally(() => setIsLoading(false));
  };

  const onPageChange = (ev, { activePage }) => setPage(activePage);

  useEffect(fetchProducts, [page]);

  const { totalCount, products } = data || emptyObj;
  const hasProducts = Boolean(totalCount);

  const ctaSection = id => (
    <div>
      <Button primary onClick={() => addToCart(id)}>
        Add to Cart
      </Button>
      <Button secondary onClick={() => viewDetails(id)}>
        View Details
      </Button>
      <Button basic onClick={() => editProduct(id)} icon>
        <Icon name="edit" /> Product
      </Button>
      <Button basic onClick={() => removeProduct(id)} icon>
        <Icon name="trash" />
      </Button>
    </div>
  );

  return (
    <div className="products-page">
      {!data && isLoading ? (
        <Dimmer active>
          <Loader size="large">Loading products</Loader>
        </Dimmer>
      ) : (
        <Container fluid>
          <Container fluid>
            <Grid>
              <GridRow>
                <GridColumn width="10">
                  <Header as="h2">
                    Products{" "}
                    <Label>
                      Total Count: <Label.Detail>{totalCount}</Label.Detail>
                    </Label>
                  </Header>
                </GridColumn>
                <GridColumn width="6" textAlign="right">
                  {isLoggedIn && <Button color="yellow" content="Add Product" onClick={onAddProduct} />}
                  <Button
                    color="orange"
                    content="Refetch"
                    onClick={fetchProducts}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Container>
          <Container fluid>
            {hasProducts ? (
              <div>
                <Card.Group itemsPerRow={3}>
                  {products.map(({ id, title, price, description, imageUrl }) => (
                    <Card
                      key={`product-${id}`}
                      image={imageUrl}
                      header={title}
                      meta={usCurrFormatter(price)}
                      description={description}
                      extra={isLoggedIn && ctaSection(id)}
                    />
                  ))}
                </Card.Group>
                <Container textAlign="center" className="pagination-wrapper">
                  <Pagination
                    activePage={page}
                    totalPages={Math.ceil(totalCount / ITEMS_PER_PAGE)}
                    onPageChange={onPageChange}
                  />
                </Container>
              </div>
            ) : (
              <Advertisement unit="banner" centered test="No Products" />
            )}
          </Container>
        </Container>
      )}
    </div>
  );
};

export default Products;

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
import { FetchPosts, RemovePost } from "./actions";
import { GlobalContext } from "./global-context";
import socket from "../services/socket";

const emptyObj = {};
const ITEMS_PER_PAGE = 4;

const usePage = (initPage = 1) => {
  const [search, setSearch] = useSearchParams({ initPage });
  const page = search.get("page") || initPage;
  const setPage = page => {
    setSearch({ page });
  };
  return [page, setPage];
};

const Feeds = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const {
    data: { isLoggedIn }
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [page, setPage] = usePage();

  const fetchPosts = () => {
    setIsLoading(true);
    FetchPosts(page)
      .then(setData)
      .finally(() => setIsLoading(false));
  };

  const viewPost = id => {
    navigate(`/post/${id}`);
  };

  const onAddPost = () => {
    navigate("/addPost");
  };

  const editPost = id => {
    navigate(`/editPost/${id}`);
  };

  const removePost = id => {
    setIsLoading(true);
    RemovePost(id)
      .then(fetchPosts)
      .finally(() => setIsLoading(false));
  };

  const onPageChange = (ev, { activePage }) => setPage(activePage);

  useEffect(() => {
    socket.on("connected", (arg, cb) => {
      cb("Thank you server");
    });
  }, []);

  useEffect(fetchPosts, [page]);

  const { totalCount, posts } = data || emptyObj;
  const hasPosts = Boolean(totalCount);

  const ctaSection = id => (
    <div>
      <Button secondary onClick={() => viewPost(id)}>
        View Post
      </Button>
      <Button basic onClick={() => editPost(id)} icon>
        <Icon name="edit" /> Post
      </Button>
      <Button basic onClick={() => removePost(id)} icon>
        <Icon name="trash" />
      </Button>
    </div>
  );

  return (
    <div className="posts-page">
      {!data && isLoading ? (
        <Dimmer active>
          <Loader size="large">Loading posts</Loader>
        </Dimmer>
      ) : (
        <Container fluid>
          <Container fluid>
            <Grid>
              <GridRow>
                <GridColumn width="10">
                  <Header as="h2">
                    Posts{" "}
                    <Label>
                      Total Count: <Label.Detail>{totalCount}</Label.Detail>
                    </Label>
                  </Header>
                </GridColumn>
                <GridColumn width="6" textAlign="right">
                  {isLoggedIn && <Button color="yellow" content="Add Post" onClick={onAddPost} />}
                  <Button
                    color="orange"
                    content="Refetch"
                    onClick={fetchPosts}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Container>
          <Container fluid>
            {hasPosts ? (
              <div>
                <Card.Group itemsPerRow={4}>
                  {posts.map(({ id, title, content, creator, imageUrl }) => (
                    <Card
                      key={`post-${id}`}
                      image={imageUrl}
                      header={title}
                      meta={creator}
                      description={content}
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
              <Advertisement unit="banner" centered test="No Posts" />
            )}
          </Container>
        </Container>
      )}
    </div>
  );
};

export default Feeds;

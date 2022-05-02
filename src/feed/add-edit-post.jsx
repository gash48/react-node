import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Grid, GridColumn, GridRow, TextArea, Button, Header, Image } from "semantic-ui-react";
import { CreatePost, UpdatePost, FetchPost } from "./actions";

const defaultObj = {};

const AddEditPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const editMode = Boolean(postId);

  const fetchPost = () => {
    setLoading(true);
    FetchPost(postId)
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(editMode ? fetchPost : () => {}, []);

  const onSubmit = ({ target }) => {
    const { title: t, content: c, image: i } = target.elements;
    const data = { title: t.value, content: c.value, image: i.files[0] };
    const formData = new FormData();
    Object.keys(data).map(key => formData.append(key, data[key]));

    if (editMode) {
      formData.append("id", postId);
      formData.append("imageUrl", post.imageUrl);
      UpdatePost(formData).then(() => {
        navigate("/feeds");
      });
    } else {
      CreatePost(formData).then(() => {
        navigate("/feeds");
      });
    }
  };

  const { title = "", imageUrl = "", content = "" } = post || defaultObj;

  return (
    <Container>
      <Header as="h2">{editMode ? "Edit" : "Add"} Post</Header>
      <Grid columns={3}>
        <GridRow className="j-center">
          <GridColumn width={8}>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <label>Title</label>
                <input name="title" placeholder="Title" defaultValue={title} />
              </Form.Field>
              {editMode && <Image src={imageUrl} size="small" />}
              <Form.Field>
                <label>Image</label>
                <input name="image" type="file" placeholder="Upload File" />
              </Form.Field>
              <Form.Field>
                <TextArea name="content" placeholder="Content" defaultValue={content} />
              </Form.Field>
              <Form.Button>Submit</Form.Button>
            </Form>
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
};

export default AddEditPost;

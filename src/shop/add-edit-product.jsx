import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Grid, GridColumn, GridRow, TextArea, Button, Header, Image } from "semantic-ui-react";
import { CreateProduct, UpdateProduct, FetchProduct } from "./actions";

const defaultObj = {};

const AddProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const editMode = Boolean(productId);

  const fetchProduct = () => {
    setLoading(true);
    FetchProduct(productId)
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(editMode ? fetchProduct : () => {}, []);

  const onSubmit = ({ target }) => {
    const { title: t, price: p, description: d, image: i } = target.elements;
    const data = { title: t.value, price: p.value, description: d.value, image: i.files[0] };
    const formData = new FormData();
    Object.keys(data).map(key => formData.append(key, data[key]));

    if (editMode) {
      formData.append("id", product.id);
      formData.append("imageUrl", product.imageUrl);
      UpdateProduct(formData).then(() => {
        navigate("/products");
      });
    } else {
      CreateProduct(formData).then(() => {
        navigate("/products");
      });
    }
  };

  const { title = "", imageUrl = "", price = "", description = "" } = product || defaultObj;

  return (
    <Container>
      <Header as="h2">{editMode ? "Edit" : "Add"} Product</Header>
      <Grid columns={3}>
        <GridRow className="j-center">
          <GridColumn width={8}>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <label>Title</label>
                <input name="title" placeholder="Title" defaultValue={title} />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input name="price" placeholder="Price" defaultValue={price} />
              </Form.Field>
              {editMode && <Image src={imageUrl} size="small" />}
              <Form.Field>
                <label>Image</label>
                <input name="image" type="file" placeholder="Upload File" />
              </Form.Field>
              <Form.Field>
                <TextArea name="description" placeholder="Description" defaultValue={description} />
              </Form.Field>
              <Form.Button>Submit</Form.Button>
            </Form>
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
};

export default AddProduct;

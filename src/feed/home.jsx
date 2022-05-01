import { useContext } from "react";
import { Container, Image, Label } from "semantic-ui-react";
import { GlobalContext } from "./global-context";

const Home = () => {
  const { isLoggedIn, user } = useContext(GlobalContext).data;
  return (
    <Container>
      {isLoggedIn ? (
        <div>
          <Label as="a" color="blue" image size="massive">
            <Image src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
            {user.name}
          </Label>
        </div>
      ) : (
        "Home Page"
      )}
    </Container>
  );
};

export default Home;

import { CardElement, Elements, useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { Button, Segment, Header, Form } from "semantic-ui-react";
import LoadStripe from "../services/stripe";
import { AddCard, CreateCharge, InitializePayment, AddCardForLaterUse } from "./actions";
import { GlobalContext } from "./global-context";

const inputStyle = {
  base: {
    fontSize: "18px",
    color: "#000",
    fontWeight: "400",
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    iconColor: "#2185d0",
    letterSpacing: "1px",
    padding: "5px",
    // backgroundColor: "#dedede",
    "::placeholder": {
      color: "#000"
    }
  }
};

const options = {
  hidePostalCode: true,
  style: inputStyle,
  iconStyle: "solid"
};

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {
    data: { user }
  } = useContext(GlobalContext);

  const stripeOrElementsNoLoaded = !stripe || !elements;

  const handleSubmit = async ev => {
    const { name, email } = user;
    const { name: nameOnCard } = ev.target.elements;
    ev.preventDefault();

    if (stripeOrElementsNoLoaded) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { clientSecret } = await InitializePayment({ amount });

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: nameOnCard.value, email }
      },
      setup_future_usage: "off_session",
      save_payment_method: true
    });

    if (error) {
      console.log(error);
    } else {
      const { id, payment_method: paymentMethodId, status } = paymentIntent;
      if (status == "succeeded") {
        AddCardForLaterUse({ id, paymentMethodId, status });
      }
    }
    // console.log(intent);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    //   billing_details: { email, name }
    // });

    // if (error) {
    //   console.log(error);
    // } else {
    //   const { token, error } = await stripe.createToken(cardElement);
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     // AddCard({ token: token.id, amount, nameOnCard: nameOnCard.value });
    //     CreateCharge({ token: token.id, amount, nameOnCard: nameOnCard.value });
    //   }
    // }

    // const result = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements
    //   // confirmParams: {
    //   //   return_url: "https://example.com/order/123/complete",
    //   // },
    // });

    // console.log(result);
    // const {error, paymentMethod} = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // });
    // CheckoutOrder();
  };

  return (
    <Segment>
      <Header textAlign="center" as="h3">
        Enter Card Details
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name on card</label>
          <input name="name" placeholder="Name" />
        </Form.Field>
        <CardElement options={options} />
        {/* <PaymentElement /> */}
        <Button primary type="submit" disabled={stripeOrElementsNoLoaded} fluid>
          Order Now
        </Button>
      </Form>
    </Segment>
  );
};

export default props => (
  <Elements stripe={LoadStripe()}>
    <CheckoutForm {...props} />
  </Elements>
);

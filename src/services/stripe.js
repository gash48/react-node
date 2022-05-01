import { loadStripe } from "@stripe/stripe-js";

export default () =>
  loadStripe(
    // "pk_test_51Kr380SEtDJPIfgGgiAS2BitW9vBM5cW3Xx1X8UUEQcWSgdgE4XdGEgAP33p5f6xcklBzk4ShUkCYKQMN11VRS9I00oamwNdwh"
    process.env.REACT_APP_STRIPE_KEY
  );

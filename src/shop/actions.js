import { GET, POST, POST_FORM, UPDATE_FORM, GET_FILE, throwError, DELETE } from "../services/axios";

export const Login = data => POST("/login", data).catch(throwError);

export const Logout = () => POST("/logout").catch(throwError);

export const Signup = data =>
  POST("/signup", data)
    .then(res => console.log(res))
    .catch(throwError);

export const ForgotPassword = data => POST("/forgot-password", data).catch(throwError);

export const ChangePassword = data => POST("/change-password", data).catch(throwError);

export const FetchProfile = () => GET("/profile").catch(throwError);

export const FetchProduct = id => GET(`/product/${id}`).catch(throwError);

export const FetchProducts = page => GET("/products", { page }).catch(throwError);

export const CreateProduct = data => POST_FORM("/add-product", data).catch(throwError);

export const RemoveProduct = id => DELETE(`/product/${id}`).catch(throwError);

export const UpdateProduct = data => UPDATE_FORM("/update-product", data).catch(throwError);

export const FetchCart = () =>
  GET("/cart")
    .then(data => {
      data.totalPrice = data.products.reduce((acc, { netPrice }) => (acc += parseFloat(netPrice)), 0);
      return data;
    })
    .catch(throwError);

export const AddToCart = id => POST(`/add-to-cart/${id}`).catch(throwError);

export const DeleteFromCart = id => POST(`/delete-from-cart/${id}`).catch(throwError);

export const RemoveFromCart = id => POST(`/remove-from-cart/${id}`).catch(throwError);

export const CheckoutOrder = () => POST("/checkout").catch(throwError);

export const AddCard = data => POST("/add-card", data).catch(throwError);

export const CreateCharge = data => POST("/create-charge", data).catch(throwError);

export const InitializePayment = data => POST("/create-card-payment-intent", data).catch(throwError);

export const AddCardForLaterUse = data => POST("/add-card-to-user", data).catch(throwError);

export const FetchOrders = () => GET("/orders").catch(throwError);

export const DownloadInvoice = id =>
  GET_FILE(`/order-invoice/${id}`)
    .then(res => {
      const blob = new Blob([res], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(blob);
      window.open(fileUrl, "_blank");
    })
    .catch(throwError);

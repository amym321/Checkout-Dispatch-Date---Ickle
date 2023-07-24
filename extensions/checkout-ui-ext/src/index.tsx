import React from "react";
import {
  useExtensionApi,
  render,
  Banner,
  useTranslate,
  useAttributes,
  Text,
  SkeletonText,
  BlockStack,
} from "@shopify/checkout-ui-extensions-react";
import { Shipping } from "./shipping";
import { Thankyou } from "./thankyou";
import { OrderStatus } from "./orderStatus";

render("Checkout::CustomerInformation::RenderAfter", () => <App />);
render("Checkout::DeliveryAddress::RenderBefore", () => <App />);
render("Checkout::ShippingMethods::RenderBefore", () => <Shipping />);
render("Checkout::ShippingMethods::RenderAfter", () => <Shipping />);
render("Checkout::CartLineDetails::RenderAfter", () => <App />);
// render("Checkout::PaymentMethod::RenderModal", () => <App />);
render("Checkout::Reductions::RenderBefore", () => <App />);
render("Checkout::Reductions::RenderAfter", () => <App />);
render("Checkout::CartLines::RenderAfter", () => <App />);
render("Checkout::Actions::RenderBefore", () => <App />);
render("Checkout::PaymentMethod::Render", () => <App />);
render("Checkout::Contact::RenderAfter", () => <App />);
render("Checkout::Dynamic::Render", () => <App />);
render("Checkout::ThankYou::Dynamic::Render", () => <Thankyou />);
render("Checkout::OrderStatus::Dynamic::Render", () => <OrderStatus />);

function App() {
  const { extensionPoint } = useExtensionApi();
  const attributes = useAttributes();
  let dispatched = "";
  if (attributes && attributes.length > 0) {
    //get attribute preOrderDate
    const filteredAttributes = attributes.filter(
      (item) => item.key === "preOrderDate:"
    );
    filteredAttributes.sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });
    dispatched = filteredAttributes[0].value;
  }
  // convert Date DD/MM
  let date = "";
  if (dispatched) {
    let dateDispatched = new Date(dispatched);
    let day = dateDispatched.getDate();
    let month = dateDispatched.getMonth() + 1;
    let dd = day < 10 ? "0" + day : day;
    let mm = month < 10 ? "0" + month : month;
    date = `${dd}/${mm}`;
  }
  console.log("Attribute 1:", attributes);
  const dateDispatchedText = date ? `Order to be dispatched by ${date}` : "";
  return (
    <BlockStack inlineAlignment="start">
      <Text size="base" emphasis="bold" style={{color: "rgb(64, 71, 186)"}}>
        {dateDispatchedText}
      </Text>
    </BlockStack>
  );
}

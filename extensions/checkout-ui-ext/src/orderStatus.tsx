import React from "react";
import {
  useExtensionApi,
  useTranslate,
  useAttributes,
  Text,
  BlockStack,
} from "@shopify/checkout-ui-extensions-react";

export function OrderStatus() {
  const { extensionPoint } = useExtensionApi();
  const translate = useTranslate();
  const attributes = useAttributes();
  console.log("attributes: ", attributes);
  let dispatched = "";
  if (attributes && attributes.length > 0) {
    console.log("Attribute 2:", attributes);
    attributes.sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });
    dispatched = attributes[0].value;
    console.log("data: ", dispatched);
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
  const dateDispatchedText = date ? `Order to be dispatched by ${date}` : "";
  return (
    <BlockStack inlineAlignment="start">
      <Text size="base" emphasis="bold">
        {dateDispatchedText}
      </Text>
    </BlockStack>
  );
}
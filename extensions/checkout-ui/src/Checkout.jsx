import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  BlockStack,
  Button,
  ChoiceList,
  Choice,
   
} from '@shopify/ui-extensions-react/checkout';
import React, { useState } from 'react';


export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension({}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const translate = useTranslate();
  const APP_URL = "https://returned-install-variation-brave.trycloudflare.com";
   const {checkoutToken, lines, sessionToken} = useApi();

  console.log("lines",lines);
  console.log("checkoutToken", checkoutToken);
  console.log(selectedItems);
 // "X-Shopify-Access-Token": `${sessionToken}`,

 async function saveCart() {
  try {
    const response = await fetch(`${APP_URL}/savecart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
      selectedItems: selectedItems,
      sessionToken:sessionToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const token = await response.json();
    // Continue processing the token or handle the response as needed
  } catch (error) {
    console.error("Error while saving cart:", error);
    // Handle the error appropriately, e.g., show a user-friendly message
  }
}
  
  return (
     <BlockStack>
      <Banner title={translate('savecart')}>
      <ChoiceList
        name="choiceMultiple"
        value={selectedItems}
        onChange={(value) => {
      setSelectedItems(value)
        }}
      >
        <BlockStack>
          {lines.current.map((item, index) => (
           <Choice id={item.id} key={item.id}>
           {item.merchandise.title}
         </Choice>
        ))}
        </BlockStack>
      </ChoiceList>
      <BlockStack></BlockStack>
      <Button
     onPress={saveCart}>
      Save
    </Button>
      </Banner>
      
   </BlockStack>
  
  );
}
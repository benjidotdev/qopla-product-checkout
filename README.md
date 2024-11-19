# Qopla Product Checkout

#### Repo: https://github.com/benjidotdev/qopla-product-checkout
#### Live: https://qopla-product-checkout.netlify.app/

## Getting started

1. Clone the repository

   ```bash
   #SSH
   git clone git@github.com:benjidotdev/qopla-product-checkout.git
   ```

   or

   ```bash
   #HTTPS
   git clone https://github.com/benjidotdev/qopla-product-checkout.git
   ```
2. Install the dependencies

   ```bash
   npm install
   ```

3. Start the frontend

   ```bash
   npm start
   ```

9. Navigate to  http://localhost:3000

### Mock data

Feel free to play around with the mock data in order to test edge cases. More information regarding solutions can be
found below. The mock data can be found at `src/data/mock-product-data/`.

### Mock server

I have created a psudo-mock server in order to demonstrate random failed API calls and to mock loading times. The values
can be changed in `src/constants`. Current values are:

```
DELAY = 500;
FAIL_RATE = 0.2;
```

### Add-ons step

The Add-ons step will only be displayed if `additionalData` is received from the server. If no `additionalData`is
received the progress bar will not display the Add-ons step. Comment out `additionalData` in the mock data to test this.

### Size selector

The provided data only has two sizes. Feel free to add more to test the SizeSelector component. You will notice the
upsell suggestion below the selector updates with correct price increases also.

### Flavour selector

The flavour selector will become scrollable as more flavours are added if the height of the screen does not allow all
the options to be shown.

### Addons

I have created two types of buttons. One that deals with addons with a limit of 1 (ToggleButton), and one that deals
with addons with a limit greater than 1 (QuantityButton). Update the individual limits in mock data to test this.

There is also checks in place to ensure that if the individual limit is greater than the group limit, the group limit
will take precedence.

### Sent Data

When clicking the "Add to basket" button, an object similar to the following is created (but currently not sent anywhere
obviously). You can see this object in the console .

```json
{
  "size": "Normal",
  "flavour": "Coca Cola",
  "addOns": [
    {
      "groupName": "Extra toppings",
      "addOns": [
        {
          "name": "Marshmallow",
          "quantity": 1
        },
        {
          "name": "Whipped cream",
          "quantity": 1
        }
      ]
    },
    {
      "groupName": "To remove",
      "addOns": [
        {
          "name": "Sugar",
          "quantity": 1
        }
      ]
    }
  ],
  "totalPrice": 100
}
```

### Error handling

For runtime errors during rendering I have a standard `ErrorBoundary` component that is rendered around the entire app.
Async errors are caught in the `useProduct` hook and handled by the component using it.
I have an ErrorIndicator component for displaying a user friendly error message.

### Possible improvements

I haven't given much time to screen sizes under 768px. In a real world scenario this would certainly be something that
would require further investigation, but my initial thought is that most POS systems will use a tablet or larger screen.

Further work could be done on the UI, especially if the data were to contain image urls for products.

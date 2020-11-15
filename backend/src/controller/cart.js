const Cart = require('../models/cart');

exports.addItemToCart = async (req, res) => {
  const cartExist = await Cart.findOne({ user: req.user._id });
  try {
    if (cartExist) {
      // If cart is already exists then update cart by quantity
      const product = req.body.cartItems.product;
      const item = cartExist.cartItems.find((c) => c.product == product);
      let condition, update;
      if (item) {
        condition = { user: req.user._id, 'cartItems.product': product };
        update = {
          $set: {
            'cartItems.$': {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      const cartUpdate = await Cart.findOneAndUpdate(condition, update);
      try {
        if (cartUpdate) {
          return res.status(200).json({ cart: cartUpdate });
        }
      } catch (error) {
        return res.status(400).json({ error });
      }
    } else {
      // If cart not exist then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

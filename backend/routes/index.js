const apiRouter = require('express').Router();

// apiRouter.get("/", (req, res, next) => {
//   res.send({
//     message: "API is under construction!"
//   });
// });

const jwt = require('jsonwebtoken');
const { JWT_SECRET  = 'nevertell' } = process.env;
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const {addToCart} = require('../db/cart')

const userMiddleware = require('./middleware/userMiddleware')
apiRouter.use(userMiddleware);

// attach other routers from files in this api directory (users, activities...)
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const orderProductsRouter = require('./order_products');
apiRouter.use('/order_products', orderProductsRouter);

const adminRouter = require('./admin');
apiRouter.use('/admin',adminRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

apiRouter.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.redirect(303, session.url);
});





//HERE IS WHERE THE ROUTES FOR ADDING TO CART
apiRouter.post('/electronics', async(req, res) => {
  const { productId, userId } = req.body;
  try{
      const product = await addToCart({productId, userId});
      // const product = await createProduct({ name, detail, category, price });
      // const pictures = linksArray.map((element) => {
      //      addPictureLinksToProduct( element, product.id);
      // });
      // product.pictureLinks = pictures;
      console.log(product);
      res.send( { product } );
  } catch(error){
      console.error(error);
      next( { name: "Add To Cart Error", message: "An error was encountered while adding to cart." } )
  }
});

apiRouter.post('/essentials', async(req, res) => {
  const { productId, userId } = req.body;
  try{
      const product = await addToCart({productId, userId});
      // const product = await createProduct({ name, detail, category, price });
      // const pictures = linksArray.map((element) => {
      //      addPictureLinksToProduct( element, product.id);
      // });
      // product.pictureLinks = pictures;
      console.log(product);
      res.send( { product } );
  } catch(error){
      console.error(error);
      next( { name: "Add To Cart Error", message: "An error was encountered while adding to cart." } )
  }
});

apiRouter.post('/homegoods', async(req, res) => {
  const { productId, userId } = req.body;
  try{
      const product = await addToCart({productId, userId});
      // const product = await createProduct({ name, detail, category, price });
      // const pictures = linksArray.map((element) => {
      //      addPictureLinksToProduct( element, product.id);
      // });
      // product.pictureLinks = pictures;
      console.log(product);
      res.send( { product } );
  } catch(error){
      console.error(error);
      next( { name: "Add To Cart Error", message: "An error was encountered while adding to cart." } )
  }
});

apiRouter.post('/grocery', async(req, res) => {
  const { productId, userId } = req.body;
  try{
      const product = await addToCart({productId, userId});
      // const product = await createProduct({ name, detail, category, price });
      // const pictures = linksArray.map((element) => {
      //      addPictureLinksToProduct( element, product.id);
      // });
      // product.pictureLinks = pictures;
      console.log(product);
      res.send( { product } );
  } catch(error){
      console.error(error);
      next( { name: "Add To Cart Error", message: "An error was encountered while adding to cart." } )
  }
});

apiRouter.post('/lighting', async(req, res) => {
  const { productId, userId } = req.body;
  try{
      const product = await addToCart({productId, userId});
      // const product = await createProduct({ name, detail, category, price });
      // const pictures = linksArray.map((element) => {
      //      addPictureLinksToProduct( element, product.id);
      // });
      // product.pictureLinks = pictures;
      console.log(product);
      res.send( { product } );
  } catch(error){
      console.error(error);
      next( { name: "Add To Cart Error", message: "An error was encountered while adding to cart." } )
  }
});

apiRouter.post('/pets', async(req, res) => {
  const { productId, userId } = req.body;
  try{
      const product = await addToCart({productId, userId});
      // const product = await createProduct({ name, detail, category, price });
      // const pictures = linksArray.map((element) => {
      //      addPictureLinksToProduct( element, product.id);
      // });
      // product.pictureLinks = pictures;
      console.log(product);
      res.send( { product } );
  } catch(error){
      console.error(error);
      next( { name: "Add To Cart Error", message: "An error was encountered while adding to cart." } )
  }
});

//END ROUTES FOR ADDING TO CART

apiRouter.use((error, req, res, next) => {
  const status = error.status ? error.status : 500

  res.status(status);
  res.send({
    error: {
      name: error.name,
      message: error.message
    }
  });
});






module.exports = apiRouter;

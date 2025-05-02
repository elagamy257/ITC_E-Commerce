import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from "../../context/cartContext"
import { Link } from 'react-router-dom';


export default function Carts() {
  let [product, setProduct] = useState(null)
  let { getProductToCart, deleteProductFromCart } = useContext(cartContext)

  let [cartId, setCartId] = useState(null);
  async function getProduct() {
    let { data } = await getProductToCart();   //response.data.data.products
    console.log(data.data)
    setProduct(data?.data.products)
    setCartId(data?.data._id);

  }


  async function deleteProduct(id) {
    console.log(id)
    let { data } = await deleteProductFromCart(id);   //response.data.data.products
    setProduct(data?.data.products)   //product = [{} , {}  ]

  }


  useEffect(() => {
    getProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // بنحسب إجمالي السعر لكل المنتجات في السلة، عن طريق جمع حاصل ضرب سعر كل منتج × كميته
  //  بيعدي على كل عنصر فيه ويجمع النواتج دي ويخزنها في totalPrice

  let totalPrice = product?.reduce((acc, item) => acc + (item.price * item.count), 0);



  return (

    <div className='d-flex flex-wrap justify-content-center'>

      <section className="card-left h-100 w-80">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0">Shopping Cart</h3>
                <div>
                  <p className="mb-0">
                    <span className="text-muted">Sort by:</span>{" "}
                    <a href="#!" className="text-body">
                      price <i className="fas fa-angle-down mt-1"></i>
                    </a>
                  </p>
                </div>
              </div>

              {/* Real product cards from API */}
              {product?.map((item, index) => (
                <div className="card rounded-3 mb-4" key={index}>
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={item.product.imageCover}
                          className="img-fluid rounded-3"
                          alt={item.product.title}
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{item.product.title}</p>
                        <p>
                          <span className="text-muted">Category: </span>
                          {item.product.category?.name}
                        </p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          className="btn btn-link px-2"
                          onClick={(e) => {
                            const input = e.currentTarget.parentNode.querySelector("input[type=number]");
                            if (input) input.stepDown();
                          }}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          min="1"
                          name="quantity"
                          defaultValue={item.count}
                          type="number"
                          className="form-control form-control-sm"
                        />
                        <button
                          className="btn btn-link px-2"
                          onClick={(e) => {
                            const input = e.currentTarget.parentNode.querySelector("input[type=number]");
                            if (input) input.stepUp();
                          }}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">{item.price} EGP </h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a onClick={() => { deleteProduct(item?.product?.id) }} href="#!" className="text-danger">
                          <i className="fas fa-trash fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>


      <div className="card-right card border shadow-sm w-20 my-5" style={{ width: '18rem' }}>

        <div className="card-body">

          <h3 className="fw-normal mb-0 text-center">Shopping Cart</h3>
          <h5 className='text-secondary py-4 text-center'>Total Price: <span>{totalPrice} EGP </span></h5>

          <div className="d-flex justify-content-around align-items-center">
            <Link to={`/checkout/${cartId}`} className="btn btn-primary btn-sm">
              Checkout
            </Link>
          </div>
        </div>
      </div>

    </div>

  )
}





// elalMall App >> login (token) >>>url helal.com >>> cardId (3 products)>>> details (tel,address)

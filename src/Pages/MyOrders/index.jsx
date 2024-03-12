import { Link } from "react-router-dom"
import Layout from "../../Components/Layout"
import OrdersCard from "../../Components/OrdersCard"
import { ShoppingCartContext } from "../../Context"
import { useContext } from "react"

const MyOrders = () => {
  const context = useContext(ShoppingCartContext)
  return (
    <Layout>
      <div className="flex w-80 justify-center items-center relative mb-4">

        <h1 className="font-medium text-xl">MyOrders</h1>
      </div>

      {
        context.order.map((order, index) => (<Link key={index} to={`/my-orders/${index}`}>
          <OrdersCard
            totalPrice={order.totalPrice}
            totalProducts={order.totalProducts} />
        </Link>)
        )
      }
    </Layout>
  )
}

export default MyOrders
import { TOrder } from "../../types/TOrder.ts";
import { Link } from "react-router-dom";

interface OrderListProps {
  orders: TOrder[];
}

interface OrderRowProps {
  order: TOrder;
  index: number;
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: TOrder, index: number) => (
              <OrderRow key={order._id} order={order} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function OrderRow({ order, index }: OrderRowProps) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{order._id}</td>
      <td>{order.user.email}</td>
      <td>{order.totalPrice} IQD</td>
      <td>{order.isPaid ? "Yes" : "No"}</td>
      <td>{order.isDelivered ? "Yes" : "No"}</td>
      <td>
        <Link to={`/admin/orders/${order._id}`} className="btn btn-primary">
          Details
        </Link>
      </td>
    </tr>
  );
}

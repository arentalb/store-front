import { Link } from "react-router-dom";
import { TOrder } from "../../types/TOrder";

interface OrdersTableProps {
  orders: TOrder[] | undefined;
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order._id}>
              <th>{index + 1}</th>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{`${order.totalPrice} IQD`}</td>
              <td>{order.isPaid ? "Yes" : "No"}</td>
              <td>{order.isDelivered ? "Yes" : "No"}</td>
              <td>
                <Link to={`/orders/${order._id}`} className="btn btn-primary">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Link } from "react-router-dom";
import { TOrder } from "../../types/TOrder";

interface OrderRowProps {
  order: TOrder;
  index: number;
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

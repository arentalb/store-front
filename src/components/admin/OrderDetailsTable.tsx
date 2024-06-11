import { TOrder } from "../../types/TOrder";

interface OrderDetailsTableProps {
  order: TOrder;
}

export function OrderDetailsTable({ order }: OrderDetailsTableProps) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Payment Method</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.user.email}</td>
            <td>{order.paymentMethod}</td>
            <td>{order.isPaid ? "Yes" : "No"}</td>
            <td>{order.isDelivered ? "Yes" : "No"}</td>
            <td>{order.totalPrice} IQD</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

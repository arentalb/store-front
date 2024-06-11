import { TOrder } from "../../types/TOrder";

interface OrderDetailsTableProps {
  order: TOrder;
}

function OrderDetailsTable({ order }: OrderDetailsTableProps) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Shipping Address</th>
            <th>Payment Method</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr key={order._id}>
            <th>1</th>
            <td>
              {order.shippingAddress.houseNumber}{" "}
              {order.shippingAddress.streetNumber}{" "}
              {order.shippingAddress.neighborhood} {order.shippingAddress.city}
            </td>
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

export default OrderDetailsTable;

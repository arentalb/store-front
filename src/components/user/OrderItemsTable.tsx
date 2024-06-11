import { TOrder } from "../../types/TOrder";

interface OrderItemsTableProps {
  order: TOrder;
}

function OrderItemsTable({ order }: OrderItemsTableProps) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price} IQD</td>
              <td>{item.price * item.quantity} IQD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderItemsTable;

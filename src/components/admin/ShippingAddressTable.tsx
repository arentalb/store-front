import { TOrder } from "../../types/TOrder";

interface ShippingAddressTableProps {
  order: TOrder;
}

export function ShippingAddressTable({ order }: ShippingAddressTableProps) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="table">
        <thead>
          <tr>
            <th>City</th>
            <th>Neighborhood</th>
            <th>Street Number</th>
            <th>House Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.shippingAddress.city}</td>
            <td>{order.shippingAddress.neighborhood}</td>
            <td>{order.shippingAddress.streetNumber}</td>
            <td>{order.shippingAddress.houseNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

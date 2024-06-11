import { TCart } from "../../types/TCart";

interface OrderSummaryProps {
  cart: TCart | undefined;
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
      {cart?.items.map((item) => (
        <div key={item.product} className="flex justify-between mb-2">
          <div>{item.name}</div>
          <div>
            {item.quantity} x {item.price} IQD
          </div>
        </div>
      ))}
      <div className="flex justify-between font-bold">
        <div>Total</div>
        <div>
          {cart?.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          )}{" "}
          IQD
        </div>
      </div>
    </div>
  );
}

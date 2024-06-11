import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TCart } from "../../types/TCart";
import { TApiError } from "../../types/TApiError";
import { TShippingAddress } from "../../types/TOrder";
import { useCreateUserOrderMutation } from "../../redux/order/orderApiSlice.ts";
import { useGetCartQuery } from "../../redux/cart/cartApiSlice.ts";

export function UserCheckoutPage() {
  const {
    data: cartData,
    error: getCartError,
    isLoading: isGettingCart,
  } = useGetCartQuery();

  const [createOrderFromCart, { isLoading: isCreatingOrder }] =
    useCreateUserOrderMutation();

  const [shippingAddress, setShippingAddress] = useState<TShippingAddress>({
    city: "",
    neighborhood: "",
    streetNumber: "",
    houseNumber: "",
  });

  const cart: TCart | undefined = cartData?.data;

  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await createOrderFromCart(shippingAddress).unwrap();
      toast.success("Order placed successfully");
      navigate("/home");
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError?.data?.message || "Failed to place order");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isGettingCart) return <div>Loading...</div>;
  if (getCartError) {
    const apiError = getCartError as TApiError;
    return <div>{apiError.data.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          City
        </label>
        <input
          type="text"
          name="city"
          className="input input-bordered w-full"
          value={shippingAddress.city}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Neighborhood
        </label>
        <input
          type="text"
          name="neighborhood"
          className="input input-bordered w-full"
          value={shippingAddress.neighborhood}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Street Number
        </label>
        <input
          type="text"
          name="streetNumber"
          className="input input-bordered w-full"
          value={shippingAddress.streetNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          House Number
        </label>
        <input
          type="text"
          name="houseNumber"
          className="input input-bordered w-full"
          value={shippingAddress.houseNumber}
          onChange={handleInputChange}
        />
      </div>
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
      <button
        onClick={handleCheckout}
        className="btn btn-primary w-full"
        disabled={isCreatingOrder || !cart?.items.length}
      >
        {isCreatingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

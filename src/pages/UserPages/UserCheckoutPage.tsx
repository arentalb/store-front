import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TCart } from "../../types/TCart";
import { TApiError } from "../../types/TApiError";
import { TShippingAddress } from "../../types/TOrder";
import { useCreateUserOrderMutation } from "../../redux/order/orderApiSlice.ts";
import { useGetCartQuery } from "../../redux/cart/cartApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { InputField } from "../../components/common/InputField";
import { OrderSummary } from "../../components/user/OrderSummary";

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

  if (isGettingCart) return <Loader />;
  if (getCartError) {
    const apiError = getCartError as TApiError;
    return <div>{apiError.data.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <InputField
        label="City"
        name="city"
        value={shippingAddress.city}
        onChange={handleInputChange}
      />
      <InputField
        label="Neighborhood"
        name="neighborhood"
        value={shippingAddress.neighborhood}
        onChange={handleInputChange}
      />
      <InputField
        label="Street Number"
        name="streetNumber"
        value={shippingAddress.streetNumber}
        onChange={handleInputChange}
      />
      <InputField
        label="House Number"
        name="houseNumber"
        value={shippingAddress.houseNumber}
        onChange={handleInputChange}
      />
      <OrderSummary cart={cart} />
      <button
        onClick={handleCheckout}
        className="btn btn-primary w-full"
        disabled={isCreatingOrder || !cart?.items.length}
      >
        {isCreatingOrder ? <Loader /> : "Place Order"}
      </button>
    </div>
  );
}

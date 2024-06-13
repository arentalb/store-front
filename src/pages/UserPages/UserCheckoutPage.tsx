import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TCart } from "../../types/TCart";
import { TApiError } from "../../types/TApiError";
import { TShippingAddress } from "../../types/TOrder";
import { useCreateUserOrderMutation } from "../../redux/order/orderApiSlice.ts";
import { useGetCartQuery } from "../../redux/cart/cartApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { Input } from "../../components/common/Input.tsx";
import { OrderSummary } from "../../components/user/OrderSummary";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";

export function UserCheckoutPage() {
  const navigate = useNavigate();

  const {
    data: cartResponse,
    error: cartError,
    isError: isCartError,
    isLoading: isCartLoading,
  } = useGetCartQuery();

  const [createOrderFromCart, { isLoading: isCreatingOrder }] =
    useCreateUserOrderMutation();

  const cart: TCart | undefined = cartResponse?.data;

  const [shippingAddress, setShippingAddress] = useState<TShippingAddress>({
    city: "",
    neighborhood: "",
    streetNumber: "",
    houseNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  if (isCartError) {
    const apiError = cartError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching cart"
        }
      />
    );
  }
  if (isCartLoading) return <Loader />;

  if (!cart) {
    return <ErrorMessage message={"No cart available "} />;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Input
        label="City"
        name="city"
        value={shippingAddress.city}
        onChange={handleInputChange}
      />
      <Input
        label="Neighborhood"
        name="neighborhood"
        value={shippingAddress.neighborhood}
        onChange={handleInputChange}
      />
      <Input
        label="Street Number"
        name="streetNumber"
        value={shippingAddress.streetNumber}
        onChange={handleInputChange}
      />
      <Input
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

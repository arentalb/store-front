import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../../redux/category/categoryApiSlice.ts";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/product/productApiSlice.ts";
import { TApiError } from "../../../types/TApiError.ts";
import { Loader } from "../../../components/common/Loader.tsx";
import { FormSelect } from "../../../components/common/FormSelect.tsx";
import { FormInput } from "../../../components/common/FormInput.tsx";
import { ErrorMessage } from "../../../components/common/ErrorMessage.tsx";
import { CoverImagePreview } from "../../../components/admin/CoverImagePreview.tsx";
import { ImagePreview } from "../../../components/admin/ImagePreview.tsx";
import { useImagePreview } from "../../../hooks/useImagePreview";
import { FormFileInput } from "../../../components/common/FormFileInput";
import { FormTextArea } from "../../../components/common/FormTextArea.tsx";

interface IProductFormInputs {
  name: string;
  description: string;
  category: string;
  coverImage: FileList;
  images: FileList;
  stock: number;
  price: number;
  tags: string;
}

export function AdminProductFormEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: categoryResponse,
    error: categoryError,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery();
  const {
    data: productResponse,
    isLoading: isProductLoading,
    error: productError,
    isError: isProductError,
  } = useGetProductByIdQuery(id!, { skip: !id });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const categories = categoryResponse?.data || [];
  const product = productResponse?.data;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IProductFormInputs>();
  const {
    coverImagePreview,
    setCoverImagePreview,
    imagesPreview,
    setImagesPreview,
    deletedImages,
    handleCoverImageChange,
    handleImagesChange,
    handleRemoveImage,
  } = useImagePreview();

  const onEdit: SubmitHandler<IProductFormInputs> = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", getCategoryId());
    formData.append("stock", product.stock.toString());
    formData.append("tags", product.tags);
    if (product.coverImage[0]) {
      formData.append("coverImage", product.coverImage[0]);
    }
    Array.from(product.images).forEach((image) =>
      formData.append("images", image),
    );
    deletedImages.forEach((image) => formData.append("deletedImages", image));

    if (id) {
      try {
        await updateProduct({ product: formData, id }).unwrap();
        toast.success("Product updated successfully");
        navigate("/admin/product/all");
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(apiError?.data?.message || "Error updating product");
      }
    }
  };

  const onDelete = async () => {
    if (id) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
        navigate("/admin/product/all");
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(apiError?.data?.message || "Error deleting product");
      }
    }
  };

  useEffect(() => {
    if (product) {
      const {
        name,
        description,
        category,
        price,
        stock,
        tags,
        coverImage,
        images,
      } = product;
      setValue("name", name);
      setValue("description", description);
      setValue("category", category.name);
      setValue("price", price);
      setValue("stock", stock);
      setValue("tags", tags.toString());

      setCoverImagePreview(coverImage);
      setImagesPreview(images);
    }
  }, [
    product,
    productResponse,
    setCoverImagePreview,
    setImagesPreview,
    setValue,
  ]);

  function getCategoryId() {
    const category = categories?.find(
      (cat) => cat.name === getValues("category"),
    );
    return category ? category._id : "";
  }

  if (isCategoryError) {
    const apiError = categoryError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message ||
          "An error occurred while fetching categories"
        }
      />
    );
  }
  if (isProductError) {
    const apiError = productError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching products"
        }
      />
    );
  }

  if (isCategoryLoading || isProductLoading) {
    return <Loader />;
  }

  return (
    <form>
      <h1 className="text-2xl mb-4">Edit Product</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
        <FormInput
          label="Product name"
          type="text"
          registration={register("name", {
            required: "Product name is required",
          })}
          error={errors.name}
        />

        <FormInput
          label="Product stock"
          type="number"
          registration={register("stock", {
            required: "Product stock is required",
          })}
          error={errors.stock}
        />
        <FormInput
          label="Product price"
          type="number"
          registration={register("price", {
            required: "Product price is required",
          })}
          error={errors.price}
        />
        <FormSelect
          label="Product category"
          registration={register("category", {
            required: "Product category is required",
          })}
          options={categories.map((cat) => ({
            value: cat.name,
            label: cat.name,
          }))}
          error={errors.category}
        />

        <FormInput
          label="Product tags (comma separated)"
          type="text"
          registration={register("tags", {
            required: "Product tags are required",
          })}
          error={errors.tags}
        />
        <FormTextArea
          label="Product description"
          registration={register("description", {
            required: "Product description is required",
          })}
          rows={1}
          error={errors.description}
        />
        <FormFileInput
          label="Product cover image"
          registration={register("coverImage", { required: false })}
          error={errors.coverImage}
          onChange={handleCoverImageChange}
          previews={
            coverImagePreview && <CoverImagePreview src={coverImagePreview} />
          }
        />
        <FormFileInput
          label="Product images"
          registration={register("images", { required: false })}
          error={errors.images}
          onChange={handleImagesChange}
          multiple
          previews={
            <div className="mt-4 flex flex-wrap gap-4">
              {imagesPreview.map((src, index) => (
                <ImagePreview
                  key={index}
                  src={src}
                  onRemove={() => handleRemoveImage(src)}
                />
              ))}
            </div>
          }
        />
      </div>
      <div className="my-10 flex gap-4 flex-wrap">
        <button
          type="button"
          onClick={handleSubmit(onEdit)}
          className="btn btn-success w-full sm:max-w-xs"
        >
          {isUpdating ? <Loader /> : "Update"}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="btn btn-error w-full sm:max-w-xs"
        >
          {isDeleting ? <Loader /> : "Delete"}
        </button>
      </div>
    </form>
  );
}

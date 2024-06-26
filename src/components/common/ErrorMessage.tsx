interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-10   ">
        <h1 className="text-2xl font-bold mb-4">
          {message || "Something went wrong"}
        </h1>
        <p className="text-base">Please try refreshing the page</p>
      </div>
    </>
  );
}

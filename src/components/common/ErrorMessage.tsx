export function ErrorMessage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-10   ">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg">
          Please try refreshing the page or contact support if the problem
          persists.
        </p>
      </div>
    </>
  );
}

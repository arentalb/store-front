interface EmptyMessageProps {
  message?: string;
}

export function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-10   ">
        <h1 className="text-2xl font-bold mb-4">
          {message || "There is no content found to show "}
        </h1>
      </div>
    </>
  );
}

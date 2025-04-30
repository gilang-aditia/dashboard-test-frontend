export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p>Loading...</p>
    </div>
  );
}

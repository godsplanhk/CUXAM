import DotLoader from "react-spinners/DotLoader";

export function WaitingLoader({loading}: {loading: boolean}) {
  return (
    <div className="bg-white dark:bg-black flex flex-col items-center justify-center h-screen w-full gap-2">
      <DotLoader
        color="#ef4444"
        loading={loading}
        size={90}
      />
      <p>Please hang tight! We're getting things ready for you.</p>
    </div>
  );
}
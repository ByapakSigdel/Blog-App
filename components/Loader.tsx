export default function Loader() {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-muted rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}

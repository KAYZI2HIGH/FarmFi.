import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 min-h-screen inset-0  z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <ScaleLoader color="white" />
    </div>
  );
};

export default Loading;

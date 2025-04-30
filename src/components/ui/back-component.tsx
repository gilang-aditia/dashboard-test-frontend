import { StepBackIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackComponent = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya tanpa reload
  };

  return (
    <div className="mt-4 mb-6 md:mt-0">
      <button
        onClick={handleBack}
        className="text-md py-2 font-medium text-neutral-950 hover:text-fuchsia-700 dark:text-slate-300 dark:hover:text-slate-100"
      >
        <span className="flex items-center text-black">
          <StepBackIcon />
          Kembali Ke Halaman Sebelumnya
        </span>
      </button>
    </div>
  );
};

export default BackComponent;

import { FileWarningIcon } from "lucide-react";
import { CustomAlert } from "../../components/ui/custom-alert";
import RecipeContainer from "./components/recipe-container";

export default function RecipePage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Recipes</h1>
      <CustomAlert
        className="mb-4 border-none"
        status="info"
        title="Resep Lezat"
        description="Temukan Resep lezat yang cocok untuk anda."
        icon={<FileWarningIcon />}
      />
      <RecipeContainer />
    </div>
  );
}

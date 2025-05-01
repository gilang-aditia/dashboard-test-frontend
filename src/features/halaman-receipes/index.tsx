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
        title="Discover Delicious Recipes"
        description="Browse our collection of recipes from around the world."
        icon={<FileWarningIcon />}
      />
      <RecipeContainer />
    </div>
  );
}

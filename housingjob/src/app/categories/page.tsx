import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <AppScreen
      header={<TopBar title="Categories" subtitle={`${categories.length} fields`} />}
      contentClassName="px-5 py-5"
    >
      <div className="stagger grid grid-cols-2 gap-3">
        {categories.map((c, idx) => (
          <div key={c.slug} style={{ ["--i" as string]: idx }}>
            <CategoryCard category={c} />
          </div>
        ))}
      </div>
    </AppScreen>
  );
}

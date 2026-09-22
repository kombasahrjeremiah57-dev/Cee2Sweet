import {
  categories as demoCategories,
  products as demoProducts,
} from "@/lib/products";
import { Category, Product, ProductVariant } from "@/types/product";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  brand: string | null;
  hair_type: string | null;
  length: string | null;
  color: string | null;
  stock_quantity: number;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  } | null;
  product_images:
    | { image_url: string; alt_text: string | null; display_order: number }[]
    | null;
  product_variants?: { id: string; product_id: string; length: string | null; color: string | null; options: Record<string, string>; price: number; compare_at_price: number | null; stock_quantity: number; sku: string; is_active: boolean }[] | null;
};
const mapProduct = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  price: Number(row.price),
  compareAtPrice: row.compare_at_price
    ? Number(row.compare_at_price)
    : undefined,
  category: row.categories
    ? {
        id: row.categories.id,
        name: row.categories.name,
        slug: row.categories.slug,
        description: row.categories.description || undefined,
      }
    : { id: "uncategorized", name: "Uncategorized", slug: "uncategorized" },
  brand: row.brand || undefined,
  hairType: row.hair_type || undefined,
  length: row.length || undefined,
  color: row.color || undefined,
  stockQuantity: row.stock_quantity,
  featured: row.featured,
  isNew:
    Date.now() - new Date(row.created_at).getTime() < 1000 * 60 * 60 * 24 * 45,
  sku: row.sku || "",
  images: (row.product_images || [])
    .sort((a, b) => a.display_order - b.display_order)
    .map((i) => ({ url: i.image_url, alt: i.alt_text || row.name })),
  variants: (row.product_variants || []).map((variant): ProductVariant => ({ id: variant.id, productId: variant.product_id, length: variant.length || undefined, color: variant.color || undefined, options: variant.options, price: Number(variant.price), compareAtPrice: variant.compare_at_price ? Number(variant.compare_at_price) : undefined, stockQuantity: variant.stock_quantity, sku: variant.sku, isActive: variant.is_active })),
});
export async function getActiveCategories(): Promise<Category[]> {
  if (!hasSupabaseEnv()) return demoCategories;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,description")
    .order("name");
  if (error) throw new Error("Unable to load categories.");
  return data.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || undefined,
  }));
}
export async function getActiveProducts(): Promise<Product[]> {
  if (!hasSupabaseEnv()) return demoProducts;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "*,categories(id,name,slug,description),product_images(image_url,alt_text,display_order),product_variants(id,product_id,length,color,options,price,compare_at_price,stock_quantity,sku,is_active)",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error("Unable to load products.");
  return (data as ProductRow[]).map(mapProduct);
}
export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  if (!hasSupabaseEnv()) return demoProducts.find((p) => p.slug === slug);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "*,categories(id,name,slug,description),product_images(image_url,alt_text,display_order),product_variants(id,product_id,length,color,options,price,compare_at_price,stock_quantity,sku,is_active)",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (error) return undefined;
  return mapProduct(data as ProductRow);
}

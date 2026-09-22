import { getActiveCategories } from '@/lib/catalog';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function NewProduct(){const categories=await getActiveCategories();return <div className="shell section"><p className="eyebrow">Catalogue</p><h1 className="mt-2 font-display text-4xl">Create product</h1><p className="mt-4 text-stone-600">Add the core product information and any available length/color variants.</p><ProductForm categories={categories}/></div>}

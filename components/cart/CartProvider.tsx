'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, Product, ProductSelection, getCartLineId, getProductVariant } from '@/types/product';

type Cart={items:CartItem[];add:(product:Product,quantity?:number,selection?:ProductSelection)=>boolean;update:(lineId:string,quantity:number)=>void;remove:(lineId:string)=>void;count:number;subtotal:number;clear:()=>void};
const Context=createContext<Cart|null>(null);
const normalizeCartItem=(value:unknown):CartItem|null=>{if(!value||typeof value!=='object')return null;const item=value as Partial<CartItem>;if(!item.product||typeof item.product!=='object'||typeof item.quantity!=='number'||item.quantity<1||!Number.isInteger(item.quantity))return null;const product=item.product as Product;const variant=item.variant??getProductVariant(product);return {lineId:item.lineId??getCartLineId(product,{variant,instructions:item.instructions}),product,variant,quantity:item.quantity,instructions:item.instructions};};

export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<CartItem[]>([]); const [ready,setReady]=useState(false);
  useEffect(()=>{try{const value=localStorage.getItem('cee2sweet-cart');if(value){const parsed:unknown=JSON.parse(value);if(Array.isArray(parsed))setItems(parsed.map(normalizeCartItem).filter((item):item is CartItem=>Boolean(item)) )}}catch{localStorage.removeItem('cee2sweet-cart')}finally{setReady(true)}},[]);
  useEffect(()=>{if(ready)localStorage.setItem('cee2sweet-cart',JSON.stringify(items))},[items,ready]);
  const value=useMemo<Cart>(()=>({items,add:(product,requested=1,selection={})=>{const quantity=Math.floor(requested);const variant=getProductVariant(product,selection);if(quantity<1||quantity>variant.stockQuantity)return false;const lineId=getCartLineId(product,selection);setItems(current=>{const existing=current.find(item=>item.lineId===lineId);return existing?current.map(item=>item.lineId===lineId?{...item,quantity:Math.min(item.quantity+quantity,variant.stockQuantity)}:item):[...current,{lineId,product,variant,quantity,instructions:selection.instructions}]});return true},update:(lineId,quantity)=>setItems(current=>current.flatMap(item=>item.lineId!==lineId?[item]:quantity<1?[]:[{...item,quantity:Math.min(Math.floor(quantity),item.variant?.stockQuantity??item.product.stockQuantity)}])),remove:(lineId)=>setItems(current=>current.filter(item=>item.lineId!==lineId)),count:items.reduce((sum,item)=>sum+item.quantity,0),subtotal:items.reduce((sum,item)=>sum+(item.variant?.price??item.product.price)*item.quantity,0),clear:()=>setItems([])}),[items]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useCart=()=>{const value=useContext(Context);if(!value)throw Error('Cart provider missing');return value};

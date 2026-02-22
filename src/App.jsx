import { useEffect, useState } from "react";
const EMOJI = { Dairy:"🥛", Bakery:"🍞", Meat:"🥩", Grains:"🌾", Vegetables:"🥦", Oils:"🫙", Tinned:"🥫", Drinks:"🧃", Spices:"🌶️", All:"🏪" };
export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("shop");
  const [orderDone, setOrderDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name:"", address:"", phone:"", card:"", expiry:"", cvv:"" });
  const [toast, setToast] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(r => r.json()).then(data => { setProducts(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && (category==="All" || p.category===category));
  function addToCart(product) {
    setCart(old => { const ex = old.find(i=>i.id===product.id); if(ex) return old.map(i=>i.id===product.id?{...i,qty:i.qty+1}:i); return [...old,{...product,qty:1}]; });
    setToast(`✔ ${product.name} added!`); setTimeout(()=>setToast(""),2200);
  }
  function changeQty(id,d){setCart(old=>old.map(i=>i.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));}
  function removeFromCart(id){setCart(old=>old.filter(i=>i.id!==id));}
  const totalItems=cart.reduce((s,i)=>s+i.qty,0);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2);
  function placeOrder(){if(!form.name||!form.address||!form.phone||!form.card){setToast("⚠️ Fill all fields");setTimeout(()=>setToast(""),2500);return;}setOrderDone(true);setCart([]);}
  return (<div style={{padding:40,background:"#0f1117",minHeight:"100vh",color:"#fff",textAlign:"center"}}><h1 style={{color:"#2ecc71"}}>Ghosia Mini Market</h1><p style={{color:"#6b7280",marginTop:12}}>Frontend loaded. See feature branches for full UI.</p></div>);
}

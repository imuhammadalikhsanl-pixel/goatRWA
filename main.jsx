import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {Camera,Wallet,Activity,ShieldCheck,TrendingUp,MapPin,ChevronRight,Plus,Menu,X,LockKeyhole} from "lucide-react";
import "./style.css";

const goats=[
{id:"GOAT-001",name:"Bima",breed:"Etawa",gender:"Male",age:"14 months",weight:58,status:"Active",price:420,image:"/goats/goat-001.svg",health:"Healthy",camera:"LIVE"},
{id:"GOAT-002",name:"Luna",breed:"Boer",gender:"Female",age:"11 months",weight:51,status:"Active",price:390,image:"/goats/goat-002.svg",health:"Healthy",camera:"LIVE"},
{id:"GOAT-003",name:"Jaya",breed:"Etawa",gender:"Male",age:"16 months",weight:64,status:"Active",price:465,image:"/goats/goat-003.svg",health:"Healthy",camera:"OFFLINE"},
{id:"GOAT-004",name:"Moka",breed:"Boer",gender:"Female",age:"18 months",weight:67,status:"Sold",price:500,image:"/goats/goat-004.svg",health:"Healthy",camera:"OFFLINE",sale:1000,cost:100,share:90},
{id:"GOAT-005",name:"Raka",breed:"Kacang",gender:"Male",age:"9 months",weight:43,status:"Available",price:315,image:"/goats/goat-005.svg",health:"Healthy",camera:"LIVE"}
];

function App(){
 const [page,setPage]=useState("home"),[selected,setSelected]=useState(goats[0]),[wallet,setWallet]=useState(""),[menu,setMenu]=useState(false);
 const nav=(p)=>{setPage(p);setMenu(false)};
 const connect=()=>setWallet(wallet?"":"0x7A4F...91B2");
 return <div>
 <header><div className="brand" onClick={()=>nav("home")}><div className="logo">🐐</div><div><b>Goat<span>RWA</span></b><small>REAL GOAT • DIGITAL OWNERSHIP</small></div></div>
 <nav className={menu?"open":""}><button onClick={()=>nav("home")}>Home</button><button onClick={()=>nav("market")}>Goats</button><button onClick={()=>nav("dashboard")}>My Goats</button><button onClick={()=>nav("camera")}>Live Camera</button><button onClick={()=>nav("sales")}>Sales & Returns</button><button className="wallet" onClick={connect}><Wallet size={16}/>{wallet||"Connect Wallet"}</button></nav><button className="hamb" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>

 {page==="home"&&<Home nav={nav}/>}
 {page==="market"&&<Market setSelected={setSelected} nav={nav}/>}
 {page==="goat"&&<Goat goat={selected} nav={nav}/>}
 {page==="camera"&&<CameraPage goat={selected}/>}
 {page==="dashboard"&&<Dashboard wallet={wallet} setSelected={setSelected} nav={nav}/>}
 {page==="sales"&&<Sales/>}
 {page==="admin"&&<Admin/>}

 <footer><div><b>🐐 GoatRWA</b><p>Real-world goat asset infrastructure for transparent digital ownership.</p></div><div><b>Prototype</b><p>Blockchain, camera streaming and payment rails are mocked in this MVP.</p></div><div><b>Important</b><p>NFT ownership and legal ownership/proceeds rights must be defined by the project's legal structure.</p></div></footer>
 </div>
}

function Home({nav}){return <main><section className="hero"><div><div className="pill">● REAL WORLD ASSET • MVP</div><h1>Own a real goat.<br/><em>Track it. Earn from it.</em></h1><p>GoatRWA connects physical goats with digital records, live farm monitoring and transparent sale distributions.</p><div className="actions"><button className="primary" onClick={()=>nav("market")}>Explore Goats <ChevronRight/></button><button className="secondary" onClick={()=>nav("camera")}>Watch Live Camera <Camera/></button></div></div><div className="heroCard"><img src="/goats/goat-001.svg"/><div className="live"><span/> LIVE FARM CAMERA</div><div className="overlay"><b>GOAT-001</b><span>Etawa • 58 kg</span></div></div></section><section className="stats">{[["128","Goats tracked"],["96","NFTs issued"],["81","Active goats"],["$24.8K","Sales recorded"]].map(x=><div><strong>{x[0]}</strong><span>{x[1]}</span></div>)}</section><section className="section"><div className="sectionHead"><div><div className="eyebrow">FEATURED ASSETS</div><h2>Meet the goats</h2></div><button className="link" onClick={()=>nav("market")}>View all <ChevronRight/></button></div><div className="grid">{goats.slice(0,3).map(g=><GoatCard key={g.id} g={g} onClick={()=>{nav("goat");}} select={()=>{}} />)}</div></section></main>}

function GoatCard({g,onClick}){return <article className="card" onClick={onClick}><div className="photo"><img src={g.image}/><span className={"status "+g.status.toLowerCase()}>{g.status}</span></div><div className="cardBody"><div className="row"><b>{g.id}</b><span className="cameraDot">● {g.camera}</span></div><h3>{g.name}</h3><p>{g.breed} • {g.gender} • {g.weight} kg</p><div className="cardFoot"><strong>${g.price}</strong><span>View goat <ChevronRight/></span></div></div></article>}

function Market({setSelected,nav}){return <main className="page"><div className="pageTitle"><div><div className="eyebrow">MARKETPLACE</div><h1>Real goats, verified records.</h1><p>Browse physical goat assets connected to digital records.</p></div><button className="primary">Connect Wallet <Wallet/></button></div><div className="filter"><span>All goats</span><span>Active</span><span>Available</span><span>Sold</span></div><div className="grid">{goats.map(g=><div key={g.id} onClick={()=>{setSelected(g);nav("goat")}}><GoatCard g={g} onClick={()=>{}}/></div>)}</div></main>}

function Goat({goat,nav}){return <main className="page"><button className="back" onClick={()=>nav("market")}>← Back to goats</button><div className="detail"><div className="detailImage"><img src={goat.image}/><span className={"status "+goat.status.toLowerCase()}>{goat.status}</span></div><div className="detailInfo"><div className="eyebrow">GOAT ASSET</div><h1>{goat.name} <small>{goat.id}</small></h1><p className="lead">{goat.breed} • {goat.gender} • {goat.age}</p><div className="metrics"><Metric t="Current weight" v={goat.weight+" kg"}/><Metric t="Health" v={goat.health}/><Metric t="Camera" v={goat.camera}/><Metric t="NFT status" v={goat.status}/></div><button className="primary wide" onClick={()=>nav("camera")}><Camera/> Open Live Camera</button></div></div><section className="dataPanel"><h2>Proof of Goat</h2><div className="dataGrid"><Data k="Goat ID" v={goat.id}/><Data k="NFT Token ID" v={goat.id.replace("GOAT-","")}/><Data k="Contract" v="0xMOCK...RWA01"/><Data k="Blockchain" v="Testnet / Mock"/><Data k="Farm location" v="West Java, Indonesia"/><Data k="Latest weight" v={goat.weight+" kg"}/></div></section></main>}

function Metric({t,v}){return <div><span>{t}</span><b>{v}</b></div>} function Data({k,v}){return <div><span>{k}</span><b>{v}</b></div>}

function CameraPage({goat}){return <main className="page"><div className="pageTitle"><div><div className="eyebrow">LIVE FARM CAMERA</div><h1>Watch {goat.name} live.</h1><p>Camera stream is a secure placeholder ready for HLS/WebRTC integration.</p></div><div className="live big"><span/> {goat.camera==="LIVE"?"LIVE":"OFFLINE"}</div></div><div className="cameraBox"><div className="cameraPlaceholder"><Camera size={52}/><b>LIVE CAMERA STREAM</b><span>Connect an HLS/WebRTC stream in production.</span></div><div className="cameraMeta"><b>{goat.id} — {goat.name}</b><span>Farm camera • Last update just now</span></div></div><div className="notice"><ShieldCheck/><div><b>Camera security</b><p>Camera credentials must stay server-side. Never expose RTSP username/password in the browser.</p></div></div></main>}

function Dashboard({wallet,setSelected,nav}){return <main className="page"><div className="pageTitle"><div><div className="eyebrow">OWNER DASHBOARD</div><h1>My Goat Assets</h1><p>{wallet?"Wallet connected: "+wallet:"Connect your wallet to view owned NFTs."}</p></div><button className="wallet primary"><Wallet/> Connect Wallet</button></div><div className="ownerCard"><div className="ownerIcon">◈</div><div><span>Portfolio</span><h2>1 Goat NFT</h2></div><div><span>Current status</span><h2>Active</h2></div><div><span>Latest weight</span><h2>58 kg</h2></div></div><div className="grid">{[goats[0]].map(g=><div key={g.id} onClick={()=>{setSelected(g);nav("goat")}}><GoatCard g={g} onClick={()=>{}}/></div>)}</div></main>}

function Sales(){let net=900,share=810;return <main className="page"><div className="pageTitle"><div><div className="eyebrow">SALES & RETURNS</div><h1>Transparent distributions.</h1><p>Every sale shows the calculation before a distribution is recorded.</p></div></div><div className="salePanel"><div className="saleHero"><div><span>SOLD ASSET</span><h2>GOAT-004 — Moka</h2><p>Boer • 67 kg • Sold</p></div><div className="saleAmount"><span>Sale price</span><b>$1,000</b></div></div><div className="calc"><Data k="Sale price" v="$1,000"/><Data k="Allowed costs" v="− $100"/><Data k="Net sale amount" v="$900"/><Data k="Owner share" v="90%"/><Data k="Owner share amount" v="$810"/></div><div className="pending">● Distribution Pending</div></div></main>}

function Admin(){return <main className="page"><div className="pageTitle"><div><div className="eyebrow">ADMIN</div><h1>Farm operations</h1><p>Manage goats, records, cameras and sales.</p></div><button className="primary"><Plus/> Add Goat</button></div><div className="adminGrid">{[["Goats","128","Manage physical assets"],["Cameras","12","8 live now"],["Sales","37","$24.8K recorded"],["Distributions","31","6 pending"]].map(x=><div className="adminCard"><Activity/><span>{x[0]}</span><strong>{x[1]}</strong><small>{x[2]}</small></div>)}</div><div className="table"><div className="tr head"><span>Goat</span><span>Status</span><span>Weight</span><span>Camera</span><span>Action</span></div>{goats.map(g=><div className="tr"><span><b>{g.id}</b> {g.name}</span><span>{g.status}</span><span>{g.weight} kg</span><span>{g.camera}</span><button>Edit</button></div>)}</div></main>}

createRoot(document.getElementById("root")).render(<App/>);

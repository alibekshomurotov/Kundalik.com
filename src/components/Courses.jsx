export default function Courses(){
const courses=[
{name:'Frontend React',desc:'Zamonaviy web ilovalar'},
{name:'Backend Django',desc:'Server va API'},
{name:'Grafik dizayn',desc:'Photoshop & Figma'},
{name:'Python asoslari',desc:'Boshlovchilar uchun'}
]


return(
<section style={{padding:'70px 0'}}>
<div className="container">
<h2 style={{textAlign:'center',marginBottom:'40px'}}>Kurslarimiz</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'20px'}}>
{courses.map((c,i)=> (
<div key={i} style={{background:'#1c1c1c',padding:'25px',borderRadius:'10px'}}>
<h3>{c.name}</h3>
<p style={{opacity:0.8,marginTop:'10px'}}>{c.desc}</p>
</div>
))}
</div>
</div>
</section>
)
}
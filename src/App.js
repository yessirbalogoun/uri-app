import { useState, useEffect, useRef } from "react";

const PROGRAM = {
  seanceA: [
    { id:"a1", name:"Jumping Jacks", subtitle:"Échauffement", sets:1, reps:"45 sec", rest:15, muscles:"Corps entier", desc:"Pieds joints, bras le long du corps. Sautez en écartant bras et jambes simultanément." },
    { id:"a2", name:"Squats", subtitle:"Poids du corps", sets:3, reps:"15 reps", rest:30, muscles:"Quadriceps, fessiers", desc:"Pieds largeur épaules, descendez comme pour vous asseoir, dos droit, genoux dans l'axe des pieds." },
    { id:"a3", name:"Pompes", subtitle:"Larges ou sur genoux", sets:3, reps:"10-12 reps", rest:30, muscles:"Pectoraux, triceps, épaules", desc:"Mains plus larges que les épaules, corps droit. Version genoux si nécessaire." },
    { id:"a4", name:"Fentes alternées", subtitle:"Avant/arrière", sets:3, reps:"10/jambe", rest:30, muscles:"Quadriceps, fessiers, ischios", desc:"Faites un grand pas en avant, genou arrière proche du sol. Alternez les jambes." },
    { id:"a5", name:"Gainage planche", subtitle:"Isométrique", sets:3, reps:"30 sec", rest:20, muscles:"Abdos, lombaires, épaules", desc:"Avant-bras au sol, corps droit de la tête aux talons. Contractez le ventre." },
    { id:"a6", name:"Mountain Climbers", subtitle:"Cardio core", sets:2, reps:"30 sec", rest:15, muscles:"Abdos, cardio, épaules", desc:"Position pompe, ramenez les genoux vers la poitrine en alternant rapidement." },
  ],
  seanceB: [
    { id:"b1", name:"Marche sur place", subtitle:"Échauffement", sets:1, reps:"45 sec", rest:15, muscles:"Corps entier", desc:"Levez les genoux haut, bras qui balancent naturellement. Montez en intensité progressivement." },
    { id:"b2", name:"Hip Thrusts", subtitle:"Au sol", sets:3, reps:"15 reps", rest:30, muscles:"Fessiers, ischios", desc:"Dos au sol, pieds à plat, montez le bassin en contractant fort les fessiers. Pause 1 sec en haut." },
    { id:"b3", name:"Pompes triceps", subtitle:"Coudes serrés", sets:3, reps:"10 reps", rest:30, muscles:"Triceps, pectoraux", desc:"Mains sous les épaules, coudes restent collés au corps en descendant." },
    { id:"b4", name:"Squat Jump", subtitle:"Explosif", sets:3, reps:"10 reps", rest:30, muscles:"Quadriceps, cardio", desc:"Squat classique puis sautez explosif vers le haut. Réception douce, genoux fléchis." },
    { id:"b5", name:"Superman", subtitle:"Dos au sol", sets:3, reps:"12 reps", rest:20, muscles:"Lombaires, fessiers", desc:"Allongée sur le ventre, levez bras et jambes simultanément. Tenez 2 secondes." },
    { id:"b6", name:"Crunchs bicyclette", subtitle:"Obliques", sets:2, reps:"30 sec", rest:15, muscles:"Abdos obliques", desc:"Mains derrière la tête, pédalez en alternant coude droit / genou gauche." },
  ],
  schedule: [
    {day:1, type:"A",     label:"Séance A",      note:"Matin avant le stage ou soir en rentrant — 15 min suffisent"},
    {day:2, type:"rest+", label:"Repos actif",    note:"Étirements 10 min avant de dormir 🌙"},
    {day:3, type:"rest",  label:"Repos",          note:"Ton corps récupère — dors bien, bois ton eau 💧"},
    {day:4, type:"B",     label:"Séance B",       note:"Matin ou soir — écoute ton énergie"},
    {day:5, type:"rest+", label:"Repos actif",    note:"Marche à pied au/du stage si possible 🚶"},
    {day:6, type:"rest+", label:"Samedi léger",   note:"Étirements ou petite marche — tu as bossé toute la semaine !"},
    {day:7, type:"bilan", label:"Bilan S1",       note:"Dimanche libre — mesures + ressenti de la semaine ⭐"},
    {day:8, type:"A",     label:"Séance A",       note:"+2-3 reps vs S1 — tu progresses !"},
    {day:9, type:"rest+", label:"Repos actif",    note:"Étirements 10 min le soir, respiration profonde 🫁"},
    {day:10,type:"rest",  label:"Repos",          note:"Vraie récup — hydrate bien, dors 7h minimum"},
    {day:11,type:"B",     label:"Séance B",       note:"+5 sec de gainage — tu peux le faire"},
    {day:12,type:"rest+", label:"Repos actif",    note:"Marche au/du stage ou étirements le soir"},
    {day:13,type:"rest+", label:"Samedi léger",   note:"Prépare tes repas de la semaine si tu peux 🍱"},
    {day:14,type:"bilan", label:"Bilan S2",       note:"Dimanche — photo progression + mesures 📸"},
    {day:15,type:"A",     label:"Séance A",       note:"Squats lents 3 secondes — qualité avant tout"},
    {day:16,type:"rest+", label:"Repos actif",    note:"Étirements ciblés cuisses et fessiers ce soir"},
    {day:17,type:"rest",  label:"Repos",          note:"Récupération complète — sommeil prioritaire 😴"},
    {day:18,type:"B",     label:"Séance B",       note:"Hip thrusts avec pause 2 sec en haut"},
    {day:19,type:"rest+", label:"Repos actif",    note:"10 min étirements + 5 min respiration 4-4-6 🫁"},
    {day:20,type:"rest+", label:"Samedi libre",   note:"Si tu as de l'énergie : petite marche ou danse 🎵"},
    {day:21,type:"bilan", label:"Bilan S3",       note:"Dimanche — mi-parcours ! Mesures importantes 🏆"},
    {day:22,type:"A",     label:"Séance A",       note:"Squat Jump explosif — dernière ligne droite !"},
    {day:23,type:"rest+", label:"Repos actif",    note:"Étirements jambes et dos ce soir — tu le mérites"},
    {day:24,type:"rest",  label:"Repos",          note:"Repos total — prépare tes repas si possible 🍱"},
    {day:25,type:"rest",  label:"Repos",          note:"Marche légère au/du stage, bois bien 💧"},
    {day:26,type:"B",     label:"Séance B",       note:"Hip thrust une jambe — concentration maximale"},
    {day:27,type:"rest+", label:"Samedi actif",   note:"Petite marche si dispo — sinon étirements 15 min"},
    {day:28,type:"rest",  label:"Repos",          note:"Dimanche — prépare le bilan final de demain 🌟"},
    {day:29,type:"bilan", label:"Bilan Final",    note:"Mesures + photos avant/après 📸"},
    {day:30,type:"bilan", label:"Jour 30 ! 👑",   note:"Tu as réussi Uriel — récap complet de ta transformation"},
  ],
  meals: [
    {id:"m1",time:"Réveil",icon:"💧",name:"Eau citronnée",desc:"Grand verre d'eau + citron vert ou gingembre râpé",qty:"300 ml",cal:5},
    {id:"m2",time:"Petit-déjeuner",icon:"🌅",name:"Bouillie & oeuf",desc:"Bouillie de maïs (ogi/akassa) ou igname bouillie + oeuf dur + banane plantain mûre",qty:"1 bol + 1 oeuf",cal:370},
    {id:"m3",time:"10h (si faim)",icon:"🥜",name:"Collation légère",desc:"Arachides non salées + mangue ou papaye fraîche",qty:"30g + 1 fruit",cal:190},
    {id:"m4",time:"Déjeuner",icon:"🍽️",name:"Plat principal",desc:"Poulet braisé ou tilapia/maquereau grillé + riz de Glazoué ou igname + sauce graine légère",qty:"150g prot. + 100g féculents",cal:530},
    {id:"m5",time:"16h",icon:"🍉",name:"Snack fruité",desc:"Papaye, mangue ou ananas + noix de cajou natures",qty:"1 part + 20g noix",cal:130},
    {id:"m6",time:"Dîner",icon:"🌙",name:"Dîner léger",desc:"Haricots niébé ou poisson fumé + patate douce + salade verte + huile de palme (peu)",qty:"150g prot. + 100g",cal:470},
  ],
  quotes: [
    "La constance bat l'intensité. Chaque séance compte.",
    "15 minutes aujourd'hui, une transformation demain.",
    "Ton corps change. Fais confiance au processus.",
    "La discipline, c'est choisir ce qui compte vraiment.",
    "Chaque répétition te rapproche de ta meilleure version.",
    "Tu n'as pas à être parfaite. Tu dois être régulière.",
    "Le succès, c'est la somme de petits efforts répétés.",
    "Ton futur moi te remercie d'avoir commencé aujourd'hui.",
    "La force ne vient pas du corps. Elle vient de l'âme.",
    "Commence là où tu es. Utilise ce que tu as.",
  ],
  badges: [
    {id:"b1",name:"Premier Pas",desc:"Première séance complétée",icon:"🌱",condition:s=>s.tw>=1},
    {id:"b2",name:"Semaine 1",desc:"7 jours de programme",icon:"⭐",condition:s=>s.currentDay>=7},
    {id:"b3",name:"5 Séances",desc:"5 entraînements validés",icon:"🔥",condition:s=>s.tw>=5},
    {id:"b4",name:"Semaine 2",desc:"14 jours de programme",icon:"🌟",condition:s=>s.currentDay>=14},
    {id:"b5",name:"10 Séances",desc:"10 entraînements",icon:"💪",condition:s=>s.tw>=10},
    {id:"b6",name:"Semaine 3",desc:"21 jours de programme",icon:"🏆",condition:s=>s.currentDay>=21},
    {id:"b7",name:"Transformation",desc:"30 jours complétés !",icon:"👑",condition:s=>s.currentDay>=30},
  ]
};

const Icon = ({ name, size=20, color="currentColor" }) => {
  const d = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    dumbbell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12M2 12h4M18 12h4"/></svg>,
    leaf: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    play: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    pause: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    minus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    pencil: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    coach: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><path d="M12 14v2m0 2v.5"/></svg>,
  };
  return d[name] || null;
};

const useTimer = (initial=0) => {
  const [time, setTime] = useState(initial);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running && time > 0) { ref.current = setInterval(() => setTime(t => t-1), 1000); }
    else if (time === 0) setRunning(false);
    return () => clearInterval(ref.current);
  }, [running, time]);
  return { time, running, start:()=>setRunning(true), pause:()=>setRunning(false), reset:(v)=>{setRunning(false);setTime(v??initial);} };
};

const initState = {
  currentDay:1, completedDays:[], workoutLog:{}, nutrition:{}, hydration:{},
  progress:{w1:{},w2:{},w3:{},w4:{}}, habits:{}, darkMode:false,
};

export default function App() {
  const [state, setState] = useState(initState);
  const [screen, setScreen] = useState("home");
  const [ws, setWs] = useState(null);
  const [showBadge, setShowBadge] = useState(null);
  const [celebrate, setCelebrate] = useState(false);

  const save = (u) => setState(p => ({...p, ...u}));
  const dark = state.darkMode;
  const today = PROGRAM.schedule[state.currentDay-1];
  const quote = PROGRAM.quotes[(state.currentDay-1) % PROGRAM.quotes.length];
  const totalW = Object.values(state.workoutLog).filter(v=>v?.done).length;
  const todayNut = state.nutrition[state.currentDay] || {};
  const todayHyd = state.hydration[state.currentDay] || 0;
  const mealsDone = Object.values(todayNut).filter(arr=>Array.isArray(arr)&&arr.length>0).length;
  const earned = PROGRAM.badges.filter(b=>b.condition({...state,tw:totalW})).map(b=>b.id);

  const C = {
    bg: dark?"#0D1117":"#F7F5F0", card: dark?"#161B22":"#FFFFFF",
    card2: dark?"#1C2330":"#F0EDE8", text: dark?"#E6EDF3":"#2D2A26",
    sub: dark?"#8B949E":"#7A7468", green:"#4A7C59",
    greenL: dark?"#1A3025":"#E8F2EC", greenB:"#5C9970",
    accent:"#C8864A", accentL: dark?"#3D2510":"#FDF0E6",
    border: dark?"#30363D":"#E8E4DE",
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    body{background:${C.bg};font-family:'Plus Jakarta Sans',sans-serif;overscroll-behavior:none;}
    .f{font-family:'Fraunces',serif;} button{cursor:pointer;border:none;background:none;font-family:inherit;}
    input,textarea{font-family:inherit;outline:none;}
    .fi{animation:fi .3s ease;} @keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .bou{animation:bou .5s ease;} @keyframes bou{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
    ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px;}
  `;

  const startW = () => {
    const seq = today?.type==="A"?PROGRAM.seanceA:PROGRAM.seanceB;
    if(!seq) return;
    setWs({exercises:seq,current:0,currentSet:1,setsDone:{}});
    setScreen("active");
  };
  const finishW = () => {
    const k=`d${state.currentDay}`;
    save({workoutLog:{...state.workoutLog,[k]:{done:true,type:today.type}},completedDays:[...new Set([...state.completedDays,state.currentDay])]});
    setCelebrate(true); setWs(null); setScreen("home");
    setTimeout(()=>setCelebrate(false),3500);
  };
  const advDay = () => { if(state.currentDay<30) save({currentDay:state.currentDay+1}); };
  const setHyd = (v) => save({hydration:{...state.hydration,[state.currentDay]:Math.min(3,Math.max(0,v))}});
  const togMeal = (id) => {
    const d={...(state.nutrition[state.currentDay]||{})};
    d[id]=!d[id];
    save({nutrition:{...state.nutrition,[state.currentDay]:d}});
  };

  const nav = [
    {id:"home",     label:"Accueil",   icon:"home"},
    {id:"workout",  label:"Séance",    icon:"dumbbell"},
    {id:"nutrition",label:"Nutrition", icon:"leaf"},
    {id:"progress", label:"Progrès",   icon:"chart"},
    {id:"coach",    label:"Le Coach",  icon:"coach"},
  ];

  if(screen==="active"&&ws) return <ActiveWorkout ws={ws} C={C} css={css} onFinish={finishW} onBack={()=>{setWs(null);setScreen("home");}} type={today?.type}/>;

  return (
    <div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",position:"relative"}}>
      <style>{css}</style>
      {showBadge&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}} onClick={()=>setShowBadge(null)}>
        <div className="bou" style={{background:C.card,borderRadius:24,padding:32,textAlign:"center",maxWidth:280,margin:20}}>
          <div style={{fontSize:64,marginBottom:12}}>{showBadge.icon}</div>
          <div className="f" style={{fontSize:22,color:C.text,marginBottom:8}}>{showBadge.name}</div>
          <div style={{color:C.sub,fontSize:14,marginBottom:20}}>{showBadge.desc}</div>
          <button onClick={()=>setShowBadge(null)} style={{background:C.green,color:"#fff",padding:"10px 28px",borderRadius:50,fontWeight:700,fontSize:14}}>Super !</button>
        </div>
      </div>}
      {celebrate&&<div className="fi" style={{position:"fixed",top:72,left:0,right:0,display:"flex",justifyContent:"center",zIndex:500,pointerEvents:"none"}}>
        <div style={{background:C.green,color:"#fff",borderRadius:50,padding:"12px 24px",fontWeight:700,fontSize:15,display:"flex",gap:8,alignItems:"center",boxShadow:"0 4px 20px rgba(74,124,89,.5)"}}>🎉 Bravo Uriel, séance validée !</div>
      </div>}

      <div style={{paddingBottom:76,minHeight:"100vh",overflowY:"auto"}}>
        {screen==="home"&&<HomeS C={C} state={state} save={save} today={today} quote={quote} mealsDone={mealsDone} todayHyd={todayHyd} totalW={totalW} earned={earned} onStart={startW} onAdv={advDay} onBadge={setShowBadge}/>}
        {screen==="workout"&&<WorkoutS C={C} state={state} today={today} onStart={startW} totalW={totalW}/>}
        {screen==="nutrition"&&<NutS C={C} state={state} todayHyd={todayHyd} setHyd={setHyd} save={save}/>}
        {screen==="progress"&&<ProgS C={C} state={state} save={save}/>}
        {screen==="coach"&&<CoachS C={C}/>}
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:dark?"rgba(13,17,23,.96)":"rgba(247,245,240,.96)",backdropFilter:"blur(20px)",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-around",padding:"8px 0 14px",zIndex:100}}>
        {nav.map(n=>(
          <button key={n.id} onClick={()=>setScreen(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 10px",transition:"all .2s"}}>
            <Icon name={n.icon} size={22} color={screen===n.id?C.green:C.sub}/>
            <span style={{fontSize:10,fontWeight:screen===n.id?700:400,color:screen===n.id?C.green:C.sub}}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeS({C,state,save,today,quote,mealsDone,todayHyd,totalW,earned,onStart,onAdv,onBadge}){
  const pct=Math.round(((state.currentDay-1)/30)*100);
  const isW=today?.type==="A"||today?.type==="B";
  const done=!!state.workoutLog[`d${state.currentDay}`]?.done;
  const hr=new Date().getHours();
  const gr=hr<12?"Bonjour":hr<18?"Bon après-midi":"Bonsoir";
  const wk=Math.ceil(state.currentDay/7);
  const wkLabel={1:"Activation",2:"Progression",3:"Intensification",4:"Culmination"}[wk]||"Final";
  return(
    <div className="fi">
      <div style={{background:`linear-gradient(155deg,${C.green} 0%,#2E5C3E 100%)`,padding:"52px 22px 28px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-50,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,.05)"}}/>
        <div style={{position:"absolute",bottom:-40,left:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative"}}>
          <div>
            <p style={{color:"rgba(255,255,255,.7)",fontSize:13,marginBottom:3}}>{gr} ✨</p>
            <h1 className="f" style={{color:"#fff",fontSize:34,fontWeight:700,lineHeight:1}}>Uriel</h1>
            <p style={{color:"rgba(255,255,255,.75)",fontSize:12,marginTop:5}}>Semaine {wk} · {wkLabel} · Jour {state.currentDay}/30</p>
          </div>
          <button onClick={()=>save({darkMode:!state.darkMode})} style={{background:"rgba(255,255,255,.15)",borderRadius:12,padding:9}}>
            <Icon name={state.darkMode?"sun":"moon"} size={17} color="#fff"/>
          </button>
        </div>
        <div style={{marginTop:18}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:"rgba(255,255,255,.75)",fontSize:11}}>Progression globale</span>
            <span style={{color:"#fff",fontSize:12,fontWeight:700}}>{pct}%</span>
          </div>
          <div style={{background:"rgba(255,255,255,.2)",borderRadius:50,height:7,overflow:"hidden"}}>
            <div style={{background:"#fff",width:`${pct}%`,height:"100%",borderRadius:50,transition:"width .8s ease"}}/>
          </div>
        </div>
      </div>

      <div style={{padding:"18px 16px",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{background:C.card,borderRadius:22,padding:20,boxShadow:`0 2px 16px rgba(0,0,0,${C.card==="#FFFFFF"?".05":".2"})`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <p style={{color:C.sub,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>Aujourd'hui · Jour {state.currentDay}</p>
              <h2 className="f" style={{color:C.text,fontSize:22,marginTop:3}}>{today?.label}</h2>
              <p style={{color:C.sub,fontSize:13,marginTop:1}}>{today?.note}</p>
            </div>
            <div style={{background:isW?(done?C.greenL:C.accentL):C.greenL,borderRadius:14,padding:"10px 13px",fontSize:28}}>
              {done?"✅":isW?"💪":"🌿"}
            </div>
          </div>
          {isW&&!done&&<button onClick={onStart} style={{width:"100%",background:`linear-gradient(135deg,${C.green},${C.greenB})`,color:"#fff",borderRadius:14,padding:"14px 18px",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 16px rgba(74,124,89,.35)"}}>
            <Icon name="play" size={17} color="#fff"/> Commencer la séance
          </button>}
          {done&&<div style={{background:C.greenL,borderRadius:12,padding:"11px 15px",display:"flex",alignItems:"center",gap:10}}>
            <Icon name="check" size={17} color={C.green}/><span style={{color:C.green,fontWeight:600,fontSize:14}}>Séance complétée — Bravo Uriel !</span>
          </div>}
          {!isW&&<div style={{background:C.greenL,borderRadius:12,padding:"11px 15px"}}>
            <span style={{color:C.green,fontSize:14}}>Journée de {today?.type==="rest"?"récupération 🌿":"repos actif 🚶"}</span>
          </div>}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[{l:"Séances",v:totalW,i:"💪",c:C.green},{l:"Repas",v:`${mealsDone}/6`,i:"🍽️",c:C.accent},{l:"Hydratation",v:`${todayHyd.toFixed(1)}L`,i:"💧",c:"#4A90D9"}].map((s,i)=>(
            <div key={i} style={{background:C.card,borderRadius:16,padding:"14px 8px",textAlign:"center"}}>
              <div style={{fontSize:22,marginBottom:4}}>{s.i}</div>
              <div style={{color:s.c,fontWeight:700,fontSize:18}}>{s.v}</div>
              <div style={{color:C.sub,fontSize:11,marginTop:1}}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{background:`linear-gradient(135deg,${C.accentL},${C.greenL})`,borderRadius:20,padding:20,borderLeft:`4px solid ${C.accent}`}}>
          <p style={{color:C.sub,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>Citation du jour</p>
          <p className="f" style={{color:C.text,fontSize:16,lineHeight:1.55,fontStyle:"italic"}}>"{quote}"</p>
        </div>

        {earned.length>0&&<div style={{background:C.card,borderRadius:20,padding:18}}>
          <p style={{color:C.sub,fontSize:11,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Tes badges</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {PROGRAM.badges.map(b=>{
              const e=earned.includes(b.id);
              return <button key={b.id} onClick={()=>e&&onBadge(b)} style={{background:e?C.greenL:C.card2,borderRadius:12,padding:"8px 12px",display:"flex",alignItems:"center",gap:7,opacity:e?1:.35,border:`1px solid ${e?C.green:C.border}`}}>
                <span style={{fontSize:18}}>{b.icon}</span>
                <span style={{fontSize:11,fontWeight:600,color:e?C.green:C.sub}}>{b.name}</span>
              </button>;
            })}
          </div>
        </div>}

        {state.currentDay<30&&<button onClick={onAdv} style={{background:C.card2,color:C.sub,borderRadius:14,padding:"12px 18px",fontSize:13,fontWeight:500,border:`1px solid ${C.border}`}}>
          Passer au jour suivant →
        </button>}
      </div>
    </div>
  );
}

function WorkoutS({C,state,today,onStart,totalW}){
  const isW=today?.type==="A"||today?.type==="B";
  const exs=today?.type==="A"?PROGRAM.seanceA:PROGRAM.seanceB;
  const done=!!state.workoutLog[`d${state.currentDay}`]?.done;
  return(
    <div className="fi" style={{padding:"52px 16px 24px"}}>
      <h1 className="f" style={{color:C.text,fontSize:28,marginBottom:3}}>Entraînement</h1>
      <p style={{color:C.sub,fontSize:14,marginBottom:20}}>{isW?`Séance ${today.type} — Jour ${state.currentDay}`:"Pas de séance aujourd'hui"}</p>
      {isW&&<>
        {!done&&<button onClick={onStart} style={{width:"100%",background:`linear-gradient(135deg,${C.green},${C.greenB})`,color:"#fff",borderRadius:16,padding:"16px",fontWeight:700,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:18,boxShadow:"0 4px 20px rgba(74,124,89,.35)"}}>
          <Icon name="play" size={20} color="#fff"/> Lancer la séance complète
        </button>}
        {done&&<div style={{background:C.greenL,borderRadius:14,padding:"13px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
          <Icon name="check" size={18} color={C.green}/><span style={{color:C.green,fontWeight:600}}>Séance du jour validée !</span>
        </div>}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {exs.map((ex,i)=>(
            <div key={ex.id} style={{background:C.card,borderRadius:16,padding:15,display:"flex",gap:13,alignItems:"flex-start"}}>
              <div style={{background:C.greenL,borderRadius:12,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{color:C.green,fontWeight:700,fontSize:15}}>{i+1}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <p style={{color:C.text,fontWeight:600,fontSize:15}}>{ex.name}</p>
                    <p style={{color:C.sub,fontSize:11,marginTop:1}}>{ex.subtitle}</p>
                  </div>
                  <span style={{background:C.accentL,color:C.accent,borderRadius:8,padding:"3px 9px",fontSize:11,fontWeight:700}}>{ex.reps}</span>
                </div>
                <div style={{display:"flex",gap:8,marginTop:7}}>
                  <span style={{color:C.sub,fontSize:12}}>{ex.sets>1?`${ex.sets} séries`:"1 série"}</span>
                  <span style={{color:C.border}}>·</span>
                  <span style={{color:C.sub,fontSize:12}}>Repos {ex.rest}s</span>
                </div>
                <p style={{color:C.sub,fontSize:12,marginTop:5,lineHeight:1.5}}>{ex.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>}
      {!isW&&<div style={{background:C.card,borderRadius:20,padding:28,textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:12}}>🌿</div>
        <h2 className="f" style={{color:C.text,fontSize:20,marginBottom:8}}>{today?.label}</h2>
        <p style={{color:C.sub,fontSize:14,lineHeight:1.6}}>{today?.note}</p>
        <p style={{marginTop:16,color:C.sub,fontSize:13}}>Séances complétées : <strong style={{color:C.green}}>{totalW}</strong></p>
      </div>}
    </div>
  );
}

// ─── ACTIVE WORKOUT ───────────────────────────────────────────────────────────
// État : un seul objet { phase, exIdx, setIdx, doneSets }
// phase = "work" | "rest" | "finish"
// Aucun setTimeout. Aucun useEffect qui avance tout seul.
// Le timer ne fait QUE décompter. C'est le bouton "Passer" ou la fin naturelle
// qui change la phase — via un callback explicite.

function ActiveWorkout({ws, C, css, onFinish, onBack, type}){
  const exercises = ws.exercises;

  // ── état principal ────────────────────────────────────────────────────────
  const [S, setS] = useState({
    phase: "work",   // "work" | "rest" | "finish"
    exIdx: 0,
    setIdx: 1,
    doneSets: [],    // tableau de strings "exIdx_setIdx"
  });

  // ── timer indépendant ─────────────────────────────────────────────────────
  const [sec,    setSec]    = useState(0);
  const [tRun,   setTRun]   = useState(false);
  const intervalRef         = useRef(null);

  // démarre / arrête le timer
  useEffect(() => {
    clearInterval(intervalRef.current);
    if (!tRun) return;
    intervalRef.current = setInterval(() => {
      setSec(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setTRun(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [tRun]);

  // nettoyage au démontage
  useEffect(() => () => clearInterval(intervalRef.current), []);

  // ── dérivations ───────────────────────────────────────────────────────────
  const ex        = exercises[S.exIdx];
  const totalSets = ex ? ex.sets : 1;
  const restDur   = ex ? ex.rest : 30;
  const isLastEx  = S.exIdx === exercises.length - 1;
  const isLastSet = S.setIdx >= totalSets;
  const pct       = (S.exIdx / exercises.length) * 100;
  const mins      = Math.floor(sec / 60);
  const secs      = sec % 60;

  // ── actions ───────────────────────────────────────────────────────────────

  // Appuyer sur "Série X terminée"
  const handleSetDone = () => {
    const key = `${S.exIdx}_${S.setIdx}`;
    // déjà enregistré ? on ignore (anti double-clic)
    if (S.doneSets.includes(key)) return;

    const newDone = [...S.doneSets, key];

    if (isLastSet && isLastEx) {
      // dernière série du dernier exercice → fin
      setS({ ...S, doneSets: newDone, phase: "finish" });
    } else {
      // lancer la pause repos
      clearInterval(intervalRef.current);
      setSec(restDur);
      setTRun(true);
      setS({ ...S, doneSets: newDone, phase: "rest" });
    }
  };

  // Appuyer sur "Passer →" (ou timer arrivé à 0 et bouton affiché)
  const handleSkipRest = () => {
    clearInterval(intervalRef.current);
    setTRun(false);
    setSec(0);
    // avancer : série suivante ou exercice suivant
    if (isLastSet) {
      setS(p => ({ ...p, phase: "work", exIdx: p.exIdx + 1, setIdx: 1 }));
    } else {
      setS(p => ({ ...p, phase: "work", setIdx: p.setIdx + 1 }));
    }
  };

  const toggleTimer = () => setTRun(r => !r);

  // ── rendu FIN de séance ───────────────────────────────────────────────────
  if (S.phase === "finish") return (
    <div style={{background:`linear-gradient(160deg,${C.green} 0%,#1E4228 100%)`,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
      <style>{css}</style>
      <div className="bou" style={{fontSize:80,marginBottom:20}}>🎉</div>
      <h1 className="f" style={{color:"#fff",fontSize:34,textAlign:"center",marginBottom:10}}>Séance validée !</h1>
      <p style={{color:"rgba(255,255,255,.85)",fontSize:18,marginBottom:6}}>Bravo Uriel !</p>
      <p style={{color:"rgba(255,255,255,.6)",fontSize:13,marginBottom:36}}>
        Séance {type==="A"?"A — Corps entier":"B — Fessiers & Core"} complétée
      </p>
      <div style={{background:"rgba(255,255,255,.12)",borderRadius:20,padding:22,width:"100%",maxWidth:300,marginBottom:32}}>
        {[`${exercises.length} exercices`,`${exercises.reduce((a,e)=>a+e.sets,0)} séries totales`,"15 minutes d'effort"].map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<2?11:0}}>
            <div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:5}}>
              <Icon name="check" size={13} color="#fff"/>
            </div>
            <span style={{color:"#fff",fontSize:14}}>{s}</span>
          </div>
        ))}
      </div>
      <button onClick={onFinish} style={{background:"#fff",color:C.green,borderRadius:16,padding:"15px 44px",fontWeight:700,fontSize:16}}>
        Terminer
      </button>
    </div>
  );

  // ── rendu principal ───────────────────────────────────────────────────────
  return (
    <div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto"}}>
      <style>{css}</style>

      {/* Barre de progression en haut */}
      <div style={{background:`linear-gradient(160deg,${C.green},#2E5C3E)`,padding:"50px 18px 22px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <button onClick={onBack} style={{color:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",gap:6,fontSize:13}}>
            <Icon name="x" size={17} color="rgba(255,255,255,.8)"/> Arrêter
          </button>
          <span style={{color:"rgba(255,255,255,.8)",fontSize:13}}>
            {S.exIdx+1} / {exercises.length}
          </span>
        </div>
        <div style={{background:"rgba(255,255,255,.2)",borderRadius:50,height:6,overflow:"hidden"}}>
          <div style={{background:"#fff",width:`${pct}%`,height:"100%",borderRadius:50,transition:"width .4s ease"}}/>
        </div>
      </div>

      <div style={{padding:18}}>

        {/* ════════ ÉCRAN REPOS ════════ */}
        {S.phase === "rest" && (
          <div className="fi" style={{background:C.card,borderRadius:22,padding:32,textAlign:"center"}}>

            <p style={{color:C.sub,fontSize:11,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12}}>
              Temps de repos
            </p>

            {/* Décompte */}
            <div className="f" style={{color:C.green,fontSize:76,fontWeight:700,lineHeight:1}}>
              {mins > 0 ? `${mins}:${String(secs).padStart(2,"0")}` : secs}
            </div>
            <p style={{color:C.sub,fontSize:13,marginTop:6,marginBottom:4}}>secondes</p>

            {/* Indication de ce qui suit */}
            <p style={{color:C.sub,fontSize:13,marginBottom:24,marginTop:8}}>
              {isLastSet
                ? <>Prochain exercice : <strong style={{color:C.text}}>{exercises[S.exIdx+1]?.name}</strong></>
                : <>Prochain : <strong style={{color:C.text}}>Série {S.setIdx+1} — {ex?.name}</strong></>
              }
            </p>

            {/* Boutons */}
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <button
                onClick={toggleTimer}
                style={{background:C.greenL,color:C.green,borderRadius:14,padding:"12px 22px",fontWeight:700,display:"flex",alignItems:"center",gap:8,fontSize:14,minWidth:130}}>
                <Icon name={tRun?"pause":"play"} size={16} color={C.green}/>
                {tRun ? "Pause" : "Reprendre"}
              </button>
              <button
                onClick={handleSkipRest}
                style={{background:C.card2,color:C.text,borderRadius:14,padding:"12px 22px",fontWeight:700,fontSize:14}}>
                Passer →
              </button>
            </div>

            {/* Timer terminé naturellement */}
            {sec === 0 && !tRun && (
              <p style={{color:C.green,fontSize:13,marginTop:16,fontWeight:600}}>
                ✓ Repos terminé — appuie sur Passer
              </p>
            )}
          </div>
        )}

        {/* ════════ ÉCRAN EXERCICE ════════ */}
        {S.phase === "work" && ex && (
          <div className="fi">

            {/* En-tête exercice */}
            <div style={{background:`linear-gradient(135deg,${C.greenL},${C.accentL})`,borderRadius:22,padding:22,marginBottom:14}}>
              <p style={{color:C.green,fontSize:11,textTransform:"uppercase",letterSpacing:1,marginBottom:5,fontWeight:600}}>
                Exercice {S.exIdx+1} / {exercises.length}
              </p>
              <h2 className="f" style={{color:C.text,fontSize:28,marginBottom:3}}>{ex.name}</h2>
              <p style={{color:C.sub,fontSize:13,marginBottom:14}}>{ex.subtitle}</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[
                  {l:ex.reps, c:C.accent},
                  {l:`${ex.sets} série${ex.sets>1?"s":""}`, c:C.green},
                  {l:ex.muscles, c:C.sub}
                ].map((t,i)=>(
                  <span key={i} style={{background:C.card,color:t.c,borderRadius:20,padding:"3px 11px",fontSize:11,fontWeight:600}}>
                    {t.l}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{background:C.card,borderRadius:14,padding:14,marginBottom:14}}>
              <p style={{color:C.sub,fontSize:13,lineHeight:1.6}}>{ex.desc}</p>
            </div>

            {/* Tracker des séries */}
            <div style={{background:C.card,borderRadius:14,padding:16,marginBottom:18}}>
              <p style={{color:C.sub,fontSize:11,textTransform:"uppercase",letterSpacing:1,marginBottom:12,fontWeight:600}}>
                Avancement des séries
              </p>
              <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:10}}>
                {Array.from({length:totalSets}, (_,i) => {
                  const k = `${S.exIdx}_${i+1}`;
                  const isComp   = S.doneSets.includes(k);
                  const isActive = (i+1) === S.setIdx;
                  return (
                    <div key={i} style={{
                      width:46, height:46, borderRadius:13,
                      background: isComp ? C.green : isActive ? C.greenL : C.card2,
                      border: isActive ? `2px solid ${C.green}` : "2px solid transparent",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition:"all .25s"
                    }}>
                      {isComp
                        ? <Icon name="check" size={17} color="#fff"/>
                        : <span style={{color:isActive?C.green:C.sub, fontWeight:700, fontSize:16}}>{i+1}</span>
                      }
                    </div>
                  );
                })}
              </div>
              <p style={{textAlign:"center",color:C.sub,fontSize:13}}>
                Série <strong style={{color:C.text}}>{S.setIdx}</strong> sur <strong style={{color:C.text}}>{totalSets}</strong>
              </p>
            </div>

            {/* Bouton principal */}
            <button
              onClick={handleSetDone}
              style={{
                width:"100%",
                background:`linear-gradient(135deg,${C.green},${C.greenB})`,
                color:"#fff", borderRadius:16, padding:"18px",
                fontWeight:700, fontSize:16,
                boxShadow:"0 4px 20px rgba(74,124,89,.4)",
                marginBottom:12
              }}>
              {isLastSet && isLastEx
                ? "Terminer la séance 🎉"
                : `Série ${S.setIdx} terminée ✓`
              }
            </button>

            {/* Indication du prochain */}
            <p style={{textAlign:"center",color:C.sub,fontSize:12}}>
              {isLastSet && isLastEx
                ? "Dernière série — tu y es presque ! 💪"
                : isLastSet
                  ? <>Prochain exercice : <strong style={{color:C.text}}>{exercises[S.exIdx+1]?.name}</strong></>
                  : <>Prochain : <strong style={{color:C.text}}>Série {S.setIdx+1}</strong></>
              }
            </p>

          </div>
        )}
      </div>
    </div>
  );
}

// ─── BIBLIOTHÈQUE D'ALIMENTS ──────────────────────────────────────────────────
const FOODS = {
  proteines: {
    label:"Protéines", icon:"🥩", color:"#C0392B",
    items:[
      {id:"p1",  name:"Poulet braisé",      cal:165, p:31, g:0,  l:4,  unit:"100g"},
      {id:"p2",  name:"Tilapia grillé",     cal:128, p:26, g:0,  l:3,  unit:"100g"},
      {id:"p3",  name:"Maquereau grillé",   cal:205, p:19, g:0,  l:14, unit:"100g"},
      {id:"p4",  name:"Sardine boîte",      cal:208, p:25, g:0,  l:11, unit:"100g"},
      {id:"p5",  name:"Thon boîte (eau)",   cal:116, p:26, g:0,  l:1,  unit:"100g"},
      {id:"p6",  name:"Oeuf dur",           cal:78,  p:6,  g:1,  l:5,  unit:"1 oeuf"},
      {id:"p7",  name:"Poisson fumé",       cal:170, p:28, g:0,  l:6,  unit:"80g"},
      {id:"p8",  name:"Haricots niébé",     cal:127, p:9,  g:23, l:1,  unit:"100g cuit"},
      {id:"p9",  name:"Arachides natures",  cal:161, p:7,  g:5,  l:14, unit:"30g"},
      {id:"p10", name:"Dinde grillée",      cal:135, p:30, g:0,  l:1,  unit:"100g"},
      {id:"p11", name:"Haricots rouges",    cal:127, p:9,  g:23, l:1,  unit:"100g cuit"},
      {id:"p12", name:"Yaourt nature",      cal:61,  p:3,  g:5,  l:3,  unit:"100g"},
    ]
  },
  feculents: {
    label:"Féculents", icon:"🍚", color:"#D4A017",
    items:[
      {id:"f1",  name:"Riz blanc cuit",     cal:130, p:3,  g:28, l:0,  unit:"100g"},
      {id:"f2",  name:"Riz de Glazoué",     cal:130, p:3,  g:28, l:0,  unit:"100g"},
      {id:"f3",  name:"Igname bouillie",    cal:118, p:2,  g:28, l:0,  unit:"100g"},
      {id:"f4",  name:"Patate douce",       cal:86,  p:2,  g:20, l:0,  unit:"100g"},
      {id:"f5",  name:"Pâtes cuites",       cal:131, p:5,  g:25, l:1,  unit:"100g"},
      {id:"f6",  name:"Pain complet",       cal:247, p:8,  g:41, l:4,  unit:"100g"},
      {id:"f7",  name:"Plantain mûr cuit",  cal:122, p:1,  g:32, l:0,  unit:"100g"},
      {id:"f8",  name:"Manioc/gari",        cal:360, p:1,  g:86, l:1,  unit:"100g sec"},
      {id:"f9",  name:"Maïs/ogi/akassa",   cal:96,  p:3,  g:21, l:1,  unit:"100g cuit"},
      {id:"f10", name:"Bouillie de maïs",   cal:72,  p:2,  g:16, l:1,  unit:"200ml"},
      {id:"f11", name:"Pomme de terre",     cal:77,  p:2,  g:17, l:0,  unit:"100g"},
      {id:"f12", name:"Flocons d'avoine",   cal:389, p:17, g:66, l:7,  unit:"100g sec"},
    ]
  },
  legumes: {
    label:"Légumes", icon:"🥦", color:"#27AE60",
    items:[
      {id:"l1",  name:"Salade verte",       cal:15,  p:1,  g:2,  l:0,  unit:"100g"},
      {id:"l2",  name:"Tomate",             cal:18,  p:1,  g:4,  l:0,  unit:"100g"},
      {id:"l3",  name:"Concombre",          cal:15,  p:1,  g:3,  l:0,  unit:"100g"},
      {id:"l4",  name:"Carotte",            cal:41,  p:1,  g:10, l:0,  unit:"100g"},
      {id:"l5",  name:"Aubergine africaine",cal:25,  p:1,  g:6,  l:0,  unit:"100g"},
      {id:"l6",  name:"Oignon",             cal:40,  p:1,  g:9,  l:0,  unit:"100g"},
      {id:"l7",  name:"Feuilles moringa",   cal:64,  p:9,  g:8,  l:2,  unit:"100g"},
      {id:"l8",  name:"Piment doux",        cal:31,  p:1,  g:7,  l:0,  unit:"100g"},
      {id:"l9",  name:"Épinards",           cal:23,  p:3,  g:4,  l:0,  unit:"100g"},
      {id:"l10", name:"Brocoli",            cal:34,  p:3,  g:7,  l:0,  unit:"100g"},
      {id:"l11", name:"Haricots verts",     cal:31,  p:2,  g:7,  l:0,  unit:"100g"},
    ]
  },
  fruits: {
    label:"Fruits", icon:"🍉", color:"#E74C3C",
    items:[
      {id:"fr1", name:"Mangue",             cal:60,  p:1,  g:15, l:0,  unit:"100g"},
      {id:"fr2", name:"Papaye",             cal:43,  p:0,  g:11, l:0,  unit:"100g"},
      {id:"fr3", name:"Ananas",             cal:50,  p:1,  g:13, l:0,  unit:"100g"},
      {id:"fr4", name:"Banane",             cal:89,  p:1,  g:23, l:0,  unit:"1 banane"},
      {id:"fr5", name:"Orange",             cal:47,  p:1,  g:12, l:0,  unit:"1 orange"},
      {id:"fr6", name:"Pomme",              cal:52,  p:0,  g:14, l:0,  unit:"1 pomme"},
      {id:"fr7", name:"Citron vert",        cal:20,  p:0,  g:7,  l:0,  unit:"1 citron"},
      {id:"fr8", name:"Avocat local",       cal:160, p:2,  g:9,  l:15, unit:"100g"},
    ]
  },
  snacks: {
    label:"Snacks & Lipides", icon:"🥜", color:"#8E44AD",
    items:[
      {id:"s1",  name:"Noix de cajou",      cal:157, p:5,  g:9,  l:12, unit:"30g"},
      {id:"s2",  name:"Arachides grillées", cal:170, p:8,  g:5,  l:15, unit:"30g"},
      {id:"s3",  name:"Noix de coco pulpe", cal:354, p:3,  g:15, l:33, unit:"100g"},
      {id:"s4",  name:"Graines de sésame",  cal:52,  p:2,  g:2,  l:4,  unit:"1 càs"},
      {id:"s5",  name:"Huile de palme",     cal:120, p:0,  g:0,  l:14, unit:"1 càs"},
      {id:"s6",  name:"Huile d'olive",      cal:120, p:0,  g:0,  l:14, unit:"1 càs"},
      {id:"s7",  name:"Beurre de cacahuète",cal:94,  p:4,  g:3,  l:8,  unit:"1 càs"},
      {id:"s8",  name:"Chocolat noir 70%",  cal:170, p:2,  g:13, l:12, unit:"30g"},
    ]
  },
  boissons: {
    label:"Boissons", icon:"🥤", color:"#2980B9",
    items:[
      {id:"b1",  name:"Eau",                cal:0,   p:0,  g:0,  l:0,  unit:"500ml"},
      {id:"b2",  name:"Tisane gingembre",   cal:5,   p:0,  g:1,  l:0,  unit:"250ml"},
      {id:"b3",  name:"Jus citron vert",    cal:10,  p:0,  g:3,  l:0,  unit:"250ml"},
      {id:"b4",  name:"Lait de vache",      cal:61,  p:3,  g:5,  l:3,  unit:"100ml"},
      {id:"b5",  name:"Café sans sucre",    cal:2,   p:0,  g:0,  l:0,  unit:"250ml"},
      {id:"b6",  name:"Thé sans sucre",     cal:2,   p:0,  g:0,  l:0,  unit:"250ml"},
    ]
  },
};

const PORTIONS = [
  {id:"s", label:"Petite", mult:0.6},
  {id:"m", label:"Normale", mult:1.0},
  {id:"l", label:"Grande", mult:1.5},
];

const MEALS_SLOTS = [
  {id:"reveil",  label:"Réveil",        icon:"💧", targetCal:10},
  {id:"ptdej",   label:"Petit-déjeuner",icon:"🌅", targetCal:370},
  {id:"collatin",label:"Collation 10h", icon:"🥜", targetCal:190},
  {id:"dejeuner",label:"Déjeuner",      icon:"🍽️", targetCal:530},
  {id:"collatpm",label:"Collation 16h", icon:"🍉", targetCal:130},
  {id:"diner",   label:"Dîner",         icon:"🌙", targetCal:470},
];

function NutS({C, state, todayHyd, setHyd, save}) {
  // todayMeals = { mealSlotId: [ {foodId, portionId}, ... ] }
  const todayMeals = state.nutrition[state.currentDay] || {};
  const [activeSlot, setActiveSlot] = useState(null); // slot ouvert pour ajouter
  const [activeTab,  setActiveTab]  = useState("proteines"); // tab dans la bibliothèque
  const [search,     setSearch]     = useState("");

  // Calcul total calories du jour
  const totalCal = Object.values(todayMeals).flat().reduce((sum, entry) => {
    const food = Object.values(FOODS).flatMap(c => c.items).find(f => f.id === entry.foodId);
    const mult = PORTIONS.find(p => p.id === entry.portionId)?.mult || 1;
    return sum + Math.round((food?.cal || 0) * mult);
  }, 0);

  const TARGET_MIN = 1700, TARGET_MAX = 1900;
  const calPct = Math.min(100, (totalCal / TARGET_MAX) * 100);
  const calStatus = totalCal < TARGET_MIN ? {c:"#4A90D9", t:"Un peu léger"} : totalCal <= TARGET_MAX ? {c:C.green, t:"Parfait !"} : {c:C.accent, t:"Légèrement élevé"};

  // Macros totaux
  const macros = Object.values(todayMeals).flat().reduce((acc, entry) => {
    const food = Object.values(FOODS).flatMap(c => c.items).find(f => f.id === entry.foodId);
    const mult = PORTIONS.find(p => p.id === entry.portionId)?.mult || 1;
    return { p: acc.p + Math.round((food?.p||0)*mult), g: acc.g + Math.round((food?.g||0)*mult), l: acc.l + Math.round((food?.l||0)*mult) };
  }, {p:0, g:0, l:0});

  const addFood = (foodId) => {
    if (!activeSlot) return;
    const current = todayMeals[activeSlot] || [];
    // éviter doublon
    if (current.find(e => e.foodId === foodId)) return;
    const updated = { ...todayMeals, [activeSlot]: [...current, {foodId, portionId:"m"}] };
    save({ nutrition: { ...state.nutrition, [state.currentDay]: updated } });
  };

  const removeFood = (slotId, foodId) => {
    const updated = { ...todayMeals, [slotId]: (todayMeals[slotId]||[]).filter(e => e.foodId !== foodId) };
    save({ nutrition: { ...state.nutrition, [state.currentDay]: updated } });
  };

  const changePortion = (slotId, foodId, portionId) => {
    const updated = { ...todayMeals, [slotId]: (todayMeals[slotId]||[]).map(e => e.foodId === foodId ? {...e, portionId} : e) };
    save({ nutrition: { ...state.nutrition, [state.currentDay]: updated } });
  };

  const slotCal = (slotId) => (todayMeals[slotId]||[]).reduce((sum, entry) => {
    const food = Object.values(FOODS).flatMap(c=>c.items).find(f=>f.id===entry.foodId);
    const mult = PORTIONS.find(p=>p.id===entry.portionId)?.mult||1;
    return sum + Math.round((food?.cal||0)*mult);
  }, 0);

  const allFoods = Object.values(FOODS).flatMap(c=>c.items);
  const filteredFoods = search.length > 1
    ? allFoods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : FOODS[activeTab]?.items || [];

  return (
    <div className="fi" style={{padding:"52px 16px 24px"}}>
      <h1 className="f" style={{color:C.text, fontSize:28, marginBottom:3}}>Nutrition</h1>
      <p style={{color:C.sub, fontSize:14, marginBottom:18}}>Jour {state.currentDay} · construis tes repas</p>

      {/* ── Bilan calories ── */}
      <div style={{background:`linear-gradient(135deg,${C.green},#2E5C3E)`, borderRadius:20, padding:18, marginBottom:14, color:"#fff"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:12}}>
          <div>
            <p style={{opacity:.8, fontSize:12, marginBottom:2}}>Calories du jour</p>
            <p className="f" style={{fontSize:42, fontWeight:700, lineHeight:1}}>{totalCal}</p>
            <p style={{opacity:.7, fontSize:12, marginTop:2}}>objectif : {TARGET_MIN}–{TARGET_MAX} kcal</p>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{background:"rgba(255,255,255,.15)", borderRadius:10, padding:"6px 12px"}}>
              <p style={{fontSize:13, fontWeight:700}}>{calStatus.t}</p>
            </div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.2)", borderRadius:50, height:8, overflow:"hidden", marginBottom:12}}>
          <div style={{background:"#fff", width:`${calPct}%`, height:"100%", borderRadius:50, transition:"width .5s"}}/>
        </div>
        {/* Macros */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
          {[{l:"Protéines",v:macros.p,t:"g",obj:"110-140"},{l:"Glucides",v:macros.g,t:"g",obj:"180-220"},{l:"Lipides",v:macros.l,t:"g",obj:"55-70"}].map((m,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.12)", borderRadius:10, padding:"8px 6px", textAlign:"center"}}>
              <p style={{fontSize:16, fontWeight:700}}>{m.v}{m.t}</p>
              <p style={{opacity:.7, fontSize:10}}>{m.l}</p>
              <p style={{opacity:.55, fontSize:10}}>obj: {m.obj}g</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hydratation ── */}
      <div style={{background:C.card, borderRadius:18, padding:16, marginBottom:14}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <div>
            <p style={{color:C.sub, fontSize:11, textTransform:"uppercase", letterSpacing:1, fontWeight:600}}>Hydratation</p>
            <p className="f" style={{color:C.text, fontSize:24, marginTop:2}}>{todayHyd.toFixed(1)}L <span style={{fontSize:14, color:C.sub}}>/ 2.5L</span></p>
          </div>
          <span style={{fontSize:28}}>💧</span>
        </div>
        <div style={{background:C.card2, borderRadius:50, height:6, marginBottom:12, overflow:"hidden"}}>
          <div style={{background:"#4A90D9", width:`${Math.min(100,(todayHyd/2.5)*100)}%`, height:"100%", borderRadius:50, transition:"width .4s"}}/>
        </div>
        <div style={{display:"flex", gap:8}}>
          {[.25,.5,1].map(v=>(
            <button key={v} onClick={()=>setHyd(todayHyd+v)} style={{flex:1, background:C.greenL, color:C.green, borderRadius:10, padding:"9px 4px", fontWeight:700, fontSize:14}}>+{v}L</button>
          ))}
          <button onClick={()=>setHyd(Math.max(0,todayHyd-.25))} style={{background:C.card2, color:C.sub, borderRadius:10, padding:"9px 12px"}}>
            <Icon name="minus" size={14} color={C.sub}/>
          </button>
        </div>
      </div>

      {/* ── Slots repas ── */}
      <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom:14}}>
        {MEALS_SLOTS.map(slot => {
          const entries = todayMeals[slot.id] || [];
          const kcal = slotCal(slot.id);
          const isOpen = activeSlot === slot.id;
          return (
            <div key={slot.id} style={{background:C.card, borderRadius:18, overflow:"hidden", border:`2px solid ${isOpen ? C.green : "transparent"}`, transition:"border .2s"}}>
              {/* En-tête slot */}
              <button onClick={()=>setActiveSlot(isOpen ? null : slot.id)}
                style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", textAlign:"left"}}>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <span style={{fontSize:22}}>{slot.icon}</span>
                  <div>
                    <p style={{color:C.text, fontWeight:600, fontSize:14}}>{slot.label}</p>
                    <p style={{color:C.sub, fontSize:11, marginTop:1}}>
                      {entries.length > 0 ? `${entries.length} aliment${entries.length>1?"s":""} · ${kcal} kcal` : "Appuie pour ajouter"}
                    </p>
                  </div>
                </div>
                <div style={{display:"flex", alignItems:"center", gap:8}}>
                  {kcal > 0 && <span style={{background:C.greenL, color:C.green, borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:700}}>{kcal} kcal</span>}
                  <span style={{color:C.sub, fontSize:18}}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {/* Aliments ajoutés */}
              {entries.length > 0 && (
                <div style={{paddingLeft:16, paddingRight:16, paddingBottom: isOpen ? 0 : 12}}>
                  {entries.map(entry => {
                    const food = allFoods.find(f=>f.id===entry.foodId);
                    if (!food) return null;
                    const mult = PORTIONS.find(p=>p.id===entry.portionId)?.mult||1;
                    const cal = Math.round(food.cal * mult);
                    return (
                      <div key={entry.foodId} style={{display:"flex", alignItems:"center", gap:8, marginBottom:8}}>
                        <div style={{flex:1}}>
                          <span style={{color:C.text, fontSize:13, fontWeight:500}}>{food.name}</span>
                          <span style={{color:C.sub, fontSize:11, marginLeft:6}}>{cal} kcal</span>
                        </div>
                        {/* Portion selector */}
                        <div style={{display:"flex", gap:4}}>
                          {PORTIONS.map(p=>(
                            <button key={p.id} onClick={()=>changePortion(slot.id, entry.foodId, p.id)}
                              style={{background:entry.portionId===p.id?C.green:C.card2, color:entry.portionId===p.id?"#fff":C.sub, borderRadius:8, padding:"3px 7px", fontSize:11, fontWeight:600}}>
                              {p.label}
                            </button>
                          ))}
                        </div>
                        <button onClick={()=>removeFood(slot.id, entry.foodId)} style={{color:C.sub, padding:"2px 4px", fontSize:16, lineHeight:1}}>×</button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bibliothèque ouverte */}
              {isOpen && (
                <div style={{borderTop:`1px solid ${C.border}`, padding:14}}>
                  {/* Recherche */}
                  <input
                    value={search} onChange={e=>setSearch(e.target.value)}
                    placeholder="🔍 Rechercher un aliment..."
                    style={{width:"100%", background:C.card2, border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 12px", color:C.text, fontSize:13, marginBottom:10}}
                  />

                  {/* Onglets catégories */}
                  {!search && (
                    <div style={{display:"flex", gap:6, overflowX:"auto", paddingBottom:8, marginBottom:8}}>
                      {Object.entries(FOODS).map(([key,cat])=>(
                        <button key={key} onClick={()=>setActiveTab(key)}
                          style={{background:activeTab===key?cat.color:C.card2, color:activeTab===key?"#fff":C.sub, borderRadius:10, padding:"5px 12px", fontSize:12, fontWeight:600, flexShrink:0, transition:"all .2s"}}>
                          {cat.icon} {cat.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Liste aliments */}
                  <div style={{maxHeight:220, overflowY:"auto", display:"flex", flexDirection:"column", gap:6}}>
                    {filteredFoods.map(food => {
                      const already = (todayMeals[slot.id]||[]).find(e=>e.foodId===food.id);
                      return (
                        <button key={food.id} onClick={()=>addFood(food.id)}
                          style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:already?C.greenL:C.card2, borderRadius:12, padding:"10px 12px", textAlign:"left", border:`1px solid ${already?C.green:"transparent"}`, transition:"all .15s"}}>
                          <div>
                            <p style={{color:already?C.green:C.text, fontWeight:600, fontSize:13}}>{food.name}</p>
                            <p style={{color:C.sub, fontSize:11, marginTop:1}}>{food.unit} · {food.p}g prot · {food.g}g glu · {food.l}g lip</p>
                          </div>
                          <div style={{display:"flex", alignItems:"center", gap:8}}>
                            <span style={{color:C.accent, fontWeight:700, fontSize:13}}>{food.cal} kcal</span>
                            {already
                              ? <span style={{color:C.green, fontSize:16}}>✓</span>
                              : <span style={{color:C.green, fontSize:20, fontWeight:700, lineHeight:1}}>+</span>
                            }
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button onClick={()=>setActiveSlot(null)}
                    style={{width:"100%", marginTop:10, background:C.greenL, color:C.green, borderRadius:12, padding:"10px", fontWeight:700, fontSize:14}}>
                    ✓ Fermer
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Conseil du jour ── */}
      <div style={{background:C.greenL, borderRadius:16, padding:16, border:`1px solid ${C.green}22`}}>
        <p style={{color:C.green, fontWeight:700, fontSize:12, marginBottom:8}}>💡 Super-aliments à privilégier</p>
        {["Moringa : riche en protéines, à ajouter dans sauces et bouillies","Gingembre frais : anti-inflammatoire, parfait au réveil","Noix de cajou : magnésium, anti-crampes après séance","Haricots niébé : protéines complètes, économique et local"].map((t,i)=>(
          <p key={i} style={{color:C.sub, fontSize:12, lineHeight:1.5, marginBottom:i<3?3:0}}>• {t}</p>
        ))}
      </div>
    </div>
  );
}

function ProgS({C,state,save}){
  const [editing,setEditing]=useState(null);
  const [tempVal,setTempVal]=useState("");
  const weeks=["w1","w2","w3","w4"];
  const wkL={w1:"Semaine 1",w2:"Semaine 2",w3:"Semaine 3",w4:"Semaine 4"};
  const metrics=[
    {id:"weight",label:"Poids (kg)",icon:"⚖️",unit:"kg"},
    {id:"waist",label:"Tour de taille (cm)",icon:"📏",unit:"cm"},
    {id:"thighs",label:"Tour de cuisses (cm)",icon:"📐",unit:"cm"},
    {id:"pushups",label:"Pompes max",icon:"💪",unit:"reps"},
    {id:"plank",label:"Gainage max",icon:"⏱️",unit:"sec"},
    {id:"energy",label:"Énergie /10",icon:"⚡",unit:"/10"},
    {id:"sleep",label:"Sommeil /10",icon:"😴",unit:"/10"},
  ];
  const cw=`w${Math.min(4,Math.ceil(state.currentDay/7))}`;
  const [aw,setAw]=useState(cw);

  const upd=(week,mid,val)=>{
    save({progress:{...state.progress,[week]:{...(state.progress[week]||{}),[mid]:val}}});
    setEditing(null);
  };

  const Spark=({mid})=>{
    const vals=weeks.map(w=>parseFloat(state.progress[w]?.[mid]||0)).filter(v=>v>0);
    if(vals.length<2) return <span style={{color:C.sub,fontSize:12}}>—</span>;
    const mx=Math.max(...vals),mn=Math.min(...vals),range=mx-mn||1;
    const W=58,H=22;
    const pts=vals.map((v,i)=>`${(i/(vals.length-1))*W},${H-((v-mn)/range)*H}`).join(" ");
    const up=vals[vals.length-1]>vals[0];
    const better=(mid==="weight"||mid==="waist"||mid==="thighs")?!up:up;
    return <div style={{display:"flex",alignItems:"center",gap:6}}>
      <svg width={W} height={H} style={{overflow:"visible"}}>
        <polyline points={pts} fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {vals.map((v,i)=><circle key={i} cx={(i/(vals.length-1))*W} cy={H-((v-mn)/range)*H} r="2.5" fill={C.green}/>)}
      </svg>
      <span style={{color:better?C.green:C.accent,fontSize:13,fontWeight:700}}>{up?"↑":"↓"}</span>
    </div>;
  };

  return(
    <div className="fi" style={{padding:"52px 16px 24px"}}>
      <h1 className="f" style={{color:C.text,fontSize:28,marginBottom:3}}>Mes progrès</h1>
      <p style={{color:C.sub,fontSize:14,marginBottom:18}}>Suivi semaine par semaine</p>
      <div style={{display:"flex",gap:8,marginBottom:18,overflowX:"auto",paddingBottom:4}}>
        {weeks.map(w=>(
          <button key={w} onClick={()=>setAw(w)} style={{background:aw===w?C.green:C.card,color:aw===w?"#fff":C.sub,borderRadius:12,padding:"7px 15px",fontWeight:600,fontSize:12,flexShrink:0,border:w===cw?`2px solid ${C.green}`:"none",transition:"all .2s"}}>
            {wkL[w]}{w===cw?" •":""}
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:18}}>
        {metrics.map(m=>{
          const val=state.progress[aw]?.[m.id];
          const isEd=editing===`${aw}_${m.id}`;
          return(
            <div key={m.id} style={{background:C.card,borderRadius:15,padding:14,display:"flex",alignItems:"center",gap:13}}>
              <span style={{fontSize:22,flexShrink:0}}>{m.icon}</span>
              <div style={{flex:1}}>
                <p style={{color:C.sub,fontSize:12}}>{m.label}</p>
                {isEd?(
                  <div style={{display:"flex",gap:7,marginTop:5}}>
                    <input type="number" value={tempVal} onChange={e=>setTempVal(e.target.value)} placeholder="Valeur" autoFocus
                      style={{flex:1,background:C.card2,border:`1px solid ${C.green}`,borderRadius:9,padding:"6px 9px",color:C.text,fontSize:14}}/>
                    <button onClick={()=>upd(aw,m.id,tempVal)} style={{background:C.green,color:"#fff",borderRadius:9,padding:"6px 12px",fontWeight:600,fontSize:12}}>OK</button>
                    <button onClick={()=>setEditing(null)} style={{background:C.card2,borderRadius:9,padding:"6px 9px"}}><Icon name="x" size={13} color={C.sub}/></button>
                  </div>
                ):(
                  <div style={{display:"flex",alignItems:"center",gap:9,marginTop:4}}>
                    <p className="f" style={{color:val?C.text:C.sub,fontSize:22}}>{val?`${val} ${m.unit}`:"—"}</p>
                    <button onClick={()=>{setEditing(`${aw}_${m.id}`);setTempVal(val||"");}} style={{padding:3}}><Icon name="pencil" size={13} color={C.sub}/></button>
                  </div>
                )}
              </div>
              <Spark mid={m.id}/>
            </div>
          );
        })}
      </div>
      {state.progress.w1&&Object.keys(state.progress.w1).length>0&&aw!=="w1"&&(
        <div style={{background:C.greenL,borderRadius:18,padding:18,border:`1px solid ${C.green}22`}}>
          <p className="f" style={{color:C.green,fontSize:17,marginBottom:11}}>Évolution S1 → {wkL[aw]}</p>
          {metrics.slice(0,5).map(m=>{
            const v1=parseFloat(state.progress.w1?.[m.id]||0);
            const v2=parseFloat(state.progress[aw]?.[m.id]||0);
            if(!v1||!v2) return null;
            const diff=v2-v1;
            const better=(m.id==="weight"||m.id==="waist"||m.id==="thighs")?diff<0:diff>0;
            return <div key={m.id} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{color:C.sub,fontSize:13}}>{m.icon} {m.label}</span>
              <span style={{color:better?C.green:C.accent,fontWeight:700,fontSize:14}}>{diff>0?"+":""}{diff.toFixed(1)} {m.unit}</span>
            </div>;
          }).filter(Boolean)}
        </div>
      )}
    </div>
  );
}

function PlanS({C,state,save,onAdv}){
  const [jDay,setJDay]=useState(null);
  const [jText,setJText]=useState("");
  const [sDay,setSDay]=useState(null);
  const [sVal,setSVal]=useState("");
  const tc={
    A:{bg:C.green,tc:"#fff",l:"A"},B:{bg:C.accent,tc:"#fff",l:"B"},
    "rest+":{bg:C.greenL,tc:C.green,l:"R+"},rest:{bg:C.card2,tc:C.sub,l:"R"},
    bilan:{bg:C.accentL,tc:C.accent,l:"★"}
  };
  const saveJ=()=>{save({habits:{...state.habits,[`j_${jDay}`]:jText}});setJDay(null);};
  const saveS=()=>{save({habits:{...state.habits,[`s_${sDay}`]:sVal}});setSDay(null);};

  return(
    <div className="fi" style={{padding:"52px 16px 24px"}}>
      <h1 className="f" style={{color:C.text,fontSize:28,marginBottom:3}}>Planning 30 jours</h1>
      <p style={{color:C.sub,fontSize:14,marginBottom:12}}>Ton programme jour par jour</p>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
        {[["A","Séance A",C.green,"#fff"],["B","Séance B",C.accent,"#fff"],["R+","Repos actif",C.greenL,C.green],["R","Repos",C.card2,C.sub],["★","Bilan",C.accentL,C.accent]].map(([s,l,bg,c])=>(
          <div key={s} style={{background:bg,borderRadius:8,padding:"4px 9px",display:"flex",gap:5,alignItems:"center"}}>
            <span style={{color:c,fontSize:10,fontWeight:700}}>{s}</span>
            <span style={{color:c,fontSize:10}}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginBottom:18}}>
        {PROGRAM.schedule.map(d=>{
          const t=tc[d.type];
          const cur=d.day===state.currentDay;
          const isDone=state.completedDays.includes(d.day)||(d.type!=="A"&&d.type!=="B"&&d.day<state.currentDay);
          return(
            <div key={d.day} style={{background:t.bg,borderRadius:12,padding:"9px 5px",textAlign:"center",border:cur?`3px solid ${C.text}`:"none",opacity:d.day>state.currentDay?.55:1,position:"relative"}}>
              {isDone&&d.type!=="rest"&&d.type!=="rest+"&&<div style={{position:"absolute",top:3,right:3,background:"rgba(255,255,255,.9)",borderRadius:"50%",width:12,height:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name="check" size={8} color={C.green}/>
              </div>}
              <p style={{color:t.tc,fontWeight:700,fontSize:10}}>J{d.day}</p>
              <p style={{color:t.tc,fontSize:16,marginTop:2}}>{t.l}</p>
            </div>
          );
        })}
      </div>
      <div style={{background:C.card,borderRadius:20,padding:18,marginBottom:14}}>
        {PROGRAM.schedule.slice(state.currentDay-1,state.currentDay).map(d=>(
          <div key={d.day}>
            <p style={{color:C.sub,fontSize:11,textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginBottom:10}}>Aujourd'hui · Jour {d.day}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <h3 className="f" style={{color:C.text,fontSize:20}}>{d.label}</h3>
              <span style={{background:tc[d.type].bg,color:tc[d.type].tc,borderRadius:9,padding:"3px 11px",fontSize:12,fontWeight:700}}>{tc[d.type].l}</span>
            </div>
            <p style={{color:C.sub,fontSize:14}}>{d.note}</p>
          </div>
        ))}
      </div>
      <div style={{background:C.card,borderRadius:20,padding:18,marginBottom:14}}>
        <p style={{color:C.sub,fontSize:11,textTransform:"uppercase",letterSpacing:1,fontWeight:600,marginBottom:13}}>Habitudes du jour</p>
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:20}}>😴</span>
              <div><p style={{color:C.text,fontSize:14,fontWeight:500}}>Sommeil</p><p style={{color:C.sub,fontSize:11}}>Objectif : 7-9h</p></div>
            </div>
            <button onClick={()=>{setSDay(state.currentDay);setSVal(state.habits[`s_${state.currentDay}`]||"");}} style={{background:C.greenL,color:C.green,borderRadius:10,padding:"6px 13px",fontWeight:600,fontSize:12}}>
              {state.habits[`s_${state.currentDay}`]?`${state.habits[`s_${state.currentDay}`]}h ✓`:"Entrer"}
            </button>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:20}}>✍️</span>
              <div><p style={{color:C.text,fontSize:14,fontWeight:500}}>Journal du jour</p><p style={{color:C.sub,fontSize:11}}>2-3 lignes sur ta journée</p></div>
            </div>
            <button onClick={()=>{setJDay(state.currentDay);setJText(state.habits[`j_${state.currentDay}`]||"");}} style={{background:state.habits[`j_${state.currentDay}`]?C.greenL:C.accentL,color:state.habits[`j_${state.currentDay}`]?C.green:C.accent,borderRadius:10,padding:"6px 13px",fontWeight:600,fontSize:12}}>
              {state.habits[`j_${state.currentDay}`]?"Voir ✓":"Écrire"}
            </button>
          </div>
          <div style={{background:C.accentL,borderRadius:13,padding:13,display:"flex",gap:11,alignItems:"center"}}>
            <span style={{fontSize:20}}>🫁</span>
            <div><p style={{color:C.text,fontSize:14,fontWeight:500}}>Respiration 5 min</p><p style={{color:C.sub,fontSize:12}}>Inspirer 4s · Tenir 4s · Expirer 6s</p></div>
          </div>
        </div>
      </div>

      {jDay&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:999}}>
        <div style={{background:C.card,borderRadius:"22px 22px 0 0",padding:22,width:"100%",maxWidth:430}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <h3 className="f" style={{color:C.text,fontSize:19}}>Journal — Jour {jDay}</h3>
            <button onClick={()=>setJDay(null)}><Icon name="x" size={19} color={C.sub}/></button>
          </div>
          <textarea value={jText} onChange={e=>setJText(e.target.value)} rows={4} placeholder="Comment s'est passée ta journée ? Qu'as-tu bien fait ?"
            style={{width:"100%",background:C.card2,border:`1px solid ${C.border}`,borderRadius:11,padding:13,color:C.text,fontSize:14,lineHeight:1.6,resize:"none"}}/>
          <button onClick={saveJ} style={{width:"100%",background:C.green,color:"#fff",borderRadius:13,padding:"13px",fontWeight:700,marginTop:11,fontSize:14}}>Enregistrer</button>
        </div>
      </div>}
      {sDay&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:999}}>
        <div style={{background:C.card,borderRadius:"22px 22px 0 0",padding:22,width:"100%",maxWidth:430}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <h3 className="f" style={{color:C.text,fontSize:19}}>Sommeil — Jour {sDay}</h3>
            <button onClick={()=>setSDay(null)}><Icon name="x" size={19} color={C.sub}/></button>
          </div>
          <input type="number" min="3" max="12" step="0.5" value={sVal} onChange={e=>setSVal(e.target.value)} placeholder="Ex: 7.5" autoFocus
            style={{width:"100%",background:C.card2,border:`1px solid ${C.green}`,borderRadius:11,padding:"13px",color:C.text,fontSize:18,textAlign:"center"}}/>
          <div style={{display:"flex",gap:7,marginTop:10}}>
            {["6","7","7.5","8","9"].map(h=>(
              <button key={h} onClick={()=>setSVal(h)} style={{flex:1,background:sVal===h?C.green:C.card2,color:sVal===h?"#fff":C.sub,borderRadius:9,padding:"7px 3px",fontWeight:600,fontSize:13}}>{h}h</button>
            ))}
          </div>
          <button onClick={saveS} style={{width:"100%",background:C.green,color:"#fff",borderRadius:13,padding:"13px",fontWeight:700,marginTop:11,fontSize:14}}>Enregistrer</button>
        </div>
      </div>}
    </div>
  );
}

// ─── LE COACH ────────────────────────────────────────────────────────────────
function CoachS({C}) {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(o => o === id ? null : id);

  const sections = [
    {
      id:"mesures",
      icon:"📊",
      title:"Comment remplir mes mesures",
      color:"#4A7C59",
      items:[
        {
          q:"Énergie /10 — comment noter ?",
          a:`Note ton niveau d'énergie ressentie dans la journée :\n\n• 9-10 : Je me sens exceptionnellement bien, en forme, motivée\n• 7-8 : Bonne journée, énergie normale, aucune fatigue particulière\n• 5-6 : Journée correcte mais un peu fatiguée, quelques baisses\n• 3-4 : Fatiguée, peu d'énergie, journée difficile\n• 1-2 : Épuisée, pas dormi, très mauvaise journée\n\nSois honnête avec toi-même. Cette mesure aide à voir si le programme est trop intense ou bien dosé.`
        },
        {
          q:"Sommeil /10 — comment noter ?",
          a:`Combine durée ET qualité de ton sommeil :\n\n• 9-10 : 8h+ de sommeil, réveil reposée, aucune interruption\n• 7-8 : 7-8h, réveil correct, sommeil globalement bon\n• 5-6 : 6-7h ou sommeil agité, réveils nocturnes\n• 3-4 : Moins de 6h ou très mauvaise qualité\n• 1-2 : Quasi pas dormi\n\n💡 Astuce : 7h30 de bon sommeil = environ 8/10`
        },
        {
          q:"Gainage max — comment mesurer ?",
          a:`Position planche :\n1. Avant-bras au sol, coudes sous les épaules\n2. Corps droit de la tête aux talons\n3. Contracte le ventre, ne laisse pas les fesses monter ou descendre\n4. Lance le chronomètre\n5. Note le temps quand tu ne peux plus tenir la position correcte\n\n💡 Semaine 1 : 20-30 sec c'est normal\nObjectif J30 : 60 sec et plus 💪`
        },
        {
          q:"Pompes max — comment compter ?",
          a:`1. Position pompe classique (ou sur les genoux si nécessaire)\n2. Descends jusqu'à ce que ta poitrine touche presque le sol\n3. Remonte complètement, bras tendus\n4. Compte jusqu'à ce que tu ne puisses plus faire une répétition correcte\n\n⚠️ Une pompe bâclée ne compte pas. Qualité avant quantité.\n\n💡 Semaine 1 : 5-10 pompes c'est très bien\nObjectif J30 : 20+ pompes`
        },
        {
          q:"Tour de taille — où mesurer ?",
          a:`Mesure toujours au même endroit pour que les comparaisons soient valables :\n\n📏 Tour de taille : au niveau du nombril, ventre détendu (pas rentré !)\n\n📐 Tour de cuisses : au niveau de la partie la plus large de la cuisse, debout jambes légèrement écartées\n\n💡 Toujours le matin à jeun, avant de manger. C'est là que la mesure est la plus fiable.`
        },
      ]
    },
    {
      id:"eviter",
      icon:"🚫",
      title:"Aliments à éviter",
      color:"#C0392B",
      items:[
        {
          q:"Sucres et sucreries",
          a:`❌ À éviter au maximum :\n• Sodas (Fanta, Coca, etc.) — vides caloriquement, font monter la glycémie\n• Jus de fruits industriels — autant de sucre qu'un soda\n• Biscuits, gâteaux industriels\n• Sucre blanc ajouté dans thé/café\n• Bonbons, chocolat au lait\n\n✅ Alternatives :\n• Eau infusée au gingembre ou citron\n• Fruits frais entiers (mangue, papaye)\n• Chocolat noir 70%+ en petite quantité`
        },
        {
          q:"Fritures et huiles en excès",
          a:`❌ À limiter fortement :\n• Aliments frits (beignets, frites, banane plantain frite)\n• Excès d'huile de palme dans les sauces\n• Viandes grasses frites\n\n✅ Alternatives :\n• Grillé, bouilli, cuit à la vapeur\n• Plantain mûr rôti au four\n• Viandes grillées sur braise\n\n💡 Une petite quantité d'huile de palme est OK — c'est l'excès qui pose problème.`
        },
        {
          q:"Alcool",
          a:`❌ Pourquoi éviter l'alcool pendant 30 jours :\n• Pertube la récupération musculaire\n• Nuit à la qualité du sommeil (même si tu t'endors vite)\n• Apporte des calories "vides" sans nutriments\n• Augmente l'appétit le lendemain\n• Ralentit la perte de masse grasse\n\n✅ Alternative sociale :\n• Eau gazeuse avec citron vert dans un verre\n• Bissap froid sans sucre ajouté\n• Gingembre frais pressé`
        },
        {
          q:"Fast food et plats ultra-transformés",
          a:`❌ À éviter :\n• Fast food (burgers, nuggets, hot-dogs)\n• Bouillons en cube en excès (très salés)\n• Chips, snacks industriels salés\n• Plats cuisinés en sachet\n• Mayonnaise industrielle en grande quantité\n\n✅ Pourquoi c'est important :\nCes aliments sont conçus pour être très appétissants mais pauvres en vrais nutriments. Ils perturbent la faim naturelle et apportent beaucoup de sel, de mauvaises graisses et d'additifs.`
        },
        {
          q:"Excès de sel",
          a:`❌ Sel en excès → rétention d'eau → gonflement apparent\n\n• Évite de re-saler les plats déjà assaisonnés\n• Réduis les bouillons en cube (utilise herbes fraîches à la place)\n• Poisson fumé très salé : à rincer avant de cuisiner\n\n✅ Épices recommandées :\n• Gingembre, ail, oignon, piment doux\n• Moringa en poudre dans les sauces\n• Citron vert pour relever les plats`
        },
      ]
    },
    {
      id:"regles",
      icon:"⭐",
      title:"Règles d'or du programme",
      color:"#C8864A",
      items:[
        {
          q:"💧 Boire 2.5L d'eau par jour",
          a:`C'est LA règle la plus importante.\n\nPourquoi :\n• L'eau aide à éliminer les toxines après l'effort\n• Réduit la fatigue musculaire et les crampes\n• Améliore la concentration et l'énergie\n• Aide à contrôler la faim (on confond souvent faim et soif)\n\n💡 Stratégie pratique :\n• 300ml au réveil (avant tout)\n• 1 verre avant chaque repas\n• 500ml pendant et après la séance\n• Tisane gingembre ou eau citronnée le soir`
        },
        {
          q:"🍽️ Manger dans les 30 min après la séance",
          a:`Après l'effort, tes muscles sont en mode "absorption maximale".\n\nCe qu'il faut manger :\n• Une protéine : oeuf, poulet, thon, niébé\n• Un féculent léger : riz, igname, pain complet\n• De l'eau !\n\n❌ Ne pas faire : sauter ce repas pour "perdre plus de poids". Ça ralentit la récupération et la construction musculaire.\n\n💡 Si tu n'as pas faim : un oeuf dur + une banane + un grand verre d'eau, c'est suffisant.`
        },
        {
          q:"😴 Dormir 7-9h minimum",
          a:`Le sommeil c'est là que tes muscles se reconstruisent et se renforcent.\n\nSans sommeil suffisant :\n• Les muscles récupèrent moins bien\n• La faim augmente (hormones du stress)\n• La motivation chute\n• Les résultats sont 2x plus lents\n\n💡 Conseils pour mieux dormir :\n• Éteindre les écrans 30 min avant de dormir\n• Pas de repas lourd 2h avant\n• Tisane gingembre ou verveine le soir\n• Dormir dans une pièce fraîche si possible`
        },
        {
          q:"📅 La régularité prime sur l'intensité",
          a:`1 séance par semaine à fond = peu de résultats\n2-3 séances par semaine régulières = transformation visible\n\nLe secret des 30 jours c'est la CONSTANCE.\n\n✅ Mieux vaut :\n• Faire 15 min correctement que 45 min en se blessant\n• Terminer une séance allégée que de ne rien faire\n• Écouter ton corps : si tu es vraiment épuisée, le repos actif est un entraînement\n\n💡 Règle des 2 minutes : si tu n'as pas envie, mets juste tes chaussures et commence 2 minutes. Tu finiras la séance.`
        },
        {
          q:"🌿 Manger local et de saison",
          a:`Au Bénin, tu as une chance incroyable :\nLes aliments locaux sont souvent plus frais, moins chers, et plus nutritifs que les produits importés.\n\n⭐ Champions locaux :\n• Moringa (kpashima) : plus de protéines que le lait\n• Niébé : protéines complètes + fibres\n• Igname : énergie durable, faible index glycémique\n• Poisson frais : protéines + oméga-3\n• Mangue de saison : vitamines C et A\n\n💡 Règle simple : si ta grand-mère reconnaît l'ingrédient, c'est probablement bon pour toi.`
        },
      ]
    },
    {
      id:"faq",
      icon:"❓",
      title:"FAQ — Tes questions fréquentes",
      color:"#2980B9",
      items:[
        {
          q:"J'ai raté une séance, que faire ?",
          a:`Ne panique pas. 1 séance ratée ne ruine pas 30 jours de travail.\n\n✅ Que faire :\n• Ne pas essayer de "rattraper" en doublant la prochaine séance (risque de blessure)\n• Reprends normalement la séance suivante prévue\n• Note dans ton journal pourquoi tu as raté — pour anticiper la prochaine fois\n\n❌ Ne pas faire :\n• S'en vouloir excessivement\n• Sauter 2 séances consécutives (c'est là que l'habitude se brise)\n\n💡 Si tu rates souvent le même jour → change ce jour dans ton planning.`
        },
        {
          q:"J'ai des courbatures, je continue ?",
          a:`Les courbatures = tes muscles se reconstruisent = c'est BON signe !\n\nMais il y a des degrés :\n\n✅ Courbatures normales (DOMS) :\n• Douleur légère à modérée 24-48h après la séance\n• → Continue ! Le repos actif (marche, étirements) aide à récupérer plus vite\n\n⚠️ À écouter :\n• Douleur vive pendant l'exercice → stop, mauvaise position\n• Douleur articulaire (genou, cheville) → repos obligatoire\n\n💡 Remède naturel : bain tiède + gingembre, massage léger, étirements doux.`
        },
        {
          q:"J'ai très faim entre les repas",
          a:`C'est normal les premières semaines. Ton corps s'adapte.\n\nCauses fréquentes :\n• Pas assez de protéines au repas précédent\n• Pas assez d'eau (soif ≠ faim)\n• Repas trop espacés\n\n✅ Solutions :\n• Boire un grand verre d'eau d'abord — attendre 10 min\n• Ajouter une protéine à ton repas (oeuf supplémentaire, arachides)\n• Collation autorisée : arachides natures + fruit frais\n• Manger plus lentement (20 min pour finir l'assiette)\n\n❌ Ne pas sauter de repas pour "compenser" — ça empire la faim.`
        },
        {
          q:"Je ne vois pas de résultats après 1 semaine",
          a:`1 semaine c'est trop tôt pour voir des changements visuels. Voici ce qui se passe réellement :\n\nSemaine 1-2 : Adaptation interne\n• Tes muscles apprennent les mouvements\n• Ton énergie commence à s'améliorer\n• Ton sommeil devient plus profond\n\nSemaine 3-4 : Les changements deviennent visibles\n• Vêtements moins serrés\n• Endurance améliorée\n• Posture différente\n\n💡 Mesure les VRAIS indicateurs de progrès :\n• Est-ce que tu fais plus de pompes qu'avant ?\n• Est-ce que tu tiens plus longtemps en gainage ?\n• Est-ce que tu te sens plus énergique ?\nCES changements arrivent avant le miroir.`
        },
        {
          q:"Que faire les jours de repos ?",
          a:`Les jours de repos sont AUSSI de l'entraînement.\n\n✅ Repos actif (R+) — recommandé :\n• Marche 20-35 min à rythme modéré\n• Yoga ou étirements 15-20 min\n• Vélo, natation à faible intensité\n• Danse (ça compte !)\n\n✅ Repos complet (R) :\n• Vraiment se reposer, dormir bien\n• Hydrater ++\n• Préparer ses repas de la semaine\n• Faire les mesures de bilan\n\n❌ Ne pas faire :\n• Rester allongée toute la journée sans bouger du tout\n• Reprendre une séance intense si le programme dit repos`
        },
        {
          q:"Je me sens découragée, comment tenir ?",
          a:`C'est absolument normal. Toutes les transformations passent par des moments de doute.\n\n💡 Ce qui aide vraiment :\n• Relis tes mesures du Jour 1 — tu as déjà progressé\n• Rappelle-toi POURQUOI tu as commencé\n• Ne rate pas 2 jours consécutifs — une courte séance suffit\n• Parle de tes progrès à quelqu'un qui te soutient\n• Une seule question : qu'est-ce que je peux faire AUJOURD'HUI, même petit ?\n\n🌱 Le découragement est une étape normale. Les personnes qui réussissent ne sont pas celles qui ne doutent jamais — ce sont celles qui continuent malgré le doute.`
        },
      ]
    },
    {
      id:"stage",
      icon:"💼",
      title:"Stage & Programme — comment concilier les deux",
      color:"#8E44AD",
      items:[
        {
          q:"Quand faire mes séances pendant le stage ?",
          a:`Tu as deux options selon ton énergie du jour :\n\n🌅 Option Matin (idéale) :\n• Se lever 30 min plus tôt\n• Séance à jeun ou après eau + fruit\n• Avantage : c'est fait, rien ne peut l'annuler\n• Corps plus frais, concentration meilleure au stage après\n\n🌙 Option Soir :\n• En rentrant du stage, avant de manger\n• Si tu es épuisée → fais au minimum 10 min\n• Avantage : tu peux manger plus après pour récupérer\n\n💡 Règle d'or : choisis l'heure que tu tiendras sur 30 jours, pas celle qui semble la plus efficace.`
        },
        {
          q:"Je rentre épuisée du stage — je fais quoi ?",
          a:`D'abord : c'est normal et tu n'es pas en faute.\n\nGrille de décision :\n\n😴 Épuisement total (3/10 énergie) :\n→ Étirements 10 min + boire ton eau = c'est suffisant aujourd'hui\n→ Couche-toi tôt, demain sera mieux\n\n😐 Fatiguée mais fonctionnelle (5/10) :\n→ Fais la séance allégée : 1 série au lieu de 3 par exercice\n→ 10-12 min au lieu de 20 — c'est quand même une vraie séance\n\n💪 Fatiguée mais motivée (6/10+) :\n→ Lance-toi — l'énergie arrive souvent une fois qu'on commence\n\n⚠️ Ne jamais faire : forcer une séance intense sur une fatigue de 2-3/10. Risque de blessure et dégoût.`
        },
        {
          q:"Comment manger correctement pendant le stage ?",
          a:`Le stage complique la nutrition — voici comment s'adapter :\n\n🌅 Avant de partir :\n• Prépare ta collation de 10h la veille au soir\n• Arachides + fruit dans un sac = 2 min à préparer\n• Grande bouteille d'eau de 1.5L à remplir chaque matin\n\n🍱 Déjeuner au stage :\n• Si tu manges dehors : riz + poisson grillé + légumes = parfait\n• Évite les sauces très grasses et les fritures si possible\n• Mange à satiété — pas de régime restrictif !\n\n🌙 Le soir en rentrant :\n• Repas dans les 30 min si tu fais ta séance le matin\n• Dîner léger mais protéiné : oeuf + patate douce + salade\n• Prépare le lendemain pendant que tu cuisines`
        },
        {
          q:"Les jours de repos — que faire concrètement ?",
          a:`Adapté à ta réalité de stagiaire :\n\n📅 Jours de semaine avec repos (R+) :\n• Marche à pied au/du stage si c'est possible (ça compte !)\n• Sinon : 10 min d'étirements le soir avant de dormir\n• 5 min de respiration profonde (4 sec inspirer, 4 tenir, 6 expirer)\n• C'est tout — ne culpabilise pas si tu ne fais que ça\n\n📅 Samedi (R+) :\n• Tu as travaillé toute la semaine — sois gentille avec toi\n• Petite marche de 15-20 min si tu as l'énergie\n• Étirements tranquilles, préparation des repas\n\n📅 Dimanche (R / Bilan) :\n• Vraie journée de repos — recharge complète\n• Prends tes mesures, écris dans ton journal\n• Prépare les repas de la semaine si possible`
        },
        {
          q:"Je suis en stage Lundi-Samedi — comment je gère ?",
          a:`Ton planning réaliste sur une semaine type :\n\nLundi : Séance A (matin ou soir)\nMardi : Repos actif — étirements 10 min le soir\nMercredi : Repos — dors bien\nJeudi : Séance B (matin ou soir)\nVendredi : Repos actif — marche au/du stage\nSamedi : Léger — étirements ou petite marche\nDimanche : LIBRE — bilan, mesures, recharge\n\n💡 Le dimanche c'est sacré pour toi. C'est ton jour pour récupérer, mesurer tes progrès et te préparer pour la semaine.\n\n⭐ Avec ce rythme, tu feras 2 séances par semaine = 8 séances sur 30 jours = transformation visible garantie.`
        },
      ]
    },
  ];

  return (
    <div className="fi" style={{padding:"52px 16px 24px"}}>
      <h1 className="f" style={{color:C.text, fontSize:28, marginBottom:3}}>Le Coach 🎯</h1>
      <p style={{color:C.sub, fontSize:14, marginBottom:20}}>Tout ce que tu dois savoir pour réussir</p>

      {sections.map(sec => (
        <div key={sec.id} style={{marginBottom:16}}>
          {/* En-tête section */}
          <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
            <span style={{fontSize:22}}>{sec.icon}</span>
            <h2 className="f" style={{color:C.text, fontSize:18}}>{sec.title}</h2>
          </div>

          {/* Accordéon items */}
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {sec.items.map((item, i) => {
              const key = `${sec.id}_${i}`;
              const isOpen = open === key;
              return (
                <div key={i} style={{background:C.card, borderRadius:16, overflow:"hidden", border:`2px solid ${isOpen ? sec.color : "transparent"}`, transition:"border .2s"}}>
                  <button
                    onClick={() => toggle(key)}
                    style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", textAlign:"left"}}>
                    <p style={{color:C.text, fontWeight:600, fontSize:14, flex:1, paddingRight:8}}>{item.q}</p>
                    <div style={{
                      background: isOpen ? sec.color : C.card2,
                      borderRadius:"50%", width:26, height:26, flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition:"all .2s"
                    }}>
                      <span style={{color: isOpen ? "#fff" : C.sub, fontSize:16, fontWeight:700, lineHeight:1}}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="fi" style={{padding:"0 16px 16px"}}>
                      <div style={{background:C.card2, borderRadius:12, padding:14}}>
                        {item.a.split("\n").map((line, li) => (
                          <p key={li} style={{
                            color: line.startsWith("•") || line.startsWith("✅") || line.startsWith("❌") || line.startsWith("⚠️") || line.startsWith("💡") || line.startsWith("⭐") || line.startsWith("🌱")
                              ? C.text : C.sub,
                            fontSize: line.startsWith("Semaine") || (line.length > 0 && line === line.toUpperCase())
                              ? 13 : 13,
                            fontWeight: line.startsWith("Semaine") ? 600 : 400,
                            lineHeight:1.65,
                            marginBottom: line === "" ? 6 : 2,
                          }}>
                            {line || "\u00A0"}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Rappel motivant en bas */}
      <div style={{background:`linear-gradient(135deg,${C.green},#2E5C3E)`, borderRadius:20, padding:20, marginTop:8, textAlign:"center"}}>
        <p style={{fontSize:32, marginBottom:10}}>🌱</p>
        <p className="f" style={{color:"#fff", fontSize:17, lineHeight:1.5, fontStyle:"italic"}}>
          "Tu n'as pas à être parfaite. Tu dois être régulière."
        </p>
        <p style={{color:"rgba(255,255,255,.7)", fontSize:12, marginTop:8}}>— Rappel du Coach, pour toi Uriel</p>
      </div>
    </div>
  );
}

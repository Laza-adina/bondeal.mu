import type {Product} from './model';
export type Preferences={category?:string;budget?:number;minimum?:number;term?:string;mode?:'deal'|'cheap';exclude?:string[]};
export const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const categoryWords:Record<string,string[]>={cuisine:['cuisine','kitchen','cuisson','cuisiner'],maison:['maison','home','deco','salon'],rangement:['rangement','storage','organiser','organizer','ranger'],'boites-organisateurs':['boite','box'],eclairage:['eclairage','lampe','lamp','lumiere','light'],automobile:['voiture','automobile','auto','car'],bebe:['bebe','baby','enfant'],nettoyage:['nettoyage','menage','clean']};
const aliases:Record<string,string[]>={lampe:['lamp'],vase:['vase'],montre:['watch'],bouteille:['bottle'],verre:['glass'],etagere:['shelf','rack'],solaire:['solar'],plage:['beach'],mouchoir:['tissue'],moustique:['mosquito'],tournevis:['screwdriver'],passoire:['colander'],tapis:['mat']};
export function parsePreferences(text:string,previous:Preferences={}):Preferences{
 const q=normalize(text);const reset=/autre recherche|recommencer|tous les produits|sans filtre/.test(q);let next:Preferences=reset?{}:{...previous,exclude:undefined};
 const category=Object.entries(categoryWords).find(([,words])=>words.some(w=>new RegExp('\\b'+w+'\\b').test(q)));if(category){next.category=category[0];next.term=undefined}
 const budget=q.match(/(?:moins de|sous|maximum|max|budget(?: de)?|jusqu['’]?a|pas plus de)\s*(?:rs\.?\s*)?(\d[\d\s]*(?:[.,]\d{1,2})?)/)||q.match(/(?:rs\.?\s*)(\d+(?:[.,]\d{1,2})?)/)||q.match(/^(\d+(?:[.,]\d{1,2})?)\s*(?:rs|roupies)?$/);
 if(budget)next.budget=Number(budget[1].replace(/\s/g,'').replace(',','.'));
 const range=q.match(/entre\s*(?:rs\s*)?(\d+)\s*et\s*(?:rs\s*)?(\d+)/);if(range){next.minimum=Number(range[1]);next.budget=Number(range[2])}
 if(/sans (?:limite|budget)|tous les budgets/.test(q)){delete next.budget;delete next.minimum}
 if(/moins cher|petit prix|economique/.test(q))next.mode='cheap';else if(/deal|promotion|reduction|bonne affaire/.test(q))next.mode='deal';
 const term=Object.keys(aliases).find(w=>new RegExp('\\b'+w+'s?\\b').test(q));if(term){next.term=term;if(!category)delete next.category}
 return next;
}
export function discount(p:Product){return p.promotion&&p.oldPrice>p.price?{amount:p.oldPrice-p.price,percent:Math.round((1-p.price/p.oldPrice)*100)}:{amount:0,percent:0}}
export function recommend(products:Product[],prefs:Preferences,cartIds:string[]=[],alternative=false){
 let list=products.filter(p=>p.stock>0&&Number.isFinite(p.price)&&p.price>=0&&(!prefs.category||p.category===prefs.category)&&(prefs.budget===undefined||p.price<=prefs.budget)&&(prefs.minimum===undefined||p.price>=prefs.minimum)&&(!prefs.term||[prefs.term,...(aliases[prefs.term]||[])].some(w=>normalize(p.name+' '+p.description).includes(w)))&&!cartIds.includes(p.id));
 if(alternative)list=list.filter(p=>!prefs.exclude?.includes(p.id));
 return [...list].sort((a,b)=>prefs.mode==='cheap'?a.price-b.price:discount(b).percent-discount(a).percent||discount(b).amount-discount(a).amount||a.price-b.price).slice(0,3);
}


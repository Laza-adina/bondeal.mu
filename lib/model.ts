export type Product={id:string;name:string;category:string;price:number;oldPrice:number;image:string;stock:number;description:string;sku:string;bestSeller:boolean;promotion:boolean;topCategory:boolean};
export type OrderStatus='Confirmée'|'En préparation'|'Expédiée'|'Livrée'|'Annulée';
export type Order={id:string;customer:string;email:string;address:string;date:string;items:{productId:string;name:string;price:number;quantity:number}[];status:OrderStatus;tracking:string;history:{status:OrderStatus;date:string}[]};
export const categories=[{slug:'maison',name:'Home Essentials'},{slug:'cuisine',name:'Kitchen'},{slug:'rangement',name:'Storage & Organization'},{slug:'boites-organisateurs',name:'Boxes & Organisers'},{slug:'nettoyage',name:'Cleaning'},{slug:'eclairage',name:'Lighting'},{slug:'automobile',name:'Automotive Accessories'},{slug:'bebe',name:'Baby Accessories'}];
export const selections=[{slug:'tous',name:'Tous les produits'},{slug:'best-sellers',name:'Best sellers'},{slug:'promotions',name:'Promotions'},{slug:'moins-de-999',name:'Moins de Rs 999'},{slug:'a-partir-de-999',name:'À partir de Rs 999'}];
export const statuses:OrderStatus[]=['Confirmée','En préparation','Expédiée','Livrée','Annulée'];
export const money=(n:number)=>'Rs '+n.toLocaleString('fr-FR');
export function categoryFor(n:string){return /baby|kid|child/i.test(n)?'bebe':/car |carplay|trunk|auto /i.test(n)?'automobile':/lamp|light|solar/i.test(n)?'eclairage':/clean|brush|soap/i.test(n)?'nettoyage':/kitchen|glass|bottle|pot|bento|container|spice|colander/i.test(n)?'cuisine':/box|jewelry/i.test(n)?'boites-organisateurs':/storage|rack|shelf|organ|basket/i.test(n)?'rangement':'maison'}
export const categoryName=(slug:string)=>categories.find(c=>c.slug===slug)?.name||slug;
export const totalOrder=(o:Order)=>o.items.reduce((t,i)=>t+i.price*i.quantity,0);

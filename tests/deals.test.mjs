import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const js=stripTypeScriptTypes(readFileSync(new URL('../lib/deals.ts',import.meta.url),'utf8'));
const {parsePreferences,recommend,discount}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const p=(id,overrides={})=>({id,name:'Lampe de bureau',category:'eclairage',description:'Lampe',price:400,oldPrice:800,stock:5,promotion:true,...overrides});
test('le budget et la catégorie sont conservés lors des affinages',()=>{const first=parsePreferences('une lampe sous Rs 800');assert.equal(first.category,'eclairage');assert.equal(first.budget,800);const next=parsePreferences('moins cher',first);assert.equal(next.budget,800);assert.equal(next.category,'eclairage');assert.equal(next.mode,'cheap')});
test('exclut les ruptures, les produits hors budget et les autres catégories',()=>{const result=recommend([p('ok'),p('rupture',{stock:0}),p('cher',{price:1000}),p('autre',{category:'cuisine'})],{budget:500,category:'eclairage'});assert.deepEqual(result.map(p=>p.id),['ok'])});
test('classe les deals par remise active et les petits prix par prix',()=>{const products=[p('petit',{price:100,oldPrice:110}),p('deal',{price:400,oldPrice:1000}),p('inactive',{price:200,oldPrice:2000,promotion:false})];assert.equal(recommend(products,{})[0].id,'deal');assert.equal(recommend(products,{mode:'cheap'})[0].id,'petit');assert.equal(discount(products[2]).amount,0)});
test('respecte les bornes et exclut le panier et les propositions précédentes',()=>{const prefs=parsePreferences('entre 300 et 600');assert.equal(prefs.minimum,300);assert.equal(prefs.budget,600);assert.deepEqual(recommend([p('a'),p('b'),p('c',{price:200})],{...prefs,exclude:['b']},['a'],true),[])});
test('aucun produit disponible ne produit une proposition inventée',()=>{assert.deepEqual(recommend([p('a',{stock:0})],{}),[]);assert.deepEqual(recommend([p('a')],{budget:10}),[])});
test('une demande de passoire trouve les produits anglais correspondants',()=>{const prefs=parsePreferences('une passoire sous 500');assert.equal(prefs.term,'passoire');assert.equal(recommend([p('a',{name:'Stainless Steel Colander',description:'',category:'cuisine'})],prefs)[0].id,'a')});

test('une lampe ne propose pas une étagère mal classée dans éclairage',()=>{const prefs=parsePreferences('une lampe sous Rs 800');const found=recommend([p('shelf',{name:'6-Tier Light Shelf',description:''}),p('lamp',{name:'Modern 3 Color Lamp',description:''})],prefs);assert.deepEqual(found.map(p=>p.id),['lamp'])});

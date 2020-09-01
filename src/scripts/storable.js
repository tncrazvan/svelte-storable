/*
Example how to use:
import storeable from "../scripts/storeable";
const rememberMe = storeable("rememberMe",false);
export default rememberMe;
*/
import { writable } from 'svelte/store';

export default function storable(storeName, store){
	if(window.localStorage && localStorage[storeName]){
		try{
			store = JSON.parse(localStorage[storeName]);
		}catch(e){
			console.error("Could not load store \""+storeName+"\".",e);
			store = null;
		}
	}
	const result = writable(store);
	if(window.localStorage){
		result.subscribe($result=>{
			localStorage.setItem(storeName,JSON.stringify($result));
		});
	}
	return result;
}
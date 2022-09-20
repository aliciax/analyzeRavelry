import { authPassword, authUsername } from "../config/configVarActual";
import { PatternList } from "../models/models";
import { PatternSearchResult } from "../models/returnObjects";

const base = "https://api.ravelry.com";
  
export async function getMostPopularSweaters():Promise<PatternSearchResult> {
  const headers = new Headers();
    // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
    // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    
    headers.append('Authorization', 'Basic ' + btoa(authUsername + ":" + authPassword));
    return await fetch("https://api.ravelry.com/patterns/search.json?query=sweater&sort=popularity", {
      method: 'GET',
      headers: headers,
    }).then(result=> result.json());
}

export async function getCurrentlyPopularSweaters():Promise<PatternSearchResult>{
  const headers = new Headers();
    // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
    // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    
    headers.append('Authorization', 'Basic ' + btoa(authUsername + ":" + authPassword));
    return await fetch("https://api.ravelry.com/patterns/search.json?query=sweater&sort=recently-popular", {
      method: 'GET',
      headers: headers,
    }).then(result=> result.json());
}

export async function getPatternsById(ids:number[]) {
  const headers = new Headers();
    // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
    // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    
    headers.append('Authorization', 'Basic ' + btoa(authUsername + ":" + authPassword));
    return await fetch(`https://api.ravelry.com/patterns.json?ids=${ids.join("+")}`, {
      method: 'GET',
      headers: headers,
    }).then(result=> result.json());
}


//Add get Yarns , it's retrieved by ID
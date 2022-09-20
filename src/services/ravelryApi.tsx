const base = "https://api.ravelry.com";

  
export async function getSweaters() {
  const headers = new Headers();
    // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
    // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    
    headers.append('Authorization', 'Basic ' + btoa(authUsername + ":" + authPassword));
    const response = await fetch("https://api.ravelry.com/patterns/search.json?query=sweater", {
        method: 'GET',
        headers: headers,
      })
    return await response.json();
}


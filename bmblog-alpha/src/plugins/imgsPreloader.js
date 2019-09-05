function syncCaching(url) {
    console.log(url);
    return new Promise(resolve => {
        let img = new Image();
        img.src = url;
        img.onload = resolve;
    });
}
  
  
export async function syncPreloader(arrayOfUrls, stageCallback) {
    for (let index = 0; index < arrayOfUrls.length; index++) {
        await syncCaching(arrayOfUrls[index]);
        stageCallback(index+1, arrayOfUrls.length);
    }
}
  
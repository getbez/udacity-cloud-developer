import backendClient from "./backendClient"
class MissingPeopleUploadClient {
    async getFilteredImage(token, image_url) {
        try{
            // const response = await backendClient.get(`/filteredImages?image_url=${image_url}`, {headers: {Authorization: `Bearer ${token}`}});
            const response = await fetch(backendClient.getUri()+`/filteredImages?image_url=${image_url}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'image/jpeg',
                    'Authorization': `Bearer ${token}`
                }
            })
        const blob = await response.blob()
        return URL.createObjectURL(blob);
            // return response.data;
          
        }catch(e) {
                    console.error('Error downloading image:', e);
                    return ""
         };
    }    
    
}

const missingPeopleUploadClient = new MissingPeopleUploadClient()
export default missingPeopleUploadClient
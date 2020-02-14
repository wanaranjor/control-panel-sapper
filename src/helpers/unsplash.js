export function getImgUnsplash() {

    const request = new Request('https://api.unsplash.com/photos/random?query=dog&w=480&h=480', {
        method: 'GET',
        // body:JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':'Client-ID b40e74bfb7381bd6c6f6b96aa42734514b700b8e2dc27787601e46e01d496d61',
        })
    });

    return fetch(request).then(response => {
        if(response.status >= 200 && response.status < 300){          
            return response.json();					
            } else {
                response.json().then(errData => {
                    console.error(errData);
                    throw new Error('Something went wrong! - server-side');		
                });
            }
        }).catch(error =>{
            console.error(error);
            throw new Error('Something went wrong!');
    });
}
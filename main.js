
const apiURLRandom= 'https://api.thedogapi.com/v1/images/search?limit=4'
const apiURLFavorites= 'https://api.thedogapi.com/v1/favourites'
const error= document.getElementById('error')
const apiURLFavoritesDelete= id => `https://api.thedogapi.com/v1/favourites/${id}`

const loadRandomDogs= async (api) => {
    const images= await fetch(api)
    const data= await images.json()

    if (images.status !== 200) {
        error.innerHTML= 'Error loading images: ' + images.message 
    } else {
        const img1= document.getElementById('img1')
        const img2= document.getElementById('img2')
        const img3= document.getElementById('img3')
        const img4= document.getElementById('img4')

        img1.src= data[0].url
        img2.src= data[1].url
        img3.src= data[2].url
        img4.src= data[3].url
        
        btn1= document.getElementById('btn1')
        btn2= document.getElementById('btn2')
        btn3= document.getElementById('btn3')
        btn4= document.getElementById('btn4')

        btn1.onclick= () => postFavoriteDogs(data[0].id)
        btn2.onclick= () => postFavoriteDogs(data[1].id)
        btn3.onclick= () => postFavoriteDogs(data[2].id)
        btn4.onclick= () => postFavoriteDogs(data[3].id)


        }
}

const loadFavoriteDogs= async (api) => {
    const images= await fetch(api, {
        method: 'GET',
        headers: {
            'x-api-key': 'afb6850b-d377-4279-972b-a895e04bc14f',
            'Content-Type': 'application/json',
        },
    })
    const data= await images.json()

    console.log('Favorites: ', data)
    if (images.status !== 200) {
        error.innerHTML= 'Error loading images: ' + images.message
    } else {
        
        const section= document.getElementById('favoriteDogs')
        section.innerHTML= ""
        const h2= document.createElement('h2')
        const h2text= document.createElement('FavoriteDogs')
        h2.appendChild(h2text)
        section.appendChild(h2)

        data.forEach(element => {
            const article= document.createElement('article')
            const img= document.createElement('img')
            const btn= document.createElement('button')
            const btnText= document.createTextNode('Take out the dog from favorites')

            img.src= element.image.url
            img.width= '150'
            btn.appendChild(btnText)
            btn.onclick= () => deleteFavoriteDogs(element.id)

            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)

        })
    }
}

const postFavoriteDogs= async (id) => {
    const images= await fetch(apiURLFavorites, {
        method: 'POST',
        headers: {
            'x-api-key': 'afb6850b-d377-4279-972b-a895e04bc14f',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    })
    const data= await images.json()
    if (images.status !== 200) {
        error.innerHTML= 'Error loading images: ' + images.message
    } else {
        console.log('Dog saved')
        loadFavoriteDogs(apiURLFavorites) 
    }
}

const deleteFavoriteDogs= async (id) => {
    const images= await fetch(apiURLFavoritesDelete(id), {
        method: 'DELETE',
        headers: {
            'x-api-key': 'afb6850b-d377-4279-972b-a895e04bc14f',
            'Content-Type': 'application/json',
        },
    })
    const data= await images.json()
    if (images.status !== 200) {
        error.innerHTML= 'Error loading images: ' + images.message
    } else {
        console.log('Dog deleted')
        loadFavoriteDogs(apiURLFavorites)
    }
}

loadRandomDogs(apiURLRandom)
loadFavoriteDogs(apiURLFavorites)

const reloader= () => {
    loadRandomDogs(apiURLRandom)
}
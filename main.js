
apiURL= 'https://api.thedogapi.com/v1/images/search?limit=4&api_key=afb6850b-d377-4279-972b-a895e04bc14f'

//USING PROMISES

// fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         const img= document.querySelector('img')
//         img.src= data[0].url
//     })


// const reloader= () => {
//     fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         const img= document.querySelector('img')
//         img.src= data[0].url
//     })
// }


//USING ASYNC AWAIT
const asyncFetch= async (api) => {
    const images= await fetch(api)
    const data= await images.json()

    const img1= document.getElementById('img1')
    const img2= document.getElementById('img2')
    const img3= document.getElementById('img3')

    img1.src= data[0].url
    img2.src= data[1].url
    img3.src= data[2].url
    img4.src= data[3].url

}

asyncFetch(apiURL)

const reloader= () => {
    asyncFetch(apiURL)
}
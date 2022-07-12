const API = "https://api.thedogapi.com/v1";
// const apiURLFavorites =
//   "https://api.thedogapi.com/v1/favourites?api_key=afb6850b-d377-4279-972b-a895e04bc14f";
const error = document.getElementById("error");

const loadRandomDogs = async () => {
  try {
    const images = await fetch(`${API}/images/search?limit=4`, {
      headers: {
        "x-api-key": "afb6850b-d377-4279-972b-a895e04bc14f",
      },
    });
    const data = await images.json();
    console.log(data);
    const img = document.getElementById("randomDogs");
    let view = `
    ${data
      .map(
        (data) =>
          `
        <img src="${data.url}" id="img1" width="200" height="200" alt="random dog picture" class="image">
        <button onclick="postFavoriteDogs('${data.id}')" type="button" class="fav-button" id="btn1">Save as fav</button>
      `
      )
      .join("")}
    `;
    img.innerHTML = view;
  } catch (error) {
    throw new Error(error);
  }
};
loadRandomDogs();

const loadFavoriteDogs = async () => {
  try {
    const images = await fetch(`${API}/favourites`, {
      headers: {
        "x-api-key": "afb6850b-d377-4279-972b-a895e04bc14f",
      },
    });
    const data = await images.json();
    const favorite = document.getElementById("favoriteDogs");
    console.log(data);
    const view = `
    ${data
      .map(
        (data) => `
    <article>
      <img
          width="200"
          height="200"
          alt="random dog picture"
          class="image"
          src="${data.image.url}"
      />
      <button onclick="deleteFavoriteDogs(${data.id})">Take out of fav</button>
    </article>
    `
      )
      .join("")}
    `;
    favorite.innerHTML = view;
  } catch (error) {
    throw new Error(error);
  }
};
loadFavoriteDogs();

const postFavoriteDogs = async (id) => {
  try {
    await fetch(`${API}/favourites/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "afb6850b-d377-4279-972b-a895e04bc14f",
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });
    loadFavoriteDogs();
  } catch (error) {
    throw new Error(error);
  }
};

const deleteFavoriteDogs = async (favourite_id) => {
  try {
    await fetch(`${API}/favourites/${favourite_id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": "afb6850b-d377-4279-972b-a895e04bc14f",
      },
    });
    loadFavoriteDogs();
  } catch (error) {
    throw new Error(error);
  }
};

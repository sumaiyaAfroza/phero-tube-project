
const showLoader =()=>{
  document.getElementById('loader').classList.remove('hidden')
  document.getElementById('video-container').classList.add('hidden')
}
const hideLoader =()=>{
  document.getElementById('loader').classList.add('hidden')
  document.getElementById('video-container').classList.remove('hidden')
}


function removeActiveClass (){
  const activeButton = document.getElementsByClassName('active')
  for(let btn of activeButton){
    btn.classList.remove('active')
  }
}
function loadCategories() {

    //1. fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

        // 2. convert promise to json
        .then(res => res.json())

        // 3. send data to display
        .then(data => displayCategories(data.categories))
}
function loadVideos(searchText = "") {
  showLoader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => {
          removeActiveClass();
          document.getElementById('btn-all').classList.add('active');
          displayVideos(data.videos);
        })
}
// 1001
const loadCategoryVideos =(id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data=> {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`); 
      clickedButton.classList.add('active');
      displayVideos(data.category);
    });
   
}
const loadVideoDetails =(videoId)=>{
  console.log(videoId)
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then( data =>{
    displayVideosDetails(data.video)
  })
}
const displayVideosDetails = (video) => {
  console.log(video)
  document.getElementById('video_details').showModal()
  const detailsContainer = document.getElementById('details-container')
  detailsContainer.innerHTML=`
  <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
  `;
}

// {category_id: '1001', category: 'Music'}
// for of diye 
function displayCategories(categories) {

    // get the container
    const btnContainer = document.getElementById('btn-container')

    // loop operation on array of object
    for (let cat of categories) {
        // console.log(cat)

        // create Element
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white ">${cat.category}</button>
        `;
        // append the Element
        btnContainer.append(categoryDiv)
    }

}
// {
//     "category_id": "1003",
//     "video_id": "aaai",
//     "thumbnail": "https://i.ibb.co/kc8CCFs/30-rock.png",
//     "title": "30 Rock",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/YZN9rQZ/tina.jpg",
//             "profile_name": "Tina Fey",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "4.5K",
//         "posted_date": "14800"
//     },
//     "description": "'30 Rock,' led by Tina Fey, is a comedy series that has garnered 4.5K views. The show is a witty and humorous take on the behind-the-scenes antics of a fictional live comedy show. With its sharp writing and unforgettable characters, '30 Rock' is perfect for fans of smart, satirical humor and engaging storylines."
// }


// for each diye 
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML= "";
    if(videos.length == 0){

      videoContainer.innerHTML =`
      <div class=" col-span-full flex flex-col justify-center items-center text-center m-12">
            <img src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold mt-4">Oops!! Sorry, There is no content here</h2>
        </div>
      `;
      hideLoader()
      return;
    }
    videos.forEach((video) => {
        console.log(video)

        const videoCard = document.createElement('div')
        videoCard.innerHTML = `
        <div class="card bg-base-100  shadow-sm">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 bg-black text-white px-2 text-sm rounded-sm">3hrs 56 min ago</span>
            </figure>  
            <div class=" flex gap-5 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro space-y-1">
                <h2 class="text-md font-semibold">${video.title}</h2>

                <p class="text-gray-500 text-sm flex gap-1">${video.authors[0].profile_name}
                ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>`:``}
                 

                <p class="text-gray-500 text-sm">${video.others.views}</p>
            </div>         
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">show Details</button>
          </div>
        `;
        // append
        videoContainer.append(videoCard)
    });
    hideLoader()
}

document.getElementById('search-input').addEventListener('keyup',(e) =>{
  const input = e.target.value;
  loadVideos(input)
})


loadCategories()

document.getElementById("start").addEventListener("click", () =>{
    document.getElementById("container").style.display = "none"
    document.getElementById("main").style.display = "flex"
})

document.getElementById("inpt_search").addEventListener( 'keyup', e => {
    if( e.code === 'Enter' ) {filmFetch()};
  });

document.querySelector(".myValidate").addEventListener("keyup", function(){
    this.value = this.value.replace(/[А-Яа-яЁё\s]/g, "");
});

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'Td24bfq18lmsh5KqGTIsh6amrNJRp1h4MngjsnIdn2a8CFcrl5',
        'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
    }
};


async function filmFetch(): Promise<Record<string, number | string>> {
    let el: any = document.querySelector(".myValidate");
    let value: string = el.value;

    if (!value){init()}
    else{
        const response: any = await fetch("https://moviesdb5.p.rapidapi.com/om?s="+value, options)
        const data: any = await response.json()
            try{        
            const films:any = data.Search;
            renderFilms(films)
             return films}
            catch{
                document.getElementById("filmCards").innerHTML = `
                <div class="flex flex-col items-center">
                <img class="h-60 w-60" src="https://free-png.ru/wp-content/uploads/2022/07/free-png.ru-366.png">
                <p class="descr-font text-center"> Мы не нашли ничего подходящего :( </p>
                </div>
                        `
                    }
             }
  }

  function renderFilms(films:any ):any{
    document.getElementById("filmCards").innerHTML = ''
    films.forEach((d:any) => {
        document.getElementById('filmCards').innerHTML +=
            `
        <div class=" flex flex-col bg-slate-100 mb-8 rounded-3xl shadow-md width2">
            <img class=" flex w-full mb-2 imgH" src="${d.Poster}">
            <div class=" flex flex-col flex-wrap pr-0 hText justify-between">
               <div> <p class="text-xl text-center mb-1 font-medium header-bg">${d.Title}</p>         
                <p class="text-xs font-bold text-center text-red-700 font pb-1">${d.Year}</p>   
             
                </div>                              
               <div> <p class=" text-xs font-thin text-center text-gray-600 font pb-1">${d.imdbID }</p></div>             
            </div>
            <button id="but-${d.imdbID}" class="text-center mb-1 sliding-button"> Learn more </button>
        </div>        
        `
    })

    films.forEach((film:any) => {
        document.getElementById(`but-${film.imdbID}`).addEventListener("click", () => moreInfo(film.imdbID))
    })
  }

async function moreInfo (filmId:string): Promise<Record<string, number | string>> {
    const response = await fetch('https://moviesdb5.p.rapidapi.com/om?i='+filmId, options)
    const data2: any = await response.json()
    // console.log(data)
    renderMore(data2)
    return data2
}

function renderMore(data2:any):void{
    document.getElementById('myModal').style.display = "flex";
    let span:any = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        document.getElementById('myModal').style.display = "none";
    }

     document.addEventListener( 'click', (e) => {
        const withinBoundaries = e.composedPath().includes(document.getElementById('modal-content'));
        if ( ! withinBoundaries ) {
            document.getElementById('myModal').style.display = "none";
        }
    })

    document.getElementById("modal-cards").innerHTML = " ";
    document.getElementById("modal-cards").innerHTML =
        `
   <div class="flex  md:flex-row flex-col gap-2.5">
    
        <div class="flex justify-center items-center m-auto md:w-2/5 w-full"><img class="imgH mr-0 mr-4 rounded-xl" src="${data2.Poster}"</img></div>
 
   
       <div class="flex flex-col md:w-3/5 w-full"> <div class="flex flex-col justify-between"><p class="red-txt"> ${data2.Title} - ${data2.Year}</div> 
        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Released: ${data2.Released}</div>
        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Runtime: ${data2.Runtime  === undefined 
        ?   "-" 
        : data2.Runtime  !== "N/A" 
        ? data2.Runtime
         :"-" 
       }</div>

        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Genre: ${data2.Genre  === undefined 
        ?   "-" 
        : data2.Genre  !== "N/A" 
        ? data2.Genre
         :"-" 
       }</div>

        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Director: ${data2.Director  !== "N/A" ? data2.Director : "unknown"}</div>
        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Writer: ${data2.Writer  !== "N/A" ? data2.Writer : "unknown"}</div>
        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Type: ${data2.Type  !== "N/A" ? data2.Type : "-"}</div>
        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">BoxOffice: ${data2.BoxOffice  === undefined 
        ?   "-" 
        : data2.BoxOffice  !== "N/A" 
        ? data2.BoxOffice
         :"-" 
       }</div>

        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Production: ${data2.Production  === undefined 
        ?   "-" 
        : data2.Production  !== "N/A" 
        ? data2.Production
         :"-" 
       }</div>

        <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">Website: 
        ${data2.Website  === undefined 
        ?   "-" 
        : data2.Website  !== "N/A" 
        ? data2.Website
         :"-" 
       }</div> 
       </div>
       </div>   </div>
     
    <p class="flex mt-4 mb-4 border p-2 bg-lime-50 border-solid border-1 border-black">
    ${data2.Plot  !== "N/A" ? data2.Plot : "Plot is not available"}</p>
   <div class="flex flex-row mt-1 mb-2"> 
   <img class="h-5 w-5" src="https://free-png.ru/wp-content/uploads/2021/12/free-png.ru-80-340x340.png">
    <p class="pl-1">${data2.Language}, ${data2.Country}</p></div>
    <div class="flex flex-row mt-2 mb-2">
    <img class="h-5 w-5 mt-2" src="https://cdn-icons-png.flaticon.com/512/70/70548.png">
    <p class="pl-1">Awards: ${data2.Awards !== "N/A" ? data2.Awards : "no awards yet"}</p></div>

       <div class="flex overflow-auto pl-1 border-l-2 border-solid border-yellow-500 p-2">Ratings:  ${!data2.Ratings ? JSON.stringify(data2.Ratings).replace(/[\{\}/[\]/"/s]/g, '') : " - "}</div>
  <div class="flex flex-col text-start"> 
   <div class="pl-1 border-l-2 border-solid border-indigo-500 p-2">Metascore ${data2.Metascore !== "N/A" ? data2.Metascore : "0"}</div>
    <div class=" pl-1 border-l-2 border-solid border-indigo-500 p-2">imdbRating ${data2.imdbRating !== "N/A" ? data2.imdbRating : "0"}</div>
    <div class="pl-1 border-l-2 border-solid border-indigo-500 p-2">imdbVotes ${data2.imdbVotes !== "N/A" ? data2.imdbVotes : "0"}</div> 
    </div>
   
    <div class="pl-1 border-l-2 border-solid border-yellow-500 p-2">DVD ${data2.DVD  === undefined 
        ?   "not presented" 
        : data2.DVD  !== "N/A" 
        ? data2.DVD
         :"not presented" 
       }</div>
            
        `
}

function init():any{

    let doc:any = document.getElementById("filmCards");
    if (doc.innerHTML = " ") {
        doc.innerHTML = `
<div class="flex flex-col items-center">
<img class="h-12 w-12" src="https://cdn-icons-png.flaticon.com/512/3418/3418886.png">
<p class="descr-font text-center"> Введите название фильма и нажтиме Enter </p>
</div>
        `
    }
}

init();

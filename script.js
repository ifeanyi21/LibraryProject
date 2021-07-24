let divContainer = document.querySelector(".row")
let bookName = document.querySelector(".content");
let title = document.querySelector(".title");
let authorName = document.querySelector(".author");
let pages = document.querySelector(".numOfpages");
let submitBtn = document.getElementById("sub-btn");
let addBook = document.querySelector(".addBook");
let allBooks = document.getElementById("totalBooks");
let closed = document.querySelector("#closeForm");
let bookStatus = document.querySelector("#status");
let id = 0;
let counter;
let myLibrary = [];
let myObjConverted = JSON.parse(localStorage.getItem("Library"));
let newDiv = document.createElement("div");
let para = document.createElement("p");
let btn = document.createElement("button");
let updateBtn = document.createElement("button");
let warning = document.getElementById("alerts");
warning.style.display ="none";

class Book{
    constructor( name,author,numOfPages,id,status){
        //this.id = id;
        this.name = name;
        this.author = author;
        this.numOfPages = numOfPages;
        this.status = status;
    }
}

function clearInput(){
    title.value="";
    authorName.value="";
    pages.value="";
}

// Check Localstorage and render from the localstorage
function render(){
    let converted = JSON.parse(localStorage.getItem("Library"));
if(converted=== null ){
    allBooks.innerHTML = `Total Books: Zero`;

}
else{
let count = converted.length;
console.log(count);
allBooks.innerHTML = `Total Books: ${count}`;
for(var i = 0; i<count;i++){
    if(localStorage.getItem(`Library`)!== null){
    //Create new Elements to render contents
    let newDiv = document.createElement("div");
    let para = document.createElement("p");
    let btn = document.createElement("button");
    let updateBtn = document.createElement("button");
    let divCreated = divContainer.insertBefore(newDiv,divContainer[0]);
    newDiv.classList.add(`content${i}`,"col-sm-6","col-md-4",`content`);
    let paraCreated = divCreated.insertBefore(para,divCreated[0]);
    divCreated.insertBefore(btn,divCreated[0]);
    btn.setAttribute("id",`delete${i}`);
    btn.setAttribute("onclick","deleted(event)");
    btn.classList.add("btn","btn-danger","m-2")
    btn.innerHTML='Delete';
    divCreated.insertBefore(updateBtn,divCreated[0]);
    updateBtn.setAttribute("id", `update${i}`);
    updateBtn.setAttribute("onclick","update(event)");
    updateBtn.innerHTML='Update';
    updateBtn.classList.add("btn", "btn-primary");

    let myObjConverted = JSON.parse(localStorage.getItem("Library"))

    let emoji = myObjConverted[i].status==="Completed" ?  myObjConverted[i].status+" 😁":  myObjConverted[i].status+" 😏";
    console.log();
    paraCreated.innerHTML =`Title: ${myObjConverted[i].name} <br/> Author: ${myObjConverted[i].author}  <br/> Number of Pages: ${myObjConverted[i].numOfPages} <br/> Status: ${emoji}`;

}}}}
render();

submitBtn.addEventListener("click",()=>{
    let converted = JSON.parse(localStorage.getItem("Library"));
    if(title.value.length=== 0|| authorName.value.length ===0 || pages.value.length ===0){
        warning.style.display = "Block";
    }
    else if(converted === null ) {
        warning.style.display = "none";
        let book = new Book(`${title.value}`, `${authorName.value}`,`${pages.value}`,`${bookStatus.value}`,`${bookStatus.value}`);
        console.log("Okay")
        myLibrary.push(book);
        localStorage.setItem("Library", JSON.stringify(myLibrary));
        btn.innerHTML='Delete';
    
        let divCreated = divContainer.insertBefore(newDiv,divContainer[0]);
        newDiv.classList.add(`content${0}`,"col-sm-6","col-md-4",`content`);
    
        let paraCreated = divCreated.insertBefore(para,divCreated[0]);
        divCreated.insertBefore(btn,divCreated[0]);
        
        btn.setAttribute("id",`delete${0}`);
        btn.setAttribute("onclick","deleted(event)");
        divCreated.insertBefore(updateBtn,divCreated[0]);
        updateBtn.setAttribute("id", `update${0}`);
        updateBtn.setAttribute("onclick","update(event)");
        updateBtn.innerHTML='Update';
        paraCreated.setAttribute("id",`para${0}`);
        paraCreated.innerHTML = `Title: ${book.name} <br/> Author: ${book.author} <br/> Number of Pages: ${book.numOfPages} <br/> Status: ${bookStatus.value}`;
        allBooks.innerHTML = `Total Books: ${1}`;
        console.log("New book has been created");
        clearInput()
    }
    else {
        console.log("me");
        addToLibrary();
        let div = document.querySelector(`.row`)
        div.innerHTML=""
        render();
    }

});
function update(event){

    let updateIndex = (event.target.id);
    let number = updateIndex.slice(6,100);
    let myobj = JSON.parse(localStorage.getItem(`Library`));
    let div = document.querySelector(`.content${number} p`);

    if(myobj[number].status=== "Completed"){
        myobj[number].status = "Still Reading";
        localStorage.setItem("Library",JSON.stringify(myobj));
        div.innerHTML = `Title: ${myobj[number].name} <br/> Author: ${myobj[number].author}  <br/> Number of Pages: ${myobj[number].numOfPages} <br/> Status: ${myobj[number].status} 😏`;
    }
    else 
    {
        myobj[number].status = "Completed";
        localStorage.setItem("Library",JSON.stringify(myobj));
        div.innerHTML = `Title: ${myobj[number].name} <br/> Author: ${myobj[number].author}  <br/> Number of Pages: ${myobj[number].numOfPages} <br/> Status: ${myobj[number].status} 😁`;

        
    }}

function deleted(event){
    console.log(event.target.id)
    
    let deleteIndex = (event.target.id);
    let number = deleteIndex.slice(6,100);
    console.log(number);
    let myobj = JSON.parse(localStorage.getItem(`Library`));
    console.log(myobj[number]);
    console.log(document.querySelector(`.content${number}`))
    if(myobj.length === 1){
        localStorage.clear();
        let div = document.querySelector(`.content${number}`);
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
        document.querySelector(".row").removeChild(div);
        console.log("everywhere tear")
    }
    else{
        myobj.splice(number,1);
        localStorage.setItem("Library",JSON.stringify(myobj));
        console.log(localStorage)
        let div = document.querySelector(`.row`)
        div.innerHTML=""
    }
    render();
}

function addToLibrary(){
    let myLibrary = [];
    let converted = JSON.parse(localStorage.getItem("Library"));
    let book = new Book(`${title.value}`, `${authorName.value}`,`${pages.value}`,`${bookStatus.value}`,`${bookStatus.value}`);
        console.log(myLibrary)
        console.log(myLibrary);
        let array = [];
        console.log(converted.length);
        for(var i = 0; i<converted.length;i++){
            array.push(converted[i]);

            console.log(array)
        }
        for(var i = 0;i<array.length;i++){
            myLibrary.push(array[i])
        }
        myLibrary.push(book);
        console.log(myLibrary);
        
        localStorage.setItem("Library", JSON.stringify(myLibrary)); // Store book in Library
            let div = document.querySelector(`.content`)
            while(div.firstChild){
                div.removeChild(div.firstChild);
            }
            document.querySelector(".row").removeChild(div);
        clearInput()
    }

    addBook.addEventListener("click",()=>{document.querySelector("form").classList.remove("hidden");
    addBook.style.display="none";
    document.querySelector("form").classList.add("animation")})

    closed.addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector("form").classList.add("exit");
    setTimeout(()=>{document.querySelector("form").classList.add("hidden");
    document.querySelector("form").classList.remove("animation")
    addBook.style.display="";
    document.querySelector("form").classList.remove("exit");
},2000)
})
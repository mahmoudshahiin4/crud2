



var bookmarkNameInput = document.getElementById("bookmarkName");  
var bookmarkURLInput = document.getElementById("bookmarkURL");  

var bookMarkContainer = [];
 
if (localStorage.getItem("bookMark") !== null) {  
    bookMarkContainer = JSON.parse(localStorage.getItem("bookMark"));  
    bookMarkDisplay();  
}  

function addBookMark() {  
    var bookMark = {  
        code: bookmarkNameInput.value.trim(),  
        websiteUrl: bookmarkURLInput.value.trim(),  
    };  

    if (bookMark.code === "" || !isValidURL(bookMark.websiteUrl)) {  
        alert(`Site Name or Url is not valid, Please make sure that:
            * Site URL must is a valid one
            * Site name must contain at least 3 characters `);  
        return;  
    }  

    console.log(bookMark);  
    bookMarkContainer.push(bookMark);  
    localStorage.setItem("bookMark", JSON.stringify(bookMarkContainer));  
    clearBookMark();  
    bookMarkDisplay();  
}  

function isValidURL(url) {  
    var pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/);
    return !!pattern.test(url);  
}  

var nameRegex = /^[a-zA-Z]{3,}$/;
var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

function Validate(regex,element){
   
    if(regex.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
    }else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
    }

}

function clearBookMark() {  
    bookmarkNameInput.value = null;  
    bookmarkURLInput.value = null;  
}  

function bookMarkDisplay() {  
    var cartona = '';  
    for (var i = 0; i < bookMarkContainer.length; i++) {  
        cartona += `<tr>  
                        <td>${i + 1}</td>  
                        <td>${bookMarkContainer[i].code}</td>  
                        <td>  
                            <a href="${bookMarkContainer[i].websiteUrl}" target="_blank">  
                                <button class="btn btn-warning text-white">  
                                    <i class="fa-solid fa-eye"></i> Visit  
                                </button>  
                            </a>  
                        </td>   
                        <td>  
                            <button class="btn btn-danger" onclick="deleteBookmark(${i})">  
                                <i class="fa-solid fa-trash-can text-white"></i> Delete  
                            </button>  
                        </td>  
                    </tr>`;  
    }  
    document.getElementById("data").innerHTML = cartona;  
}  

function deleteBookmark(index) {  
    bookMarkContainer.splice(index, 1);  
    localStorage.setItem("bookMark", JSON.stringify(bookMarkContainer));  
    bookMarkDisplay();  
}
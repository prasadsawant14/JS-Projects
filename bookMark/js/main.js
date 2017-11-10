//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //   get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;


    if (!validateForm(siteName, siteURL)) {
        return false;
    }
    var bookmark = {

        name: siteName,
        url: siteURL

    }

    //    console.log(bookmark);
    ////    local storage
    //    localStorage.setItem('test','Hello World');
    ////    to get an item
    //    console.log(localStorage.getItem('test'));
    ////    to delete an item
    //    localStorage.removeItem('test');
    //    console.log(localStorage.getItem('test'));

    //    Test if bookmark is null

    if (localStorage.getItem('bookmarks') === null) {
        //        Init array
        var bookmarks = [];
        //        Add to array
        bookmarks.push(bookmark);
        //        Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        //        get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //        add bookmark to array
        bookmarks.push(bookmark);
        //        Reset bak to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //    clear form
    document.getElementById('myForm').reset();


    fetchBookmarks();

    e.preventDefault(); //prevents form submition
}



//Fecth bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));


    //    console.log(bookmarks);

    //    get output id
    var bookmarksResult = document.getElementById('bookmarksResults');

    //    build ouptut
    bookmarksResult.innerHTML = '';


    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var URL = bookmarks[i].url;

        bookmarksResult.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class="btn btn-default target="_blank" href="' + URL + '"> Visit </a>' +
            '<a onclick="deleteBookmark(\'' + URL + '\')" class="btn btn-danger href="#"> Delete </a>' +
            '</h3>' +
            '</div>';

    }

}


function deleteBookmark(url) {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //remove
            bookmarks.splice(i, 1);
            //            Reset back to localstorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        }
    }

    fetchBookmarks();
}


function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }


    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);


    if (!siteURL.match(regex)) {
        alert('Please enter a valid URL');
        return false;
    }

    return true;
}

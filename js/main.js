// list of users you can login as
const users = [
    {email:"david@bank.nl", password:"sixseven", balance:67000},
    {email:"zimek@bank.nl", password:"plants", balance:32000000}
]

// creates a list of available pages
// it checks what div id's the div "main contains" and lists them
// the purpose of this is to hide all available pages from the list while showing the one we want in the function under

//define pages list
const pages =  
// create a list of all divs in #main
[...document.querySelectorAll('#main > div')] 
// re-write the list from list of divs to list of id's
.map(d => d.id)   
// delete all empty values (div's with no id defined)
.filter(id => id !== ''); 

// this function will handle showing and hiding pages
// while calling it we will pass a div id that we want to show
function openPage(id){
    // this line goes thru all div id's in 'pages' and hides all of the divs (makes sure all pages are hidden)
    pages.forEach(x => { 
        document.getElementById(x).style.display = 'none' 
        document.querySelector(`a[ref="${x}"]`).style.color = ''
    })
    // this line targets the div we want to show and makes it visible with flex
    document.getElementById(id).style.display = 'flex'
    document.querySelector(`a[ref="${id}"]`).style.color = 'white'
}

// current user, load from memory if already logged in
var User = localStorage.user ? JSON.parse(localStorage.user) : null

// login function is called when Login button is pressed on the login page. login.
function login(){
    // fetch email and password from the fields on the login page
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // find a user that has the same email
    // using .filter will basically compare and return a list of anything that successfully returns a true in the comperator function
    const matching_user = users.filter(user => user.email == email)[0]

    // if no user is found with that email, give user not found error exit the function
    if(!matching_user)
        return (document.getElementById('login_error').innerText = "User not found")

    // if the user password didnt match give incorrect password error and exit the function
    if(matching_user.password !== password) 
        return (document.getElementById('login_error').innerText = "Incorrect password")

    // for context by "exit the function" i refer to "return"
    // using return in functions just closes them before it finishes 
    // so if it would be called right now anything under this comment would not be executed
    // you can put stuff after the return which will be executed like i did to change the error text
    // you could also put some data after it to return a value from the function but you dont need it right now and its for more advanced use

    // set new user and save it to memory
    User = matching_user
    localStorage.user = JSON.stringify(User)

    // update user balance, login button to logout etc.
    update_user()

    // change page from login to account
    openPage('account')

    // reset login feilds to empty
    document.querySelector('#password').value = ''
    document.querySelector('#email').value = ''
}

// function called to update text and visibility based on user logged in or out
function update_user(){
    // cancel the function if user not logged in
    if(!User) return;
    // reset login error to empty
    document.getElementById('login_error').innerText = ""
    // change account text to email and balance (<br> is as if you would enter down)
    document.getElementById('balance').innerHTML = `${User.email}<br>Balance: €${User.balance.toLocaleString()}`
    // hide login button
    document.getElementById('logged_out').style.display = 'none'
    // show logout button
    document.getElementById('logged_in').style.display = ''
}

function logout() {
    // remove account email and balance from account page
    document.getElementById('balance').innerText = `Rekening`
    // show login button
    document.getElementById('logged_out').style.display = ''
    // hide logout button
    document.getElementById('logged_in').style.display = 'none'
    // go back to login
    openPage('login')
    // delete user from memory
    delete localStorage.user
}

// this function is executed whenever the page loads
window.onload = () => { 
    // ensure home is the default page
    openPage('home');
    // if user is found in memory make sure to auto-login
    update_user() 
}




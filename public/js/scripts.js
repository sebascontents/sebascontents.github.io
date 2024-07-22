

function todoList() {

// creating a variable from the username ID
	var userName = document.getElementById ("username").value; 

// creating a variable from the comment ID
	var userComment = document.getElementById("comment").value;

// text entered in the username box. It would show "Username: Plus whatever the user wrote"
	var userNameText = document.createTextNode("Username:" + userName)

// text entered in the username box. It would show "comment: Plus whatever the user wrote"
	var commentText = document.createTextNode("Comment:" + userComment)

// creating a new list item so that the text that a user writes will go here

	var newListItem = document.createElement("li")

// giving a class name to the newListItem
	newListItem.className = "list-group-item"

// creating a new H# element where the username text will show
	var newUserName = document.createElement ("h3")

// adding the userNameText variable to the newUserName element
	newUserName.appendChild(userNameText)

// creating a P element for the contents in the comment box to go
	var newComment = document.createElement ("p")

// adding the commentText ID variable to the newComment (P) element
	newComment.appendChild(commentText)

	newListItem.appendChild(newUserName)
	newListItem.appendChild(newComment)

	document.getElementById ("commentList").appendChild(newListItem)



};


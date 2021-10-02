
function next_page(){
  var  Username = document.getElementById("login").value;
  var  Password = document.getElementById("password").value;
  if (Username=="") {
	document.getElementById("error_message").style.display="block";
    document.getElementById("error_message").innerHTML = "Please Enter Username !!";
  } 
  else if(Password==""){
	document.getElementById("error_message").style.display="block";
    document.getElementById("error_message").innerHTML = "Please Enter Password !!";
  }
else{
	document.getElementById("error_message").style.display="none";
  sessionStorage.setItem("values",Username);
	window.location.href='adminpanel';
  }  

}


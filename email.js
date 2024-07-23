var shown = false;
function showhideEmail(){
	if (shown){
		$('#email').html("Show my email");
		shown = false;
	}
	else {
		var myemail = "<a href='mailto:townsam" + "@" + "mail.uc.edu'>townsam" + "@" + "mail.uc.edu</a>";
		$('#email').html(myemail);
		shown = true;
	}
}
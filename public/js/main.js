
$(document).ready(function () {
	let urlParams = new URLSearchParams(window.location.search);
	let myParam = urlParams.get('token');

	if (myParam) {
		localStorage.setItem('token',myParam);
		window.location.replace('/api/home');
	}
});

function checkAuthenticate() {
	let isAuthenticated = false;
	const token = localStorage.getItem('token');
	if (token) {
		isAuthenticated = true;
	}
	return isAuthenticated;
};

function getToken() {
	const token = localStorage.getItem('token');
	return token;
}

function unAuthenticate(){
	localStorage.clear();
	window.location.replace('/api/home');
}

$(document).ready(function () {
	console.log(window.location.pathname);
	if (!checkAuthenticate() && window.location.pathname != '/api/home' && window.location.pathname != '/api/login' && window.location.pathname != '/api/signup') {
		//alert("You are not Authenticated !")
		window.location.replace('/api/login');
	}
});


function deleteCustomer(c_id) {
        alert(c_id);
        $.ajax({
           url : 'http://localhost:3000/api/admin/delete-customer/' + c_id,
           type : 'DELETE',
           headers: {                     
                        "Authorization": "Bearer " + getToken()                  
                    },
           success : function(data, status,xhr){
              if (xhr.status===200) {
                alert('Customer deleted successfully!!');
                window.location.replace('/api/admin/customers');
              }
           },
        });

}


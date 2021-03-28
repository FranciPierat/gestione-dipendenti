$(document).ready(function()
{
 // Activate tooltip
 $('[data-toggle="tooltip"]').tooltip();
 
 // Select/Deselect checkboxes
 var checkbox = $('table tbody input[type="checkbox"]');
 $("#selectAll").click(function()
 {
  if(this.checked){
   checkbox.each(function()
   {
    this.checked = true;                        
   });
  }
  else
  {
   checkbox.each(function()
   {
    this.checked = false;                        
   });
  } 
 });
 checkbox.click(function()
 {
  if(!this.checked)
  {
   $("#selectAll").prop("checked", false);
  }
 });
});

function aggiungiPersone(){
	var nome = document.getElementById("nome").value;
	var cognome = document.getElementById("cognome").value;
	var email = document.getElementById("email").value;
	var telefono = document.getElementById("tel").value;
	var id = document.getElementById("id").value;
	var formData = {"employeeId": id, "firstName": nome, "lastName": cognome, "email": email, "phone": telefono};

	$.ajax({
		url : "http://localhost:8080/api/tutorial/1.0/employees", 
		type: "POST", 
		data : formData, 
		success: function(response, textStatus, jqXHR) {
			console.log(response);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function caricaPersone(){
	var persone = { table: "impiegati", limit: 100 };
	var dbParam = JSON.stringify(persone);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			persone = JSON.parse(this.responseText);
			var main = "";
			for(i in persone){
				main += "<tr><td><span class='custom-checkbox'><input type='checkbox' id='checkbox"+persone[i].employeeId+"' name='options[]' value='"+persone[i].employeeId+"'><label for='checkbox"+persone[i].employeeId+"'></label></span></td><td>"+persone[i].firstName+"</td><td>"+persone[i].lastName+"</td><td>"+persone[i].email+"</td><td>"+persone[i].phone+"</td><td><a href='#editEmployeeModal' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;<input type='submit' style='display: none;' id='mod"+persone[i].employeeId+"' value='"+persone[i].employeeId+"'></i></a><a href='#deleteEmployeeModal' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;<input type='submit' style='display: none;' id='eli"+persone[i].employeeId+"' value='"+persone[i].employeeId+"'></i></a></td></tr>";
			}
			document.getElementById("personinfo").innerHTML = main;
		}
	};
	xmlhttp.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send("i=" + dbParam);
}

function eliminaPersona(){
	var id = document.getElementById("eli").value;
	var persone = { table: "impiegati", limit: 100 };
	var dbParam = JSON.stringify(persone);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			persone = JSON.parse(this.responseText);
		}
	};
	xmlhttp.open("DELETE", "http://localhost:8080/api/tutorial/1.0/employees/"+id, true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send("i=" + dbParam);
}

function modificaPersona(){
	var id = document.getElementById("mod").value;
	var nome = document.getElementById("nome1").value;
	var cognome = document.getElementById("cognome1").value;
	var email = document.getElementById("email1").value;
	var telefono = document.getElementById("tel1").value;
	var persone = { table: "impiegati", limit: 100 };
	alert(id);
	var impiegato = {"employeeId" : id, "firstName" : nome, "lastName": cognome, "email": email, "phone": telefono};
	var dbParam = JSON.stringify(persone);
	var dbParam2 = JSON.stringify(impiegato);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 201){
			persone = JSON.parse(this.responseText);
			impiegato = JSON.parse(this.responseText);
		}
	};
	xmlhttp.open("POST", "http://localhost:8080/api/tutorial/1.0/employees", true);
	xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send("i=" + dbParam);
}
Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@salukadev 
odaraKodikara
/
HospitalManagementSystem_PaymentService
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
HospitalManagementSystem_PaymentService/PaymentService_practicleTest/WebContent/Components/payment.js /
@odaraKodikara
odaraKodikara admin access pages are added
Latest commit 6dec744 on May 5, 2020
 History
 1 contributor
143 lines (130 sloc)  3.8 KB
   
$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 $("#divItemsGrid").hide();
 }
 $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {

	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateItemForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidIDSave").val() == "") ? "POST" : "PUT";
	$.ajax({
		url : "PaymentAPI",
		type : type,
		data : $("#formItem").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onItemSaveComplete(response.responseText, status);
		}
	});

});

function onItemSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
			$("#divItemsGrid").show();
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidIDSave").val("");
	$("#formItem")[0].reset();
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) {
			$("#hidIDSave").val( $(this).closest("tr").find('#hidIDUpdate').val());
			$("#paymentType").val($(this).closest("tr").find('td:eq(1)').text());
			$("#billId").val($(this).closest("tr").find('td:eq(4)').text());
			$("#userId").val($(this).closest("tr").find('td:eq(5)').text());
		});

// Delete============================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PaymentAPI",
		type : "DELETE",
		data : "paymentNo=" + $(this).data("itemid"),
		dataType : "text",
		complete : function(response, status) {
			onItemDeleteComplete(response.responseText, status);
		}
	});
});

function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
			$("#divItemsGrid").hide();
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


//CLIENTMODEL=========================================================================
function validateItemForm()
{
//paymentType
if ($("#paymentType").val().trim() == "")
 {
 return "Insert Payment Type.";
 }
//billId
if ($("#billId").val().trim() == "")
 {
 return "Insert Appointment ID.";
 } 

//userId-------------------------------
if ($("#userId").val().trim() == "")
 {
 return "Insert patient ID.";
 }
// is numerical value
var tmpAid = $("#billId").val().trim();
if (!$.isNumeric(tmpAid))
 {
 return "Insert a numerical value for Appointment ID.";
 }
var tmpPid = $("#userId").val().trim();
if (!$.isNumeric(tmpPid))
 {
 return "Insert a numerical value for Patient ID.";
 }
// convert to integer ID
 $("#billId").val(parseInt(tmpAid).toFixed(0));
 $("#userId").val(parseInt(tmpPid).toFixed(0));

return true;
}
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About

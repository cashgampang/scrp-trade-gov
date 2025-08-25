	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	if (isIE) {
		$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e){
			var x = $(e.target).text();
			  captcha.show(x);
			  console.log("active_tab="+x);       // active tab
			  var y = $(e.relatedTarget).text();
			  console.log("previous_tab="+y);    // previous tab
			});
	} 

	
	var registration = (function(){
		//updateContainer('webHP?requestType=ApplicationRH&actionVal=regModel&screenId=90000512','','mainSectionWrap');
		captcha.show("REGISTER");
		var callback = function(data) {
		$("#div_thirdPartyStakeholder").hide();//GovernamentAgency fields
		$("#div_chartedAccountant").hide();//chartedAccountantDtlsTbl
		$("#div_chartedAccountant_cmn").hide();//pan,dob
		$("#cmb_assigned_to_err_msg").hide();//assigned to dropdown
		$("#cmb_subEntity_Type_err_msg").hide();//subentity dropdown
		$("#cmn_attachmentType_div").hide();//attachment
		$("#cmb_role_type_err_msg").hide();
		$("#cmb_epcOrbrc_type_err_msg").hide();
		$("#cmb_epcOffice_err_msg").hide();
		}
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		if (isIE) {
			//$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e){
				var x = $(e.target).text();
				  captcha.show(x);
				  console.log("active_tab="+x);       // active tab
				  var y = $(e.relatedTarget).text();
				  console.log("previous_tab="+y);    // previous tab
				//});
		} 

		var jsonData = null;
		ajax
		.request(
				"webHP?requestType=ApplicationRH&actionVal=regModel&screenId=90000512",
				jsonData, "mainSectionWrap", callback);
	});
	
	
	var login = (function(data){
		
		var callback1 = function() {
		captcha.show("LOGIN");
		}
		
		var jsonData = null;

		ajax
				.request(
						"webHP?requestType=ApplicationRH&actionVal=loginModel&screenId=90000512",
						jsonData, "mainSectionWrap", callback1);
		
	});
	
	   $("#applicantInformation").hide();


$(document).on('blur',".isFirm", function() {

					$('#entity').next(".error-msg").remove();
					if ($('#entity').val().length < 3) {
						$('#entity')
								.after(
										' <span class="error-msg">Enter atleast first three characters.</span>');
					} else {
						$('#entity').next(".error-msg").remove();
					}

				});

var getIECADetails = function() {
	$('#addRCMCDtls').hide();
	$('#home').hide();
	var json = {
		"panNumber" : $('#iecNo').val(),
		"entityName" : $('#entity').val(),
		"captcha_val":$("#txt_Captcha").val()

	};
	var flag = true;

	var captchaflag = true;
	var array = [ 'iecNo', 'entity' ];

	if ($('#iecNo').val() == "") {

		$('#iecNo').after(
				' <span class="error-msg">Your pan is not blank.</span>');
		return false;

	}
	if ($('#iecNo').val().length != 10) {

		$(".error-msg").empty();
		
		$('#iecNo')
				.after(
						' <span class="error-msg">Please enter valid Importer/Exporter Code</span>');
		return false;
	}
	if (!fn_sendOTP()) {
		captchaflag = false;
	}
	var lengthFlag = true;

	if ($('#entity').val().length < 3) {

		$(".error-msg").empty();
		lengthFlag = false;
		$('#entity')
				.after(
						' <span class="error-msg">Enter atleast first three characters.</span>');
	}

	if (common.isValid(array)) {
		flag = false;
	}

	if (($('#iecNo').val() != "") && ($('#entity').val() != null)
			&& captchaflag != false && ($('#entity').val() != "")
			&& ($('#txt_Captcha').val() != "") && lengthFlag) {
		
		$("#viewIEC1").prop('disabled', false);
		var url = "webHP?requestType=ApplicationRH&actionVal=viewAnonymousIEC&screenId=50001&appId=2";

		var loadDiv = "mainSectionWrap";
		if ($('#anyiec').val() == 1) {
			loadDiv = "pageContent";
		}
		
		ajax.request(url,json,loadDiv, function(res) {
			var flag = $('#anoIecResult').val();
			if(flag == undefined || flag > 0) {
				ajax.request("webHP?requestType=ApplicationRH&actionVal=commonCaptcha&screenId=90000512",
						null, "viewIEC_captcha_div");	
			}
			
			var crmRslt = $("#crmCustResultSet").val();
			if(crmRslt == 1 ){
				bootbox.alert("Please enter correct captcha.");
			} else if (crmRslt == 2 ){
				bootbox.alert("Details for this IEC Number is not available.");
			}
			if(flag == 0) {
				$('#viewIecModal').modal('hide');
			}
		});
	}
	$('#addRCMCDtls').hide();

}
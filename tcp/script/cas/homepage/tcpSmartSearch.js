$(document).ready(function(){
	$('.common-search-tag.search-all').addClass('active');
});
$(".search-all").on('click',function(){
	$("#tradeSmartSearch option").remove();
	$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
	$("#tradeSmartSearch").trigger("chosen:updated");
	$('.smartSearch').attr("id",$(this).attr("id"));
	$(".common-search-tag").removeClass('active');
	$(this).addClass('active');
	$('#itchs-css-code .chosen-container .chosen-single.chosen-default span').html('Search within Trade Connect ePlatform');
});
$(".search-product").on('click',function(){
	$("#tradeSmartSearch option").remove();
	$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
	$("#tradeSmartSearch").trigger("chosen:updated");
	$('.smartSearch').attr("id",$(this).attr("id"));
	$(".common-search-tag").removeClass('active');
	$(this).addClass('active');
	$('#itchs-css-code .chosen-container .chosen-single.chosen-default span').html('Search based on ITC(HS) Code or Product Description. e.g. 52081230 or Shirting Fabrics');
});
$(".search-country").on('click',function(){
	$("#tradeSmartSearch option").remove();
	$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
	$("#tradeSmartSearch").trigger("chosen:updated");
	$('.smartSearch').attr("id",$(this).attr("id"));
	$(".common-search-tag").removeClass('active');
	$(this).addClass('active');
	$('#itchs-css-code .chosen-container .chosen-single.chosen-default span').html('Search based on the Country Name');
});
$(".search-event").on('click',function(){
	$("#tradeSmartSearch option").remove();
	$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
	$("#tradeSmartSearch").trigger("chosen:updated");
	$('.smartSearch').attr("id",$(this).attr("id"));
	$(".common-search-tag").removeClass('active');
	$(this).addClass('active');
	$('#itchs-css-code .chosen-container .chosen-single.chosen-default span').html('Search based on Event Name or Location. e.g. Mobile Expo or Pragati Maidan');
});	

 

var smartSearch = (function() {
		var output = {};
		$("#tradeSmartSearch").chosen();
//		$("#tradeSmartSearch_chosen .chosen-drop").on("click touchstart keydown", function(){ smartSearch.showSearchDetails(); });
//		$(".chosen-drop").keypress(function(e) {
//			  //event. which == 13 is enter key.
//			   if(e.which === 13 || e.keyCode === 13 || e.which === 10) {
//				   smartSearch.showSearchDetails();
//			   }
//		});
		
let isScrolling = false;
		
		$(".chosen-results").on("scroll", function (e) {
			isScrolling = true;
			
			setTimeout(function() {
				isScrolling = false;
			}, 1000);
		});
		
		$(".chosen-results").on("click touchend", function(e){
			if(!isScrolling) {
				setTimeout(function() {
					smartSearch.showSearchDetails();
				}, 1000);
			}
		});
		
		$("#tradeSmartSearch_chosen .chosen-drop").on("keydown", function(e){
			if(e.key === 'Enter') {
				smartSearch.showSearchDetails();
			}
		});
		
		$("#tradeSmartSearch_chosen .chosen-search input").attr("placeholder","please enter atleast 3 char");
		$('#tradeSmartSearch_chosen .chosen-search input').autocomplete({
					source : function(request, response) {
						var tradeSearchKey = $("#tradeSmartSearch_chosen .chosen-search input").val()
						var url = "webHP?requestType=ApplicationRH&actionVal=preview&screenId=9000012915&tradeSearchKey="+ tradeSearchKey;
						if($("input[name='itc-code-type-radio']:checked").val()){
							url += "&type="+$("input[name='itc-code-type-radio']:checked").val();
						}
						var id = $('.smartSearch').attr('id');
						ajax.post(url,null,
										function(data) {
											if (data != '') {
												$('#tradeSmartSearch').empty();
												if(id == "search-all" || id == "search-event"){
													if(data.eventMasterDTOs != ''){
														response($.map(data.eventMasterDTOs,function(item) {
																let tmp = item.nameOfEvent
																		+ ", "
																		+ item.location;
																$('.trade-select-box').append('<option value="EVENT" data-eventid="'+item.eventId+'" data-eventName="'+item.nameOfEvent+'">'+ tmp+ '</option>');
															}));
													}
												}
												if(id == "search-all" || id == "search-country"){
													if(data.countryCombos != ''){
														response($.map(data.countryCombos,function(item) {
																let tmp = item.optionText;
																$('.trade-select-box').append('<option value="COUNTRY" data-countryid="'+item.optionValue+'" data-countryName="'+tmp+'">'+ tmp+ '</option>');
															}));
													}
												}
												if(id == "search-all" || id == "search-product"){
													if(data.itcCodeDTOs != ''){
														response($.map(data.itcCodeDTOs,function(item) {
																let tmp = item.itcCode
																		+ ", "
																		+ item.itcDescription;
																$('.trade-select-box').append('<option value="' + item.itcCode + '" data-export-policy="'+item.expPolicy+'" data-export-condition="'+item.expCondition+'"  data-import-policy="'+item.impPolicy+'" data-import-condition="'+item.impCondition+'" data-import-type="'+item.impItcCodeType+'" data-export-type="'+item.expItcCodeType+'" >'+ tmp+ '</option>');
															}));
													}
												}
												$("#tradeSmartSearch").trigger("chosen:updated");
												$("#tradeSmartSearch_chosen .chosen-search input").val(tradeSearchKey);
												if(id == "search-all" && data.itcCodeDTOs.length == 0 && data.countryCombos.length == 0 && data.eventMasterDTOs.length == 0){
													$("#tradeSmartSearch option").remove();
													$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
													$("#tradeSmartSearch").trigger("chosen:updated");
												}else if(id == "search-product" && data.itcCodeDTOs.length == 0){
													$("#tradeSmartSearch option").remove();
													$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
													$("#tradeSmartSearch").trigger("chosen:updated");
												}else if(id == "search-country" && data.countryCombos.length == 0){
													$("#tradeSmartSearch option").remove();
													$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
													$("#tradeSmartSearch").trigger("chosen:updated");
												}else if(id == "search-event" && data.eventMasterDTOs.length == 0){
													$("#tradeSmartSearch option").remove();
													$("#tradeSmartSearch").append('<option value="" disabled selected></option>');
													$("#tradeSmartSearch").trigger("chosen:updated");
												}
												
												
											} else {
												smartSearch;
											}
										});
						
						},
					minLength : 1,
					delay : 1000
				});

		var showSearchDetails = function() {
			var loginId = $("#loginId").val();
			var searchPage;
			if(loginId != null && loginId != undefined && loginId != ""){
				searchPage = null;
			}else{
				searchPage = "mainSectionWrap";
			}
			
			if($("#tradeSmartSearch").chosen().val() == "EVENT" ){
				var eventId = $("#tradeSmartSearch option:selected").data('eventid');
				var eventName = $("#tradeSmartSearch option:selected").data('eventname');
				if(loginId != null && loginId != undefined && loginId != ""){
					loadMenu("/apps/trade-events-worldwide/" + eventId + "-" + 
							eventName.replaceAll(' ','-').replaceAll('---','-').replaceAll('--','-').replaceAll(/[!@#$%^&*`"\'(),.?:{}|<>]/g,'').toLowerCase());
				}else{
					loadMenu("/pages/trade-events-worldwide/" + eventId + "-" + 
							eventName.replaceAll(' ','-').replaceAll('---','-').replaceAll('--','-').replaceAll(/[!@#$%^&*`"\'(),.?:{}|<>]/g,'').toLowerCase());
				}
				
			} else if($("#tradeSmartSearch").chosen().val() == "COUNTRY" ){
				var countryId = $("#tradeSmartSearch option:selected").data('countryid');
				var countryName = $("#tradeSmartSearch option:selected").data('countryname');
				if(loginId != null && loginId != undefined && loginId != ""){
					loadMenu("/apps/country-guide/" + countryName.replaceAll(' ','-').replaceAll(/[!@#$%^&*`"\'(),.?:{}|<>]/g,'').toLowerCase());
				}else{
					loadMenu("/pages/country-guide/" + countryName.replaceAll(' ','-').replaceAll(/[!@#$%^&*`"\'(),.?:{}|<>]/g,'').toLowerCase());
				}
			} else if($("#tradeSmartSearch").chosen().val() != "-1" && $("#tradeSmartSearch").chosen().val() != null){
				var itcCode = $("#tradeSmartSearch").chosen().val();
				if(loginId != null && loginId != undefined && loginId != ""){
					loadMenu("/apps/product-guide/" + itcCode);
				}else{
					loadMenu("/pages/product-guide/" + itcCode);
				}
				
				if($('input[id="Both"]:checked').val() == 0){
					//alert('soham');
					$('.itchscode-both').removeClass('d-none');
				}
			}
			
		}

		return {
			showSearchDetails : showSearchDetails,
		}

	})();
	
	
	 
		
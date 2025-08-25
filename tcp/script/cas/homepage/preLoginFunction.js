$(document).ready(function () {
  document.onkeydown = function (e) {
    if (event.keyCode == 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
      return false;
    }
  };

  /* Matomo */

  /*minislider();*/
  partnersSlide();
  showSlide();
  tradeEventSlider();
  /*policySlider();*/
  hideProgressbar();
  tradeCount();
  getHomepageEventList();
  gethomepageMiniSlider();
  /* static url env*/
  /*$("img.myenvUrl").each(function() {
	$('.myenvUrl').attr("src", $(this).attr("src").replace("EnvStaticUrl",$('.staticUrl').text()));
	});*/
  /* static url env*/

  /*Increase And decrease Font Start*/
  var fontSizeObj = parseFloat($("html").css("font-size"), 10);
  $(document).on("click", "#fontIncrease", function () {
    if (fontSizeObj <= 18) {
      fontSizeObj += 1;
      $("html").css("font-size", fontSizeObj + "px");
    }
  });
  $(document).on("click", "#fontDecrease", function () {
    if (fontSizeObj >= 12) {
      fontSizeObj -= 1;
      $("html").css("font-size", fontSizeObj + "px");
    }
  });
  $(document).on("click", "#fontOrig", function () {
    fontSizeObj = 16;
    $("html").css("font-size", fontSizeObj + "px");
  });
  /*  Increase And decrease Font End */
});
$(document).on("click", ".product-guide-btn", function () {
  window.location.href = getContextPath() + "/pages/product-guide";
});
$(document).on("click", ".free-trade-agree-btn", function () {
  window.location.href = getContextPath() + "/pages/free-trade-agreements";
});
$(document).on("click", ".country-guide-btn", function () {
  window.location.href = getContextPath() + "/pages/country-guide";
});
$(document).on("click", ".exim-pathshala-btn", function () {
  window.location.href = getContextPath() + "/pages/exim-paathshaala";
});

/* mobile view menu hide show function */
function openNav() {
  $(".main-menu").css("width", "50%");
}
function closeNav() {
  $(".main-menu").css("width", "0%");
}
/* mobile view menu hide show function */

$(function () {
  $(document).scroll(function () {
    var $nav = $(".main-sec-section-header");
    var $scrollnav = $(".header-main");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    $scrollnav.toggleClass("scrolledhide", $(this).scrollTop() > $nav.height());
  });
});

$(function () {
  var txt = $("#Textticker");
  txt
    .bind("scroll", function () {
      var el = $(this);
      // Scroll state machine
      var scrollState = el.data("scrollState") || 0;
      el.data("scrollState", (scrollState + 1) % 4);
      switch (scrollState) {
        case 0: // initial wait
          el.css({
            left: 0,
          });
          el.show();
          window.setTimeout(function () {
            el.trigger("scroll");
          }, 10000);
          break;
        case 1: // start scroll
          var delta = el.parent().width() - el.width();
          if (delta < 0) {
            el.animate(
              {
                left: delta,
              },
              50000,
              "linear",
              function () {
                el.trigger("scroll");
              }
            );
          }
          break;
        case 2: // delay before scroll back
          window.setTimeout(function () {
            el.trigger("scroll");
          }, 0);
          break;
        case 3: // fade out
          el.fadeOut("slow", function () {
            el.trigger("scroll");
          });
          break;
      }
    })
    .trigger("scroll");
});
/* trade map click open page js code */
$(document).ready(function () {
  mapTradeEvent();
});

$("#market-tab").on("click", function () {
  $("svg rect").removeAttr("style");
  $("svg rect").removeAttr("data-event-id");
  $("svg use").addClass("d-none");
  mapTradeMarket();
});
$("#tradeevent-tab").on("click", function () {
  $("svg rect").removeAttr("style");
  $("svg rect").removeAttr("data-event-id");
  $("svg use").addClass("d-none");
  mapTradeEvent();
});

function showSlide() {
  if ($("#services").length != 0) {
    $("#services").multislider({
      duration: 750,
      interval: 3000,
    });
  }
}

function mapTradeEvent() {
  $("#tradeevent svg rect").removeAttr("style");
  $("#tradeevent svg use");

  var url = "http://localhost:3000/proxy/trade-event";

  ajax.post(url, null, function (res) {
    var tradeEvent = res.eventMasterDTOs;

    $.each(tradeEvent, function (i) {
      var countryId = tradeEvent[i].country.key;
      var zone = tradeEvent[i].zone.value;

      $("[data-country-id=" + countryId + "][data-zone=" + zone + "]")
        .css("fill", "#0f66fb")
        .attr("data-event-id", tradeEvent[i].eventId)
        .attr("data-event-name", tradeEvent[i].nameOfEvent)
        .attr("data-country-flag", tradeEvent[i].countryFlagPath)
        .attr("data-event-location", tradeEvent[i].location);

      $(
        "[data-country-id=" + countryId + "][data-zone=" + zone + "] use"
      ).removeClass("d-none");
    });
  });

  $(document).on("click", "#tradeevent use", function () {
    var event = $(this).data("event-id");
    var eventName = $(this).data("event-name");
    event =
      event +
      "-" +
      eventName
        .replaceAll(" ", "-")
        .replaceAll("---", "-")
        .replaceAll("--", "-")
        .replaceAll(/[!@#$%^&*`"\'(),.?:{}|<>]/g, "")
        .toLowerCase();

    getHomeEventDetails(event);
  });

  $("use").mousemove(function (evnt) {
    $(".map-demo").removeClass("d-none");
    var x = evnt.offsetX;
    var y = evnt.offsetY;

    $(".trade-map-section .map-demo").css({ left: x + "px", top: y + "px" });

    var eventName = $(this).data("event-name");
    var eventLocation = $(this).data("event-location");
    var country_flag = $(this).data("country-flag");

    $(".map-demo p").html(
      "<span class='font-weight-bold pb-1'>" +
        eventLocation +
        "</span><br><span>" +
        eventName +
        "</span>"
    );
    $(".map-demo img").attr("src", country_flag);
  });

  $("use")
    .mouseleave(function () {
      $(".map-demo").addClass("d-none");
    })
    .mouseleave();
}

function mapTradeMarket() {
  //$('#market svg').attr('height','330');
  $("#market svg rect").removeAttr("style");
  $("#market svg use").addClass("d-none");
  var url =
    "http://localhost:3000/proxy/trade-event";

  ajax.post(url, null, function (res) {
    var marketList = res.marketList;
    $.each(marketList, function (i) {
      $(
        "[data-country-id=" +
          marketList[i].country.key +
          "][data-zone=" +
          marketList[i].zone.value +
          "]"
      ).css("fill", "#0f66fb");
      $(
        "[data-country-id=" +
          marketList[i].country.key +
          "][data-zone=" +
          marketList[i].zone.value +
          "]"
      ).attr("data-country-name", marketList[i].country.value);
      $(
        "[data-country-id=" +
          marketList[i].country.key +
          "][data-zone=" +
          marketList[i].zone.value +
          "]"
      ).attr("data-country-flag", marketList[i].countryFlagPath);
      $(
        "[data-country-id=" +
          marketList[i].country.key +
          "][data-zone=" +
          marketList[i].zone.value +
          "]use"
      ).removeClass("d-none");
    });
  });

  $(document).on("click", "rect", function () {
    var countryId = $(this).data("country-id");
    //var ss = $(this).data('country-id');
    //var aa = $(this).data('state-name');
    //alert(ss+','+aa);
    getHomeMarketDetails(countryId);
  });
  $("use").mousemove(function (evnt) {
    $(".map-demo").removeClass("d-none");
    var x = evnt.offsetX - 80;
    var y = evnt.offsetY + 100;
    $(".map-demo").css("left", x + "px");
    $(".map-demo").css("top", y + "px");
    var cntryName = $(this).data("country-name");
    var country_flag = $(this).data("country-flag");
    //$('.Map-hover-details').html('');
    //var templateMap = '<img src="images/TCP/Services_Icon/Raise_Trade_Queries.svg"/> <p>'+eventName+'</p>';
    //$('.Map-hover-details').append(templateMap);

    $(".map-demo p").text("");
    $(".map-demo p").append(cntryName);
    $(".map-demo img").attr("src", "");
    $(".map-demo img").attr("src", country_flag);
    //$('map-demo img').attr('src',+append+);
  });
  $("use")
    .mouseleave(function () {
      $(".map-demo").addClass("d-none");
    })
    .mouseleave();
  /* trade map click open page js code */
}
function tradeEventSlider() {
  if ($("#tradeeventSlider").length != 0) {
    $("#tradeeventSlider").multislider({
      duration: 800,
      interval: 3000,
    });
  }
}
function partnersSlide() {
  if ($("#miniSlider").length != 0) {
    $("#miniSlider").multislider({
      duration: 750,
      interval: 3000,
    });
  }
}

/*function policySlider() {
	$('#homeSlider').carousel({
	    interval: 5000
	});
}*/
/* skip to main content*/
$('a[href^="#skipmain"]').click(function () {
  $("html,body").animate({ scrollTop: $(this.hash).offset().top }, 1000);
  return false;
  e.preventDefault();
});
/* skip to main content*/

$(document).on("click", ".hqcontact", function () {
  $("#elasticSearchResult").empty();
  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=dgft_hq_contact_list&screenId=90000734",
    "",
    "mainSectionWrap"
  );
  $().empty();
  breadcrums(this);
});

$(document).on("click", ".racontact", function () {
  $("#elasticSearchResult").empty();
  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=dgft_ra_contact_list&screenId=90000734",
    "",
    "mainSectionWrap"
  );
  breadcrums(this);
});

function payscales() {
  $("#elasticSearchResult").empty();
  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=dgft_pay_scales&screenId=90000734",
    "",
    "mainSectionWrap"
  );
}

/* navbar hover js start code */
$("ul.submenu").hide();
$("ul.nav > li").hover(
  function () {
    if ($(this).find("ul.submenu").length > 0) {
      $(this).find("ul.submenu").stop().slideDown("slow");
    }
  },
  function () {
    if ($(this).find("ul.submenu").length > 0) {
      $(this).find("ul.submenu").stop().slideUp(1);
    }
  }
);
$("ul.submenu-sub").hide();
$(".subtwo-hover").hover(
  function () {
    if ($(this).find("ul.submenu-sub").length > 0) {
      $(this).find("ul.submenu-sub").stop().slideDown("slow");
    }
  },
  function () {
    if ($(this).find("ul.submenu-sub").length > 0) {
      $(this).find("ul.submenu-sub").stop().slideUp(1);
    }
  }
);
/* navbar hover js end code */

function breadcrums(thisv) {
  //$(this).parent().find("span").addClass('py-3');
  var $this = $(thisv);
  var name = $(this).parent().find(".dropdown-item").text();
  if (name == "navbar-expand-lg") {
    alert(name);
  }
  $bc = $('<span class="item font-11 text-gray"></span>');
  var lengthOfParent = $this.parents("li").length;
  $this.parents("li").each(function (n, li) {
    var $a = $(li).children("a").text();

    if (lengthOfParent == 1 || n + 1 == lengthOfParent) {
      $bc.prepend($a);
    } else {
      $bc.prepend(" / ", $a);
    }
  });
  $(".d-breadcrumb").html($bc.prepend(""));
  $(".d-breadcrumb").addClass("py-3");
}
$(document).on("click", ".StandardIONorms", function () {
  $("#elasticSearchResult").empty();

  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=loadpage&screenId=90000534&menuCode=90000552&auditUSFlag=true",
    "",
    "mainSectionWrap",
    "",
    hide
  );
  //breadcrums(this);
});

$(document).on("click", ".adhoc-norms", function () {
  $("#elasticSearchResult").empty();

  updateContainer(
    "web?requestType=ApplicationRH&actionVal=loadAdhocpage&screenId=90000534&menuCode=90000552&auditUSFlag=true",
    "",
    "mainSectionWrap",
    "",
    hide
  );
  //breadcrums(this);
});
$(document).on("click", ".sion-chapter-notes", function () {
  $("#elasticSearchResult").empty();

  updateContainer(
    "web?requestType=ApplicationRH&actionVal=loadNotespage&screenId=90000534&menuCode=90000552&auditUSFlag=true",
    "",
    "mainSectionWrap",
    "",
    hide
  );
  //breadcrums(this);
});
function hide() {
  $(".main-section.bg-white").addClass("d-none");
  $("#custom-accordion").addClass("my-3");
}

$(document).on("click", ".cmsMenuNavigate", function () {
  $("#elasticSearchResult").empty();
  var tmpltId = $(this).data("tmplt-id");
  var cattId = $(this).data("cat-id");

  if ($(this).data("tmp-isdatatable") == "yes") {
    updateContainer(
      "webHP?requestType=ApplicationRH&actionVal=serachMetadata&screenId=90000734&catId=" +
        cattId,
      "",
      "mainSectionWrap"
    );
    breadcrums(this);
  } else if (tmpltId != "home") {
    updateContainer(
      "webHP?requestType=ApplicationRH&actionVal=preview&screenId=90000552&Flag=true&tmpltId=" +
        tmpltId +
        "&cat=" +
        cattId,
      "",
      "mainSectionWrap"
    );

    breadcrums(this);
  } else {
    location.reload();
  }
});
$(document).on("click", ".cmsMapNavigate", function () {
  $("#elasticSearchResult").empty();

  var tmpltId = $(this).data("tmplt-id");
  var cattId = $(this).data("cat-id");
  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=preview&screenId=90000552&Flag=true&tmpltId=" +
      tmpltId +
      "&cat=" +
      cattId,
    "",
    "mainSectionWrap",
    "",
    showMapData
  );
  breadcrums(this);
});
function showMapData() {
  $("#elasticSearchResult").empty();
  showProgressbar();
  showMap();
}
/*function addDataTable(){
	$('#cmsTmpDatatable').DataTable();
}*/
//Search Code Start
$(document).on("click", "#closeSearch", function () {
  location.reload();
});

$(document).on("click", "#searchInSitemap", function () {
  $(".searchInput").val("");
  $("#sitemapsearchArea").removeClass("d-none");
  $("#mainHeaderNav ul").addClass("d-none");
});

$(document).click(function (e) {
  if ($(e.target).is("#sitemapsearchArea *,#searchInSitemap .fa-search")) {
    return;
  } else {
    closeSearchArea();
  }
});
function closeSearchArea() {
  $(".searchInput").val("");
  $("#sitemapsearchArea").addClass("d-none");
  $("#mainHeaderNav ul").removeClass("d-none");
}
//  Search Code End

// for Language
function langChange(langSelect) {
  if (langSelect == "langSelect") {
    var locale = document.getElementById("langSelect").value;
  }
  if (langSelect == "langSelectMob") {
    var locale = document.getElementById("langSelectMob").value;
  }
  document.getElementById("baseLocale").value = locale;
  var token = $("meta[name='_csrf']").attr("content");
  $.ajax({
    url:
      "webHP?requestType=ApplicationRH&actionVal=homePage&screenId=90000512&_csrf=" +
      token,
    type: "post",
    data: { baseLocale: locale },
    success: function (data, textStatus, jQxhr) {
      location.reload(true);
    },
    error: function (jqXhr, textStatus, errorThrown) {
      location.reload(true);
    },
  });
}

$(document).on("click", ".PolicyPage", function () {
  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=preview&screenId=90000552&Flag=true&tmpltId=308000166&cat=201&display=true",
    "",
    "mainSectionWrap",
    "",
    policySlider
  );
});

function itchsdetails() {
  updateContainer(
    "webHP?requestType=ApplicationRH&screenId=90000802&actionVal=itchsDetails",
    "",
    "mainSectionWrap"
  );

  //var url = "webHP?requestType=ApplicationRH&screenId=90000802&actionVal=itchsDetails";
  //ajax.request(url, null, "itchsdetails");
}

function itchsdetailsoption(name, type) {
  var key = name;
  var type = type;
  var callBack = function (data) {
    console.log(data);
    if (type == 1) {
      itchsPrintSummary(data, 46);
    } else {
      itchsPrintSummary(data, 47);
    }
  };
  var json = {
    itchsPolicy: key,
    itcType: type,
  };

  ajax.post(
    "webHP?requestType=ApplicationRH&screenId=90000802&actionVal=getItcDtlsByImportPolicy",
    json,
    callBack
  );
}

function itchsPrintSummary(jsonData, templateId) {
  try {
    let app = "listner";
    let subapp = "90000802";
    let json = JSON.stringify(jsonData);
    let dataSubmission = "";
    var token = $("meta[name='_csrf']").attr("content");
    let url =
      "webHP?requestType=ApplicationRH&actionVal=" +
      app +
      "&print=true&moduleName=" +
      subapp +
      "&screenId=9000012349&dataSubmission=" +
      dataSubmission +
      "&mpgId=" +
      templateId;
    var callback = function (data) {};
    const check = document.getElementById("dgftPrintSummary");
    if (!check) {
      const div = document.createElement("div");
      div.style.display = "none";
      div.setAttribute("id", "dgftPrintSummary");
      document.body.append(div);
    }
    ajax.request(url, { summaryjson: json }, "dgftPrintSummary", callback);
  } catch (error) {
    console.error(error);
  }
}

/* visitor count*/
function tradeCount() {
  var url =
    "www.trade.gov.in/webHP?requestType=ApplicationRH&actionVal=getCommonCountTcp&screenId=1000";

  ajax.post(url, null, function (res) {
    $("#register-user").append(res.registered_users);
    $("#coo-Issued").append(res.coo_issued);
    $("#foreign-buyer-info").append(res.foreign_buyer_info);
    $("#trade-Event").append(res.trad_events);
  });
}
function visitor() {
  var url =
    "webHP?requestType=ApplicationRH&actionVal=visiterCount&screenId=90000802";

  ajax.post(url, null, function (res) {
    //console.log(res);
    $("#visitor-en-count").append(res);

    //$('#placeOfOperation').find('option').remove().end();
  });
}

function getHomepageEventList() {
  var url =
    "http://localhost:3000/proxy/trade-event";

  ajax.post(url, null, function (res) {
    //alert(res.eventMasterDTOs);
    var tradeEvent = res.eventMasterDTOs;
    var tradeImgPath = $("#tradeeventImgSlider").val();
    $.each(tradeEvent, function (i) {
      var templateString =
        '<div class="services-outer item">' +
        '<div class="services-inner">' +
        '<a href="javascript:;" class="trade-event-card">' +
        '<div class="trade-event-up-face trade-event-img-up">' +
        '<img src="' +
        tradeImgPath +
        tradeEvent[i].eventImgaeForList +
        '" alt="' +
        tradeEvent[i].nameOfEvent +
        '" class="img-fluid">' +
        '<p class="font-22 text-black pt-2 trade-event-slidertitle">' +
        tradeEvent[i].nameOfEvent +
        "</p></div>" +
        '<div class="trade-event-up-face trade-event-up-desc">' +
        '<div class="text-black trade-event-up-icon-desc" style="display: flex; align-items: baseline;">' +
        '<div><i class="fa fa-globe pr-2 font-22" aria-hidden="true"></i></div>' +
        '<div><p class="mb-2 font-18">Location</p>' +
        '<p class="mb-0 font-14">' +
        tradeEvent[i].venueAddress +
        "</p></div></div>" +
        '<div class="text-black trade-event-up-icon-desc" style="display: flex; align-items: baseline;">' +
        '<div><i class="fa fa-globe pr-2 font-22" aria-hidden="true"></i></div><div>' +
        '<p class="mb-2 font-18">Date</p>' +
        '<p class="mb-0 font-14">' +
        tradeEvent[i].eventStartDate +
        "</p>" +
        "</div></div></div></a></div></div>";

      $("#tradeeventSlider .MS-content").append(templateString);
      /* tradeEventSlider();*/
    });
  });
}

function gethomepageMiniSlider() {
  var url =
    "http://localhost:3000/proxy/trade-event";

  ajax.post(url, null, function (res) {
    //alert(res.eventMasterDTOs);
    var tradeEvent = res.eventMasterDTOs;
    var tradeImgPath = $("#trademiniSliderimg").val();
    $.each(tradeEvent, function (i) {
      var eventName =
        tradeEvent[i].eventId +
        "-" +
        tradeEvent[i].nameOfEvent
          .replaceAll(" ", "-")
          .replaceAll("---", "-")
          .replaceAll("--", "-")
          .replaceAll(/[!@#$%^&*`"\'(),.?:{}|<>]/g, "")
          .toLowerCase();
      var templateString =
        '<div class="carousel-item">' +
        '<a href="javascript:;" onclick="getHomeEventDetails(\'' +
        eventName +
        '\');" class="eventDetails card ">' +
        '<div class="custom-img-break" style="height: 15rem;"><img src="' +
        tradeImgPath +
        tradeEvent[i].eventImgaeForList +
        '" alt="' +
        tradeEvent[i].nameOfEvent +
        '" class="w-100 dashboard-slider-img"> </div>' +
        '<div class="event-card-details-div d-flex">' +
        '<div class="w-75 event-desc-details">' +
        '<h2 class="event-title-name">' +
        tradeEvent[i].nameOfEvent +
        "</h2>" +
        '<p class="event-title-address">' +
        tradeEvent[i].venueAddress +
        "</p></div>" +
        '<div class="w-25 event-detail-date">' +
        '<div class="event-bg-date">' +
        '<p class="event-month"><span>' +
        tradeEvent[i].eventMonth +
        "</span></p>" +
        '<p class="event-date"><span>' +
        tradeEvent[i].eventDay +
        "</span></p>" +
        "</div></div></div></a></div>";
      $("#countrySlider .carousel-inner").append(templateString);
      $("#countrySlider .carousel-inner .carousel-item:first-child").addClass(
        "active"
      );
    });
  });
}

var getHomeEventDetails = function (eventId) {
  var loginId = $("#loginId").val();
  var searchPage;
  if (loginId != null && loginId != undefined && loginId != "") {
    loadMenu("/apps/trade-events-worldwide/" + eventId);
  } else {
    loadMenu("/pages/trade-events-worldwide/" + eventId);
  }
};

var getHomeMarketDetails = function (countryId) {
  var url =
    "webHP?requestType=ApplicationRH&actionVal=marketAccessLoadPage&screenId=1001&menuCode=800000&countryId=" +
    countryId +
    "&auditUSFlag=true";
  ajax.request(url, null, "mainSectionWrap", null);
};
/* elsatic search */

const srcData = [
  {
    title: "Senior",
    name: "Senior Officer Trade Back Office",
    desc: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo projects veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.",
    url: "http://www.google.com",
  },
  {
    title: "Junior",
    name: "Junior Officer Trade Back Office",
    desc: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo projects veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.",
    url: "https://www.google.com",
  },
  {
    title: "Machine Learning",
    name: "5 Machine Learning",
    desc: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo projects veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.",
    url: "https://www.google.com",
  },
  {
    title: "Ruby Developers",
    name: "3 Ruby Developers",
    desc: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo projects veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.",
    url: "https://www.google.com",
  },
  {
    title: "Sales Staff (Losgistic - Salary Attractive)",
    name: "Sales Staff (Losgistic - Salary Attractive)",
    desc: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo projects veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.",
    url: "https://www.google.com",
  },
  {
    title: "Front-End Developers",
    name: "5 Front-End Developers",
    desc: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo projects veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.",
    url: "https://www.google.com",
  },
];

$(document).ready(function () {
  //$('.elastic-search').hide();
});
$(document).on("click", "#getdata", function () {
  $("#mainSectionWrap").empty();
  // $('.elastic-search').toggle('show');
  $(".elastic-search").removeClass("d-none");
  //$('.container-fluid').hide();
  // var myval = $("#searchfield").val();
  var searchText = { searchText: $("#searchfield").val() };
  var searchText1 = $("#searchfield").val();

  if (
    /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE|a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?>|<(video).*?<\/\2>/i.test(
      searchText1
    ) == true
  ) {
    bootbox.alert("HTML Tag are not allowed");
    return false;
  }

  $(".s-result p span").html(searchText1);

  // var template = $('#hidden-template').html();

  ajax.post(
    "webHP?requestType=ApplicationRH&actionVal=CMSAssetMaster&screenId=9000012348",
    searchText,
    function (responseData) {
      $("#elasticSearchResult").empty();
      $("#searchData .tab-pane").removeClass("active show");
      $("#searchListLink .nav-link").removeClass("active");
      $("#searchListLink .nav-item:first-child .nav-link").addClass("active");
      $("#searchData .tab-pane:first-child").addClass("active show");
      console.log(responseData);
      var resLength = responseData.length;
      console.log(resLength);
      var searchresultnotification = "";
      var searchresultpublicnotice = "";
      var searchresultcircular = "";
      var searchresulttradenotice = "";
      var searchresultall = "";
      for (var i = 0; i < resLength; i++) {
        console.log("Value of i " + i);
        //		 console.log("\"" + responseData[i].index.trim() + "\",\"" + responseData[i].sourceAsMap.ASSET_CATEGORY.trim() + "\",\"" + responseData[i].sourceAsMap.ASSET_TITLE.trim() + "\"");
        console.log('"' + responseData[i].indexName.trim() + '"');
        if (responseData[i].indexName.trim() === "cmsassetmaster") {
          console.log(
            '"' +
              responseData[i].indexName.trim() +
              '","' +
              responseData[i].displayType.trim() +
              '","' +
              responseData[i].title.trim() +
              '"'
          );
          searchresultall +=
            '<div class="row my-3"><div class="col-md-12 mb-2"><div class="card scheme-card">' +
            '<div class="card-body"><h5 class="font-weight-semi-bold text-light-black">' +
            responseData[i].title.trim() +
            "</h5>" +
            '<p class="text-gray font-12">' +
            responseData[i].title.trim() +
            "</p>" +
            '<div class="text-right">';
          var assetId = responseData[i].url;
          searchresultall +=
            '<a class="font-11 text-decoration-none" href="javascript:;" onclick=\'openAttachment(' +
            assetId +
            ")'>" +
            'View All <i class="fa fa-long-arrow-right icon-orange"></i></a>';
          searchresultall += "</div></div></div></div></div>";
          if (responseData[i].displayType.trim() === "1") {
            searchresultnotification +=
              '<div class="row my-3"><div class="col-md-12 mb-2"><div class="card scheme-card">' +
              '<div class="card-body"><h5 class="font-weight-semi-bold text-light-black">' +
              responseData[i].title.trim() +
              "</h5>" +
              '<p class="text-gray font-12">' +
              responseData[i].content +
              "</p>" +
              '<div class="text-right">';
            var assetId = responseData[i].url;
            searchresultnotification +=
              '<a class="font-11 text-decoration-none" href="javascript:;" onclick=\'openAttachment(' +
              assetId +
              ")'>" +
              'View All <i class="fa fa-long-arrow-right icon-orange"></i></a>';
            searchresultnotification += "</div></div></div></div></div>";
          } else if (responseData[i].displayType.trim() === "2") {
            searchresultpublicnotice +=
              '<div class="row my-3"><div class="col-md-12 mb-2"><div class="card scheme-card">' +
              '<div class="card-body"><h5 class="font-weight-semi-bold text-light-black">' +
              responseData[i].title.trim() +
              "</h5>" +
              '<p class="text-gray font-12">' +
              responseData[i].content +
              "</p>" +
              '<div class="text-right">';
            var assetId = responseData[i].url;
            searchresultpublicnotice +=
              '<a class="font-11 text-decoration-none" href="javascript:;" onclick=\'openAttachment(' +
              assetId +
              ")'>" +
              'View All <i class="fa fa-long-arrow-right icon-orange"></i></a>';
            searchresultpublicnotice += "</div></div></div></div></div>";
          } else if (responseData[i].displayType.trim() === "3") {
            searchresultcircular +=
              '<div class="row my-3"><div class="col-md-12 mb-2"><div class="card scheme-card">' +
              '<div class="card-body"><h5 class="font-weight-semi-bold text-light-black">' +
              responseData[i].title.trim() +
              "</h5>" +
              '<p class="text-gray font-12">' +
              responseData[i].content +
              "</p>" +
              '<div class="text-right">';
            var assetId = responseData[i].url;
            searchresultcircular +=
              '<a class="font-11 text-decoration-none" href="javascript:;" onclick=\'openAttachment(' +
              assetId +
              ")'>" +
              'View All <i class="fa fa-long-arrow-right icon-orange"></i></a>';
            searchresultcircular += "</div></div></div></div></div>";
          } else if (responseData[i].displayType.trim() === "4") {
            searchresulttradenotice +=
              '<div class="row my-3"><div class="col-md-12 mb-2"><div class="card scheme-card">' +
              '<div class="card-body"><h5 class="font-weight-semi-bold text-light-black">' +
              responseData[i].title.trim() +
              "</h5>" +
              '<p class="text-gray font-12">' +
              responseData[i].content +
              "</p>" +
              '<div class="text-right">';
            var assetId = responseData[i].url;
            searchresulttradenotice +=
              '<a class="font-11 text-decoration-none" href="javascript:;" onclick=\'openAttachment(' +
              assetId +
              ")'>" +
              'View All <i class="fa fa-long-arrow-right icon-orange"></i></a>';
            searchresulttradenotice += "</div></div></div></div></div>";
            /*} else {
				 searchresultothers += "<div class=\"row my-3\"><div class=\"col-md-12 mb-2\"><div class=\"card scheme-card\">" +
				 "<div class=\"card-body\"><h5 class=\"font-weight-semi-bold text-light-black\">"+responseData[i].title.trim()+"</h5>" +
				 "<p class=\"text-gray font-12\">"+ responseData[i].content +"</p>" +
				 "<div class=\"text-right\"><a class=\"font-11 text-decoration-none viewAttach\" href=\"javascript:void(0)\" target=\"_blank\">" +
				 "<span class=\"d-none\">"+ responseData[i].url +"</span>View All <i class=\"fa fa-long-arrow-right icon-orange\"></i></a>" +
				 "</div></div></div></div></div>";*/
          }
        } else if (responseData[i].indexName.trim() === "cmstemplatedetails") {
          console.log(
            '"' +
              responseData[i].indexName.trim() +
              '","' +
              responseData[i].displayType.trim() +
              '","' +
              responseData[i].title.trim() +
              '"'
          );
          searchresultall +=
            '<div class="row my-3"><div class="col-md-12 mb-2"><div class="card scheme-card">' +
            '<div class="card-body"><h5 class="font-weight-semi-bold text-light-black">' +
            responseData[i].title.trim() +
            "</h5>" +
            '<p class="text-gray font-12">' +
            responseData[i].title.trim() +
            "</p>" +
            '<div class="text-right"><a class="font-11 text-decoration-none" href="javascript:;" onclick=viewSearchDescr(' +
            responseData[i].templateId.trim() +
            ")>" +
            '<span class="d-none"></span>View All <i class="fa fa-long-arrow-right icon-orange"></i></a>' +
            "</div></div></div></div></div>";
        } else if (
          responseData[i].indexName.trim() === "dgfthqcontactlist" ||
          responseData[i].indexName.trim() === "dgftracontactlist"
        ) {
          var callFunction = "";
          if (responseData[i].indexName.trim() === "dgfthqcontactlist") {
            callFunction = "hqcontactlist()";
          } else if (responseData[i].indexName.trim() === "dgftracontactlist") {
            callFunction = "racontactlist()";
          }
          console.log(
            '"' +
              responseData[i].indexName.trim() +
              '","' +
              responseData[i].displayType.trim() +
              '","' +
              responseData[i].title.trim() +
              '"'
          );
          searchresultall +=
            '<div class="row my-3"><div class="col-md-12 mb-2"><div class="card scheme-card">' +
            '<div class="card-body"><h5 class="font-weight-semi-bold text-light-black">' +
            responseData[i].title.trim() +
            "</h5>" +
            '<p class="text-gray font-12">' +
            responseData[i].content +
            "</p>" +
            '<div class="text-right"><a class="font-11 text-decoration-none" href="javascript:;" onclick=' +
            callFunction +
            ">" +
            '<span class="d-none"></span>View All <i class="fa fa-long-arrow-right icon-orange"></i></a>' +
            "</div></div></div></div></div>";
        }
      }
      if (searchresultall === "") {
        searchresultall =
          '<div class="row"><div class="col-md-12"><p class="text-red py-5 text-center font-weight-semi-bold">No results found</p></div></div> ';
      }
      if (searchresultnotification === "") {
        searchresultnotification =
          '<div class="row"><div class="col-md-12"><p class="text-red py-5 text-center font-weight-semi-bold">No results found</p></div></div> ';
      }
      if (searchresultpublicnotice === "") {
        searchresultpublicnotice =
          '<div class="row"><div class="col-md-12"><p class="text-red py-5 text-center font-weight-semi-bold">No results found</p></div></div> ';
      }
      if (searchresultcircular === "") {
        searchresultcircular =
          '<div class="row"><div class="col-md-12"><p class="text-red py-5 text-center font-weight-semi-bold">No results found</p></div></div> ';
      }
      if (searchresulttradenotice === "") {
        searchresulttradenotice =
          '<div class="row"><div class="col-md-12"><p class="text-red py-5 text-center font-weight-semi-bold">No results found</p></div></div> ';
      }

      document.getElementById("searchresultnotification").innerHTML =
        searchresultnotification;
      document.getElementById("searchresultpublicnotice").innerHTML =
        searchresultpublicnotice;
      document.getElementById("searchresultcircular").innerHTML =
        searchresultcircular;
      document.getElementById("searchresulttradenotice").innerHTML =
        searchresulttradenotice;
      document.getElementById("searchresultall").innerHTML = searchresultall;
    }
  );

  // let pattern = new RegExp(myval, 'i');
  /* let resultSet = srcData.filter(item => (item.title.match(pattern) || item.desc.match(pattern) || item.name
         .match(pattern) || item.url
         .match(pattern)) && myval !=
     '').map(item =>
     `<div class="row my-3">
     <div class="col-md-12 mb-2">
<div class="card scheme-card">
 <div class="card-body">
     <h5 class="font-weight-semi-bold text-light-black">${item.title}</h5>
     <p class="text-gray font-12">Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem
         accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo projects veritatis et quasi
         ropeior architecto beatae vitae dicta sunt explicabo.</p>
     <div class="text-right">
         <a class="font-11 text-decoration-none" href="${item.url}" target="_blank">View All <i class="fa fa-long-arrow-right icon-orange"></i></a>
     </div>
 </div>
</div>
</div>
</div>`
 ).join(' ');*/

  // document.getElementById('searchresult').innerHTML = resultSet;

  //$('.container-fluid').hide();
});

function viewSearchDescr(tmpltId) {
  console.log("template id : " + tmpltId);
  if (tmpltId !== "") {
    updateContainer(
      "webHP?requestType=ApplicationRH&actionVal=preview&screenId=90000552&Flag=true&tmpltId=" +
        tmpltId,
      "",
      "elasticSearchResult"
    );
    $(".elastic-search").addClass("d-none");
  }
}

function hqcontactlist() {
  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=dgft_hq_contact_list&screenId=90000734",
    "",
    "elasticSearchResult"
  );
  $(".elastic-search").addClass("d-none");
}

function racontactlist() {
  updateContainer(
    "webHP?requestType=ApplicationRH&actionVal=dgft_ra_contact_list&screenId=90000734",
    "",
    "elasticSearchResult"
  );
  $(".elastic-search").addClass("d-none");
}

$("#searchfield").keyup(function (event) {
  if (event.keyCode === 13) {
    $("#getdata").click();
  }
});
/* elsatic search */

// open attachment
function openAttachment(id) {
  ajax.post(
    "web?requestType=ApplicationRH&actionVal=getPath&screenId=90000734",
    { id: id },
    function (data) {
      console.log(data);
      if (data.path != null && data.path != "") {
        window.open(data.path);
        /*searchresultall +="<a class=\"font-11 text-decoration-none\" href=\""+ data +"\" target=\"_blank\">"
			 +"View All <i class=\"fa fa-long-arrow-right icon-orange\"></i></a>";*/
      } else {
        bootbox.alert("No File Available.");
      }
    }
  );
}

$(document).on("click", ".market-card-home", function () {
  var loginId = $("#loginId").val();
  var searchPage;
  if (loginId != null && loginId != undefined && loginId != "") {
    searchPage = "/apps/country-guide/";
  } else {
    searchPage = "/pages/country-guide/";
  }
  var value = $(this).attr("data-countryName");
  window.location.href =
    getContextPath() +
    searchPage +
    value
      .replaceAll(" ", "-")
      .replaceAll(/[!@#$%^&*`"\'(),.?:{}|<>]/g, "")
      .toLowerCase();
});

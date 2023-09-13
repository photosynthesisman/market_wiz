// header&lnb 불러오기
import { includeHTML } from "./layout.js";
includeHTML();

// 탭메뉴 및 패널 활성화
$(".market").on("click", ".tab a", function () {
  $(this).parent().siblings().removeClass("active");
  $(".tab-content").removeClass("active");
  $(this).parent().addClass("active");
  let tabId = $(this).data("tab");
  $("#" + tabId).addClass("active");
});

// 탭메뉴 닫기
$(".market").on("click", ".close-tab", function () {
  const clikedTab = $(this).prev("a").attr("data-tab");
  const onlyActive = $("#" + clikedTab);
  onlyActive.removeClass("active");
  $(this).parents("li").remove();
});

// lnb 메뉴 클릭시 탭 생성
$(".market").on("click", ".folding-panel li", function () {
  const tab_name = $(this).text();
  const data_name = $(this).data("name");
  $(".tab-container ul").append(
    '<li class="tab"><a href="#" data-tab="' +
      data_name +
      '">' +
      tab_name +
      '</a><span class="close-tab">닫기</span></li>'
  );
});

// 탭 메뉴 닫기
$(".market").on("click", ".folding-btn", function () {
  $(this).parent().next(".folding-panel").stop().slideToggle(300);
  $(this).parents("li").toggleClass("open").siblings().removeClass("open");
  $(this).parents("li").siblings().find(".folding-panel").slideUp(300);
});

// 페이지 로드
$("#collect-site-product").load("tab2content.html");

// lnb 접기/펼치기
$(".market").on("click", ".close-lnb", function () {
  if ($(this).parents(".lnb-inner").hasClass("fold")) {
    $(this).parents(".lnb-inner").removeClass("fold");
  } else {
    $(this).parents(".lnb-inner").addClass("fold");
  }
});

//pooup 오픈
$(".market").on("click", "#showPopup", function () {
  $("#popup, #overlay").fadeIn();
});

$(".market").on("click", "#closePopup", function () {
  $("#popup, #overlay").fadeOut();
});

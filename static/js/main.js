// header&lnb 불러오기
import { includeHTML } from "./layout.js";
includeHTML();

$(document).ready(function () {
  // 탭메뉴 및 패널 활성화
  $(".market").on("click", ".tab a", function (e) {
    e.preventDefault();
    $(this).parent().siblings().removeClass("active");
    $(".tab-content").removeClass("active");
    $(this).parent().addClass("active");
    let tabId = $(this).data("tab");
    $("#" + tabId).addClass("active");
  });

  // lnb 2depth open
  $(".market").on("click", ".folding-btn", function (e) {
    e.preventDefault();
    $(this).parent().next(".folding-panel").stop().slideToggle(300);
    $(this).parents("li").toggleClass("open").siblings().removeClass("open");
    $(this).parents("li").siblings().find(".folding-panel").slideUp(300);
  });
  // lnb 3depth open
  $(".market").on("click", ".has-depth", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).find("ul").fadeOut();
    } else {
      $(this).addClass("active");
      $(this).find("ul").fadeIn();
    }
  });

  //pooup 오픈/클로즈
  $(".market").on("click", ".open-pop", function () {
    const popId = $(this).attr("data-name");
    $("#" + popId).fadeIn();
  });
  $(".market").on("click", ".close", function () {
    $(this).parents(".popup").fadeOut();
  });
  $(".market").on("click", ".closePopup", function () {
    if ($(this).parents(".popup").hasClass("open")) {
      return false;
    } else {
      $(this).parents(".popup").fadeOut();
    }
  });

  //전체 선택
  $(".market").on("click", "[id^=chk_all]", function () {
    const checkItem = $(".item-wrap").find("input[type=checkbox]");
    if (!$(this).prop("checked")) {
      checkItem.prop("checked", false);
    } else {
      checkItem.prop("checked", true);
    }
  });
  $(".market").on("click", ".item input[type=checkbox]", function () {
    const chkAll = $("[id^=chk_all]");
    const siblingCheck = $(this).parents(".item").siblings().find("input[type=checkbox]");
    if (siblingCheck.length === siblingCheck.filter(":checked").length && $(this).prop("checked")) {
      chkAll.prop("checked", true);
    } else {
      chkAll.prop("checked", false);
    }
  });

  //count number of count
  $(document).on("input", ".txt-area", function (e) {
    const counterEle = $(this).next();
    const target = e.target;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;
    counterEle.html(`<strong>${currentLength}</strong> / ${maxLength}`);
  });

  // select placeholder
  $(".placeholder").click(function () {
    $(this).removeClass("placeholder");
  });

  //for custom select dropdown menu
  $(document).on("click", ".select-box .init", function () {
    if ($(this).parents(".select-box").hasClass("disabled")) {
      return false;
    }
    $(this).parents(".select-box").toggleClass("active");
    $(this).closest("ul").children("li:not(.init)").toggle();
  });
  $(document).on("click", ".select-box ul li:not(.init)", function () {
    $(this).parent().children("li:not(.init)").removeClass("selected");
    $(this).addClass("selected");
    $(this).parents(".select-box").find("ul").children(".init").html($(this).html());
    $(this).parent().children("li:not(.init)").toggle();
    $(this).parents(".select-box").removeClass("active");
  });

  //tooltip 관련
  $(".market").on("mouseover", ".tooltip", function () {
    $(this).next().stop().show();
  });
  $(".market").on("mouseout", ".tooltip", function () {
    $(this).next().stop().hide();
  });
  //favorite 관련
  $(".market").on("click", ".favorite", function () {
    $(this).hasClass("checked") ? $(this).removeClass("checked") : $(this).addClass("checked");
  });
});

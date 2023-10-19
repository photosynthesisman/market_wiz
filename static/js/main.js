// header&lnb 불러오기
export function includeHTML() {
  const includeArea = document.querySelectorAll("[data-include]");
  for (let dom of includeArea) {
    const url = dom.dataset.include;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        dom.innerHTML = data;
        dom.removeAttribute("data-include");
      });
  }
}
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
    $(this).parents("li").toggleClass("open").siblings().removeClass("open");
  });
  // lnb 3depth open
  $(".market").on("click", ".has-depth", function (e) {
    e.preventDefault();
    $(this).toggleClass("active").siblings().removeClass("active");
  });

  //pooup 오픈/클로즈
  $(".market").on("click", ".open-pop", function () {
    const popId = $(this).attr("data-name");
    $("#" + popId).show();
  });
  $(".market").on("click", ".close", function () {
    $(this).parents(".popup").hide();
  });
  $(".market").on("click", ".closePopup", function () {
    if ($(this).parents(".popup").hasClass("open")) {
      return false;
    } else {
      $(this).parents(".popup").hide();
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
    $(this).next("ul").children("li").toggle();
  });
  $(document).on("click", ".select-box ul li", function () {
    $(this).parent().children("li").removeClass("selected");
    $(this).addClass("selected");
    $(this).parents(".select-box").children(".init").html($(this).find("button").html());
    $(this).parent().children("li").toggle();
    $(this).parents(".select-box").removeClass("active");
  });

  //favorite 관련
  $(".market").on("click", ".favorite", function () {
    $(this).hasClass("checked") ? $(this).removeClass("checked") : $(this).addClass("checked");
  });
});

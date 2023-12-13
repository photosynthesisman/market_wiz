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
  $(".tab-container").on("click", ".tab a", function (e) {
    e.preventDefault();
    $(this).parent().siblings().removeClass("active");
    $(".tab-content").removeClass("active");
    $(this).parent().addClass("active");
    let tabId = $(this).data("tab");
    $("#" + tabId).addClass("active");
  });

  $(".tab-line-menu").on("click", ".tab > a", function (e) {
    e.preventDefault();
    const $idx = $(this).parent().index();
    $(this).parent().addClass("active").siblings().removeClass("active");
    $(".tab-panel").eq($idx).addClass("active").siblings().removeClass("active");
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
  //panle 오픈/클로즈
  $(".market").on("click", ".open-panel", function () {
    const panelId = $(this).attr("data-name");
    $("#" + panelId).show();
  });
  $(".market").on("click", ".close", function () {
    $(this).parents(".panel").hide();
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
  $(document).on("click", ".select-box .init", function (e) {
    e.preventDefault();
    const $this = $(this);
    const $wrap = $this.closest(".select-box");
    if ($wrap.hasClass("disabled")) {
      return false;
    }
    $wrap.toggleClass("active");
  });
  $(document).on("click", ".select-box ul li button", function (e) {
    e.preventDefault();
    const $this = $(this);
    $this.closest("li").addClass("selected").siblings("li").removeClass("selected");
    const $wrap = $this.closest(".select-box");
    const $btn = $wrap.find(".init");
    $btn.html($this.html());
    $btn.attr("data-value", $this.data("value"));
    $wrap.removeClass("active");
  });

  //favorite 관련
  $(".market").on("click", ".favorite", function () {
    $(this).hasClass("checked") ? $(this).removeClass("checked") : $(this).addClass("checked");
  });
});

// folding-table 관련
$(document).on("click", ".ft-list", function (e) {
  e.preventDefault();
  const $this = $(this);
  const $depth = $this.closest($("[class*=depth]").find("li"));
  $this.toggleClass("open");
  $depth.toggleClass("open");
});
//go top
$(document).on("click", ".go-top", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 500);
});

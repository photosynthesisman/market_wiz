// header&lnb 불러오기
import { includeHTML } from "./layout.js";
includeHTML();

// 탭메뉴 및 패널 활성화
$(".market").on("click", ".tab a", function (e) {
  e.preventDefault();
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

// 탭 메뉴 호버 시 컨텐츠 border-raduis
// $(".market").on("mouseover", ".tab:first-child", function () {
//   $(".tab-content").css({ "border-top-left-radius": "0" });
// });
// $(".market").on("mouseout", ".tab:first-child", function () {
//   $(".tab-content").css({ "border-top-left-radius": "2.4rem" });
// });
// lnb 메뉴 클릭시 탭 생성
$(".market").on("click", ".lnb-menu", function () {
  var clickedText = $(this)
    .contents()
    .filter(function () {
      return this.nodeType == 3;
    })
    .text();
  const tab_name = clickedText;
  const data_name = $(this).data("name");
  $(".tab-container ul").append(
    '<li class="tab"><a href="#" data-tab="' +
      data_name +
      '">' +
      tab_name +
      '</a><span class="close-tab">닫기</span></li>'
  );
});

// lnb 하위 뎁스 열기
$(".market").on("click", ".folding-btn", function (e) {
  e.preventDefault();
  $(this).parent().next(".folding-panel").stop().slideToggle(300);
  $(this).parents("li").toggleClass("open").siblings().removeClass("open");
  $(this).parents("li").siblings().find(".folding-panel").slideUp(300);
});

// 페이지 로드
$("#font-guide").load("font-guide.html");
$("#color-guide").load("color-guide.html");
$("#form-guide").load("form-guide.html");
$("#button-guide").load("button-guide.html");
$("#popup-guide").load("popup-guide.html");
$("#dashboard").load("dashboard.html");
$("#_S_04_0008").load("_S_04_0008.html");
$("#_S_04_0001").load("_S_04_0001.html");
$("#_S_04_0005").load("_S_04_0005.html");
$("#_S_07_0001").load("_S_07_0001.html");
$("#_S_08_0001").load("_S_08_0001.html");

// lnb 접기/펼치기
$(".market").on("click", ".close-lnb", function () {
  if ($(this).parents(".lnb-inner").hasClass("fold")) {
    $(this).parents(".lnb-inner").removeClass("fold");
  } else {
    $(this).parents(".lnb-inner").addClass("fold");
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

// pagination
// $(document).ready(function () {
//   $("#dashboard").load("dashboard.html", function () {
//     const itemsPerPage = 10;
//     const content = $(".item-wrap");
//     const pagination = document.getElementById("pagination");

//     function showPage(pageNumber) {
//       const startIndex = (pageNumber - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       const items = [...content.children()];
//       items.forEach((item, index) => {
//         if (index >= startIndex && index < endIndex) {
//           item.style.display = "flex";
//         } else {
//           item.style.display = "none";
//         }
//       });
//     }

//     function createPaginationLinks() {
//       const totalItems = content.children().length;
//       const totalPages = Math.ceil(totalItems / itemsPerPage);
//       for (let i = 1; i <= totalPages; i++) {
//         const li = document.createElement("li");
//         li.textContent = i;
//         li.addEventListener("click", () => showPage(i));
//         pagination.appendChild(li);
//       }
//     }
//     createPaginationLinks();
//     showPage(1);
//     $("#pagination li:first-child").addClass("active");
//     $("#pagination li").click(function () {
//       $(this).addClass("active").siblings().removeClass("active");
//     });
//   });
// });
//validation
$(document).ready(function () {
  $("#form-guide").load("form-guide.html", function () {
    const requiredInput = $("input[required]");
    if (requiredInput) {
      requiredInput.parent().append("<p class=" + "validation-check" + ">입력정보를 확인해주세요</p>");
    }
    const requiredSelect = $(".select-box.required");
    if (requiredSelect) {
      requiredSelect.parent().append("<p class=" + "validation-check" + ">다시 선택해주세요</p>");
    }
    //count number of count
    const messageEle = $("#txt-area");
    const counterEle = $(".counter");

    messageEle.on("input", function (e) {
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
    // customSelect();
    function customSelect() {
      let x, i, j, l, ll, selElmnt, a, b, c;
      x = document.getElementsByClassName("select-box");
      l = x.length;
      for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        let disabledOption = selElmnt.querySelector(".disabled");
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function (e) {
            if ($(this).hasClass("disabled")) {
              return false;
            }
            let y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
          });
          b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
          if ($(this).parents().hasClass("disabled")) {
            return false;
          }
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
      }
      function closeAllSelect(elmnt) {
        let x,
          y,
          i,
          xl,
          yl,
          arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i);
          } else {
            y[i].classList.remove("select-arrow-active");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
      }
      $(".select-selected").click(function () {
        const disOptions = $(this).parent().find(".disabled");
        const selectOptions = $(this).parent().find(".same-as-selected");
        const hoverOptions = $(this).parent().find(".hover");
        disOptions.each(function () {
          const disText = $(this).text();
          const nextOption = $(this)
            .parent()
            .next()
            .next()
            .find($("div:contains(" + disText + ")"));
          if ($(this).hasClass("disabled")) {
            nextOption.addClass("disabled");
          } else {
            nextOption.removeClass("disabled");
          }
        });
        selectOptions.each(function () {
          const selText = $(this).text();
          const nextOptions = $(this)
            .parent()
            .next()
            .next()
            .find($("div:contains(" + selText + ")"));
          console.log(selText, nextOptions);
          if ($(this).hasClass("same-as-selected")) {
            nextOptions.addClass("same-as-selected");
          } else {
            nextOptions.removeClass("same-as-selected");
          }
        });
        hoverOptions.each(function () {
          const hoverText = $(this).text();
          const _nextOption = $(this)
            .parent()
            .next()
            .next()
            .find($("div:contains(" + hoverText + ")"));
          console.log(hoverText, _nextOption);
          if ($(this).hasClass("hover")) {
            _nextOption.addClass("hover");
          } else {
            _nextOption.removeClass("hover");
          }
        });
      });

      // open select
      const openSelect = $(".select-box.open").find(".select-selected");
      openSelect.trigger("click");
    }

    //for custom select dropdown menu
    // $(".select-box").each(function () {
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
    // });
  });
});
$(".market").on("click", ".has-depth", function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).find("ul").fadeOut();
  } else {
    $(this).addClass("active");
    $(this).find("ul").fadeIn();
  }
});
//tooltip 관련
$(".market").on("mouseover", ".tooltip", function () {
  $(this).next().stop().show();
});
$(".market").on("mouseout", ".tooltip", function () {
  $(this).next().stop().hide();
});

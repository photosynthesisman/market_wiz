(function () {
  const pathAry = location.pathname.split("/");
  const lootPathLength = pathAry.length - (location.hostname.indexOf("github") > -1 ? 4 : 3);
  let loot = "";
  if (lootPathLength > 0) {
    for (let i = 0; i < lootPathLength; i++) {
      loot += "../../";
    }
  }
  let str = `<link rel="shortcut icon" type="image/x-icon" href="${loot}images/favicon.png" />
  <link href="${loot}static/css/front.min.css" rel="stylesheet" />
  <script type="text/javascript" src="${loot}static/js/lib/jquery-3.7.0.min.js"></script>     
  <script type="module" src="${loot}static/js/main.js"></script>`;
  document.write(str);
  const $include = document.querySelector(".__include");
  if ($include) $include.remove();
})();

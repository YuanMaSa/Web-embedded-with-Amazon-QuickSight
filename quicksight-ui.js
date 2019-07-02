var gatewayApiUrl = "your api url"; // update with RootUrl found in Step 2
$("#dashboardContainer").ready(function() {
  // var username = getParameterValues('username');
  // var password = getParameterValues('password');
  // var dashboardId = getParameterValues('dashboardid');
  var username = "your user name";
  var password = "your password";
  var dashboardId = "your dashboard id";
  embedUrl();

  function getParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
      var urlparam = url[i].split('=');
      if (urlparam[0].toLowerCase() === param) {
        return urlparam[1];
      }
    }
  }

  function embedUrl() {
    var parameters = {
      username: username,
      password: password,
      dashboardId: dashboardId
    }

    var queryString = $.param(parameters);
    gatewayApiUrl = gatewayApiUrl + queryString;
    $.ajax({
      type: "GET",
      url: gatewayApiUrl,
      contentType: "application/json",
      crossDomain: true,
      success: function(data, status) {
        console.log(data);
        embedDashboard(data.EmbedUrl);
      }
    })
  }

  function onVisualLoaded() {
    var div = document.getElementById("loadedContainer");
    div.innerHTML = "Hey! I am fully loaded";
  }

  function onError() {
    var div = document.getElementById("errorContainer");
    div.innerHTML = "your session has expired";
  }

  function embedDashboard(embedUrl) {
    var containerDiv = document.getElementById("dashboardContainer");
    var params = {
      url: embedUrl,
      container: containerDiv,
      height: "800px"
    };
    var dashboard = QuickSightEmbedding.embedDashboard(params);
    if (dashboard !== null) {
      $('.spinner-border.text-danger').css('display','none');
      }
    dashboard.on('error', onError);
    dashboard.on('load', onVisualLoaded);
  }
});

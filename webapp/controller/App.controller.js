sap.ui.define(
  [
    "./Base.Controller"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("sap.demo.appview.appviewcatalog.controller.App", {
      onInit() {
        this._initTheme();
      },
    });
  }
);

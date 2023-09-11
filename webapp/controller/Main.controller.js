sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("sap.demo.appview.appviewcatalog.controller.Main", {
            onInit: function () {

            },
            onPressTile: function(){
               let oRouter = UIComponent.getRouterFor(this);
               oRouter.navTo("ViewList")
            },
        });
    });

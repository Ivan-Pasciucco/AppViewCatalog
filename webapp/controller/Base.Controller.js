sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/Core"
], function (
    Controller,
    UIComponent,
    History,
    Core
) {
    'use strict';

    return Controller.extend("sap.demo.appview.appviewcatalog.controller.Base.Controller", {

        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },
        onNavTo: function (viewRoute, param = null) {
            this.getRouter().navTo(viewRoute, param)
        },
        onNavBack: function () {
            let oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("RouteMain");
            }

        },
        getById: function (sId) {
            return this.getView().byId(sId);
        },

        _initTheme: function () {
            if (localStorage.getItem("tipoTema")) {
                Core.applyTheme(localStorage.getItem("tipoTema"))
            }
        },
        onTheme: function (oEvent) {
            let theme = oEvent.getSource().data("tipoTema");
            if (theme == "L") {
                Core.applyTheme("sap_horizon");
                localStorage.setItem("tipoTema", "sap_horizon")
            } else {
                Core.applyTheme("sap_horizon_dark");
                localStorage.setItem("tipoTema", "sap_horizon_dark")
            }
        },
        
    });

});
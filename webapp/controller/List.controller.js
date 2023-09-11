sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("sap.demo.appview.appviewcatalog.controller.List", {
            onInit: function () {
                // let oProductsModel = new  JSONModel(aItems);
                // this.getView().setModel(oProductsModel, "Products");

            },
            onPressProduct: function(oEvent){
               let oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProduct").getObject();
               MessageToast.show(oItem.Name)
           }
        });
    });

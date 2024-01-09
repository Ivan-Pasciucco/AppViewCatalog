sap.ui.define([
    "./Base.Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("sap.demo.appview.appviewcatalog.controller.List", {
            onInit: function () {
                console.log("Evento del List controller")
                // let oProductsModel = new  JSONModel(aItems);
                // this.getView().setModel(oProductsModel, "Products");

            },

            onPressProduct: function (oEvent) {
                //oEvent.getSource().getSelectedItem().oBindingContexts.mProduct.getObject()
                let oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProduct").getObject();
                // MessageToast.show(oItem.Name)
                //obtenemos la data del oItem seleccionado
                let idxProduct = this.getView().getModel("mProduct").getData().ProductCollection.indexOf(oItem);
                
                this.onNavTo("ViewDetail", {
                    productId: idxProduct

                })
            },

            onSearch: function (oEvent) {

                let aFilters = [];
                let sQuery = oEvent.getSource().getValue();

                if (sQuery && sQuery.length > 0) {
                    // let oFilter = new Filter({
                    //     path: "Name",
                    //     operator: FilterOperator.Contains,
                    //     value1: sQuery
                    //   });
                    let oFilter = new Filter("Name", FilterOperator.Contains, sQuery)
                    aFilters.push(oFilter)
                }
                let oList = this.byId("listProducts");
                let oBinding = oList.getBinding("items")
                oBinding.filter(aFilters);

            }
        })
    });

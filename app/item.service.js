'use strict'

app.factory('ItemService', ['$http', '$q', function ($http, $q) {
    var aAllItems = [];
    var aItemsData = [];
    var aCart = [];
    var currentItem;
    var bInitialize = false;
    var service = {
        initService: function () {
            var deferred = $q.defer();
            if (aAllItems.length == 0) {
                $http.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').then(function (response) {
                    aItemsData = response.data;
                    deferred.resolve(aItemsData);
                });
            } else {
                deferred.resolve(aItemsData);
            }
            bInitialize = true;
            return deferred.promise;
        },
        isInitialize: function () {
            return bInitialize;
        },
        getAllItems: function () {
            if (!bInitialize) {
                this.initService();
            }
            if (aAllItems.length == 0) {
                var id = 1;
                for (var indexCategories = 0; indexCategories < aItemsData.length; indexCategories++) {
                    for (var indexSubCategories = 0; indexSubCategories < aItemsData[indexCategories].subcategories.length; indexSubCategories++) {
                        for (var indexItems = 0; indexItems < aItemsData[indexCategories].subcategories[indexSubCategories].items.length; indexItems++) {
                            var item = aItemsData[indexCategories].subcategories[indexSubCategories].items[indexItems];
                            item.totalStock = item.stock;
                            item.quantity = 0;
                            item.oldQuantity = 0;
                            item.id = id;
                            id++;
                            aAllItems.push(item);
                        }
                    }
                }
            }
            return aAllItems;
        },
        getCategories: function () {
            if (aItemsData.length == 0) {
                this.initService();
            }
            return aItemsData;
        },
        getRandomItem: function () {
            if (aAllItems.length == 0) {
                this.getAllItems();
            }
            return aAllItems[Math.floor(Math.random() * aAllItems.length)];
        },
        getCurrentItem: function (id) {
            var item;
            for (var indexItems = 0; indexItems < aAllItems.length; indexItems++) {
                if (aAllItems[indexItems].id == id) {
                    item = aAllItems[indexItems];
                    break;
                }
            }
            return item;
        },
        addItem: function (item) {
            var bIsInCart = false;
            var bItemAdded = false;
            if (item.quantity != 0) {
                for (var indexCart = 0; indexCart < aCart.length; indexCart++) {
                    if (item.id == aCart[indexCart].id) {
                        aCart[indexCart].quantity = aCart[indexCart].quantity + item.quantity;
                        aCart[indexCart].oldQuantity = aCart[indexCart].quantity;
                        bIsInCart = true;
                        break;
                    }
                }
                if (!bIsInCart) {
                    item.oldQuantity = item.quantity;
                    aCart.push(angular.copy(item));
                }

                item.totalStock = item.totalStock - item.quantity;
                item.stock = item.totalStock;
                item.quantity = 0;
                item.oldQuantity = 0;

                for (var indexItems = 0; indexItems < aAllItems.length; indexItems++) {
                    if (aAllItems[indexItems].id == item.id) {
                        aAllItems[indexItems] = item;
                        break;
                    }
                }
                bItemAdded = true;
            }
            return [item, bItemAdded];
        },
        getCartItems: function () {
            return aCart;
        },
        updateCartItem: function (item) {
            console.log("updateCartItem_1.1_quantity= " + item.quantity);
            console.log("updateCartItem_1.2_oldQuantity= " + item.oldQuantity);
            console.log("updateCartItem_1.3_stock= " + item.stock);
            console.log("updateCartItem_1.4_totalStock= " + item.totalStock);
            var bItemUpdated = false;
            for (var indexAllItems = 0; indexAllItems < aAllItems.length; indexAllItems++) {
                if (aAllItems[indexAllItems].id == item.id) {
                    if (item.quantity > item.totalStock) {
                        item.quantity = item.oldQuantity;
                        bItemUpdated = false;
                    } else {
                        aAllItems[indexAllItems].stock = item.totalStock - item.quantity;
                        aAllItems[indexAllItems].totalStock = aAllItems[indexAllItems].stock;
                        item.oldQuantity = item.quantity;
                        bItemUpdated = true;
                    }
                    break;
                }
            }
            return [item, bItemUpdated];
        },
        removeItemFromCart: function (item) {
            var bItemRemoved = false;

            for (var indexCart = 0; indexCart < aCart.length; indexCart++) {
                if (angular.equals(item, aCart[indexCart])) {
                    for (var indexAllItems = 0; indexAllItems < aAllItems.length; indexAllItems++) {
                        if (aAllItems[indexAllItems].id == item.id) {
                            aAllItems[indexAllItems].stock = aAllItems[indexAllItems].stock + item.quantity;
                            aAllItems[indexAllItems].totalStock = aAllItems[indexAllItems].stock;
                            break;
                        }
                    }
                    aCart.splice(indexCart, 1);
                    bItemRemoved = true;
                    break;
                }
            }

            return [item, bItemRemoved];
        }
    };

    return service;
}]);
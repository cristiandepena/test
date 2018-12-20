app.controller('orderCtrl', ['$scope', '$http', function($scope, $http) {

    console.log("heya");

    $scope.amount = 0;
    $scope.productList = [];
    $scope.productsInCart = [];

    $http.get("/products.json").then(
        function success(products) {
            console.log("entro");
            $scope.productList = products.data.map((e)=>{
                e.quantity = 0;

                return e;
            });
        },
        function error(err) {
            console.log(err);
        }

    );

    $scope.productAdd = function(product) {
        if (product.quantity >= 0){
            product.quantity +=1;

            //TODO: Verificar si existe y solo cambiar la cantidad de ese producto en especifico
            var index = $scope.productsInCart.indexOf(product);
            if(index >= 0){
                $scope.productsInCart[index].quantity = product.quantity;
            }else {
                $scope.productsInCart.push(product);   

            }
        }
        $scope.calculateAmount();  
        
    };

    $scope.productRemove = function(product) {
        if(product.quantity > 0){
            product.quantity -=1;

           var index = $scope.productsInCart.indexOf(product);
            if(index >= 0){
                $scope.productsInCart[index].quantity = product.quantity;
            }else {
                $scope.productsInCart.pop(product);   

            }
            $scope.calculateAmount();  
        }
    };

    $scope.calculateAmount = function calculateAmount() {

        $scope.productsInCart.forEach((element) => {
            $scope.amount += (element.quantity * element.price);
        });
    };

}]);
               var OID;


angular.module('listView', []);

function itemsController($scope) {
    initializeFirebase();

    $scope.patientSearchResults = ["iaac"];

    $( "#searchButton" ).click(function() {

        initiateSearch(function(result) {

            $scope.$apply(function(){
                //console.log("SUPP IN MY CALLBACK" + result)
                var newArray = result.val();

                var keys = Object.keys(result.val());

                //ndx iterator to solve problem [string oid] = [#]
                var ndx = 0;

                $.each(newArray, function( index, value ) {
                    newArray[index].oid =  keys[ndx];
                    ndx++;
                });
                //oh yeah

                //console.log(newArray)

                $scope.patientSearchResults = newArray;


            })

        });

    });


//    $( "#selectButton" ).click(function() {
//        switchToPatientInfoView("-JhbL7ZCF1utt7iV02qJ");
//
//    })


//


//        $scope.$apply(function(){
//            $scope.selection = "patientInfoView";
//            getPatientInfo("-JhbL7ZCF1utt7iV02qJ", function(result){
//                $scope.selectedPatient = result;
//                console.log($scope.selectedPatient)
//            });
//        })
       // $scope.$apply(function(){
        ///    $scope.selection = "patientInfoView";
            //switchToPatientInfoView("-JhbL7ZCF1utt7iV02qJ")
        //})

       //old
//    function switchToPatientInfoView(patientOID) {
//
//            $scope.selection = "patientInfoView";
//
//            getPatientInfo(patientOID, function(result){
//                $scope.selectedPatient = result;
//                console.log("hey there")
//
//                //Causes view to update
//                $scope.$apply(function(){
//                })
//
//            });
//
//    }

    $scope.switchToPatientInfoView = function(patientOID) {

        $scope.selection = "patientInfoView";

        OID = patientOID;

        getPatientInfo(patientOID, function(result){
            $scope.selectedPatient = result;
            setUpView();

            //Causes view to update
            $scope.$apply(function(){
            })

        });

    }











//    $scope.add = function(item) {
//        $scope.items.push(item);
//    };

}



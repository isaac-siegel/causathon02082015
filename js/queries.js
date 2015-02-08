/**
 * Created with JetBrains WebStorm.
 * User: isaacsiegel
 * Date: 2/8/15
 * Time: 2:13 AM
 * To change this template use File | Settings | File Templates.
 */

//example search(FIRSTNAME, "isaac")
function query(searchParameter, searchInput, callback2){
    console.log("Callback2"+callback2)


    patientsRef.orderByChild(searchParameter).equalTo(searchInput).once("value", function(snapshot) {

        console.log(snapshot.val());
        console.log(Object.keys(snapshot.val()))
        //console.log("Inside search(): "+ snapshot.val())

        callback2(snapshot);

        return snapshot.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}


function countPatients(searchParameter, requestedParameter){



    search(searchParameter, requestedParameter, function(result){
        return Object.keys(result.val()).length;

    })

}

function countByZip(){

    var arr = $("#zipQueryInput").val().split(" ");

    var total = 0;
    for (var i = 0; i < arr.length; i++){
        console.log("arri: "+i)
        search(ZIPCODE, arr[i], function(result){
            console.log("hello from count")
            console.log(result.val())
            if(result.val() != null)
            {
                total += Object.keys(result.val()).length;


            }
            console.log("total: "+ total)
                                console.log("length" +arr.length + "i "+ i)
            if (i == arr.length)
                swal("Zip Code Results:", total + " patients found.", "success");
        })

    }
    console.log("total: "+ total)
}

function countByNewClients(date1, date2){

    getAllPatients(function(result){
        //console.log("HELLLLLO")
        //console.log(result)
        var newArray = result;
        var count = 0;
        var maleCount=0;
        var femaleCount=0;


        $.each(newArray, function( index, value ) {
            //TODO optimize for sorted
            //console.log(newArray[index])
            patientDate = newArray[index].CreatedDate;
            if(checkIfDateInRange(date1, date2, patientDate))
            {
                count++;
                console.log("VALID FOUND: "+patientDate);

                //TODO reports
            }

            console.log(count);

        });

        //im so sorry

        //if ((patientDate >= date2 && patientDate <= date1) || (patientDate <= date2 && patientDate >= date1 )){

        //}

    })




}

function checkIfDateInRange(date1, date2, patientDate){
    if ((patientDate >= date2 && patientDate <= date1) ){
        console.log("(patientDate >= date2 && patientDate <= date1)")
        return true;

    }
    else if((patientDate <= date2 && patientDate >= date1 )){
        console.log(" (patientDate <= date2 && patientDate >= date1 )")
        return true


    }
    else{
        return false;
    }

}
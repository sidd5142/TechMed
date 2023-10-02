var app = angular.module("myApp", ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
	$stateProvider
		.state('Home', {
            url: '/home',
			templateUrl: 'home.html',
			controller: 'HomeController'
		})
        .state('Register', {
            url: '/register',
			templateUrl: 'registration.html',
			controller: 'RegistrationController'
		})
		.state('LogIn', {	
            url: '/login',
			templateUrl: 'login.html',
			controller: 'LogInController'
		})
		.state('Dashboard', {
            url: '/dashboard',
			templateUrl: 'dashboard.html',
			controller: 'DashboardPatController'
		})
		.state('Dashboard.Appointment', {
            url: '/appointment',
			templateUrl: 'appointment.html',
			controller: 'AppointmentController'
		})
		.state('Dashboard.PatientInfo', {
            url: '/patientinfo',
			templateUrl: 'patientinfo.html',
			controller: 'PatientinfoController'
		})
		.state('Dashboard.Record', {
            url: '/patientreco',
			templateUrl: 'patientrecord.html',
			controller: 'PatientRecoController'
		})
		.state('Dashboard.Prescriptions', {
            url: '/prescription',
			templateUrl: 'prescription.html',
			controller: 'PrescriptionController'
		})
		.state('Dashboard.Payement', {
            url: '/payment',
			templateUrl: 'payment.html',
			controller: 'PaymentController'
		})
		.state('DoctDashboard', {
            url: '/doctdashboard',
			templateUrl: 'doctdashboard.html',
			controller: 'DoctDashboardController'
		})
		.state('DoctRegister', {
            url: '/doctregister',
			templateUrl: 'doctreg.html',
			controller: 'DoctRegistrationController'
		})
		.state('DoctDashboard.Information', {
            url: '/doctinformation',
			templateUrl: 'doctorinfo.html',
			controller: 'DoctInformationController'
		})
		.state('DoctDashboard.Patients', {
            url: '/doctpatient',
			templateUrl: 'doctpatient.html',
			controller: 'DoctPatientController'
		})
		.state('DoctDashboard.ApproveAppointment', {
            url: '/doctapproveappointment',
			templateUrl: 'doctapproved.html',
			controller: 'DoctApprovedAppointmentController'
		})
		.state('DoctDashboard.Appointment', {
            url: '/doctappointment',
			templateUrl: 'doctappointment.html',
			controller: 'DoctAppointmentController'
		})
		.state('ReceptionDashboard', {
            url: '/recepdashboard',
			templateUrl: 'recepdashboard.html',
			controller: 'RecepDashboardController'
		})
		.state('ReceptionDashboard.Doctor', {
            url: '/recepdashboard_doctor',
			templateUrl: 'receptiondoctor.html',
			controller: 'RecepDoctorController'
		})
		.state('ReceptionDashboard.Appoint', {
            url: '/recepdashboard_appoint',
			templateUrl: 'receptionappoint.html',
			controller: 'RecepAppointController'
		})
		.state('ReceptionDashboard.Patient', {
            url: '/recepdashboard_patient',
			templateUrl: 'receppatient.html',
			controller: 'RecepPatientController'
		})
		.state('ReceptionDashboard.Register', {
            url: '/recepdashboard_register',
			templateUrl: 'recepregistered.html',
			controller: 'RecepRegisterController'
		})

		$urlRouterProvider.otherwise('/home');
}]);

var api = 'https://10.21.87.191:8000/api/'

app.controller('HomeController',function($scope,$http,$window,$state){

	$http.get(api + 'graph/', {
		withCredentials: true
	})
	.then(function(response){
		console.log(response.data)
		var data = response.data
		var doctors = data.doctors;
		var patient = data.patients;
		var appointment = data.appointments;
		var department = data.departments	

		const xValues = ["Doctors", "Patient", "Appointment", "Department"];
      const yValues = [doctors, patient, appointment, department];
	  var barColors1 = ["red", "green","blue","orange","brown"];
      const barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
      ];

      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "TechMed Hospitals Graph"
          }
        }
      });

	//   BAR GRAPH  //

	new Chart("myChart1", {
		type: "horizontalBar",
		data: {
		labels: xValues,
		datasets: [{
		  backgroundColor: barColors,
		  data: yValues
		}]
	  },
		options: {
		  legend: {display: false},
		  title: {
			display: true,
			text: "TechMed Hospitals Analysis Graph"
		  },
		  scales: {
			xAxes: [{ticks: {min: 10, max:60}}]
		  }
		}
	  });

  	})
	.catch(function(error){
		console.log(error)
	})

});

app.controller('RegistrationController',function($scope,$http,$window,$state){

	$scope.validatePassword = function(){
		$scope.passwordMismatch = $scope.password !== $scope.confpass;
	  }

	$scope.validateEmail = function () {
		var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (emailPattern.test($scope.email)) {
			$scope.emailIsValid = true;
		} else {
			$scope.emailIsValid = false;
		}
	};

	 $scope.register = function(){
		var pass = $scope.password;
		var confpass = $scope.confpass;

		var regdata = {
            first_name: $scope.firstname,
            last_name : $scope.lastname,
            password : $scope.password,
			email : $scope.email,
			username : $scope.username,
			age : $scope.age,
			gender : $scope.gender,
			contact : $scope.contact,
			weight : $scope.weight,
			address : $scope.address
		};
		console.log(regdata);

		if(pass == confpass){
			
			$http.post(api+'PatientRegisteration/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			Swal.fire({
				icon: 'success',
				title: 'Congrats..',
				text: response.data.message
			  })
			$state.go('LogIn');
		  })
		  .catch(function(error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		  })
		}
	
	else{
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Incorrect password'
		  })
	}
  }
		
});

app.controller('DoctRegistrationController',function($scope,$http,$window,$state){
	$scope.depart = [];
	$scope.departs = [];

	$scope.validatePassword = function(){
		$scope.passwordMismatch = $scope.password !== $scope.confpass;
	  }

	  $scope.validateEmail = function () {
		var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (emailPattern.test($scope.email)) {
			$scope.emailIsValid = true;
		} else {
			$scope.emailIsValid = false;
		}
	};

	  var pass = $scope.password;
	  var confo = $scope.confpass;
	  var validemail = $scope.emailIsValid

	$http.get(api+'Doctor_Department/', {
		withCredentials : true
	})
	.then(function(response){
		console.log(response);
		$scope.depart = response.data
		console.log($scope.depart)
	})

	
	$scope.doctregister = function(){

		var doctdata = {
			username : $scope.username,
			first_name : $scope.firstname,
			last_name : $scope.lastname,
			email : $scope.email,
			doctor_fees : $scope.fees,
			password : $scope.password,
			phone_no : $scope.contact,
			department_id : $scope.department,
			qualification : $scope.qualification,
			morning_time : $scope.morningtime,
			evening_time : $scope.eveningtime
		}
		console.log(doctdata)

		if(pass === confo && validemail){


	$http.post(api+'DoctorRegistration/' , doctdata, {
		withCredentials : true
	})
	.then(function(response){
		console.log(response);
		$scope.departs = response.data;
		console.log($scope.departs);
		Swal.fire({
			icon: 'success',
			title: 'Congrats',
			text: 'You are Logged in..'
		  })
		  $state.go('LogIn')
	})
	.catch(function(error){
		console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
	})
	}
	else {
		Swal.fire({
			icon: 'error',
			title: 'Error...',
			text: 'Wrong Password..'
		  })
	 }
 }
})

app.controller('LogInController',function($scope,$http,$window,$state){

    // var arr = ["Srijan", "Keshav", "Saurabh", "Mayank", "Swapnil", "Sukriti", "Ananya", "Siddharth", "Amritansh"];

    // for(var i=0;i<arr.length;i++){
	// var count = 0;
	// var random = Math.floor(Math.random()*arr.length);
    // var name = console.log(random, arr[random]);
    //   for(var j=0;j<name;j++){
	// 	count++;
    //     count = arr[i]
	// 	if(count == )
    //      console.log( count)
    //     }
    // }

	 $scope.login = function(){

		var regdata = {
            email : $scope.email,
			password : $scope.password
		};
		console.log(regdata);
			
			$http.post(api+'login_view/', regdata, {
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response)
			console.log(response.data)

		    var msg = response.data.message
		    console.log(msg)
		
		    if(msg === 'Receptionist'){
		    	$state.go('ReceptionDashboard.Patient')
		    }
		    else if(msg === 'Doctor') 
            {
		        $state.go('DoctDashboard.Information');
		    }
		    else {
		    	$state.go('Dashboard.PatientInfo')
		    }
			Swal.fire({
				icon: 'success',
				title: 'Congrats...',
				text: 'Successfully signed in'
			  })
		  })
		  .catch(function(error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		  })
		}
	 } );

                                     //* Patient *//

	 app.controller('DashboardPatController',function($scope,$http,$window,$state){
		$scope.patients = [];
		$scope.panels = [];
	
		$http.get(api+'home_page/', {
			withCredentials: true
		})
		.then(function(response){
			 console.log(response);
			 $scope.panels = response.data
			 console.log($scope.panels)
		})
		.catch(function(error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong..'
			  })
		})

		$scope.logout = function(){
    
			$http.get(api+ 'logout_view/', {
				withCredentials: true
			})
			.then(function(response){
				console.log(response)
				Swal.fire({
					position: 'centre',
					icon: 'success',
					title: response.data.message,
					showConfirmButton: false,
					timer: 1500
				  })
				  $state.go('LogIn')
			})
			.catch(function(error){
				console.log(error)
			})
		}

	 });

	 app.controller('AppointmentController',function($scope,$http,$window,$state){
		$scope.patient = [];
		$scope.depart = [];
		$scope.slot = [];

		$http.get(api+'Doctor_Department/',{
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.depart = response.data
			console.log($scope.depart)
			$scope.categories = [];

			$scope.selectdepart = function(departs){
				var Data = {department : departs.id};
				console.log(departs.id)
                console.log(Data)

				$http.get(api + 'Doctor_details/', {params : Data},{
					withCredentials:true
				})
				.then(function(response){
					console.log(response)
					$scope.categories=response.data
					console.log($scope.categories)
					
					$scope.selectcat = function(category) {
                    var id = {doctor_id : category.Doctor}
					$http.get(api + 'doctor_slot/',{params : id,
						withCredentials:true
					})
					.then(function(response){
						console.log(response)
						$scope.slot = response.data;
						console.log($scope.slot)
					})
					.catch(function(error){
						console.log(error)
					})
					}
				})
				.catch(function(error	){
					console.log(error)
				})
			}
		})
		.catch(function(error){
			console.log(error)
		})

		
		$scope.appoint = function(){
			var apdata = {
				doctor_id : $scope.selectcategory,
				paymentStatus : $scope.paystatus,
				medical_history : $scope.history,
				appointment_date : $scope.appointment,
				appointment_slot : $scope.sloted
			 }
			 console.log(apdata)
			$http.post(api + 'patient/' , apdata, {
				withCredentials : true
			})
			.then(function(response){
				console.log(response)
				Swal.fire(
					'Congrats!',
					'Appointment Sent!',
					'success'
				  )
			})
			.catch(function(error){
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.data.message
				  })
			}
			)
		}
	 });

	 app.controller('PatientinfoController',function($scope,$http,$window,$state){
		$scope.info = [];
		$http.get(api+'patient_profile/' , {
			withCredentials : true
	})
		.then(function(response){
			console.log(response)
			$scope.info = response.data.Profile
			console.log($scope.info)
			
		})
		.catch(function(error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		}
		)
	 });


	app.controller('PatientRecoController',function($scope,$http,$window,$state){
		$scope.record = [];

		$http.get(api+'patient_previous_appointments/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.record = response.data;
			console.log($scope.record);
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})

		$scope.export = function () {
			const table = document.getElementById('recordtable');
			const doc = document.createElement('table');
			doc.innerHTML = table.outerHTML;

			const blob = new Blob(['\ufeff', doc.outerHTML], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

			const url = window.URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = 'Records.xlsx';
			document.body.appendChild(a);
			a.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		};
	})

	                                  //* RECEPTIONIST *//

	app.controller('RecepDashboardController',function($scope,$http,$window,$state){
        $scope.panel = [];

		$http.get(api+'home_page/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.panel = response.data;
			console.log($scope.panel)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})


		$scope.logout = function(){
    
		$http.get(api+ 'logout_view/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			Swal.fire({
				position: 'centre',
				icon: 'success',
				title: response.data.message,
				showConfirmButton: false,
				timer: 1500
			  })
			  $state.go('LogIn')
		})
		.catch(function(error){
			console.log(error)
		})
	}
	});

	app.controller('RecepRegisterController',function($scope,$http,$window,$state){
		$scope.registe=[];

		$http.get(api + 'receptionist_registered_users/',{
			withCredentials:true
		})
		.then(function(response){
			console.log(response)
			$scope.register = response.data;
			console.log($scope.register)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})


	});

    var dltid = {};
	app.controller('RecepAppointController',function($scope,$http,$window,$state){
		$scope.appoints= [];

		$http.get(api + 'receptionist/',{
			withCredentials:true
		})
		.then(function(response){
			console.log(response)
			$scope.appoints = response.data;
			console.log($scope.appoints)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})

		$scope.approved = function(appoint){
			var confirmed = {
				patient_id : appoint.Patient,
				rApproval : "1"
			}
             console.log(confirmed)
			$http.post(api + 'receptionist/', confirmed, {
				withCredentials	: true
			})
			.then(function(response){
				console.log(response)
				Swal.fire({
					icon: 'success',
					title: 'Done...',
					text: 'Appointment Approved'
				  })
				  $state.reload('ReceptionDashboard.Appoint')
			})
			.catch(function(error){
				console.log(error)
				Swal.fire({
					icon: 'error',
					title: 'Something Wrong...',
					text: error.data.message
				  })
			})
		}
		$scope.reject = function(appoint){
			dltid = appoint.Patient
		}
	});


	app.service('SharedDataService', function () {
		this.reasonInput = ""; 
	});

	app.controller('ModalAppointController', function ($scope, $http, $window, $state, SharedDataService) {
		$scope.reasonInput = ""; 
		$scope.reasonInput = SharedDataService.reasonInput;

		$scope.submit = function(appoint) {
		  var data = {
			patient_id: dltid,
			reason: $scope.reasonInput, 
			rApproval:"0"
		  };
	  console.log(data)
		  $http.post(api + 'receptionist/', data, {
			withCredentials : true
		  })
			.then(function (response) {
			  console.log(response);
			  Swal.fire({
				icon: 'success',
				title: 'Deleted...',
				text: 'Appointment Deleted'
			  });
			  $scope.reasonInput = "";
			})
			.catch(function (error) {
			  console.log(error);
			});

			SharedDataService.reasonInput = "";
		};
  });

  app.service('SharedData2Service', function () {
	this.date = "";
	this.time = "";
	this.reason = ""; 
});

  app.controller('Modal2Controller', function ($scope, $http, $window, $state, SharedData2Service) {
	$scope.reason = ""; 
	$scope.reason = SharedData2Service.reason;

	$scope.submit = function (appoint) {
	  var data = {
		appointment_id: edtid,
		new_appointmentDate: $scope.date, 
		new_time : $scope.time,
		reason : $scope.reason
	  };
  console.log(data)
	  $http.put(api + 'confirmappointment/', data, {
		withCredentials : true
	  })
		.then(function (response) {
		  console.log(response);
		  Swal.fire({
			icon: 'success',
			title: 'Edited...',
			text: response.data.message
		  });
		})
		.catch(function (error) {
		  console.log(error);
		});

		SharedData2Service.time = "";
		SharedData2Service.date = "";
	};
});

	app.controller('RecepDoctorController',function($scope,$http,$window,$state){
		$scope.doct = [];

		$http.get(api + 'receptionist_doctors/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.doct = response.data;
			console.log($scope.doct)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})

		$scope.exporttoexcel = function () {
			const table = document.getElementById('receprecord');
			const doc = document.createElement('table');
			doc.innerHTML = table.outerHTML;

			// Convert the HTML document to a blob
			const blob = new Blob(['\ufeff', doc.outerHTML], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

			// Create a URL for the blob
			const url = window.URL.createObjectURL(blob);

			// Create a download link and trigger the click event
			const a = document.createElement('a');
			a.href = url;
			a.download = 'Records.xlsx';
			document.body.appendChild(a);
			a.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		};

	});
   
	app.controller('RecepPatientController',function($scope,$http,$window,$state){
		$scope.pat = [];
		$scope.records=[];
		$scope.searchText = " ";

		$http.get(api + 'graph/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response.data)
			$scope.records = response.data
		})
		.catch(function(error){
			console.log(error)
		})

		$http.get(api + 'receptionist_patients/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.pat = response.data;
			console.log($scope.pat)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})

	});

	                              //*  DOCTOR  *//
	
	app.controller('DoctDashboardController',function($scope,$http,$window,$state){
		$scope.dashes = [];

		$http.get(api + 'home_page/',{
			withCredentials:true
		})
		.then(function(response){
			console.log(response)
			$scope.dashes = response.data;
			console.log($scope.dashes)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})

		$scope.logout = function(){
    
			$http.get(api+ 'logout_view/', {
				withCredentials: true
			})
			.then(function(response){
				console.log(response)
				Swal.fire({
					position: 'centre',
					icon: 'success',
					title: response.data.message,
					showConfirmButton: false,
					timer: 1500
				  })
				  $state.go('LogIn')
			})
			.catch(function(error){
				console.log(error)
			})
		}
		
	});

	app.controller('DoctInformationController',function($scope,$http,$window,$state){
		$scope.doct = [];

		$http.get(api+'doctor_profile/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.doct = response.data;
			console.log($scope.doct);
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})
	});

	app.controller('DoctPatientController',function($scope,$http,$window,$state){
		$scope.patient = [];

		$http.get(api + 'doctor_patients/',{
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.patient = response.data;
			console.log($scope.patient)
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})
	})


	var rejectid = {};
	var editid = {};

	app.controller('DoctAppointmentController',function($scope,$http,$window,$state){
		$scope.appoints = [];

		$http.get(api+'doctor/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.appoints=response.data;
			console.log($scope.appoints);
		})
		.catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.data.message
			  })
		})

		$scope.accept = function(appoint){
			var id = {
               approval_status : "1",
			   patient_id : appoint.Patient
			}
			console.log(id)
			$http.post(api+'doctor/',id, {
				withCredentials: true
			})
			.then(function(response){
				console.log(response)
				Swal.fire({
					icon: 'success',
					title: 'Confirmed...',
					text: response.data.message
				  })
				})
			.catch(function(error){
				console.log(error)
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.data.message
				  })
			})
		}

		$scope.reject = function(appoint){
			rejectid = appoint.Patient
		}

		$scope.edit = function(appoint){
			editid = appoint.Patient
		}
	});


	app.service('SharedDataService', function () {
		this.reason = ""; 
	});

	app.controller('ModalController', function ($scope, $http, $window, $state, SharedDataService) {
		$scope.reason= ""; 
		$scope.reason = SharedDataService.reason;

		$scope.submit = function() {
		  var data = {
			patient_id : rejectid,
			rejection_reason: $scope.reason,
			approval_status : 0 
		  };
	      console.log(data)
		  $http.post(api + 'doctor/', data, {
			withCredentials : true
		  })
			.then(function (response) {
			  console.log(response);
			  Swal.fire({
				icon: 'success',
				title: response.statusText,
				text: response.data.message
			  });
			  $scope.reason = "";
			})
			.catch(function (error) {
			  console.log(error);
			});

			SharedDataService.reason = "";
		};
  });




  app.service('SharedData2Service', function () {
	this.date = "";
	this.time = "";
	this.reason = ""; 
});

  app.controller('Modal2Controller', function ($scope, $http, $window, $state, SharedData2Service) {
	$scope.reason = ""; 
	$scope.reason = SharedData2Service.reason;
	
	$scope.submit = function (appoint) {
	  var data = {
		patient_id : editid,
		updatedDate: $scope.date, 
		updatedSlot : $scope.time,
		approval_status : '1',
		// rejection_reason : $scope.reason
	  };
  console.log(data)
	  $http.post(api + 'doctor/', data, {
		withCredentials : true
	  })
		.then(function (response) {
		  console.log(response);
		  Swal.fire({
			icon: 'success',
			title: response.statusText,
			text: response.data.message
		  });
		})
		.catch(function (error) {
		  console.log(error);
		});

		SharedData2Service.time = "";
		SharedData2Service.date = "";
	};
});

	var patid = {};

	app.controller('DoctApprovedAppointmentController', function ($scope, $http, $window, $state, SharedData3Service) {
		$scope.approved = [];

		$http.get(api + 'approved/', {
			withCredentials: true
		})
		.then(function (response) {
			console.log(response);
			$scope.approved = response.data
			console.log($scope.approved)
			$scope.prescribed = function(appoint){
				console.log(appoint.Patient)
				patid = appoint.Patient
			}
		
	})


		.catch(function (error) {
			console.log(error);
		  });



	})
    var diago = {}

	app.service('SharedData3Service', function () {
		this.diagnosis = "";
	});

	app.controller('ModalPrescController', function ($scope, $http, $window, $state, SharedData3Service) {
		
			$scope.contacts = [];
			$scope.medicine = "";
			$scope.dosage = "";
            $scope.instruction = "";

		  $scope.add = function(){
			$scope.contacts.push({ 
				medicine: $scope.medicine,
				dosage: $scope.dosage,
				timing: $scope.instruction
			});
			$scope.medicine = "";
			$scope.dosage = "";
		 };

		$scope.removeContactField = function(index){ 
			$scope.contacts.splice(index, 1);
		};

		$scope.diagnosis = ""; 
		$scope.diagnosis = SharedData3Service.diagnosis;

		$scope.submit = function () {
			var data = {
				patient_id : patid,
				diagnosis: $scope.diagnosis,
				prescriptions : $scope.contacts
			}
		console.log(data)
		 $http.post(api + 'prescription/', data, {
			withCredentials: true
		 })
		 .then(function(response){
			console.log(response)
			$scope.press = response.data
			console.log($scope.press)
			Swal.fire({
				icon: 'success',
				title: 'Done...',
				text: response.data.message
			  })
		 })
		 .catch(function(error){
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'cancel...',
				text: error.data.message
			  })
			})
		}
	
		
	});

                                   //* PRESCRIPTIONS

app.controller('PrescriptionController', function ($scope, $http, $window, $state) {
    $scope.presc = [];

	$http.get(api + 'all_prescriptions/', {
		withCredentials : true
	})
	.then(function (response) {
		console.log(response.data)
		$scope.presc = response.data
	})
	.catch(function(error){
		console.log(error)
	})

	$scope.download = function() {
		const printContent = document.getElementById("pdf");
            const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
            WindowPrt.document.write(printContent.innerHTML);
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            WindowPrt.close();
	}
})

app.controller('PaymentController', function ($scope, $http, $sce, $window, $state) {
    $scope.amount = [];

	$http.get(api + 'payment_history/', {
		withCredentials: true
	})
	.then(function(response){
		console.log(response.data)
		$scope.amount = response.data
		var ids = response.data

		$scope.view = function(patient){
			var data = {payement_id : patient.id}
			console.log(data)
	$http.post(api + 'payment_history/',data ,{
		headers: {'Content-Type': undefined},
		withCredentials : true
	})
	.then(function (response) {
		console.log(response.data);

		// $scope.view = function(){
				$scope.paymentpage = $sce.trustAsHtml(response.data);
		// }
	})
	.catch(function (error) {
		console.log(error)
	})
  }
})
.catch(function(error) {
	console.log(error)
})

	$scope.downloadpdf = function() {
		const printContent = document.getElementById("paymentrecord");
            const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
            WindowPrt.document.write(printContent.innerHTML);
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            WindowPrt.close();
	}
})
		  	

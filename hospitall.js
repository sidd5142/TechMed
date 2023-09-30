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

});

app.controller('RegistrationController',function($scope,$http,$window,$state){
	$scope.Registrationfrom = function(){
        console.log('FirstName :', $scope.firstname)
		console.log('LstName :', $scope.lastname)
		console.log('Username : '	, $scope.username)
		console.log('Email:', $scope.email)
		console.log('Pass :', $scope.password)
		console.log('ConfPass :', $scope.confpassword)
		console.log('Contact :', $scope.contact)
		console.log('Age :', $scope.age)
		console.log('Address :', $scope.address)
		console.log('Gender :', $scope.gender)
	}

	$scope.validatePassword = function(){
		$scope.passwordMismatch = $scope.password !== $scope.confpassword;
	  }

	 $scope.register = function(){
		var pass = $scope.password;
		var confpass = $scope.confpassword;

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

		// if(pass == confpass){
			
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
			$state.go('login');
		  })
		  .catch(function(error){
			// $window.alert(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong..'
			  })
		  })
		}
		// else{
		// 	// $window.alert('Incorrect Password');
		// 	Swal.fire({
		// 		icon: 'error',
		// 		title: 'Oops...',
		// 		text: 'Incorrect Password '
		// 	  })
		// }

	 
});

app.controller('LogInController',function($scope,$http,$window,$state){

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
		    	$state.go('ReceptionDashboard')
		    }
		    else if(msg === 'Doctor') 
            {
		        $state.go('DoctDashboard');
		    }
		    else {
		    	$state.go('Dashboard')
		    }
			Swal.fire({
				icon: 'success',
				title: 'Congrats...',
				text: 'Successfully signed in'
			  })
		  })
		  .catch(function(error){
			// $window.alert(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong..'
			  })
		  })
		}
	 } );

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
			//  console.log($scope.patient[0].first_name)
	
		})
		.catch(function(error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong..'
			  })
		})
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
				// amount : $scope.amount,
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
					text: 'Something went wrong..'
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
				text: 'Something went wrong..'
			  })
		}
		)
	 });

	 app.controller('DoctRegistrationController',function($scope,$http,$window,$state){
		$scope.depart = [];
		$scope.departs = [];

		$scope.validatePassword = function(){
			$scope.passwordMismatch = $scope.password !== $scope.confpass;
		  }

		  var pass = $scope.password;
		  var confo = $scope.confpass;

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

			if(pass === confo){


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
					text: 'Something went wrong..'
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


	app.controller('PatientRecoController',function($scope,$http,$window,$state){
		$scope.record = [];

		$http.get(api+'patient/', {
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
				text: 'Something went wrong..'
			  })
		})

		$scope.export = function () {
			const table = document.getElementById('recordtable');
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
	})


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
				text: 'Something went wrong..'
			  })
		})
	});

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
				text: 'Something went wrong..'
			  })
		})
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
				text: 'Something went wrong..'
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
				text: 'Something went wrong..'
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
					text: "Error"
				  })
			})
		}
		$scope.reject = function(appoint){
			dltid = appoint.Patient
		}
	});


	app.service('SharedDataService', function () {
		this.reasonInput = ""; // Initialize the shared variable
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
	this.reason = ""; // Initialize the shared variable
});

  app.controller('Modal2Controller', function ($scope, $http, $window, $state, SharedData2Service) {
	$scope.reason = ""; 
	$scope.reason = SharedData2Service.reason;
	// $scope.date = SharedData2Service.reason
	// $scope.time = SharedData2Service.reason

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
				text: 'Something went wrong..'
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

		$scope.searchText = " ";

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
				text: 'Something went wrong..'
			  })
		})

	});
	
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
				text: 'Something went wrong..'
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
				text: 'Something went wrong..'
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
				text: 'Something went wrong..'
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
					text: 'Something went wrong..'
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
		this.reason = ""; // Initialize the shared variable
	});

	app.controller('ModalController', function ($scope, $http, $window, $state, SharedDataService) {
		$scope.reason= ""; 
		$scope.reason = SharedDataService.reason;

		$scope.submit = function (appoint) {
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
	this.reason = ""; // Initialize the shared variable
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
		// this.diagnosis = SharedDataService.diagnosis;
		// diago = $scope.diagnosis
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
				text: 'Something went wrong'
			  })
			})
		}
	
		
	});



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
	$http.post(api + 'payment_history/', {payement_id : 12},{
		headers: {'Content-Type': undefined},
		withCredentials : true
	})
	.then(function (response) {
		console.log(response.data);

		$scope.view = function(){
				$scope.paymentpage = $sce.trustAsHtml(response.data);
		}
	})
	.catch(function (error) {
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
		  
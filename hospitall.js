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
		.state('DoctDashboard.DoctInformation', {
            url: '/doctinformation',
			templateUrl: 'doctorinfo.html',
			controller: 'DoctInformationController'
		})
		.state('DoctDashboard.DoctAppointment', {
            url: '/doctappointment',
			templateUrl: 'doctappoint.html',
			controller: 'DoctAppointmentController'
		})

		$urlRouterProvider.otherwise('/login');
}]);

var api = 'https://10.21.85.13:8000/api/'

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
			$state.go('DoctInformation');
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
			// headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response)
			Swal.fire({
				icon: 'success',
				title: 'Congrats...',
				text: 'Successfully signed in'
			  })
			$state.go('DoctDashboard');
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
	
		$http.get(api+'home_page	/', {
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
				amount : $scope.amount,
				doctor_id : $scope.selectcat,
				paymentStatus : $scope.paystatus,
				medical_history : $scope.history,
				appointment_date : $scope.appointment,
				appointment_slot : $scope.slot
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
				password : $scope.password,
				phone_no : $scope.contact,
				department : $scope.department,
				qualification : $scope.qualification,
				morning_time : $scope.morningtime,
				evening_time : $scope.eveningtime
			}
			console.log(doctdata)

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
		})
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
		})
	});


	app.controller('DoctDashboardController',function($scope,$http,$window,$state){
	});

	app.controller('DoctAppointmentController',function($scope,$http,$window,$state){
		$scope.appoint = [];

		$http.get(api+'doctor/', {
			withCredentials: true
		})
		.then(function(response){
			console.log(response)
			$scope.appoint=response.data;
			console.log($scope.appoint);
		})
		.catch(function(error){
			console.log(error)
		})
	});


	
		  
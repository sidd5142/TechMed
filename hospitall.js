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
			templateUrl: 'new1.html',
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
            url: '/patinetinfo',
			templateUrl: 'patientinfo.html',
			controller: 'PatientinfoController'
		})
		.state('DoctRegister', {
            url: '/doctregister',
			templateUrl: 'doctreg.html',
			controller: 'DoctRegistrationController'
		})
		.state('DoctInformation', {
            url: '/doctinformation',
			templateUrl: 'doctorinfo.html',
			controller: 'DoctInformationController'
		})
		.state('DoctAppointment', {
            url: '/doctregister',
			templateUrl: 'doctregist.html',
			controller: 'DoctRegistrationController'
		})

		$urlRouterProvider.otherwise('/doctregister');
}]);

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

		if(pass == confpass){
			
			$http.post('https://10.21.84.51:8000/api/PatientRegisteration/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			Swal.fire({
				icon: 'success',
				title: 'Congrats..',
				text: 'Successfully registered'
			  })
			$state.go('LogIn');
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
		else{
			// $window.alert('Incorrect Password');
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Incorrect Password '
			  })
		}

	 } 
});

app.controller('LogInController',function($scope,$http,$window,$state){

	 $scope.signin = function(){

		var regdata = {
            email : $scope.email,
			password : $scope.password
		};
		console.log(regdata);
			
			$http.post('https://10.21.84.51:8000/api/login_view/', regdata, {
			// headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			Swal.fire({
				icon: 'success',
				title: 'Congrats...',
				text: 'Successfully signed in'
			  })
			$state.go('Dashboard');
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
		$scope.patient = [];
	
		// $http.get('https://10.21.84.51:8000/api/getpatient/', {
		// 	withCredentials: true
		// })
		// .then(function(response){
		// 	 console.log(response);
		// 	 $scope.patient = response.data
		// 	 console.log($scope.patient)
		// 	//  console.log($scope.patient[0].first_name)
	
		// })
		// .catch(function(error){
		// 	Swal.fire({
		// 		icon: 'error',
		// 		title: 'Oops...',
		// 		text: 'Something went wrong..'
		// 	  })
		// })
	 });

	 app.controller('AppointmentController',function($scope,$http,$window,$state){
		$scope.patient = [];

		$scope.appoint = function(){
			$http.post('https://10.21.84.51:8000/api/' , {
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
		$http.post('https://10.21.84.51:8000/api/' , {
			withCredentials : true
		})
		$http.get('https://10.21.84.51:8000/api/patientinfo' , {
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
	 });

	 app.controller('DoctRegistrationController',function($scope,$http,$window,$state){

		// $scope.depart = [];
		// $scope.departs = [];

		$http.get('https://10.21.84.51:8000/api/Doctor_Department/' , {
			withCredentials : true
		})
		.then(function(response){
			console.log(response);
			$scope.departs = response.data;
			console.log($scope.departs);
			$scope.department = "";
		})
		.catch(function(error){
			console.log(error)
		})
	 })
		  
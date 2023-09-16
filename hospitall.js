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
			templateUrl: 'register.html',
			controller: 'RegistrationController'
		})
		.state('LogIn', {
            url: '/login',
			templateUrl: 'new1.html',
			controller: 'LogInController'
		})
		.state('PatienceDash', {
            url: '/dashboard',
			templateUrl: 'dashboard.html',
			controller: 'DashboardPatController'
		})


		$urlRouterProvider.otherwise('/register');
}]);

app.controller('HomeController',function($scope,$http,$window,$state){

});

app.controller('RegistrationController',function($scope,$http,$window,$state){
	$scope.Registrationfrom = function(){
        console.log('FirstName :', $scope.firstname)
		console.log('LstName :', $scope.lastname)
		console.log('Username : ', $scope.username)
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
			
			$http.post('https://10.21.80.133:8000/api/PatientRegisteration/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			$state.go('LogIn');
		  })
		  .catch(function(error){
			$window.alert(error);
		  })
		}
		else{
			$window.alert('Incorrect Password');
			LoadingService.stopLoading();
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
			
			$http.post('https://10.21.83.100:8000/api/login_view/', regdata, {
			headers: {'Content-Type': undefined},
		    withCredentials: true
		})
          .then(function(response){
            
            console.log(response.data)
			$state.go('PatienceDash');
		  })
		  .catch(function(error){
			$window.alert(error);
		  })
		}
	 } );

	 app.controller('DashboardPatController',function($scope,$http,$window,$state){

	 });
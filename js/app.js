var app = angular.module('app', ['ngMaterial', 'ngResource', 'ngRoute']);

app.config(function($mdThemingProvider, $routeProvider, $locationProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('green');
	//.dark();

	//$locationProvider.html5Mode(true);
	
	//TODO: Pass a parameter for each subject and each unit
	// '/:subject/:unit/:module'

	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.tmpl.html'
	})
	.when('/module-selection/', {
		//templateUrl: 'partials/module-selection.tmpl.html'
		templateUrl: 'partials/flashcard.tmpl.html',
		controller: 'FlashcardController as flashcardController'
	});

	
});

app.factory('SubjectService', function($resource) {
	return { subjects: [
		{
		  name: "Chemistry",
		  id: 0,
		  units: [
			{
			  name: "Unit 4",
			  description: "Rings, Polymers and Analysis",
			  id: 0,
			  modules: [
				{
				  name: "Module 1",
				  description: "Rings, Acids and Amines",
				  id: 0
				},
				{
				  name: "Module 2",
				  description: "Polymers and Synthesis",
				  id: 1
				},
				{
				  name: "Module 3",
				  description: "Analysis",
				  id: 2
				}
			  ]
			},
			{
			  name: "Unit 5",
			  description: "Equilibria, Energetics and Elements",
			  id: 1,
			  modules: [
				{
				  name: "Module 1",
				  description: "Rates, Equilibrium and pH",
				  id: 0
				},
				{
				  name: "Module 2",
				  description: "Energy",
				  id: 1
				},
				{
				  name: "Module 3",
				  description: "Transition Elements",
				  id: 2
				}
			  ]
			}
		  ]
		},
		{
		  name: "Mathematics",
		  id: 1,
		  units: [
			{
			  name: "Core 3",
			  id: 0
			},
			{
			  name: "Core 4",
			  id: 1
			}
		  ]
		},
		{
		  name: "Computer Science",
		  id: 2,
		  units: [
			{
			  name: "COMP 3",
			  id: 0
			},
			{
			  name: "COMP 4",
			  id: 1
			}
		  ]
		},
		{
		  name: "Physics",
		  id: 3,
		  units: [
			{
			  name: "Unit 3",
			  id: 0
			},
			{
			  name: "Unit 4",
			  id: 1
			}
		  ]
		}
	  ] 
	} 
});


app.factory('FlashcardService', function($resource) {
	return $resource("unit/4/module/1/:id.json")
});


app.controller('AppController', function($scope, $mdSidenav, $mdMedia, SubjectService) {
	
	/* Sidenav related functions */
	
	$scope.toggleSidenav = function() {
		$mdSidenav("leftSidenav").toggle();
	};
	
	$scope.isSidenavLockedOpen = function() {
		return $mdSidenav("leftSidenav").isLockedOpen();
	}
	


	$scope.subjects = SubjectService.subjects;
	
	$scope.selectedSubject = null;
	$scope.selectedUnit = null;

	$scope.toggleSubjectSelection = function(subject) {
		if ($scope.selectedSubject == subject) {
			$scope.selectedSubject = null;
		} else {
			$scope.selectedSubject = subject
			$scope.selectedUnit = null;
		}
	}
	
	$scope.isSubjectSelected = function(subject) {
		return $scope.selectedSubject == subject;
	}

	$scope.selectUnit = function(unit) {
		$scope.selectedUnit = unit;
		console.log("New unit selected: " + $scope.selectedUnit)
		// If the sidenav isn't locked open, toggle it closed again
		if (!$scope.isSidenavLockedOpen()) {
			$scope.toggleSidenav();
		}
	}

	$scope.isUnitSelected = function(unit) {
		return $scope.selectedUnit == unit;
	}

	// Concatenate a unit's name and description
	$scope.getUnitTitle = function(unit) {
		return unit.name + ": " + unit.description;
	}

	$scope.getHeader = function() {
		if (!$scope.selectedSubject) {
			return 'Welcome';
		}

		if (!$scope.selectedUnit) {
			return $scope.selectedSubject.name;
		}

		var header = $scope.selectedSubject.name + " > " + $scope.getUnitTitle($scope.selectedUnit);
		return header;
	}
});


app.controller('FlashcardController', function(FlashcardService) {
	this.flashcardIndex = 1;

	this.refresh = function() {
		this.flashcard = FlashcardService.get({ id: this.flashcardIndex });
	}

	//this.flashcard = FlashcardService.get({ id: this.flashcardIndex });
	this.refresh();

	this.nextFlashcard = function() {
		this.flashcardIndex++;
		this.refresh();
	}

	this.previousFlashcard = function() {
		this.flashcardIndex--;
		this.refresh();
	}




	console.log(this.flashcard);
});


// Add menu / sidenav controller

/*
app.controller('SidenavController', function($mdSidenav, $mdMedia) {
	
	// Aliases
	this.sidenav = $mdSidenav('leftSidenav');
	
	this.isLockedOpen = function() {
		return this.sidenav.isLockedOpen();
	}
	
	this.shouldLockOpen = function() {
		return $mdMedia('gt-sm');
	};
	
	this.toggle = function() {
		this.sidenav.toggle();
	};
	
	this.close = function() {
		this.sidenav.close();
	};
	



	
	this.selectSubject = function(subject) {
		this.selectedSubject = subject;
		console.log("New subject selected: " + this.selectedSubject);
		// Check if the sidenav is locked open
		if (!this.isSidenavLockedOpen()) {
			this.toggleSidenav();
		}
	};
	
	
});*/

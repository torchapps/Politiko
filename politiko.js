var app = angular.module('politiko', ['ui', 'ui.bootstrap']);

app.controller('Politiko', function($scope){

	////////////////// PARSE INPUT ///////////////////

	$scope.issues = issues;
	$scope.cands = cands;
	$scope.stances = ['for', 'against', 'noStand', 'NA'];

	$scope.curIssue = $scope.issues[0];

	/////////////////// END OF PARSING //////////////////////////

	$scope.view = 'quiz';

	$scope.setView = function(view) {
		$scope.view = view;
	}

	$scope.setCurIssue = function(issue){
		$scope.curIssue = issue;
	}

	$scope.nextIssue = function(){
		$scope.curIssue = $scope.issues[Math.min(issues.indexOf($scope.curIssue) + 1, $scope.issues.length - 1)];
	}

	$scope.score = function(cand){
		return $scope.breakdown(cand).map(function(x){ return $scope.absWeight(x); }).reduce(function(x, y){ return x + y; }, 0);
	}

	$scope.candOrder = function(cand){
		return [99 - $scope.score(cand), cand];
	}

	$scope.absWeight = function(issue){
		return Math.abs(issue.weight);
	}

	$scope.getMyStance = function(issue){
		var w = parseInt(issue.weight);
		if(w > 0) return 'for';
		if(w < 0) return 'against';
	}

	$scope.breakdown = function(cand){
		var r = [];
		for(var i in $scope.issues){
			var issue = $scope.issues[i];
			var myStance = $scope.getMyStance(issue);
			if(!issue[myStance]) continue;
			if(issue[myStance].indexOf($scope.candId(cand)) != -1){
				r.push(issue);
			}
		}
		return r;
	}

	$scope.candId = function(cand){
		return $scope.cands.indexOf(cand);
	}

	$scope.getStance = function(cand, issue){
		for(var i in $scope.stances){
			var stance = $scope.stances[i];
			if(issue[stance].indexOf($scope.candId(cand)) != -1){
				return stance;
			}
		}
	}

	$scope.setCand = function(cand){
		$scope.curCand = cand;
	}

});
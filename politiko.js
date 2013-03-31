var app = angular.module('politiko', ['ui', 'ui.bootstrap']);

app.controller('Politiko', function($scope){

	////////////////// PARSE INPUT ///////////////////

	$scope.issues = [];
	for(var i in issues){
		issues[i].weight = null;
		$scope.issues.push(issues[i]);
	}

	$scope.cands = [];
	for(var i in cands){
		$scope.cands.push({
			name: cands[i],
			breakdown: [],
			score: 0
		});
	}

	$scope.offset = $scope.issues.length * 2 + 10; // used for offsetting negative values when sorting candidates

	$scope.stances = ['for', 'against', 'noStand', 'NA'];
	$scope.isCollapsed = true;
	$scope.curIssue = $scope.issues[0];

	/////////////////// END OF PARSING //////////////////////////

	$scope.view = 'quiz';
	$scope.includeDeductions = {value: true};

	$scope.setView = function(view) {
		$scope.view = view;
	}

	$scope.setCurIssue = function(issue){
		$scope.curIssue = issue;
	}

	$scope.candOrder = function(cand){
		return [$scope.offset - cand.score, cand.name];
	}

	$scope.update = function(){

		$('div#question').fadeOut(200, function(){
			$scope.$apply(function(){

				for(var i in $scope.cands){

					var cand = $scope.cands[i];
					cand.breakdown = [];
					var score = 0;
					for(var i in $scope.issues){
						var issue = $scope.issues[i];
						var myStance = issue.weight ? issue.weight : 0;
						var candStance = $scope.stanceMap[$scope.getStance(cand, issue)];
						var weight = myStance * candStance;

						var pushCondition = null;
						if($scope.includeDeductions.value){
							pushCondition = !!weight;
						} else {
							pushCondition = (weight > 0);
						}

						if(pushCondition){
							cand.breakdown.push({name: issue.name, weight: weight});
							score += weight;
						}

					}

					cand.score = score;

				}

				$scope.curIssue = $scope.issues[Math.min(issues.indexOf($scope.curIssue) + 1, $scope.issues.length - 1)];

				$('div#question').fadeIn(300);

			});
		});

	}

	$scope.stanceMap = {
		for: 1,
		noStand: 0,
		against: -1
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

	$scope.getIcon = function(weight){
		var result;
		switch(weight) {
			case "-2":
			case "-1":
				result = "icon-minus";
				break;
			case "0":
				result = "icon-question-sign";
				break;
			case "1":
			case "2":
				result = "icon-plus";
				break;
			default:
				result = "";
		}
		return result;
	}

});
var app = angular.module('politiko', []);

app.controller('Politiko', function($scope){

	////////////////// PARSE INPUT ///////////////////

	var lines = "Total Gun Ban\n\nDavid\nDelos Reyes\nHontiveros\nLegarda\nLlasos\nMagsaysay J\nPimentel\n\nAlcantara\nAquino\nBelgica\nBinay\nCasino\nCojuangco\nEnrile\nEscudero\nFalcone\nGordon\nHonasan\nMaceda\nMagsaysay M\nMontano\nPenson\nSeneres\nTrillanes\nVillanueva\nVillar\n\nAngara\nEstrada\nHagedorn\nPoe\nZubiri\n\nCayetano\nMadrigal\n\n7\n19\n5\n2\n\nSame-Sex Marriage\n\nEnrile\n\nAlcantara\nAquino\nBelgica\nBinay\nDavid\nDelos Reyes\nEstrada\nEscudero\nFalcone\nGordon\nHagedorn\nLlasos\nMaceda\nMadrigal\nMagsaysay J\nMagsaysay M\nMontano\nPenson\nPimentel\nSeneres\nTrillanes\nVillanueva\nVillar\nZubiri\n\nAngara\nCasino\nCojuangco\nHonasan\nHontiveros\nLegarda\nPoe\n\nCayetano\n\n1\n24\n7\n1\n\nDeath Penalty\n\nCojuangco\nFalcone\nHagedorn\nMaceda\nMagsaysay J\nVillanueva\n\nAlcantara\nAngara\nAquino\nBelgica\nBinay\nCasino\nCayetano\nDavid\nDelos Reyes\nEnrile\nEscudero\nGordon\nHonasan\nHontiveros\nLlasos\nMagsaysay M\nMontano\nPenson\nPimentel\nPoe\nTrillanes\nVillar\nZubiri\n\nEstrada\nLegarda\nSeneres\n\nMadrigal\n\n6\n23\n3\n1\n\nDivorce\n\nEnrile\nGordon\nHagedorn\nHontiveros\nPenson\n\nAlcantara\nAngara\nAquino\nBelgica\nBinay\nCayetano\nCojuangco\nDavid\nDelos Reyes\nEscudero\nFalcone\nHonasan\nLegarda\nLlasos\nMaceda\nMadrigal\nMagsaysay J\nMagsaysay M\nMontano\nSeneres\nTrillanes\nVillanueva\nVillar\nZubiri\n\nCasino\nEstrada\nPimentel\nPoe\n\n\n5\n24\n4\n0\n\nAnti-Political Dynasty\n\nAlcantara\nAngara\nAquino\nDavid\nDelos Reyes\nEnrile\nFalcone\nHontiveros\nLlasos\nMaceda\nMadrigal\nMagsaysay J\nMontano\nPenson\nPimentel\nSeneres\nVillanueva\nZubiri\n\nBelgica\nBinay\nCasino\nCayetano\nCojuangco\nEscudero\nGordon\nHonasan\n\nEstrada\nHagedorn\nLegarda\nMagsaysay M\nPoe\nTrillanes\nVillar\n\n\n18\n8\n7\n0\n\nFreedom of Information\n\nAlcantara\nAngara\nAquino\nBelgica\nBinay\nCasino\nCayetano\nCojuangco\nDavid\nDelos Reyes\nEstrada\nEnrile\nEscudero\nFalcone\nGordon\nHagedorn\nHonasan\nHontiveros\nLegarda\nLlasos\nMaceda\nMagsaysay J\nMagsaysay M\nMontano\nPenson\nPimentel\nPoe\nSeneres\nTrillanes\nVillanueva\nVillar\nZubiri\n\n\n\nMadrigal\n\n32\n0\n0\n1\n\nCybercrime\n\nAngara\nAquino\nBinay\nDavid\nEstrada\nEnrile\nEscudero\nHagedorn\nHonasan\nMagsaysay J\nMagsaysay M\nMontano\nPimentel\nTrillanes\nVillanueva\nVillar\nZubiri\n\nAlcantara\nBelgica\nCasino\nCayetano\nDelos Reyes\nFalcone\nGordon\nHontiveros\nLegarda\nLlasos\nMaceda\nPenson\nSeneres\n\nCojuangco\nPoe\n\nMadrigal\n\n17\n13\n2\n1\n\nSin Tax\n\nAlcantara\nAngara\nAquino\nBinay\nCayetano\nCojuangco\nDavid\nDelos Reyes\nEnrile\nFalcone\nGordon\nHagedorn\nHontiveros\nLegarda\nLlasos\nMadrigal\nMagsaysay J\nMontano\nPenson\nPimentel\nPoe\nTrillanes\nVillanueva\nVillar\nZubiri\n\nBelgica\nCasino\nEstrada\nEscudero\nHonasan\nMaceda\nMagsaysay M\nSeneres\n\n\n\n25\n8\n0\n0\n\nReproductive Health\n\nAngara\nAquino\nCasino\nCayetano\nEnrile\nEscudero\nHagedorn\nHontiveros\nLegarda\nMaceda\nMadrigal\nMagsaysay J\nMontano\nPenson\nPoe\nVillanueva\n\nAlcantara\nBelgica\nBinay\nCojuangco\nDavid\nDelos Reyes\nEstrada\nFalcone\nGordon\nHonasan\nLlasos\nMagsaysay M\nPimentel\nSeneres\nTrillanes\nVillar\nZubiri\n\n\n\n16\n17\n0\n0\n".split("\n");

	var states = ['issue', 'for', 'against', 'noStand', 'NA', 'for count', 'against count', 'noStand count', 'NA count', 'done'];
	var state = 0;

	$scope.issues = [];
	$scope.cands = [];

	currentIssue = {weight: 1};

	for(var i in lines){
		
		var line = lines[i];
		var stateString = states[state];

		console.log(stateString + "\t" + line);

		if(state < 5){
			if(!currentIssue[stateString]){
				currentIssue[stateString] = [];
			}
		}

		if(!line.length){
			if(stateString == 'done'){
				$scope.issues.push(currentIssue);
				currentIssue = {weight: 1};
			}

			state = (state+1) % states.length;
			continue;
		}

		if(stateString == 'issue'){
			currentIssue.name = line;
			continue;
		}

		if(state < 5){
			currentIssue[stateString].push(line);
			if($scope.cands.indexOf(line) == -1) $scope.cands.push(line);
			continue;
		}

		var tar = currentIssue[states[state-4]];
		var len = tar ? tar.length : 0;
		if(len != parseInt(line)){
			console.error("checksum failure: " + currentIssue[states[state-4]].length + " != " + line + " " + stateString + " " + currentIssue.name)
			break;
		}

		state = (state+1) % states.length;

	}

	if($scope.cands.length != 33){
		console.error("counted " + $scope.cands.length + " candidates");
	}

	/////////////////// END OF PARSING //////////////////////////

	$scope.view = 'table';
	$scope.advanced = false;

	$scope.score = function(cand){
		return $scope.breakdown(cand).map(function(x){ return parseFloat(x.weight); }).reduce(function(x, y){ return x + y; }, 0);
	}

	$scope.breakdown = function(cand){
		var r = [];
		for(var i in $scope.issues){
			var issue = $scope.issues[i];
			if(!issue.stance || issue.stance == 'dc') continue;
			if(issue[issue.stance].indexOf(cand) != -1){
				r.push(issue);
			}
		}
		return r;
	}

	$scope.getStance = function(cand, issue){
		var stances = states.slice(1, 5);
		for(var i in stances){
			var stance = stances[i];
			if(issue[stance].indexOf(cand) != -1){
				return stance;
			}
		}
	}

});
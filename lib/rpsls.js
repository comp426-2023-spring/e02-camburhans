// copying code from previous

export function rps(shot) {
	const choice_number = Math.floor(Math.random() * 3); 
	var opponent;
	switch (choice_number) {
			case 0:
				opponent = "rock";
				break;
			case 1:
				opponent = "paper";
				break;
			default:
				opponent = "scissors";
				break;
	}
	if (shot === undefined) { return {player: opponent} }

	var result;
	shot = shot.toLowerCase();
	switch (shot) {
		case "rock":
			switch (opponent) {
				case "rock":
					result = "tie";
					break;
				case "paper":
					result = "lose";
					break;
				default:
					result = "win";
					break;
			}
			break;
		case "paper":
			switch (opponent) {
				case "rock":
					result = "win";
					break;
				case "paper":
					result = "tie";
					break;
				default:
					result = "lose";
					break;
			}
			break;
		case "scissors":
			switch (opponent) {
				case "rock":
					result = "lose";
					break;
				case "paper":
					result = "win";
					break;
				default:
					result = "tie";
					break;
			}
			break;
		default:
			return;
	}
	return {
		player: shot,
		opponent: opponent,
		result: result
	}
}
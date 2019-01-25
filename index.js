const ORES = ['stone','iron','silicon','nickel','cobalt','silver','gold','magnesium','uranium','platinum'];

// input kg/hr
const ORE_RATE = {
	'stone': 46800,
	'iron': 93600,
	'silicon': 7800,
	'nickel': 2340,
	'cobalt': 1170,
	'silver': 4680,
	'gold': 11700,
	'magnesium': 4680,
	'uranium': 1170,
	'platinum': 1170
};

// efficiency = output mass/input mass
const ORE_EFFICIENCY = {
	'stone': 0.72,
	'iron': 0.56,
	'silicon': 0.56,
	'nickel': 0.32,
	'cobalt': 0.24,
	'silver': 0.08,
	'gold': 0.008,
	'magnesium': 0.0056,
	'uranium': 0.0056,
	'platinum': 0.004
};

function formatPower(pow) {
	if (pow >= 1e4) {
		return (pow / 1000).toFixed(2) + ' MW';
	} else if (pow >= 1) {
		return pow.toFixed(2) + ' kW';
	} else {
		return (pow * 1000).toFixed(2) + ' W';
	}
}

class Ore {
	constructor(type = 'stone', amount = 0) {
		if (!ORES.includes(type)) {
			throw new Error('Invalid ore: ' + ore);
		}
		if (amount < 0) {
			throw new Error('Invalid ore amount: ' + amount);
		}
		this.type = type;
		this.amount = amount;
	}
	get rate() {
		return ORE_RATE[this.type];
	}
	get efficiency() {
		return ORE_EFFICIENCY[this.type];
	}
	toString() {
		return this.type + ' (' + this.amount.toFixed(2) + 'kg)';
	}
	displayInfo() {
		console.log(this.toString());
		console.log('  Rate: %d kg/hour', this.rate.toFixed(2));
		console.log('  Yield: %d%', (this.efficiency * 100).toFixed(2));
	}
}

class Refinery {
	constructor(options = {}) {
		this.baseEfficiency = options.baseEfficiency || 0.8;
		this.baseSpeed      = options.baseSpeed || 1.0;
		this.basePower      = options.basePower || 560; // kW

		// from 0 to 8
		this.mods = options.mods = options.mods || {
			yield: 0,
			speed: 0,
			power: 0
		};
	}
	toString() {
		return 'Refinery (' + this.mods.yield + 'Y ' + this.mods.speed + 'S ' + this.mods.power + 'P)';
	}
	get efficiency() {
		return this.baseEfficiency * Math.pow(1.0905077, this.mods.yield);
	}
	get speed() {
		return this.baseSpeed + 0.5 * this.mods.speed;
	}
	get powerEffiency() {
		return Math.pow(1.2228445, this.mods.power);
	}
	get powerConsumptionRaw() {
		return this.basePower * this.speed;
	}
	get powerConsumption() {
		return this.powerConsumptionRaw / this.powerEffiency;
	}
	process(ore) {
		let hours  = ore.amount / (ore.rate * this.speed);
		let output = ore.amount * ore.efficiency * this.efficiency;
		let power  = this.powerConsumption * hours;
		
		console.log('Input: %s', ore.toString());
		console.log('Output: %d kg in %d hours', output.toFixed(2), hours.toFixed(1));
		console.log('Power Consumption: %sh', formatPower(power));
		
		return output;
	}
	displayInfo() {
		console.log(this.toString());
		console.log('  Efficiency: %d%', ~~(this.efficiency * 100));
		console.log('  Speed: %d%', ~~(this.speed * 100));
		console.log('  Power Usage: %s', formatPower(this.powerConsumption));
	}
}

module.exports = {
	Refinery,
	Ore
};

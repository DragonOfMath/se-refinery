const {Refinery,Ore} = require('se-refinery');

let refinery = new Refinery({
	baseEfficiency: 1.0,
	mods: {
		yield: 4,
		speed: 2,
		power: 2
	}
});
refinery.displayInfo();

let ore = new Ore('platinum', 200000);
ore.displayInfo();

refinery.process(ore);


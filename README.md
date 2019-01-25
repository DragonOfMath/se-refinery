# se-refinery

Simulate the calculations for the refinery in the game Space Engineers. See here for the specifications of the refinery: https://spaceengineerswiki.com/Refinery

# Example

```js
const {Refinery,Ore} = require('./se-refinery');

// create the testing refinery
let refinery = new Refinery({
	baseEfficiency: 1.0,
	mods: {
		yield: 4,
		speed: 2,
		power: 2
	}
});
refinery.displayInfo();

// create input ore
let ore = new Ore('platinum', 200000);
ore.displayInfo();

// simulate the refining process and display its results
refinery.process(ore);
```

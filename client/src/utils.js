let generateTotals = (solution) => {
		let rowTotals = [];
		for (let rowIndex = 0; rowIndex < solution.length; rowIndex += 1) {
			let total = [];
			let inGroup = 0;

			for (let colIndex = 0; colIndex < solution[rowIndex].length; colIndex += 1) {
				let current = solution[rowIndex][colIndex];

				if (inGroup) {
					if (current) {
						inGroup += 1
					} else {
						total.push(inGroup);
						inGroup = 0;
					}
				} else {
					if (current) {
						inGroup += 1;
					}
				}

				if (colIndex === solution[rowIndex].length - 1 && current) {
					total.push(inGroup)
				}
			}
			rowTotals.push(total);
		}

		let colTotals = [];
		for (let colIndex = 0; colIndex < solution[0].length; colIndex += 1) {
			let total = [];
			let inGroup = 0;

			for (let rowIndex = 0; rowIndex < solution.length; rowIndex += 1) {
				let current = solution[rowIndex][colIndex];

				if (inGroup) {
					if (current) {
						inGroup += 1
					} else {
						total.push(inGroup);
						inGroup = 0;
					}
				} else {
					if (current) {
						inGroup += 1;
					}
				}

				if (rowIndex === solution.length - 1 && current) {
					total.push(inGroup);
				}
			}
			colTotals.push(total);
		}
		return [rowTotals, colTotals];
  }
  
  export { generateTotals };

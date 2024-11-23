// tailwind.config.js
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",  // Make sure this includes your JSX files
	],
	theme: {
	  extend: {
		colors: {
			'muted': '#f3f4f6',  // Example color for background
			'foreground': '#333',  // Example color for text
		  },
	  },
	},
	plugins: [],
  }
  
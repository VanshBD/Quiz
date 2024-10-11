module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Include your source files here
    ],
    theme: {
      extend: {
        // Extend the theme to add your custom styles
        colors: {
          'glass-blue': 'rgba(173, 216, 230, 0.2)', // Custom glass blue color for background
          'dark-blue': '#001f3f', // A deep dark blue for contrast
          'black-transparent': 'rgba(0, 0, 0, 0.7)', // Black with transparency for glass effect
        },
        backdropBlur: {
          xs: '2px',
          sm: '4px',
          md: '8px',
          lg: '12px',
          xl: '16px',
        },
        transitionDuration: {
          DEFAULT: '300ms',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // Better forms styling
      require('@tailwindcss/typography'), // Enhanced typography
      require('@tailwindcss/aspect-ratio'), // Responsive aspect ratios
    ],
  }
  
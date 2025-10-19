# ECO Meter - Carbon Footprint Calculator

A web application to track and calculate your carbon footprint from electricity consumption and travel emissions.

## Environment Setup

### 1. Environment Variables

This application uses environment variables to manage sensitive configuration data like Firebase API keys. Follow these steps to set up your environment:

#### For Development:

1. Copy the `.env.example` file to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Update the values in `.env.local` with your actual Firebase configuration:
   \`\`\`env
   FIREBASE_API_KEY=your_actual_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config values
   \`\`\`

#### For Production Deployment:

Set the environment variables in your hosting platform:

**Vercel:**
\`\`\`bash
vercel env add FIREBASE_API_KEY
vercel env add FIREBASE_AUTH_DOMAIN
vercel env add FIREBASE_PROJECT_ID
# ... add all other variables
\`\`\`

**Netlify:**
Add environment variables in your Netlify dashboard under Site Settings > Environment Variables.

**Other Platforms:**
Refer to your hosting platform's documentation for setting environment variables.

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database in test mode
4. Copy your Firebase configuration values to your environment variables

### 3. File Structure

\`\`\`
eco-meter/
├── config/
│   ├── env.js              # Environment configuration handler
│   ├── env-loader.js       # Browser environment loader
│   └── deployment.js       # Deployment-specific configuration
├── css/
│   └── styles.css          # Application styles
├── .env.example            # Environment variables template
├── .env.local              # Local development environment (create this)
├── firebase.js             # Firebase initialization
├── auth.js                 # Authentication functions
├── database.js             # Database operations
├── index.html              # Login page
├── dashboard.html          # Dashboard page
├── index.js                # Login page logic
├── dashboard.js            # Dashboard logic
└── README.md               # This file
\`\`\`

### 4. Security Best Practices

- Never commit `.env.local` or any file containing actual API keys to version control
- Use different Firebase projects for development, staging, and production
- Regularly rotate your API keys
- Enable Firebase security rules for your Firestore database

### 5. Development

1. Set up your environment variables as described above
2. Open `index.html` in a web browser or serve it using a local web server
3. The application will automatically load the environment configuration

### 6. Deployment

The application is configured to work with various deployment platforms:

- **Static Hosting:** Upload all files to your static hosting provider
- **Vercel:** Connect your repository and set environment variables
- **Netlify:** Connect your repository and configure environment variables
- **Firebase Hosting:** Use Firebase CLI to deploy

### 7. Environment Configuration

The application supports multiple ways to configure environment variables:

1. **Build-time environment variables** (recommended for production)
2. **Meta tags in HTML** (useful for server-side rendering)
3. **Window object configuration** (for dynamic configuration)
4. **Fallback to default values** (for development)

### 8. Troubleshooting

**Firebase not initializing:**
- Check that all required environment variables are set
- Verify your Firebase project configuration
- Check the browser console for error messages

**Authentication not working:**
- Ensure Google authentication is enabled in Firebase Console
- Verify your domain is added to authorized domains in Firebase

**Database operations failing:**
- Check Firestore security rules
- Verify your Firebase project has Firestore enabled

## Features

- User authentication with email/password and Google sign-in
- Carbon footprint calculation for electricity and travel
- Dynamic appliance and vehicle entry forms
- Real-time emission factor updates from database
- Responsive design for mobile and desktop

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

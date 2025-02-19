# Financial Management App
A mobile application built with React Native and Expo for managing personal finances.

## Features
- User Authentication (Login/Register)
- Multiple Wallet Management
- Transaction Tracking
- Category Management
- Profile Settings
- Dark/Light Theme Support

## Technical Stack
- React Native / Expo
- TypeScript
- Supabase (Backend/Authentication)
- React Navigation

## Project Structure
```
├── app/                    # Main application screens
│   ├── (auth)/            # Authentication related screens
│   └── (tabs)/            # Main tab navigation screens
├── components/            # Reusable components
│   ├── categories/        # Category-related components
│   ├── transactions/      # Transaction-related components
│   ├── wallets/          # Wallet-related components
│   └── ui/               # UI components
├── constants/            # App constants and utilities
├── contexts/             # React Context definitions
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
└── types/               # TypeScript type definitions
```

## Key Components
- **Authentication**: Full authentication flow with login and registration
- **Wallet Management**: Create and manage multiple wallets with different currencies
- **Categories**: Organize transactions with customizable categories
- **Transactions**: Track income and expenses with detailed transaction records
- **Profile**: User profile management and settings

## Setup & Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables for Supabase
4. Start the development server:
```bash
npx expo start
```

## Development
The application uses:
- TypeScript for type safety
- React Navigation for routing
- Supabase for backend services
- Custom hooks for business logic
- Context API for state management

## Theme Support
The app includes built-in support for both light and dark themes, with color schemes defined in `constants/Colors.ts`.

## Contributing
Feel free to submit issues and pull requests to help improve the application.

## License
[Insert License Information]

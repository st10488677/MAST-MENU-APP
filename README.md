MAST Menu App


 Developer
Name: Kushiv Singh
Student Number: ST10488677
Project: MAST Menu App — Portfolio of Evidence (PoE)

 Overview
The MAST Menu App is a React Native Android application built for chefs and guests to manage and view menu items.  
It was developed as part of a Portfolio of Evidence (PoE) to demonstrate planning, user interface creation, and feature implementation in React Native using Expo.
. (THE APP RAN AND WHEN I REFRESHED IT DOESN’T RUN ANYMORE, JUST SHOWS A BLANK SCREEN NOW)

Features
Chef Features
- Add new menu items with:
  - Dish Name
  - Description
  - Course (Starters, Main Course, or Desserts)
  - Price  
- Remove menu items dynamically from the list.
- Menu data is stored in an array (not hardcoded in the UI).

 Guest Features
- View the complete menu on the home screen.
- Filter menu items by course (e.g., only “Starters”).
- View the “average price per course” displayed on the home page.
- Add menu items to the cart and remove them when needed.



UI & Design
•	Simple and clean user interface
•	Uses ScrollView and TouchableOpacity for navigation and interactivity
•	Organized screens for better maintainability:
o	Login screen
o	Home screen
o	Chef (menu management) screen
o	Cart screen
o	Filter screen
Future Improvements
•	Add Firebase or AsyncStorage for persistent data saving.
•	Add user authentication for multiple chefs.
•	Include images upload functionality.
•	Improve styling with custom components and themes.



 CHANGELOG.md
markdown
 MAST Menu App — Changelog
 Version 3.0 (Final PoE)
 New Features Added
- Added “average price per course” display on the home screen.
- Added  “ChefScreen” where chefs can:
  - Add menu items with name, description, course, and price.
  - Remove menu items dynamically.
- Added “FilterScreen” where guests can view specific course types (Starters, Main Course, Desserts).
- Implemented better state management using “useState” hooks.
- Moved all types into a centralized “types.ts” file for cleaner code.

Refactoring
- Moved menu-adding functionality from HomeScreen → ChefScreen.
- Broke down large `App.tsx` logic into multiple files (SRP - Single Responsibility Principle).
- Cleaned up imports and removed unused components.
- Improved prop type definitions using TypeScript interfaces.



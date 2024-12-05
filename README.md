# Final-Project-YumGuide

YumGuide is a smart mobile application designed to enhance users' cooking experiences by recommending recipes based on available ingredients, providing store location assistance, and enabling reminders. The following sections detail the application's features, technical architecture, and contributions from the development team.

Overview:
Iteration 1: In the iteration 1 of the project, we are designing a mobile app that helps users manage their ingredients, view a dish gallery, and set reminders for related tasks. The app includes navigation with logos representing each feature and a cohesive design throughout all screens.
Iteration 2: In the second phase of the project, we successfully implemented several key features, enhancing both functionality and user experience. 
Iteration 3: In the third phase of the project, we mainly fixed some problems and improved several major functions to enhance the user experience. Below are the newly added or fixed features.


1. Authentication
Added some prompts to the user login interface to let users know the benefits of logging in.
Already implemented to maintain data isolation between users and to help users retrieve passwords and remind weak passwords to remain unchanged
2. Camera Use
The already implemented functionality of using the camera to capture dishes and record the time remains unchanged
3. Location Use
Implemented use expo-location to implement location permission requests.
Gets and displays the user's current geographic location on an interactive map.
Allows the user to manually select a location on the map.
Integrates with the Google Maps API for searching for nearby stores (such as grocery stores or supermarkets).
Remain unchanged
4. Notification
Implemented Configured notification permissions using expo-notifications.
Enabled scheduling of local notifications for cooking-related reminders.
Integrated Expo push notifications to support real-time updates.
Remain unchanged
5. External API Use & Firebase rules
implemented Integrated Google Maps API:
Map display and user interaction.
Searching for nearby stores.
Google Maps API Key: AIzaSyC9cByQTYHMFCBNzhYCFm9dBij4IC4ut5Y
Spoonacular API:
Integrated Spoonacular API to fetch recipes based on ingredients provided by the user.
API Key: f1d289212d394251a96b48c859777ba1
Firestore database rule:
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // General rule: Deny all access by default
    match /{document=**} {
      allow read, write: if false;
    }

    // Allow authenticated users to read/write their ingredients
    match /users/{userId}/ingredients/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow authenticated users to read/write their dishes
    match /users/{userId}/dishes/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow authenticated users to read/write their reminders
    match /users/{userId}/reminders/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow read access to public data
    match /public/{document=**} {
      allow read: if true;
    }
  }
}
remain unchanged

6. App demo video
https://northeastern-my.sharepoint.com/:v:/g/personal/lu_xi2_northeastern_edu/Ed96i0a2N9RCltBgFbiAYrABvv1d5Rg0Rw-lk4e7G92Vkg

Contribution by authors:

Author: Xi Lu
iteration 1: 
* Completed navigation setup with logos.
* Added a screen for users to create new ingredient entries (Create function).
* Implemented create operations for all three collections.
* Added delete operations for the ingredients and reminder collections.
* Refactored screens and components for uniformity, updated color schemes, and fixed navigation references.
iteration 2:
* Completed store location screen using Location operation.
* Achieved Google Maps API key and used in the document.
* Set up notification operation using expo-notification.
* Allow user to enable local notification for reminders.
* Formatted dates to local timezone in item component and reminder function.
* Added the recommemded recipe on the recipe page.
iteration 3:
* Enhance Item component styling and layout for better UI design
* Update locationscreen refresh button to enhance clarity
* Update color scheme and enhance styling for RecipesScreen components

Author: Zhuoyuan Liu
iteration 1:
* Set up a firestore database and connect the three collections with corresponding screens.
* Added edit operations for all three collections to update user's new input.
* Added delete operations for the dish gallery collection.
* Fixed rendering bugs to improve the stability and responsiveness of the app.
iteration 2:
* Enhanced Ingredient and Recipe context handling to update recipe's ingredient correctly.
* Set up login and signup screen, and support user to retrieve password.
* Fixed login and navigation issues, improving persistent login support.
* Enhanced firebase authentication rules to achieve user data isolation from others.
* Integrated camera functionality, enabling users to upload dish photos to firestore and show in app.
iteration 3:
* Add new screen SearchRecipesScreen allow users to search recipes based on their ingredients.
* Add new information on Login screen.
* Fix duplicate keys in Recipe and SearchRecipesScreen screen.

<img width="376" alt="Screenshot 2024-12-02 at 11 11 35 PM" src="https://github.com/user-attachments/assets/5b8c7370-6e3b-44f9-a23a-6683f8c4d344">

<img width="381" alt="Screenshot 2024-12-02 at 11 11 47 PM" src="https://github.com/user-attachments/assets/03118e57-a40f-4e97-8ad0-0dfb9ce1fcba">

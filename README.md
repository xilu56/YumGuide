# Final-Project-YumGuide

YumGuide is a smart mobile application designed to enhance users' cooking experiences by recommending recipes based on available ingredients, providing store location assistance, and enabling reminders. The following sections detail the application's features, technical architecture, and contributions from the development team.

Overview: Iteration 2
In the second phase of the project, we successfully implemented several key features, enhancing both functionality and user experience. The new additions are outlined below:

1. Authentication
Implemented Firebase Authentication with user-specific data isolation and management.
Dynamic contexts fetch and manage personalized data, ensuring alignment with the authenticated user, while transitions like login, logout, and session expiration are seamlessly handled for a secure and smooth user experience.
2. Camera Use
Users can capture photos of completed dishes and upload them to the Dish Gallery.
Added functionality to delete uploaded photos.
3. Location Use
Implemented location permission requests using expo-location.
Fetched and displayed the user's current geographic location on an interactive map.
Allowed users to manually select locations on the map.
Integrated Google Maps API to search for nearby stores (e.g., grocery stores or supermarkets).
4. Notification
Configured notification permissions using expo-notifications.
Enabled scheduling of local notifications for cooking-related reminders.
Integrated Expo push notifications to support real-time updates.
5. External API Use & Firebase rules
Integrated Google Maps API:
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

Author: Xi Lu
* Completed store location screen using Location operation. 
* Achieved Google Maps API key and used in the document.
* Set up notification operation using expo-notification.
* Allow user to enable local notification for reminders.
* Formatted dates to local timezone in item component and reminder function.
* Added the recommemded recipe on the recipe page.

Author: Zhuoyuan Liu
* Enhanced Ingredient and Recipe context handling to update recipe's ingredient correctly.
* Set up login and signup screen, and support user to retrieve password.
* Fixed login and navigation issues, improving persistent login support.
* Enhanced firebase authentication rules to achieve user data isolation from others.
* Integrated camera functionality, enabling users to upload dish photos to firestore and show in app.

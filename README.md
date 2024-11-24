# Final-Project-YumGuide

YumGuide is a smart mobile application designed to enhance users' cooking experiences by recommending recipes based on available ingredients, providing store location assistance, and enabling reminders. The following sections detail the application's features, technical architecture, and contributions from the development team.

Overview: Iteration 2
In the second phase of the project, we successfully implemented several key features, enhancing both functionality and user experience. The new additions are outlined below:

1. Authentication
Integrated Firebase Authentication to enable user registration, login, and persistent sessions.
Ensured secure user-specific data handling, enabling personalized recommendations.
2. Camera Use
Users can capture photos of completed dishes and upload them to the Dish Gallery.
Added functionality to edit or delete uploaded photos.
3. Location Use
Implemented location permission requests using expo-location.
Fetched and displayed the user's current geographic location on an interactive map.
Allowed users to manually select locations on the map.
Integrated Google Maps API to search for nearby stores (e.g., grocery stores or supermarkets).
4. Notification
Configured notification permissions using expo-notifications.
Enabled scheduling of local notifications for cooking-related reminders.
Integrated Expo push notifications to support real-time updates.
5. External API Use
Integrated Google Maps API:
Map display and user interaction.
Searching for nearby stores.
Google Maps API Key: AIzaSyC9cByQTYHMFCBNzhYCFm9dBij4IC4ut5Y
Spoonacular API:
Integrated Spoonacular API to fetch recipes based on ingredients provided by the user.
API Key: f1d289212d394251a96b48c859777ba1

Author: Xi Lu
* Completed store location screen using Location operation. 
* Achieved Google Maps API key and used in the document.
* Set up notification operation using expo-notification.
* Allow user to enable local notification for reminders.
* Formatted dates to local timezone in item component and reminder function.
* Added the recommemded recipe on the recipe page.

Author: Zhuoyuan Liu
* Enhanced Ingredient and Recipe context handling to ensure secure and user-specific data management.
* Fixed login and navigation issues, improving persistent login support.
* Integrated camera functionality, enabling users to upload dish photos.

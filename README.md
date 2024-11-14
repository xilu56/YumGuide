# Final-Project-YumGuide

Overview
This project is a mobile app that helps users manage their ingredients, view a dish gallery, and set reminders for related tasks. The app includes navigation with logos representing each feature and a cohesive design throughout all screens.
Data Model
The app's data model consists of three main collections:
1. Ingredients Collection
    * Create Operation: Users can add new ingredients to their collection through the 'Add My Ingredient' screen.
    * Delete Operation: Users can remove ingredients they no longer need.
2. Gallery Collection
    * Create Operation: Users can upload and store photos of their dishes to the gallery. This functionality allows users to document their culinary creations.
3. Reminder Collection
    * Create Operation: Users can set reminders for important tasks or ingredient management.
    * Delete Operation: Users can delete reminders if they are no longer necessary.
CRUD Operations Summary
* Create: Implemented for all collections (ingredients, gallery, reminder).
* Delete: Implemented for the ingredients and reminder collections.
* Read & Update: Not specified in the current scope but could be added in future iterations for enhanced user interaction.
Screens and Navigation
Navigation has been implemented with intuitive logos that help users easily access different features. The screens include:
* Recipes Screen
* Ingredients Screen (with create and delete functionality)
* Dish Gallery Screen (with create functionality)
* Store Location Screen
* Reminder Screen (with create and delete functionality)
Design and Styling
All screens have been refactored for consistency, ensuring a unified color palette and style that align with the app's theme.
Contributions


Author: Xi Lu
* Completed navigation setup with logos.
* Added a screen for users to create new ingredient entries (Create function).
* Implemented create operations for all three collections.
* Added delete operations for the ingredients and reminder collections.
* Refactored screens and components for uniformity, updated color schemes, and fixed navigation references.


Author: Zhuoyuan Liu 
* Set up a firestore database and connect the three collections with corresponding screens.
* Added edit operations for all three collections to update user's new input.
* Added delete operations for the dish gallery collection.
* Fixed rendering bugs to improve the stability and responsiveness of the app.
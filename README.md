# Final-Project-YumGuide

Overview
In the iteration 1 of the project, we are designing a mobile app that helps users manage their ingredients, view a dish gallery, and set reminders for related tasks. The app includes navigation with logos representing each feature and a cohesive design throughout all screens.

Data Model
The app's data model consists of three main collections:
1. MyIngredients Collection
    * Create Operation: Users can add new ingredients to their collection through the 'Add My Ingredient' screen.
    * Read Operation: Users can read ingredients from their collection once they added to the collection.
    * Update Operation: Users can update ingredients through edit My Ingredient screen by click the Item list.
    * Delete Operation: Users can remove ingredients they no longer need.
2. MyDishes Collection
    * Create Operation: Users can upload and store photos of their dishes to the gallery. This functionality allows users to document their culinary creations.
    * Read Operation: Users can view their uploaded dish photos in the 'Dish Gallery' screen, which displays images and relevant details for each dish.
    * Update Operation: Users can edit the details of a dish photo, such as updating the title or description, through the 'Edit Dish' functionality.
    * Delete Operation: Users can remove dish photos from their gallery if they wish to delete them or replace them with newer images.

3. Reminders Collection
    * Create Operation: Users can set reminders for important tasks or ingredient management.
    * Read Operation: Users can view all their set reminders in the 'Reminder' screen, which lists reminders and their scheduled times.
    * Update Operation: Users can modify existing reminders, changing details such as time or reminder notes, through an 'Edit Reminder' function.
    * Delete Operation: Users can delete reminders if they are no longer necessary.

CRUD Operations Summary
* Create: Implemented for all collections (ingredients, gallery, reminder).
* Read: Implemented for all collections, allowing users to view their data.
* Update: Implemented for all collections to support changes in existing entries.
* Delete: Implemented for all collections to remove unwanted entries.

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
# SUN CO. Technical Assessment
This is a basic e-commerce store application built using Next.js. The project aims to meet the provided business and technical requirements outlined in the specifications. It implements a simple API linked to a front-end matching the provided Figma mockup.

## Live Site
The functional site can be found here: https://assessment-seven-kappa.vercel.app/

## Video Demo
A video demonstration of the site can be found here: https://www.youtube.com/watch?v=Ii1_rE8kzgI


## Local Installation
1. Clone the repository
```
git clone https://github.com/briannuggets/SunCoPrototype.git
```
2. Navigate to the root project directory and install dependencies
```
npm install
```
3. Create an .env file and add the local development url
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```
4. Access the application in your browser at http://localhost:3000

## Testing
Tests are implemented using Jest.
1. Navigate to root directory
2. Uncomment the first line in /app/api/utils.ts
```
const fetch = require("node-fetch");
```
3. Run the test script
```
npm run test
```

## Technologies
* NextJS
* SCSS
* Jest (testing framework)

## Additional Considerations
Although all the business requirements have been met, these are some extra quality-of-life updates I would make to improve UX, given more time.
* Loading screen between pages.
* Loading animations between gallery images (lazy loading increases wait time on first page visit).
* Keyboard functionality on carousel for smaller screen sizes (i.e. arrow keys).

## Concurrent Environment
A concurrent environment implies that multiple shoppers will be accessing our application at any given time, which is common in the case of e-commerce sites. If this application were intended to run in a concurrent environment, I would consider the following:
1. Database management - Hard-coded product data cannot be updated very easily. In the case of products, items need to be added, removed, or updated from the catalogue depending on inventory. Using a database like SQLite would be a great improvement over hardcoding, as it allows for more flexibility and easier maintenance of product data.
2. Caching - Repeated API calls from many shoppers can provide stressful load on the server. We can instead just call the API once and save the data for later uses. Subsequent requests for the same data can be served from the cache resulting in faster response times for users.
3. Error handling - Potential issues such as network or server errors can come up in a concurrent environment, so it is imperative to handle these well. Proper logging and monitoring of errors can also help in identifying and resolving issues quickly.

## Contact
Thank you for reviewing my technical assessment! If you have any questions or feedback, please feel free to reach out at brianwindev@gmail.com.
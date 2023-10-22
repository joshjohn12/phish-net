// getPercentages()
// async function getPercentages() {

//     percentage_object = {}
//     console.log("running")
//     await fetch('http://localhost:3000/categorize').then(res=> res.json()).then(data => percentage_object = data)
//     // const movies = await response.json();
//     console.log(percentage_object)
//     console.log("done")
//     return percentage_object;
// }

async function getPercentages() {
    try {
      const response = await fetch('http://localhost:3000/categorize');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // This will return the data (percentage_object array) to the caller.
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // You might want to handle or propagate the error further.
    }
  }
  
  async function displayPercentageData() {
    try {
      const percentage_object = await getPercentages();
      console.log(percentage_object);
  
      // Find the HTML element where you want to display the data
      const percentageDataElement = document.getElementById('percentageData');
  
      if (percentageDataElement) {
        // Create and format the HTML content to display the data
        const percentageList = document.createElement('ul');
        for (const item of percentage_object) {
          const listItem = document.createElement('li');
          listItem.textContent = item; // Modify this based on your data structure
          percentageList.appendChild(listItem);
        }
  
        // Add the formatted content to the HTML element
        percentageDataElement.appendChild(percentageList);
      } else {
        console.error('Element with id "percentageData" not found.');
      }
    } catch (error) {
      console.error('Error in displayPercentageData:', error);
      // Handle the error if necessary
    }
  }
  
  // Call the displayPercentageData function
  displayPercentageData();  
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
  
  async function displaySpecificElement(index) {
    try {
      const percentage_object = await getPercentages();
      console.log(percentage_object);
  
      // Find the HTML element where you want to display the specific element
      const specificElementElement = document.getElementById('specificElement');
  
      if (specificElementElement) {
        // Check if the index is within the array bounds
        if (index >= 0 && index < percentage_object.length) {
          specificElementElement.textContent = percentage_object[index];
        } else {
          specificElementElement.textContent = 'Index out of bounds';
        }
      } else {
        console.error('Element with id "specificElement" not found.');
      }
    } catch (error) {
      console.error('Error in displaySpecificElement:', error);
      // Handle the error if necessary
    }
  }
  
  // Call the displaySpecificElement function with the desired index
  displaySpecificElement(4); // Display the first element, adjust the index as needed
  
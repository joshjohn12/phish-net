
let scrapeEmails = document.getElementById('scrapeEmails');
let list = document.getElementById('emailList');

// Handler to receive emails from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Get emails
    let emails = request.emails;

    emails.forEach((email) => {
        let li = document.createElement("li");
        emails = emails.filter(email => !email.includes('png'));
        li.innerText = email;
        list.appendChild(li);
    });

});

// Button's click event listener
scrapeEmails.addEventListener("click", async () => {
    // Get the current active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute the script to parse emails on the page
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeEmailsFromPage,
    });
});



// Function to scrape emails
async function scrapeEmailsFromPage() {
  console.log("running")
  const response = await fetch("http://localhost:3000/gpt");
  // const movies = await response.json();
  console.log(response);

    // // Send emails to popup
    // chrome.runtime.sendMessage({ emails });
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/g;

    let emails = document.body.innerHTML.match(emailRegEx);

    // Filter out duplicates
    emails = Array.from(new Set(emails));

    // Send unique emails to the popup
    chrome.runtime.sendMessage({ emails });

    
    let tbody = document.querySelectorAll('tbody'); // Replace 'tableId' with the ID or selector of the <tbody>
    tbody = tbody[5]
    if (tbody) {
        // Select all <tr> elements within the <tbody>
        const trElements = tbody.querySelectorAll('tr');

        // Iterate through each <tr> element
        trElements.forEach(tr => {
            // console.log(tr.outerHTML);
            // Your code to work with each <tr> element goes here
            // For example, you can access and modify properties of each <tr> element:
            // tr.style.backgroundColor = 'red'; // Change the background color to red
            // console.log(tr.textContent); // Log the text content of the <tr> element
        });
    } else {
        console.log('The <tbody> element was not found.');
    }
}

// display count when extension is opened
const cookieName = 'extension_open_count';
const openCount = getCookieValue(cookieName);
if (openCount) {
  updateCountDisplay(openCount);
} else {
  updateCountDisplay('Nothing yet...');
}

// Function to retrieve the value of a specific cookie
function getCookieValue(cookieName) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }
  
  // update count display in the extension after every click
  function updateCountDisplay(count) {
    const countDisplay = document.getElementById('count-display');
    if (countDisplay) {
      countDisplay.textContent = `Count: ${count}`;
    }
  }
  
  // retrieve current count and increment it
  function incrementCount(cookieName) {
    const openCount = getCookieValue(cookieName) || 0;
    const updatedCount = parseInt(openCount, 10) + 1;
  
    // Update cookie with new count
    document.cookie = `${cookieName}=${updatedCount}; path=/`;
    
    updateCountDisplay(updatedCount);
  }
  
  // Add a click event listener to the button
  const incrementButton = document.getElementById('increment-button');
  if (incrementButton) {
    incrementButton.addEventListener('click', () => {
      incrementCount(cookieName);
    });
  }


 

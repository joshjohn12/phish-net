// // // popup.js

// // let scrapeEmails =  document.getElementById('scrapeEmails');

// // scrapeEmails.addEventListener("click", async() => {
// //     //alert('hello');
// //     //get current actice tab 
// //     let [tab] = await chrome.tabs.query({active: true , currentWindow:true});

// //     //Execute script to parse emails on page

// //     chrome.scripting.executeScript({
// //         target: {tabId: tab.id},
// //         func: scrapeEmailsFromPage,
// //     });

// // })

// // //function to scrape emails

// // function scrapeEmailsFromPage(){
// //     alert('hi');
// // }
// // popup.js

// let scrapeEmails = document.getElementById('scrapeEmails');
// //Handler to receive emails from content script
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
//     //get emails\
//     let emails = request.emails;
//     alert(emails);
// })


// //Button's click event listener

// scrapeEmails.addEventListener("click", async () => {
//     // Get the current active tab
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     // Execute the script to parse emails on the page
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: scrapeEmailsFromPage,  // Corrected function name
//     });
// });

// // Function to scrape emails
// function scrapeEmailsFromPage() {
//     //alert('hi'); 
//     const emailRegEx = /[\w\.=-]+@[\w\. -]+\.[\w]{2,3}/
//     gim;

//     let emails = document.body.innerHTML.match
//     (emailRegEx);

//     //Send emails to popup
//     chrome.runtime.sendMessage({emails});

// }
// popup.js

let scrapeEmails = document.getElementById('scrapeEmails');
let list = document.getElementById('emailList');

// Handler to receive emails from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Get emails
    let emails = request.emails;

    emails.forEach((email) => {
        let li = document.createElement("li");
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
function scrapeEmailsFromPage() {
    // const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/g;

    // let emails = document.body.innerHTML.match(emailRegEx);

    // // Send emails to popup
    // chrome.runtime.sendMessage({ emails });
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/g;

    let emails = document.body.innerHTML.match(emailRegEx);

    // Filter out duplicates
    emails = Array.from(new Set(emails));

    // Send unique emails to the popup
    chrome.runtime.sendMessage({ emails });
}

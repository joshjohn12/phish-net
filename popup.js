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

// Function to update the count display in the popup
function updateCountDisplay(count) {
  const countDisplay = document.getElementById('count-display');
  if (countDisplay) {
    countDisplay.textContent = `Count: ${count}`;
  }
}

// Function to retrieve and increment the count
function incrementCount(cookieName) {
  const openCount = getCookieValue(cookieName) || 0;
  const updatedCount = parseInt(openCount, 10) + 1;

  // Update the cookie with the new count
  document.cookie = `${cookieName}=${updatedCount}; path=/`;
  
  // Update the display
  updateCountDisplay(updatedCount);
}

// Usage: Call getCookieValue with the cookie name
const cookieName = 'extension_open_count';
const openCount = getCookieValue(cookieName);
if (openCount) {
  updateCountDisplay(openCount);
} else {
  updateCountDisplay('Not available');
}

// Add a click event listener to the button
const incrementButton = document.getElementById('increment-button');
if (incrementButton) {
  incrementButton.addEventListener('click', () => {
    incrementCount(cookieName);
  });
}

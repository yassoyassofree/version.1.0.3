function saveName(name) {
    const isBlocked = blockedUsers.some(blockedUser => name.startsWith(blockedUser));
    
    if (isBlocked) {
        alert(`${name} is blocked and cannot join. Please choose a different username.`);
        return; // Exit early
    }

    // Create or get user's history
    if (!userHistories[name]) {
        userHistories[name] = []; // Initialize user history
    }
    
    userHistories[name].push(`${name} opened User History`); // Log the action to user's own history
    localStorage.setItem('userHistories', JSON.stringify(userHistories)); // Save updated histories

    logAction(name, 'opened the application'); // Log this action

    // Notify about the new username entered via email
    notifyAdmin(name); // Call function to send notification

    window.location.href = 'welcome.html'; // Redirect to welcome page
}

// Function to notify admin via email
function notifyAdmin(userName) {
    const emailData = {
        username: userName,
        message: `${userName} has logged in.`
    };

    // Making a POST request to send the notification
    fetch('https://your-server-endpoint/send-notification', { // Replace with your server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Notification sent successfully');
        } else {
            console.error('Failed to send notification');
        }
    })
    .catch(error => console.error('Error:', error));
}
// Initialize the conversion table when the page loads
document.addEventListener('DOMContentLoaded', initializeConversionTable);

// Add smooth scrolling for anchor links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize social share buttons
function initializeSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    // Add mousemove event listeners to each share button container
    document.querySelectorAll('.share-btn-container').forEach(container => {
        const tooltip = container.querySelector('.tooltip');
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top + 10;
            
            tooltip.style.left = `${x - 10}px`;
            tooltip.style.top = `${y}px`;
        });
    });

    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let shareUrl = '';

            if (button.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            } else if (button.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/share?url=${pageUrl}&text=${pageTitle}`;
            } else if (button.classList.contains('reddit')) {
                shareUrl = `https://reddit.com/submit?url=${pageUrl}&title=${pageTitle}`;
            } else if (button.classList.contains('pinterest')) {
                shareUrl = `https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}`;
            } else if (button.classList.contains('instagram')) {
                shareUrl = `https://www.instagram.com/share?url=${pageUrl}`;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

function updateResults() {
    const seconds = parseFloat(document.getElementById('seconds').value);
    
    if (isNaN(seconds) || seconds === '') {
        document.getElementById('decimal-result').textContent = '00 hrs';
        document.getElementById('time-result').textContent = '00 hrs 00 min 00 sec';
        return;
    }

    if (seconds < 0) {
        seconds = 0;
    }

    // Calculate decimal hours
    const decimalHours = seconds / 3600;
    document.getElementById('decimal-result').textContent = 
        `${decimalHours.toFixed(2)} hrs`;

    // Calculate HH:MM:SS
    const timeFormat = formatTimeHHMMSS(seconds);
    document.getElementById('time-result').textContent = timeFormat;
}

function formatTimeHHMMSS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${padZero(hours)} hrs ${padZero(minutes)} min ${padZero(seconds)} sec`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function initializeConversionTable() {
    const commonSeconds = [
        30, 60, 300, 600, 900, 1800, 3600, 7200, 10800, 14400, 18000, 21600
    ];

    const tableBody = document.getElementById('conversion-table-body');
    
    commonSeconds.forEach(seconds => {
        const row = document.createElement('tr');
        
        // Seconds column
        const secondsCell = document.createElement('td');
        secondsCell.textContent = seconds.toLocaleString();
        
        // Decimal hours column
        const decimalHoursCell = document.createElement('td');
        decimalHoursCell.textContent = (seconds / 3600).toFixed(2);
        
        // HH:MM:SS column
        const timeFormatCell = document.createElement('td');
        timeFormatCell.textContent = formatTimeHHMMSS(seconds);
        
        row.appendChild(secondsCell);
        row.appendChild(decimalHoursCell);
        row.appendChild(timeFormatCell);
        tableBody.appendChild(row);
    });
}

// Add event listener for real-time updates
const secondsInput = document.getElementById('seconds');
secondsInput.addEventListener('input', function(e) {
    if (e.target.value && !/^\d*\.?\d*$/.test(e.target.value)) {
        e.target.setCustomValidity('Please enter numbers only');
        e.target.reportValidity();
        e.target.value = e.target.value.replace(/[^\d.]/g, '');
    } else {
        e.target.setCustomValidity('');
    }
    updateResults();
});

// Initialize social share buttons when the page loads
document.addEventListener('DOMContentLoaded', initializeSocialShare);
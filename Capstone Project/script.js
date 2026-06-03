window.addEventListener('load', function() {
    const calendarEl = document.getElementById('calendar');

    // 1. Default JSON data (Simulating your JSON file/API fetch)
    const defaultJsonEvents = [
        {
            id: '1',
            title: 'Community Farmers Market',
            start: new Date().toISOString().split('T')[0] + 'T09:00:00', // Today at 9 AM
            end: new Date().toISOString().split('T')[0] + 'T13:00:00',
            backgroundColor: '#28a745'
        },
        {
            id: '2',
            title: 'Local Art Exihbition',
            start: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow, All Day
            backgroundColor: '#17a2b8'
        }
    ];

    // 2. Load events from localStorage, or fall back to default JSON data
    let storedEvents = localStorage.getItem('communityEvents');
    let initialEvents = storedEvents ? JSON.parse(storedEvents) : defaultJsonEvents;

    // If it's the user's first time, save the default JSON to localStorage
    if (!storedEvents) {
        localStorage.setItem('communityEvents', JSON.stringify(defaultJsonEvents));
    }

    // 3. Initialize FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: initialEvents, 
        editable: true, // Allows dragging and resizing

        // Save to localStorage when an event is dragged or resized
        eventChange: function(changeInfo) {
            saveCalendarToStorage();
        },

        // Alert info when clicking an event
        eventClick: function(info) {
            alert('Event: ' + info.event.title + '\nDescription: Community local event.');
        }
    });

    calendar.render();

    // 4. Function to map calendar state and save to localStorage
    function saveCalendarToStorage() {
        const allEvents = calendar.getEvents().map(event => {
            return {
                id: event.id,
                title: event.title,
                start: event.startStr,
                end: event.endStr || null,
                allDay: event.allDay,
                backgroundColor: event.backgroundColor
            };
        });
        localStorage.setItem('communityEvents', JSON.stringify(allEvents));
    }

    // 5. Button logic to add a new event and save it
    document.getElementById('add-event-btn').addEventListener('click', function() {
        const title = prompt('Enter Event Title:');
        if (title) {
            const newEvent = {
                id: String(Date.now()), // Unique string ID
                title: title,
                start: new Date().toISOString().split('T')[0] + 'T18:00:00', // Today at 6 PM
                backgroundColor: '#6f42c1'
            };

            calendar.addEvent(newEvent);
            saveCalendarToStorage();
        }
    });
});

const calendarContainer = document.getElementById('calendar');
const currentMonthEl = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');
const selectedDateEl = document.getElementById('selected-date');
const timeSlotsContainer = document.getElementById('time-slots');
const scheduleModal = document.getElementById('schedule-modal');
const closeBtn = document.querySelector('.close-btn');
const modalTime = document.getElementById('modal-time');
const scheduleInput = document.getElementById('schedule-input');
const saveScheduleBtn = document.getElementById('save-schedule-btn');
const deleteScheduleBtn = document.getElementById('delete-schedule-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// Persistent data using localStorage
const scheduleData = JSON.parse(localStorage.getItem('scheduleData')) || {};

const saveToLocal = () => {
    localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
};

// Theme handling
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const renderCalendar = () => {
    calendarContainer.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonthEl.textContent = `${year}년 ${month + 1}월`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Days of the week headers
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    weekDays.forEach(dayName => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = dayName;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '5px';
        calendarContainer.appendChild(dayHeader);
    });

    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        calendarContainer.appendChild(emptyDay);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        day.dataset.date = dateString;

        if (selectedDate === dateString) {
            day.classList.add('selected');
        }

        // Highlight days with schedules
        if (scheduleData[dateString]) {
            day.style.borderBottom = '3px solid var(--primary-color)';
        }

        day.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            day.classList.add('selected');
            selectedDate = day.dataset.date;
            renderTimeSlots();
        });
        calendarContainer.appendChild(day);
    }
};

const renderTimeSlots = () => {
    timeSlotsContainer.innerHTML = '';
    selectedDateEl.textContent = `${selectedDate} 일정`;

    for (let i = 0; i < 24; i++) {
        const time = `${String(i).padStart(2, '0')}:00`;
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        
        let displayContent = time;
        if (scheduleData[selectedDate] && scheduleData[selectedDate][time]) {
            timeSlot.classList.add('has-schedule');
            displayContent += ` - ${scheduleData[selectedDate][time]}`;
        }

        timeSlot.textContent = displayContent;
        timeSlot.dataset.time = time;

        timeSlot.addEventListener('click', () => {
            selectedTime = time;
            openModal();
        });
        timeSlotsContainer.appendChild(timeSlot);
    }
};

const openModal = () => {
    modalTime.textContent = `${selectedDate} ${selectedTime}`;
    scheduleInput.value = (scheduleData[selectedDate] && scheduleData[selectedDate][selectedTime]) || '';
    scheduleModal.style.display = 'block';
    scheduleInput.focus();
};

const closeModal = () => {
    scheduleModal.style.display = 'none';
};

const saveSchedule = () => {
    const scheduleText = scheduleInput.value.trim();
    if (scheduleText) {
        if (!scheduleData[selectedDate]) {
            scheduleData[selectedDate] = {};
        }
        scheduleData[selectedDate][selectedTime] = scheduleText;
    } else {
        deleteScheduleLogic();
    }
    saveToLocal();
    closeModal();
    renderTimeSlots();
    renderCalendar(); // Update calendar markers
};

const deleteScheduleLogic = () => {
    if (scheduleData[selectedDate] && scheduleData[selectedDate][selectedTime]) {
        delete scheduleData[selectedDate][selectedTime];
        if (Object.keys(scheduleData[selectedDate]).length === 0) {
            delete scheduleData[selectedDate];
        }
    }
};

const deleteSchedule = () => {
    deleteScheduleLogic();
    saveToLocal();
    closeModal();
    renderTimeSlots();
    renderCalendar();
};

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === scheduleModal) {
        closeModal();
    }
});

saveScheduleBtn.addEventListener('click', saveSchedule);
deleteScheduleBtn.addEventListener('click', deleteSchedule);

renderCalendar();

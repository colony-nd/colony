const calendarContainer = document.getElementById('calendar');
const currentMonthEl = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');
const selectedDateEl = document.getElementById('selected-date');
const timeSlotsContainer = document.getElementById('time-slots');
const scheduleModal = document.getElementById('schedule-modal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close-btn');
const modalTime = document.getElementById('modal-time');
const scheduleInput = document.getElementById('schedule-input');
const saveScheduleBtn = document.getElementById('save-schedule-btn');
const deleteScheduleBtn = document.getElementById('delete-schedule-btn');

let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;
const scheduleData = {}; // { "YYYY-MM-DD": { "HH:MM": "schedule text" } }

const renderCalendar = () => {
    calendarContainer.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonthEl.textContent = `${year} / ${month + 1}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        calendarContainer.appendChild(emptyDay);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;
        day.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        day.addEventListener('click', () => {
            selectedDate = day.dataset.date;
            renderTimeSlots();
        });
        calendarContainer.appendChild(day);
    }
};

const renderTimeSlots = () => {
    timeSlotsContainer.innerHTML = '';
    selectedDateEl.textContent = selectedDate;

    for (let i = 0; i < 24; i++) {
        const time = `${String(i).padStart(2, '0')}:00`;
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        timeSlot.textContent = time;
        timeSlot.dataset.time = time;

        if (scheduleData[selectedDate] && scheduleData[selectedDate][time]) {
            timeSlot.classList.add('has-schedule');
        }

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
        deleteSchedule();
    }
    closeModal();
    renderTimeSlots();
};

const deleteSchedule = () => {
    if (scheduleData[selectedDate] && scheduleData[selectedDate][selectedTime]) {
        delete scheduleData[selectedDate][selectedTime];
        if (Object.keys(scheduleData[selectedDate]).length === 0) {
            delete scheduleData[selectedDate];
        }
    }
    closeModal();
    renderTimeSlots();
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

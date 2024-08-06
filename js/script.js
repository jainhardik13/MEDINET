function searchDoctors() {
    const searchTerm = document.getElementById('doctorSearch').value.toLowerCase();
    const doctorResults = document.getElementById('doctorResults');
    
    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) || 
        doctor.specialty.toLowerCase().includes(searchTerm)
    );

    doctorResults.innerHTML = '';
    filteredDoctors.forEach(doctor => {
        doctorResults.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${doctor.name}</h5>
                    <p class="card-text">Specialty: ${doctor.specialty}</p>
                    <p class="card-text">Available on: ${doctor.availability.join(', ')}</p>
                    <button class="btn btn-primary" onclick="bookAppointment(${doctor.id})">Book Appointment</button>
                </div>
            </div>
        `;
    });
}

function bookAppointment(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
        localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
        window.location.href = 'appointment.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Appointment booked successfully!');
            appointmentForm.reset();
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        const selectedDoctor = JSON.parse(localStorage.getItem('selectedDoctor'));
        if (selectedDoctor) {
            document.getElementById('selectedDoctor').value = selectedDoctor.name;
            const dateSelect = document.getElementById('date');
            selectedDoctor.availability.forEach(day => {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day;
                dateSelect.appendChild(option);
            });
        }

        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            alert(`Appointment booked for ${name} with ${selectedDoctor.name} on ${date}`);
            appointmentForm.reset();
            localStorage.removeItem('selectedDoctor');
        });
    }
});

function displayFeaturedDoctors() {
    const featuredDoctors = doctors.slice(0, 3); // Display first 3 doctors
    const container = document.getElementById('featuredDoctors');
    if (container) {
        featuredDoctors.forEach(doctor => {
            container.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${doctor.name}</h5>
                            <p class="card-text">${doctor.specialty}</p>
                            <a href="doctors.html" class="btn btn-primary">Book Now</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

document.addEventListener('DOMContentLoaded', displayFeaturedDoctors);

const doctors = [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiology", availability: ["Monday", "Wednesday", "Friday"] },
    { id: 2, name: "Dr. Sarah Johnson", specialty: "Pediatrics", availability: ["Tuesday", "Thursday", "Saturday"] },
    { id: 3, name: "Dr. Michael Williams", specialty: "Orthopedics", availability: ["Monday", "Tuesday", "Friday"] },
    // Add more doctors as needed
];
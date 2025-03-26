document.addEventListener("DOMContentLoaded", function () {
    const categories = ["core", "intel", "physical", "spiritual", "psyche"];
    
    let dataPoints = {
        "core": 0, "intel": 0, "physical": 0, "spiritual": 0, "psyche": 0
    };
    
    let levels = {
        "core": 1, "intel": 1, "physical": 1, "spiritual": 1, "psyche": 1
    };
    
    let reasons = [];

    const ctx = document.getElementById('radarChart').getContext('2d');
    let radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Category Points',
                data: categories.map(cat => dataPoints[cat]),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: { beginAtZero: true }
            }
        }
    });

    function updateRadarChart() {
        radarChart.data.datasets[0].data = categories.map(cat => dataPoints[cat]);
        radarChart.update();
    }

    function updateReasonsList() {
        let list = document.getElementById('reasonsList');
        list.innerHTML = "";
        reasons.forEach(reason => {
            let li = document.createElement('li');
            li.textContent = reason;
            list.appendChild(li);
        });
    }

    function updateProgress(category) {
        let progressBar = document.getElementById(`${category}-progress`);
        let levelDisplay = document.getElementById(`${category}-level`);
        
        progressBar.value = dataPoints[category];

        if (dataPoints[category] >= 100) {
            levels[category]++;
            dataPoints[category] = 0; // Reset progress for that category
            levelDisplay.textContent = levels[category];
            progressBar.value = dataPoints[category];
        }
    }

    document.getElementById('dataForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        let category = document.getElementById('category').value;
        let reason = document.getElementById('reason').value;
        let points = parseInt(document.getElementById('points').value) || 0;

        if (category !== "n/a") {
            dataPoints[category] += points;
            reasons.push(`${category}: ${reason}`);
            updateReasonsList();
            updateRadarChart();
            updateProgress(category);
        }

        this.reset();
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        categories.forEach(cat => {
            dataPoints[cat] = 0;
            levels[cat] = 1;  // Reset levels
            document.getElementById(`${cat}-progress`).value = 0;
            document.getElementById(`${cat}-level`).textContent = 1; // Update UI
        });

        reasons = [];
        updateReasonsList();
        updateRadarChart();
    });

    console.log("Chart initialized successfully!");
});

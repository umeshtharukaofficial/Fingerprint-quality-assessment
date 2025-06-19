// Global variables
let dashboardData = null;
let currentPage = 1;
const rowsPerPage = 5;
let filteredData = [];
let currentFilter = 'all';
let liveUpdateInterval = null;

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the dashboard data
    fetchDashboardData();
    
    // Add event listeners
    document.getElementById('statusFilter').addEventListener('change', handleFilterChange);
    document.getElementById('refreshData').addEventListener('click', refreshData);
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
    document.getElementById('liveUpdates').addEventListener('change', toggleLiveUpdates);
    document.getElementById('modalClose').addEventListener('click', closeModal);
    
    // Update timestamp initially and then every second
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
});

// Fetch the dashboard data from the JSON file
async function fetchDashboardData() {
    try {
        const response = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/8a8d434335fd0bfc76a277f7cd97d2de/038a6e1e-df07-4516-8dea-87aeadbe65d8/4911ab42.json');
        dashboardData = await response.json();
        
        // Initialize the dashboard with the data
        initializeDashboard(dashboardData);
        
        // Enable live updates if checkbox is checked
        if (document.getElementById('liveUpdates').checked) {
            toggleLiveUpdates();
        }
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to use the example data
        dashboardData = {
            "metadata": {
                "generated_at": "2025-06-19T10:15:00",
                "total_entries": 50,
                "data_source": "Simulated NFIQ2-based Quality Assessment",
                "version": "1.0"
            },
            "summary_stats": {
                "total_scans": 50,
                "good": 13,
                "warning": 23,
                "critical": 14,
                "average_quality": 50.7,
                "flagged_entries": 19
            },
            "quality_distribution": {
                "Excellent": 7,
                "Very Good": 6,
                "Good": 16,
                "Fair": 9,
                "Poor": 12
            },
            "time_series": [
                {"hour": 0, "average_quality": 45.2, "entry_count": 2},
                {"hour": 1, "average_quality": 62.1, "entry_count": 3},
                {"hour": 2, "average_quality": 38.5, "entry_count": 1},
                {"hour": 3, "average_quality": 71.3, "entry_count": 4},
                {"hour": 4, "average_quality": 55.8, "entry_count": 2},
                {"hour": 5, "average_quality": 49.2, "entry_count": 3},
                {"hour": 6, "average_quality": 68.7, "entry_count": 5},
                {"hour": 7, "average_quality": 42.1, "entry_count": 3},
                {"hour": 8, "average_quality": 76.4, "entry_count": 6},
                {"hour": 9, "average_quality": 33.9, "entry_count": 2},
                {"hour": 10, "average_quality": 58.3, "entry_count": 4},
                {"hour": 11, "average_quality": 61.7, "entry_count": 3},
                {"hour": 12, "average_quality": 47.5, "entry_count": 5},
                {"hour": 13, "average_quality": 72.8, "entry_count": 4},
                {"hour": 14, "average_quality": 39.6, "entry_count": 2},
                {"hour": 15, "average_quality": 65.2, "entry_count": 3},
                {"hour": 16, "average_quality": 51.9, "entry_count": 1},
                {"hour": 17, "average_quality": 44.3, "entry_count": 2},
                {"hour": 18, "average_quality": 69.1, "entry_count": 0},
                {"hour": 19, "average_quality": 36.7, "entry_count": 0},
                {"hour": 20, "average_quality": 59.4, "entry_count": 0},
                {"hour": 21, "average_quality": 73.6, "entry_count": 0},
                {"hour": 22, "average_quality": 41.8, "entry_count": 0},
                {"hour": 23, "average_quality": 67.9, "entry_count": 0}
            ],
            "model_performance": {
                "total_processed": 50,
                "accuracy": 0.927,
                "precision": 0.851,
                "recall": 0.896,
                "f1_score": 0.873,
                "processing_rate": 39.4,
                "uptime": 95.41
            },
            "system_alerts": [
                {
                    "id": "ALERT_001",
                    "type": "Warning",
                    "message": "High number of poor quality scans detected in last hour",
                    "timestamp": "2025-06-19T09:52:00",
                    "severity": "Medium"
                },
                {
                    "id": "ALERT_002",
                    "type": "Critical", 
                    "message": "Sensor calibration required - quality degradation detected",
                    "timestamp": "2025-06-19T09:30:00",
                    "severity": "High"
                },
                {
                    "id": "ALERT_003",
                    "type": "Info",
                    "message": "Model performance metrics updated successfully",
                    "timestamp": "2025-06-19T10:10:00",
                    "severity": "Low"
                }
            ],
            "fingerprint_entries": [
                {"id": "FP_001", "subject_id": "SUBJ_7432", "timestamp": "2025-06-19T09:23:45", "nfiq2_score": 15, "nfiq1_score": 5, "quality_category": "Poor", "status": "Critical", "ridge_clarity": 0.234, "minutiae_count": 37, "ridge_frequency": 0.1123, "orientation_quality": 0.445, "sensor_type": "Optical", "capture_resolution": 500, "image_size": "400x400", "processing_time": 2.1, "is_flagged": true, "confidence_score": 0.234, "feature_extraction_status": "Partial", "matching_threshold": 0.67},
                {"id": "FP_002", "subject_id": "SUBJ_3891", "timestamp": "2025-06-19T09:45:12", "nfiq2_score": 51, "nfiq1_score": 3, "quality_category": "Good", "status": "Warning", "ridge_clarity": 0.678, "minutiae_count": 33, "ridge_frequency": 0.0987, "orientation_quality": 0.721, "sensor_type": "Capacitive", "capture_resolution": 1000, "image_size": "512x512", "processing_time": 1.4, "is_flagged": false, "confidence_score": 0.678, "feature_extraction_status": "Success", "matching_threshold": 0.45},
                {"id": "FP_003", "subject_id": "SUBJ_5123", "timestamp": "2025-06-19T08:15:33", "nfiq2_score": 20, "nfiq1_score": 5, "quality_category": "Poor", "status": "Critical", "ridge_clarity": 0.189, "minutiae_count": 35, "ridge_frequency": 0.1456, "orientation_quality": 0.332, "sensor_type": "Ultrasonic", "capture_resolution": 1200, "image_size": "300x300", "processing_time": 2.8, "is_flagged": true, "confidence_score": 0.189, "feature_extraction_status": "Failed", "matching_threshold": 0.72},
                {"id": "FP_004", "subject_id": "SUBJ_9876", "timestamp": "2025-06-19T07:32:21", "nfiq2_score": 87, "nfiq1_score": 1, "quality_category": "Excellent", "status": "Good", "ridge_clarity": 0.934, "minutiae_count": 42, "ridge_frequency": 0.0834, "orientation_quality": 0.891, "sensor_type": "Optical", "capture_resolution": 1000, "image_size": "512x512", "processing_time": 0.9, "is_flagged": false, "confidence_score": 0.934, "feature_extraction_status": "Success", "matching_threshold": 0.31},
                {"id": "FP_005", "subject_id": "SUBJ_2345", "timestamp": "2025-06-19T06:48:17", "nfiq2_score": 63, "nfiq1_score": 3, "quality_category": "Good", "status": "Warning", "ridge_clarity": 0.712, "minutiae_count": 28, "ridge_frequency": 0.1034, "orientation_quality": 0.658, "sensor_type": "Capacitive", "capture_resolution": 500, "image_size": "400x400", "processing_time": 1.7, "is_flagged": false, "confidence_score": 0.712, "feature_extraction_status": "Success", "matching_threshold": 0.52}
            ]
        };
        
        initializeDashboard(dashboardData);
    }
}

// Initialize the dashboard with the fetched data
function initializeDashboard(data) {
    // Update summary cards
    updateSummaryCards(data.summary_stats);
    
    // Populate fingerprint table
    populateFingerprints(data.fingerprint_entries);
    
    // Initialize charts
    createQualityChart(data.quality_distribution);
    createTrendChart(data.time_series);
    
    // Populate alerts
    populateAlerts(data.system_alerts);
    
    // Update model performance metrics
    updateModelMetrics(data.model_performance);
}

// Update the summary cards with the latest data
function updateSummaryCards(stats) {
    document.getElementById('totalScans').textContent = stats.total_scans;
    document.getElementById('goodScans').textContent = stats.good;
    document.getElementById('warningScans').textContent = stats.warning;
    document.getElementById('criticalScans').textContent = stats.critical;
    document.getElementById('avgQuality').textContent = stats.average_quality;
    document.getElementById('flaggedEntries').textContent = stats.flagged_entries;
}

// Populate the fingerprint table with entries
function populateFingerprints(entries) {
    filteredData = filterData(entries, currentFilter);
    const tableBody = document.getElementById('fingerprintTableBody');
    tableBody.innerHTML = ''; // Clear the table
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Update page info
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages || 1}`;
    
    // Enable/disable pagination buttons
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage >= totalPages;
    
    // Populate table with data
    paginatedData.forEach(entry => {
        const row = document.createElement('tr');
        
        // Determine status class for color-coding
        const statusClass = entry.status.toLowerCase();
        
        row.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.subject_id}</td>
            <td>${formatTimestamp(entry.timestamp)}</td>
            <td>${entry.nfiq2_score}</td>
            <td>${entry.quality_category}</td>
            <td><span class="status-badge ${statusClass}">${entry.status}</span></td>
            <td>${entry.minutiae_count}</td>
            <td>
                <button class="action-btn view" data-id="${entry.id}">View</button>
                <button class="action-btn flag ${entry.is_flagged ? 'active' : ''}" data-id="${entry.id}">
                    ${entry.is_flagged ? 'Unflag' : 'Flag'}
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to the view buttons
    const viewButtons = document.querySelectorAll('.action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const entryId = button.getAttribute('data-id');
            const entry = dashboardData.fingerprint_entries.find(e => e.id === entryId);
            if (entry) {
                showEntryDetails(entry);
            }
        });
    });
    
    // Add event listeners to the flag buttons
    const flagButtons = document.querySelectorAll('.action-btn.flag');
    flagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const entryId = button.getAttribute('data-id');
            const entry = dashboardData.fingerprint_entries.find(e => e.id === entryId);
            if (entry) {
                entry.is_flagged = !entry.is_flagged;
                button.textContent = entry.is_flagged ? 'Unflag' : 'Flag';
                button.classList.toggle('active', entry.is_flagged);
                
                // Update flagged entries count
                const flaggedCount = dashboardData.fingerprint_entries.filter(e => e.is_flagged).length;
                dashboardData.summary_stats.flagged_entries = flaggedCount;
                document.getElementById('flaggedEntries').textContent = flaggedCount;
            }
        });
    });
}

// Filter data based on selected status
function filterData(data, filter) {
    if (filter === 'all') {
        return [...data]; // Return a copy of the array
    }
    return data.filter(entry => entry.status === filter);
}

// Handle filter change
function handleFilterChange(event) {
    currentFilter = event.target.value;
    currentPage = 1; // Reset to first page when filter changes
    populateFingerprints(dashboardData.fingerprint_entries);
}

// Change page in the pagination
function changePage(direction) {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        populateFingerprints(dashboardData.fingerprint_entries);
    }
}

// Create quality distribution chart
function createQualityChart(qualityData) {
    const ctx = document.getElementById('qualityChart').getContext('2d');
    
    // Extract data for the chart
    const labels = Object.keys(qualityData);
    const values = Object.values(qualityData);
    
    // Define colors for each quality level
    const backgroundColors = [
        '#00ff41', // Excellent - bright green
        '#66ff66', // Very Good - light green
        '#ffaa00', // Good - yellow/orange
        '#ff7700', // Fair - orange
        '#ff3333'  // Poor - red
    ];
    
    // Create the chart
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: backgroundColors,
                borderColor: '#1a1a1a',
                borderWidth: 2,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#cccccc',
                        font: {
                            family: 'Fira Code, monospace',
                            size: 12
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#2a2a2a',
                    titleColor: '#ffffff',
                    bodyColor: '#cccccc',
                    borderColor: '#00ff41',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    titleFont: {
                        family: 'Fira Code, monospace',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Fira Code, monospace',
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

// Create trend chart for quality over time
function createTrendChart(timeSeriesData) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // Extract data for the chart
    const hours = timeSeriesData.map(entry => entry.hour);
    const qualityValues = timeSeriesData.map(entry => entry.average_quality);
    const entryCounts = timeSeriesData.map(entry => entry.entry_count);
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours.map(hour => `${hour}:00`),
            datasets: [
                {
                    label: 'Average Quality',
                    data: qualityValues,
                    borderColor: '#00ff41',
                    backgroundColor: 'rgba(0, 255, 65, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Entry Count',
                    data: entryCounts,
                    borderColor: '#33aaff',
                    backgroundColor: 'rgba(51, 170, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#cccccc',
                        font: {
                            family: 'Fira Code, monospace',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#2a2a2a',
                    titleColor: '#ffffff',
                    bodyColor: '#cccccc',
                    borderColor: '#00ff41',
                    borderWidth: 1,
                    cornerRadius: 8,
                    titleFont: {
                        family: 'Fira Code, monospace',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Fira Code, monospace',
                        size: 12
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc',
                        font: {
                            family: 'Fira Code, monospace',
                            size: 10
                        },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Quality Score',
                        color: '#00ff41',
                        font: {
                            family: 'Fira Code, monospace',
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#00ff41',
                        font: {
                            family: 'Fira Code, monospace',
                            size: 10
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Entry Count',
                        color: '#33aaff',
                        font: {
                            family: 'Fira Code, monospace',
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#33aaff',
                        font: {
                            family: 'Fira Code, monospace',
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

// Populate system alerts
function populateAlerts(alerts) {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = ''; // Clear the alerts
    
    // Update alert count
    document.getElementById('alertCount').textContent = alerts.length;
    
    // Populate alerts list
    alerts.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = 'alert-item';
        
        // Determine alert icon based on type
        let iconClass = 'info';
        if (alert.type === 'Warning') iconClass = 'warning';
        if (alert.type === 'Critical') iconClass = 'critical';
        
        alertItem.innerHTML = `
            <div class="alert-icon ${iconClass}">
                <i class="fas fa-${iconClass === 'info' ? 'info-circle' : iconClass === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-message">${alert.message}</div>
                <div class="alert-time">${formatTimestamp(alert.timestamp)} | ${alert.severity} Severity</div>
            </div>
        `;
        
        alertsList.appendChild(alertItem);
    });
}

// Update model performance metrics
function updateModelMetrics(metrics) {
    // The metrics are already in the HTML but we could update them dynamically if needed
    document.querySelector('.metric-item:nth-child(1) .metric-value').textContent = `${(metrics.accuracy * 100).toFixed(1)}%`;
    document.querySelector('.metric-item:nth-child(1) .metric-fill').style.width = `${metrics.accuracy * 100}%`;
    
    document.querySelector('.metric-item:nth-child(2) .metric-value').textContent = `${(metrics.precision * 100).toFixed(1)}%`;
    document.querySelector('.metric-item:nth-child(2) .metric-fill').style.width = `${metrics.precision * 100}%`;
    
    document.querySelector('.metric-item:nth-child(3) .metric-value').textContent = `${(metrics.recall * 100).toFixed(1)}%`;
    document.querySelector('.metric-item:nth-child(3) .metric-fill').style.width = `${metrics.recall * 100}%`;
    
    document.querySelector('.metric-item:nth-child(4) .metric-value').textContent = `${(metrics.f1_score * 100).toFixed(1)}%`;
    document.querySelector('.metric-item:nth-child(4) .metric-fill').style.width = `${metrics.f1_score * 100}%`;
}

// Show the details modal for a fingerprint entry
function showEntryDetails(entry) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    
    // Determine status class for color-coding
    const statusClass = entry.status.toLowerCase();
    
    // Create the detail content
    modalBody.innerHTML = `
        <div class="detail-grid">
            <div class="detail-section">
                <h4 class="detail-header">Identification</h4>
                <div class="detail-row">
                    <div class="detail-label">Fingerprint ID:</div>
                    <div class="detail-value">${entry.id}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Subject ID:</div>
                    <div class="detail-value">${entry.subject_id}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Timestamp:</div>
                    <div class="detail-value">${formatTimestamp(entry.timestamp)}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4 class="detail-header">Quality Assessment</h4>
                <div class="detail-row">
                    <div class="detail-label">NFIQ2 Score:</div>
                    <div class="detail-value">${entry.nfiq2_score}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">NFIQ1 Score:</div>
                    <div class="detail-value">${entry.nfiq1_score}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Quality Category:</div>
                    <div class="detail-value">${entry.quality_category}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Status:</div>
                    <div class="detail-value"><span class="status-badge ${statusClass}">${entry.status}</span></div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4 class="detail-header">Fingerprint Features</h4>
                <div class="detail-row">
                    <div class="detail-label">Ridge Clarity:</div>
                    <div class="detail-value">${entry.ridge_clarity.toFixed(3)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Minutiae Count:</div>
                    <div class="detail-value">${entry.minutiae_count}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Ridge Frequency:</div>
                    <div class="detail-value">${entry.ridge_frequency.toFixed(4)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Orientation Quality:</div>
                    <div class="detail-value">${entry.orientation_quality.toFixed(3)}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4 class="detail-header">Technical Details</h4>
                <div class="detail-row">
                    <div class="detail-label">Sensor Type:</div>
                    <div class="detail-value">${entry.sensor_type}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Capture Resolution:</div>
                    <div class="detail-value">${entry.capture_resolution} dpi</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Image Size:</div>
                    <div class="detail-value">${entry.image_size}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Processing Time:</div>
                    <div class="detail-value">${entry.processing_time} sec</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4 class="detail-header">Analysis Results</h4>
                <div class="detail-row">
                    <div class="detail-label">Confidence Score:</div>
                    <div class="detail-value">${entry.confidence_score.toFixed(3)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Feature Extraction:</div>
                    <div class="detail-value">${entry.feature_extraction_status}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Matching Threshold:</div>
                    <div class="detail-value">${entry.matching_threshold.toFixed(2)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Flagged:</div>
                    <div class="detail-value">${entry.is_flagged ? 'Yes' : 'No'}</div>
                </div>
            </div>
        </div>
        
        <div class="detail-actions">
            <button class="btn-detail-action ${entry.is_flagged ? 'unflag' : 'flag'}" id="toggleFlag">
                <i class="fas fa-flag"></i> ${entry.is_flagged ? 'Remove Flag' : 'Flag Entry'}
            </button>
            <button class="btn-detail-action export">
                <i class="fas fa-file-export"></i> Export Data
            </button>
            <button class="btn-detail-action analyze">
                <i class="fas fa-microscope"></i> Detailed Analysis
            </button>
        </div>
    `;
    
    // Add custom styles for the modal
    modalBody.innerHTML += `
        <style>
            .detail-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }
            .detail-section {
                background: var(--bg-secondary);
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 16px;
            }
            .detail-header {
                color: var(--green-primary);
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 8px;
                margin-bottom: 12px;
                font-weight: 600;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            .detail-label {
                color: var(--text-secondary);
                font-size: 12px;
            }
            .detail-value {
                color: var(--text-primary);
                font-weight: 500;
                font-size: 14px;
            }
            .detail-actions {
                display: flex;
                justify-content: center;
                gap: 12px;
                margin-top: 20px;
            }
            .btn-detail-action {
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-family: var(--font-cyber);
                font-size: 14px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .btn-detail-action:hover {
                border-color: var(--green-primary);
                color: var(--green-primary);
            }
            .btn-detail-action.flag:hover, .btn-detail-action.unflag:hover {
                background: var(--status-critical);
                color: var(--text-primary);
                border-color: var(--status-critical);
            }
            .btn-detail-action.export:hover {
                background: var(--status-info);
                color: var(--text-primary);
                border-color: var(--status-info);
            }
            .btn-detail-action.analyze:hover {
                background: var(--green-primary);
                color: var(--bg-primary);
                border-color: var(--green-primary);
            }
            @media (max-width: 768px) {
                .detail-grid {
                    grid-template-columns: 1fr;
                }
                .detail-actions {
                    flex-direction: column;
                }
            }
        </style>
    `;
    
    // Show the modal
    modal.style.display = 'block';
    
    // Add event listener to the toggle flag button
    document.getElementById('toggleFlag').addEventListener('click', () => {
        entry.is_flagged = !entry.is_flagged;
        
        // Update the button text and class
        const flagButton = document.getElementById('toggleFlag');
        flagButton.textContent = entry.is_flagged ? 'Remove Flag' : 'Flag Entry';
        flagButton.className = `btn-detail-action ${entry.is_flagged ? 'unflag' : 'flag'}`;
        
        // Update the flagged value in the modal
        const flaggedValue = modalBody.querySelector('.detail-row:last-child .detail-value');
        flaggedValue.textContent = entry.is_flagged ? 'Yes' : 'No';
        
        // Update the table row button
        populateFingerprints(dashboardData.fingerprint_entries);
        
        // Update flagged entries count
        const flaggedCount = dashboardData.fingerprint_entries.filter(e => e.is_flagged).length;
        dashboardData.summary_stats.flagged_entries = flaggedCount;
        document.getElementById('flaggedEntries').textContent = flaggedCount;
    });
}

// Close the detail modal
function closeModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// Toggle live updates
function toggleLiveUpdates() {
    const isChecked = document.getElementById('liveUpdates').checked;
    
    if (isChecked && !liveUpdateInterval) {
        // Start live updates
        liveUpdateInterval = setInterval(() => {
            simulateDataUpdate();
        }, 5000); // Update every 5 seconds
    } else if (!isChecked && liveUpdateInterval) {
        // Stop live updates
        clearInterval(liveUpdateInterval);
        liveUpdateInterval = null;
    }
}

// Simulate data updates for live mode
function simulateDataUpdate() {
    if (!dashboardData) return;
    
    // Add a slight animation effect
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('scanning');
        setTimeout(() => {
            card.classList.remove('scanning');
        }, 2000);
    });
    
    // Simulate changing quality scores
    dashboardData.fingerprint_entries.forEach(entry => {
        // Randomly adjust quality scores within a small range
        const delta = Math.random() * 10 - 5; // Random change between -5 and +5
        entry.nfiq2_score = Math.max(1, Math.min(100, Math.round(entry.nfiq2_score + delta)));
        
        // Update quality category and status based on new score
        if (entry.nfiq2_score >= 80) {
            entry.quality_category = 'Excellent';
            entry.status = 'Good';
        } else if (entry.nfiq2_score >= 60) {
            entry.quality_category = 'Very Good';
            entry.status = 'Good';
        } else if (entry.nfiq2_score >= 40) {
            entry.quality_category = 'Good';
            entry.status = 'Warning';
        } else if (entry.nfiq2_score >= 20) {
            entry.quality_category = 'Fair';
            entry.status = 'Warning';
        } else {
            entry.quality_category = 'Poor';
            entry.status = 'Critical';
        }
    });
    
    // Update summary stats
    const goodCount = dashboardData.fingerprint_entries.filter(e => e.status === 'Good').length;
    const warningCount = dashboardData.fingerprint_entries.filter(e => e.status === 'Warning').length;
    const criticalCount = dashboardData.fingerprint_entries.filter(e => e.status === 'Critical').length;
    const avgQuality = dashboardData.fingerprint_entries.reduce((acc, curr) => acc + curr.nfiq2_score, 0) / dashboardData.fingerprint_entries.length;
    
    dashboardData.summary_stats.good = goodCount;
    dashboardData.summary_stats.warning = warningCount;
    dashboardData.summary_stats.critical = criticalCount;
    dashboardData.summary_stats.average_quality = avgQuality.toFixed(1);
    
    // Update the UI
    updateSummaryCards(dashboardData.summary_stats);
    populateFingerprints(dashboardData.fingerprint_entries);
    
    // Add a new alert occasionally
    if (Math.random() > 0.7) { // 30% chance of new alert
        const alertTypes = ['Info', 'Warning', 'Critical'];
        const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const alertMessages = [
            'New fingerprint scan processed',
            'Quality threshold adjusted automatically',
            'Sensor recalibration recommended',
            'Performance optimization complete',
            'System resource usage spike detected'
        ];
        const randomMessage = alertMessages[Math.floor(Math.random() * alertMessages.length)];
        const severities = ['Low', 'Medium', 'High'];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        
        const newAlert = {
            id: `ALERT_${Math.floor(Math.random() * 1000)}`,
            type: randomType,
            message: randomMessage,
            timestamp: new Date().toISOString(),
            severity: randomSeverity
        };
        
        // Add to beginning of alerts array
        dashboardData.system_alerts.unshift(newAlert);
        
        // Keep only the most recent 10 alerts
        if (dashboardData.system_alerts.length > 10) {
            dashboardData.system_alerts.pop();
        }
        
        // Update alerts display
        populateAlerts(dashboardData.system_alerts);
    }
}

// Update the timestamp display
function updateTimestamp() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    document.getElementById('currentTimestamp').textContent = `${formattedDate} ${formattedTime}`;
}

// Format ISO timestamp to readable format
function formatTimestamp(isoTimestamp) {
    const date = new Date(isoTimestamp);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Refresh data (simulate new data)
function refreshData() {
    // Add rotating animation to refresh button
    const refreshButton = document.getElementById('refreshData');
    refreshButton.classList.add('rotating');
    
    // Simulate a delay for data loading
    setTimeout(() => {
        simulateDataUpdate();
        refreshButton.classList.remove('rotating');
    }, 1000);
}

// Add rotation animation for the refresh button
const style = document.createElement('style');
style.textContent = `
    @keyframes rotating {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .rotating {
        animation: rotating 1s linear infinite;
    }
`;
document.head.appendChild(style);
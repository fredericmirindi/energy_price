// Energy Price Forecasting Application JavaScript

// Application data
const appData = {
  models: [
    {
      name: "LSTM",
      description: "Long Short-Term Memory networks for capturing temporal dependencies",
      accuracy: "92.5%",
      rmse: 0.0248,
      mae: 0.0189
    },
    {
      name: "Transformer",
      description: "Attention-based architecture for sequence modeling",
      accuracy: "94.2%",
      rmse: 0.0208,
      mae: 0.0165
    },
    {
      name: "XGBoost",
      description: "Gradient boosting for non-linear patterns",
      accuracy: "90.8%",
      rmse: 0.0315,
      mae: 0.0241
    },
    {
      name: "Random Forest",
      description: "Ensemble method for robust predictions",
      accuracy: "89.5%",
      rmse: 0.0342,
      mae: 0.0268
    }
  ],
  priceData: {
    current: 45.23,
    trend: "up",
    changePercent: 2.5,
    forecast24h: [45.23, 46.12, 47.35, 48.92, 50.15, 51.23, 49.87, 48.65, 47.23, 46.15, 45.92, 45.65, 46.23, 47.85, 49.23, 51.45, 53.12, 54.23, 52.87, 50.65, 48.92, 47.15, 46.23, 45.87],
    historical7d: [42.15, 43.23, 44.87, 43.92, 45.15, 44.23, 45.23]
  }
};

// Global variables
let forecastChart = null;
let historicalChart = null;
let comparisonChart = null;
let currentModel = 'transformer';
let isDarkMode = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing application...');
  initializeNavigation();
  initializeTheme();
  initializeMobileMenu();
  initializePriceTicker();
  initializeModelSelection();
  initializeApiPlayground();
  
  // Initialize charts after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeCharts();
  }, 100);
  
  // Start real-time updates
  startRealTimeUpdates();
  
  console.log('Application initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
  console.log('Initializing navigation...');
  
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const heroButtons = document.querySelectorAll('[data-section]');

  console.log('Found nav links:', navLinks.length);
  console.log('Found sections:', sections.length);
  console.log('Found hero buttons:', heroButtons.length);

  // Handle navigation clicks
  function handleNavigation(targetSection) {
    console.log('Navigating to:', targetSection);
    
    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === targetSection) {
        link.classList.add('active');
      }
    });

    // Show target section
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === targetSection) {
        section.classList.add('active');
        console.log('Activated section:', targetSection);
      }
    });
    
    // Initialize charts when dashboard is shown
    if (targetSection === 'dashboard') {
      setTimeout(() => {
        initializeCharts();
        if (forecastChart) forecastChart.resize();
        if (historicalChart) historicalChart.resize();
      }, 100);
    }
    
    // Initialize comparison chart when models section is shown
    if (targetSection === 'models') {
      setTimeout(() => {
        if (!comparisonChart) {
          createComparisonChart();
        }
        if (comparisonChart) comparisonChart.resize();
      }, 100);
    }

    // Close mobile menu
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
      navMenu.classList.remove('active');
    }
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Add click listeners to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      console.log('Nav link clicked:', targetSection);
      if (targetSection) {
        handleNavigation(targetSection);
      }
    });
  });

  // Add click listeners to hero buttons
  heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = button.getAttribute('data-section');
      console.log('Hero button clicked:', targetSection);
      if (targetSection) {
        handleNavigation(targetSection);
      }
    });
  });
  
  console.log('Navigation initialized');
}

// Theme switching
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  isDarkMode = localStorage.getItem('theme') === 'dark' || 
              (localStorage.getItem('theme') === null && prefersDark);
  
  updateTheme();
  
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    updateTheme();
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

function updateTheme() {
  const themeToggle = document.getElementById('themeToggle');
  
  if (isDarkMode) {
    document.documentElement.setAttribute('data-color-scheme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-color-scheme', 'light');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
  
  // Update charts if they exist
  setTimeout(updateChartThemes, 100);
}

// Mobile menu functionality
function initializeMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (!mobileToggle || !navMenu) return;
  
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

// Price ticker functionality
function initializePriceTicker() {
  updatePriceTicker();
}

function updatePriceTicker() {
  const tickerPrice = document.getElementById('tickerPrice');
  const tickerTrend = document.getElementById('tickerTrend');
  
  if (tickerPrice) {
    tickerPrice.textContent = `$${appData.priceData.current.toFixed(2)}`;
  }
  
  if (tickerTrend) {
    const changeText = appData.priceData.trend === 'up' ? '▲' : '▼';
    tickerTrend.textContent = `${changeText} ${appData.priceData.changePercent}%`;
    tickerTrend.className = `ticker-trend ${appData.priceData.trend === 'up' ? 'positive' : 'negative'}`;
  }
}

// Chart initialization and management
function initializeCharts() {
  console.log('Initializing charts...');
  
  if (!forecastChart) {
    createForecastChart();
  }
  if (!historicalChart) {
    createHistoricalChart();
  }
  if (!comparisonChart) {
    createComparisonChart();
  }
}

function createForecastChart() {
  const ctx = document.getElementById('forecastChart');
  if (!ctx) {
    console.log('Forecast chart canvas not found');
    return;
  }
  
  console.log('Creating forecast chart...');
  
  const hours = Array.from({length: 24}, (_, i) => {
    const hour = new Date();
    hour.setHours(hour.getHours() + i);
    return hour.getHours().toString().padStart(2, '0') + ':00';
  });
  
  forecastChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        label: '24-Hour Forecast ($/MWh)',
        data: appData.priceData.forecast24h,
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#1FB8CD',
        pointBorderColor: '#1FB8CD',
        pointRadius: 3,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          labels: {
            color: isDarkMode ? '#f5f5f5' : '#134252'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.raw.toFixed(2);
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: isDarkMode ? '#a7a9a9' : '#626c71',
            maxTicksLimit: 12
          },
          grid: {
            color: isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)'
          }
        },
        y: {
          ticks: {
            color: isDarkMode ? '#a7a9a9' : '#626c71',
            callback: function(value) {
              return '$' + value.toFixed(2);
            }
          },
          grid: {
            color: isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)'
          }
        }
      }
    }
  });
  
  console.log('Forecast chart created successfully');
}

function createHistoricalChart() {
  const ctx = document.getElementById('historicalChart');
  if (!ctx) {
    console.log('Historical chart canvas not found');
    return;
  }
  
  console.log('Creating historical chart...');
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  historicalChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: '7-Day Historical ($/MWh)',
        data: appData.priceData.historical7d,
        backgroundColor: '#FFC185',
        borderColor: '#B4413C',
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: isDarkMode ? '#f5f5f5' : '#134252'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.raw.toFixed(2);
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: isDarkMode ? '#a7a9a9' : '#626c71'
          },
          grid: {
            color: isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)'
          }
        },
        y: {
          ticks: {
            color: isDarkMode ? '#a7a9a9' : '#626c71',
            callback: function(value) {
              return '$' + value.toFixed(2);
            }
          },
          grid: {
            color: isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)'
          }
        }
      }
    }
  });
  
  console.log('Historical chart created successfully');
}

function createComparisonChart() {
  const ctx = document.getElementById('comparisonChart');
  if (!ctx) {
    console.log('Comparison chart canvas not found');
    return;
  }
  
  console.log('Creating comparison chart...');
  
  const modelNames = appData.models.map(model => model.name);
  const accuracyData = appData.models.map(model => parseFloat(model.accuracy));
  const rmseData = appData.models.map(model => model.rmse * 100); // Scale for visibility
  
  comparisonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: modelNames,
      datasets: [
        {
          label: 'Accuracy (%)',
          data: accuracyData,
          backgroundColor: '#1FB8CD',
          borderColor: '#1FB8CD',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'RMSE (×100)',
          data: rmseData,
          backgroundColor: '#FFC185',
          borderColor: '#B4413C',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: isDarkMode ? '#f5f5f5' : '#134252'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: isDarkMode ? '#a7a9a9' : '#626c71'
          },
          grid: {
            color: isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Accuracy (%)',
            color: isDarkMode ? '#a7a9a9' : '#626c71'
          },
          ticks: {
            color: isDarkMode ? '#a7a9a9' : '#626c71'
          },
          grid: {
            color: isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'RMSE (×100)',
            color: isDarkMode ? '#a7a9a9' : '#626c71'
          },
          ticks: {
            color: isDarkMode ? '#a7a9a9' : '#626c71'
          },
          grid: {
            drawOnChartArea: false,
            color: isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)'
          }
        }
      }
    }
  });
  
  console.log('Comparison chart created successfully');
}

function updateChartThemes() {
  const textColor = isDarkMode ? '#f5f5f5' : '#134252';
  const secondaryColor = isDarkMode ? '#a7a9a9' : '#626c71';
  const gridColor = isDarkMode ? 'rgba(119, 124, 124, 0.2)' : 'rgba(94, 82, 64, 0.2)';
  
  [forecastChart, historicalChart, comparisonChart].forEach(chart => {
    if (chart && chart.options) {
      // Update legend colors
      if (chart.options.plugins && chart.options.plugins.legend) {
        chart.options.plugins.legend.labels.color = textColor;
      }
      
      // Update scale colors
      if (chart.options.scales) {
        Object.keys(chart.options.scales).forEach(scaleKey => {
          const scale = chart.options.scales[scaleKey];
          if (scale.ticks) scale.ticks.color = secondaryColor;
          if (scale.grid) scale.grid.color = gridColor;
          if (scale.title) scale.title.color = secondaryColor;
        });
      }
      
      chart.update('none');
    }
  });
}

// Model selection functionality
function initializeModelSelection() {
  const modelSelect = document.getElementById('modelSelect');
  const regionSelect = document.getElementById('regionSelect');
  
  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      currentModel = e.target.value;
      console.log('Model changed to:', currentModel);
      updateModelMetrics();
    });
  }
  
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      console.log('Region changed to:', e.target.value);
      // Simulate region change with small price variations
      const basePrice = appData.priceData.current;
      const variation = (Math.random() - 0.5) * 10; // ±5 price variation
      const newPrice = Math.max(0, basePrice + variation);
      
      updateDashboardPrice(newPrice);
    });
  }
  
  // Initialize with default model
  updateModelMetrics();
}

function updateModelMetrics() {
  const modelData = appData.models.find(model => {
    const modelName = model.name.toLowerCase();
    const currentModelName = currentModel.replace('randomforest', 'random forest').toLowerCase();
    return modelName === currentModelName;
  });
  
  if (modelData) {
    console.log('Updating metrics for model:', modelData.name);
    
    const rmseElement = document.getElementById('rmseValue');
    const maeElement = document.getElementById('maeValue');
    const accuracyElement = document.getElementById('accuracyValue');
    
    if (rmseElement) rmseElement.textContent = modelData.rmse.toFixed(4);
    if (maeElement) maeElement.textContent = modelData.mae.toFixed(4);
    if (accuracyElement) accuracyElement.textContent = modelData.accuracy;
  }
}

function updateDashboardPrice(newPrice) {
  const currentPriceElement = document.getElementById('currentPrice');
  const priceChangeElement = document.getElementById('priceChange');
  
  if (currentPriceElement) {
    currentPriceElement.textContent = `$${newPrice.toFixed(2)}`;
  }
  
  if (priceChangeElement) {
    const change = ((newPrice - appData.priceData.current) / appData.priceData.current * 100);
    const changeText = change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
    priceChangeElement.textContent = changeText;
    priceChangeElement.className = `metric-change ${change >= 0 ? 'positive' : 'negative'}`;
  }
  
  // Update ticker
  appData.priceData.current = newPrice;
  appData.priceData.changePercent = Math.abs(((newPrice - 45.23) / 45.23 * 100));
  appData.priceData.trend = newPrice >= 45.23 ? 'up' : 'down';
  updatePriceTicker();
}

// API Playground functionality
function initializeApiPlayground() {
  const testApiBtn = document.getElementById('testApiBtn');
  const apiEndpoint = document.getElementById('apiEndpoint');
  const apiResponse = document.getElementById('apiResponse');
  
  if (testApiBtn && apiEndpoint && apiResponse) {
    testApiBtn.addEventListener('click', () => {
      const endpoint = apiEndpoint.value;
      console.log('Testing API endpoint:', endpoint);
      simulateApiCall(endpoint, apiResponse);
    });
    
    // Set initial response text
    apiResponse.textContent = 'Click "Test API" to see response data...';
  }
}

function simulateApiCall(endpoint, responseElement) {
  responseElement.textContent = 'Loading...';
  responseElement.classList.add('loading');
  
  // Simulate API delay
  setTimeout(() => {
    responseElement.classList.remove('loading');
    
    let response = {};
    
    switch (endpoint) {
      case '/api/v1/price/current':
        response = {
          price: appData.priceData.current,
          currency: "USD/MWh",
          timestamp: new Date().toISOString(),
          region: "NYISO",
          model: currentModel,
          status: "success"
        };
        break;
        
      case '/api/v1/forecast/24':
        response = {
          forecast: appData.priceData.forecast24h,
          hours: 24,
          model: currentModel,
          confidence: 0.942,
          generated_at: new Date().toISOString(),
          status: "success"
        };
        break;
        
      case '/api/v1/models':
        response = {
          models: appData.models.map(model => ({
            name: model.name.toLowerCase(),
            accuracy: parseFloat(model.accuracy) / 100,
            rmse: model.rmse,
            mae: model.mae,
            description: model.description
          })),
          status: "success"
        };
        break;
        
      default:
        response = { 
          error: 'Endpoint not found',
          status: "error",
          message: "The requested endpoint does not exist"
        };
    }
    
    responseElement.textContent = JSON.stringify(response, null, 2);
    console.log('API response:', response);
  }, 1500);
}

// Real-time updates simulation
function startRealTimeUpdates() {
  console.log('Starting real-time updates...');
  
  setInterval(() => {
    // Simulate small price fluctuations
    const currentPrice = appData.priceData.current;
    const fluctuation = (Math.random() - 0.5) * 0.5; // ±0.25 price change
    const newPrice = Math.max(0, currentPrice + fluctuation);
    
    if (Math.abs(newPrice - currentPrice) > 0.1) {
      updateDashboardPrice(newPrice);
      
      // Update forecast data slightly
      appData.priceData.forecast24h = appData.priceData.forecast24h.map(price => {
        const variation = (Math.random() - 0.5) * 0.3;
        return Math.max(0, price + variation);
      });
      
      // Update forecast chart if visible and exists
      if (forecastChart && document.getElementById('dashboard') && document.getElementById('dashboard').classList.contains('active')) {
        forecastChart.data.datasets[0].data = appData.priceData.forecast24h;
        forecastChart.update('none'); // Update without animation for smoother experience
      }
    }
  }, 5000); // Update every 5 seconds
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
  if (forecastChart) forecastChart.resize();
  if (historicalChart) historicalChart.resize();
  if (comparisonChart) comparisonChart.resize();
}, 250));

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
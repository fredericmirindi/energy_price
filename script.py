import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from matplotlib.patches import FancyBboxPatch, Rectangle
import seaborn as sns

# Set the style
plt.style.use('default')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Arial', 'Helvetica', 'DejaVu Sans']

# Create ML Pipeline Architecture Diagram
fig, ax = plt.subplots(1, 1, figsize=(14, 8))
ax.set_xlim(0, 14)
ax.set_ylim(0, 8)
ax.axis('off')

# Define colors
primary_color = '#0F172A'
secondary_color = '#1E293B'
accent_color = '#10B981'
highlight_color = '#F59E0B'
text_color = '#334155'

# Title
ax.text(7, 7.5, 'Energy Price Forecasting Pipeline', 
        fontsize=24, fontweight='bold', ha='center', color=primary_color)

# Data Sources (Input)
data_sources = ['Weather Data', 'Historical Prices', 'Energy Demand', 'Market Data']
y_start = 5.5
for i, source in enumerate(data_sources):
    rect = FancyBboxPatch((0.5, y_start - i*0.8), 2.5, 0.6, 
                          boxstyle="round,pad=0.05", 
                          facecolor='#E0F2FE', edgecolor='#0284C7', linewidth=2)
    ax.add_patch(rect)
    ax.text(1.75, y_start - i*0.8 + 0.3, source, ha='center', va='center', 
            fontsize=11, color=primary_color, fontweight='600')

# Feature Engineering
rect = FancyBboxPatch((4, 3), 2.5, 2, 
                      boxstyle="round,pad=0.05", 
                      facecolor='#F0FDF4', edgecolor=accent_color, linewidth=2)
ax.add_patch(rect)
ax.text(5.25, 4.5, 'Feature', ha='center', va='center', 
        fontsize=13, color=primary_color, fontweight='bold')
ax.text(5.25, 4.1, 'Engineering', ha='center', va='center', 
        fontsize=13, color=primary_color, fontweight='bold')
ax.text(5.25, 3.5, '• Lag Features', ha='center', va='center', 
        fontsize=10, color=text_color)
ax.text(5.25, 3.2, '• Rolling Stats', ha='center', va='center', 
        fontsize=10, color=text_color)

# ML Models
models = ['LSTM', 'XGBoost', 'Transformer']
colors = ['#DBEAFE', '#FEF3C7', '#EDE9FE']
edge_colors = ['#3B82F6', '#F59E0B', '#8B5CF6']
for i, (model, fc, ec) in enumerate(zip(models, colors, edge_colors)):
    rect = FancyBboxPatch((8, 5 - i*1.5), 2, 1, 
                          boxstyle="round,pad=0.05", 
                          facecolor=fc, edgecolor=ec, linewidth=2)
    ax.add_patch(rect)
    ax.text(9, 5.5 - i*1.5, model, ha='center', va='center', 
            fontsize=12, color=primary_color, fontweight='bold')

# Ensemble/Output
rect = FancyBboxPatch((11.5, 3), 2, 2, 
                      boxstyle="round,pad=0.05", 
                      facecolor='#FEF3C7', edgecolor=highlight_color, linewidth=2)
ax.add_patch(rect)
ax.text(12.5, 4.5, 'Ensemble', ha='center', va='center', 
        fontsize=13, color=primary_color, fontweight='bold')
ax.text(12.5, 4.1, 'Prediction', ha='center', va='center', 
        fontsize=13, color=primary_color, fontweight='bold')
ax.text(12.5, 3.5, '24-48h', ha='center', va='center', 
        fontsize=11, color=text_color)
ax.text(12.5, 3.2, 'Forecast', ha='center', va='center', 
        fontsize=11, color=text_color)

# Draw arrows
arrow_props = dict(arrowstyle='->', lw=2, color='#64748B')
# From data sources to feature engineering
for i in range(4):
    ax.annotate('', xy=(4, 4 - i*0.3), xytext=(3, 5.5 - i*0.8 + 0.3),
                arrowprops=arrow_props)

# From feature engineering to models
for i in range(3):
    ax.annotate('', xy=(8, 5.5 - i*1.5), xytext=(6.5, 4),
                arrowprops=arrow_props)

# From models to ensemble
for i in range(3):
    ax.annotate('', xy=(11.5, 4), xytext=(10, 5.5 - i*1.5),
                arrowprops=arrow_props)

plt.tight_layout()
plt.savefig('ml_pipeline_architecture.png', dpi=300, bbox_inches='tight', 
            facecolor='white', edgecolor='none')
plt.show()

# Create Feature Importance Chart
fig, ax = plt.subplots(1, 1, figsize=(10, 6))

features = ['Previous Day Price', 'Temperature', 'Wind Generation', 
            'Energy Demand', 'Day of Week', 'Hour of Day', 
            'Gas Price', 'Solar Generation', 'Holiday', 'Season']
importance = [0.25, 0.18, 0.15, 0.12, 0.08, 0.07, 0.06, 0.05, 0.03, 0.01]

# Create horizontal bar chart
y_pos = np.arange(len(features))
bars = ax.barh(y_pos, importance, color='#10B981', alpha=0.8)

# Add value labels
for i, (bar, val) in enumerate(zip(bars, importance)):
    ax.text(val + 0.005, bar.get_y() + bar.get_height()/2, 
            f'{val:.1%}', va='center', fontsize=10, color=text_color)

# Customize the plot
ax.set_yticks(y_pos)
ax.set_yticklabels(features, fontsize=11)
ax.set_xlabel('Feature Importance', fontsize=12, fontweight='bold')
ax.set_title('Feature Importance for Energy Price Prediction', 
             fontsize=16, fontweight='bold', pad=20, color=primary_color)
ax.set_xlim(0, 0.3)
ax.grid(axis='x', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig('feature_importance.png', dpi=300, bbox_inches='tight', 
            facecolor='white', edgecolor='none')
plt.show()

# Create Model Comparison Chart
fig, ax = plt.subplots(1, 1, figsize=(12, 7))

models = ['LSTM', 'XGBoost', 'Transformer', 'Prophet', 'ARIMA']
mae = [2.45, 2.34, 2.67, 3.12, 4.56]
rmse = [3.89, 3.67, 4.01, 4.78, 6.23]
mape = [4.5, 4.2, 4.8, 5.6, 8.2]

x = np.arange(len(models))
width = 0.25

# Create bars
bars1 = ax.bar(x - width, mae, width, label='MAE (€/MWh)', color='#3B82F6', alpha=0.8)
bars2 = ax.bar(x, rmse, width, label='RMSE (€/MWh)', color='#10B981', alpha=0.8)
bars3 = ax.bar(x + width, mape, width, label='MAPE (%)', color='#F59E0B', alpha=0.8)

# Add value labels
for bars in [bars1, bars2, bars3]:
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                f'{height:.2f}', ha='center', va='bottom', fontsize=9)

# Customize the plot
ax.set_xlabel('Model', fontsize=12, fontweight='bold')
ax.set_ylabel('Error Metric Value', fontsize=12, fontweight='bold')
ax.set_title('Model Performance Comparison\nLower values indicate better performance', 
             fontsize=16, fontweight='bold', color=primary_color)
ax.set_xticks(x)
ax.set_xticklabels(models, fontsize=11)
ax.legend(loc='upper left', frameon=False)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.set_ylim(0, max(max(mae), max(rmse), max(mape)) * 1.2)

# Add best performer annotation
best_model_idx = mae.index(min(mae))
ax.annotate('Best Overall\nPerformance', 
            xy=(best_model_idx, mae[best_model_idx]), 
            xytext=(best_model_idx, mae[best_model_idx] + 2),
            ha='center', fontsize=10, color='#059669', fontweight='bold',
            arrowprops=dict(arrowstyle='->', color='#059669', lw=2))

plt.tight_layout()
plt.savefig('model_comparison.png', dpi=300, bbox_inches='tight', 
            facecolor='white', edgecolor='none')
plt.show()

print("Visualizations created successfully!")
print("- ml_pipeline_architecture.png: Shows the complete ML pipeline")
print("- feature_importance.png: Displays feature importance for predictions")
print("- model_comparison.png: Compares performance of different ML models")
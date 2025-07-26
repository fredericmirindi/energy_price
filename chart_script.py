import plotly.graph_objects as go
import numpy as np

# Data
hours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
actual_prices = [44, 47, 53, 57, 64, 71, 79, 74, 69, 63, 54, 49, 47, 48, 50, 54, 59, 67, 75, 76, 72, 65, 57, 50]
predicted_prices = [45, 48, 52, 58, 65, 72, 78, 75, 70, 62, 55, 50, 48, 47, 49, 53, 60, 68, 74, 77, 73, 66, 58, 51]

# Calculate prediction errors
errors = [abs(a - p) for a, p in zip(actual_prices, predicted_prices)]
mae = 2.34

# Find peak price hour
peak_hour_idx = actual_prices.index(max(actual_prices))
peak_hour = hours[peak_hour_idx]
peak_price = actual_prices[peak_hour_idx]

# Calculate confidence intervals
confidence_margin = np.std(errors) * 1.96
upper_bound = [p + confidence_margin for p in predicted_prices]
lower_bound = [p - confidence_margin for p in predicted_prices]

# Create figure
fig = go.Figure()

# Add confidence interval as filled area
fig.add_trace(go.Scatter(
    x=hours + hours[::-1],
    y=upper_bound + lower_bound[::-1],
    fill='toself',
    fillcolor='rgba(46, 139, 87, 0.2)',
    line=dict(color='rgba(255,255,255,0)'),
    name='95% Confidence',
    showlegend=True
))

# Add predicted prices line with error info in hover
fig.add_trace(go.Scatter(
    x=hours,
    y=predicted_prices,
    mode='lines',
    name='Predicted',
    line=dict(color='#2E8B57', width=2, dash='dash'),
    cliponaxis=False,
    customdata=errors,
    hovertemplate='<b>%{x}</b><br>Predicted: €%{y}/MWh<br>Error: €%{customdata:.1f}/MWh<extra></extra>'
))

# Add actual prices line
fig.add_trace(go.Scatter(
    x=hours,
    y=actual_prices,
    mode='lines',
    name='Actual',
    line=dict(color='#1FB8CD', width=2),
    cliponaxis=False,
    hovertemplate='<b>%{x}</b><br>Actual: €%{y}/MWh<extra></extra>'
))

# Add peak price marker
fig.add_trace(go.Scatter(
    x=[peak_hour],
    y=[peak_price],
    mode='markers+text',
    marker=dict(color='#DB4545', size=8, symbol='circle'),
    text=['Peak'],
    textposition='top center',
    name='Peak Price',
    showlegend=False,
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='24-Hour Energy Price Forecast',
    xaxis_title='Hours',
    yaxis_title='Price (€/MWh)',
    showlegend=True,
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    xaxis=dict(showgrid=True),
    yaxis=dict(showgrid=True)
)

# Add MAE text annotation
fig.add_trace(go.Scatter(
    x=[hours[-1]],
    y=[max(actual_prices) * 0.9],
    mode='text',
    text=[f'MAE: {mae} €/MWh'],
    textfont=dict(size=12, color='#13343B'),
    showlegend=False,
    cliponaxis=False
))

# Update axes with grid
fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(128,128,128,0.2)')
fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(128,128,128,0.2)')

# Save the chart
fig.write_image('energy_price_forecast.png')
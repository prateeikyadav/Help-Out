// Load recommendations for current tool
function loadRecommendations(toolName) {
  const widget = document.getElementById('recommendationsWidget');
  const list = document.getElementById('recommendationsList');

  // Check if recommendations exist for this tool
  if (!toolRecommendations || !toolRecommendations[toolName]) {
    if (widget) widget.style.display = 'none';
    return;
  }

  const recommendations = toolRecommendations[toolName];
  if (!recommendations || recommendations.length === 0) {
    if (widget) widget.style.display = 'none';
    return;
  }

  // Generate HTML for recommendation cards
  const html = recommendations.map(rec => `
    <a href="${rec.path}" class="recommendation-card" title="${rec.reason}">
      <div class="recommendation-name">${rec.name}</div>
      <div class="recommendation-reason">${rec.reason}</div>
    </a>
  `).join('');

  if (list) {
    list.innerHTML = html;
  }
}

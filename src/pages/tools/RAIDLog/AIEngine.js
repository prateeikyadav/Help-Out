export const AIEngine = {
  // Delays to simulate network request
  _delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  generateMitigationPlan: async (riskTitle, description) => {
    await AIEngine._delay(1500);
    if (!riskTitle) return "Please provide a valid risk title to generate a mitigation plan.";
    
    return `**AI Mitigation Strategy for: ${riskTitle}**\n\n` +
      `Based on similar project risks, we recommend the following 3-step mitigation plan:\n\n` +
      `1. **Immediate Assessment**: Conduct a deep-dive review with the core stakeholders within 48 hours to fully quantify the impact.\n` +
      `2. **Resource Reallocation**: Identify secondary resources that can be temporarily assigned if this risk materializes, minimizing critical path disruption.\n` +
      `3. **Continuous Monitoring**: Add this specific item to the weekly status meeting agenda until the probability drops below 15%.\n\n` +
      `*Note: This is an AI-generated heuristic suggestion.*`;
  },

  generateExecutiveSummary: async (raidData) => {
    await AIEngine._delay(2000);
    const { risks, actions, issues, decisions } = raidData;
    
    const criticalIssues = issues.filter(i => i.severity === 'Critical' || i.severity === 'High').length;
    const openRisks = risks.filter(r => r.status === 'Open' || r.status === 'In Progress').length;
    const overdueActions = actions.filter(a => new Date(a.dueDate) < new Date() && a.status !== 'Closed').length;

    return `**Executive RAID Summary**\n\n` +
      `The project currently has **${openRisks} open risks**, **${criticalIssues} critical/high issues**, and **${overdueActions} overdue actions**.\n\n` +
      `**Key Focus Areas:**\n` +
      `- Immediate attention is required for the ${criticalIssues} high-severity issues blocking development.\n` +
      `- Please review the ${overdueActions} overdue action items to prevent further timeline slippage.\n` +
      `- ${decisions.length} key decisions have been logged to date.\n\n` +
      `*Recommendation: Schedule a 15-minute sync with track leads to clear the overdue actions.*`;
  },

  generateEscalationRecommendation: async (issueTitle, severity) => {
    await AIEngine._delay(1000);
    
    if (severity === 'Critical') {
      return `**AI Escalation Advice:** This is a Critical issue. Escalate immediately to the Project Sponsor and Steering Committee. Draft a formal impact statement detailing timeline delays and budget overruns.`;
    } else if (severity === 'High') {
      return `**AI Escalation Advice:** High severity detected. Escalate to the Program Manager. Ensure all department heads are aware of the blocker.`;
    } else {
      return `**AI Escalation Advice:** Routine issue. No executive escalation required at this time. Manage within the core delivery team.`;
    }
  },

  detectSeverity: (description) => {
    if (!description) return 'Medium';
    const desc = description.toLowerCase();
    
    if (desc.includes('blocker') || desc.includes('critical') || desc.includes('fail') || desc.includes('halt')) {
      return 'Critical';
    } else if (desc.includes('high') || desc.includes('delay') || desc.includes('budget') || desc.includes('major')) {
      return 'High';
    } else if (desc.includes('minor') || desc.includes('low') || desc.includes('trivial')) {
      return 'Low';
    }
    return 'Medium';
  }
};

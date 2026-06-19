// Tool recommendation mappings - using absolute React public paths
const toolRecommendations = {
  // General Productivity Tools
  'Focus Ritual': [
    { name: 'Goal Tracker', path: '/tools/General/Goal Tracker/index.html', reason: 'Set long-term goals and track your progress' },
    { name: 'To do checklist', path: '/tools/General/To do checklist/index.html', reason: 'Break goals into daily tasks to complete' }
  ],
  'To do checklist': [
    { name: 'Focus Ritual', path: '/tools/General/Focus Ritual/index.html', reason: 'Use pomodoro method to tackle tasks faster' },
    { name: 'Goal Tracker', path: '/tools/General/Goal Tracker/index.html', reason: 'Link tasks back to your bigger goals' }
  ],
  'Goal Tracker': [
    { name: 'To do checklist', path: '/tools/General/To do checklist/index.html', reason: 'Break goals into daily actionable tasks' },
    { name: 'Focus Ritual', path: '/tools/General/Focus Ritual/index.html', reason: 'Execute with focused work sprints' }
  ],
  'Shopping List': [
    { name: 'Meal Planner', path: '/tools/Medical/Meal Planner/index.html', reason: 'Plan meals first, then create shopping list' }
  ],
  'Water Intake Tracker': [
    { name: 'Goal Tracker', path: '/tools/General/Goal Tracker/index.html', reason: 'Track health goals alongside hydration' }
  ],
  'Tone Checker': [
    { name: 'LinkedIn Bio Generator', path: '/tools/General/LinkedIn Bio Generator/index.html', reason: 'Ensure your professional bio matches your tone' }
  ],
  'LinkedIn Bio Generator': [
    { name: 'Tone Checker', path: '/tools/General/Tone Checker/index.html', reason: 'Polish your bio tone before publishing' }
  ],

  // Accountants Tools
  'Tax Estimator': [
    { name: 'Expense Tracker', path: '/tools/Accountants/Expense Tracker/index.html', reason: 'Track deductible expenses' }
  ],
  'Expense Tracker': [
    { name: 'Tax Estimator', path: '/tools/Accountants/Tax Estimator/index.html', reason: 'Use expenses to estimate tax deductions' },
    { name: 'Budget & Cost Plan', path: '/tools/Project Managers/Project Manager Tools/Budget & Cost Plan Tool/index.html', reason: 'Scale personal tracking to full project budgets' }
  ],
  'SIP Calculator': [
    { name: 'Loan / EMI Calculator', path: '/tools/Accountants/Loan Calculator/index.html', reason: 'Balance investments against loan repayments' }
  ],
  'Loan Calculator': [
    { name: 'SIP Calculator', path: '/tools/Accountants/SIP Calculator/index.html', reason: 'See how EMIs affect potential investment returns' }
  ],
  'Currency Converter': [
    { name: 'Expense Tracker', path: '/tools/Accountants/Expense Tracker/index.html', reason: 'Log converted expenses for international trips' }
  ],

  // Medical Tools
  'Meal Planner': [
    { name: 'Shopping List', path: '/tools/General/Shopping List/index.html', reason: 'Convert your meal plan into a grocery list' },
    { name: 'Water Intake Tracker', path: '/tools/Medical/Water Intake Tracker/index.html', reason: 'Ensure hydration complements your diet' }
  ],

  // PM Tools (Core)
  'Project Charter Generator': [
    { name: 'Business Case', path: '/tools/Project Managers/Project Manager Tools/Business Case Builder/index.html', reason: 'Reference the business justification' },
    { name: 'Scope Statement', path: '/tools/Project Managers/Project Manager Tools/Scope Statement Tool/index.html', reason: 'Expand high-level scope into detail' }
  ],
  'Business Case Builder': [
    { name: 'Project Charter', path: '/tools/Project Managers/Project Manager Tools/Project Charter Generator/index.html', reason: 'Formalize approval of your business case' },
    { name: 'Budget & Cost Plan', path: '/tools/Project Managers/Project Manager Tools/Budget & Cost Plan Tool/index.html', reason: 'Detail the financial requirements' }
  ],
  'Scope Statement Tool': [
    { name: 'WBS Builder', path: '/tools/Project Managers/Project Manager Tools/WBS Builder/index.html', reason: 'Break down scope into manageable work packages' },
    { name: 'Change Request Form', path: '/tools/Project Managers/Project Manager Tools/Change Request Form/index.html', reason: 'Manage scope creep effectively' }
  ],
  'WBS Builder': [
    { name: 'Project Schedule Generator', path: '/tools/Project Managers/Project Manager Tools/Project Schedule Generator/index.html', reason: 'Schedule your work packages' },
    { name: 'Scope Statement', path: '/tools/Project Managers/Project Manager Tools/Scope Statement Tool/index.html', reason: 'Ensure WBS covers all defined scope' }
  ],
  'Project Schedule Generator': [
    { name: 'Sprint Planning', path: '/tools/Project Managers/Project Manager Tools/Sprint Planning Tool/index.html', reason: 'Break schedule down into agile sprints' },
    { name: 'Resource Matrix', path: '/tools/Project Managers/Project Manager Tools/RACI Matrix Creator/index.html', reason: 'Assign resources to schedule tasks' }
  ],
  'Budget & Cost Plan Tool': [
    { name: 'Business Case', path: '/tools/Project Managers/Project Manager Tools/Business Case Builder/index.html', reason: 'Ensure budget aligns with approved case' }
  ],

  // PM Tools (Risk & Stakeholders)
  'Risk Register Creator': [
    { name: 'Issue Log Tracker', path: '/tools/Project Managers/Project Manager Tools/Issue Log Tracker/index.html', reason: 'Track risks that have materialized into issues' },
    { name: 'Escalation Matrix', path: '/tools/Project Managers/Project Manager Tools/Escalation Matrix Builder/index.html', reason: 'Define who handles severe risks' }
  ],
  'Issue Log Tracker': [
    { name: 'Risk Register', path: '/tools/Project Managers/Project Manager Tools/Risk Register Creator/index.html', reason: 'Add recurring issues to risk log' },
    { name: 'Change Request Form', path: '/tools/Project Managers/Project Manager Tools/Change Request Form/index.html', reason: 'Submit changes to resolve major issues' }
  ],
  'Stakeholder Register Tool': [
    { name: 'Communication Plan', path: '/tools/Project Managers/Project Manager Tools/Communication Plan Builder/index.html', reason: 'Define how you will update stakeholders' },
    { name: 'RACI Matrix', path: '/tools/Project Managers/Project Manager Tools/RACI Matrix Creator/index.html', reason: 'Assign specific responsibilities to stakeholders' }
  ],
  'Communication Plan Builder': [
    { name: 'Stakeholder Register', path: '/tools/Project Managers/Project Manager Tools/Stakeholder Register Tool/index.html', reason: 'Identify who needs communication' },
    { name: 'Weekly Status Report', path: '/tools/Project Managers/Project Manager Tools/Weekly Status Report Generator/index.html', reason: 'Generate the actual communication' }
  ],
  'RACI Matrix Creator': [
    { name: 'Stakeholder Register', path: '/tools/Project Managers/Project Manager Tools/Stakeholder Register Tool/index.html', reason: 'Ensure all stakeholders are accounted for' }
  ],
  'Escalation Matrix Builder': [
    { name: 'Issue Log Tracker', path: '/tools/Project Managers/Project Manager Tools/Issue Log Tracker/index.html', reason: 'Log issues before escalating them' }
  ],

  // PM Tools (Execution & Meetings)
  'Sprint Planning Tool': [
    { name: 'Retrospective Notes', path: '/tools/Project Managers/Project Manager Tools/Retrospective Notes Generator/index.html', reason: 'Review past sprints to plan better' },
    { name: 'Project Schedule Generator', path: '/tools/Project Managers/Project Manager Tools/Project Schedule Generator/index.html', reason: 'Align sprints with master schedule' }
  ],
  'Retrospective Notes Generator': [
    { name: 'Sprint Planning', path: '/tools/Project Managers/Project Manager Tools/Sprint Planning Tool/index.html', reason: 'Apply retro lessons to next sprint' },
    { name: 'Lessons Learned', path: '/tools/Project Managers/Project Manager Tools/Lessons Learned Tool/index.html', reason: 'Document key retro takeaways globally' }
  ],
  'Kickoff Deck Outline': [
    { name: 'Project Charter', path: '/tools/Project Managers/Project Manager Tools/Project Charter Generator/index.html', reason: 'Pull core objectives for presentation' },
    { name: 'Communication Plan', path: '/tools/Project Managers/Project Manager Tools/Communication Plan Builder/index.html', reason: 'Present how team will stay updated' }
  ],
  'Meeting Minutes Template': [
    { name: 'Decision Log', path: '/tools/Project Managers/Project Manager Tools/Decision Log Tool/index.html', reason: 'Log key decisions made in meeting' },
    { name: 'Issue Log Tracker', path: '/tools/Project Managers/Project Manager Tools/Issue Log Tracker/index.html', reason: 'Track issues raised during meeting' }
  ],
  'Decision Log Tool': [
    { name: 'Meeting Minutes', path: '/tools/Project Managers/Project Manager Tools/Meeting Minutes Template/index.html', reason: 'Reference meeting where decision occurred' }
  ],
  'Weekly Status Report Generator': [
    { name: 'Issue Log Tracker', path: '/tools/Project Managers/Project Manager Tools/Issue Log Tracker/index.html', reason: 'Pull current blockers for report' },
    { name: 'Risk Register', path: '/tools/Project Managers/Project Manager Tools/Risk Register Creator/index.html', reason: 'Highlight top risks to management' }
  ],
  'Change Request Form': [
    { name: 'Decision Log', path: '/tools/Project Managers/Project Manager Tools/Decision Log Tool/index.html', reason: 'Log approval/rejection of change' },
    { name: 'Scope Statement', path: '/tools/Project Managers/Project Manager Tools/Scope Statement Tool/index.html', reason: 'Update scope if change approved' }
  ],

  // PM Tools (Closure)
  'Project Closure Report': [
    { name: 'Lessons Learned', path: '/tools/Project Managers/Project Manager Tools/Lessons Learned Tool/index.html', reason: 'Summarize key takeaways for closure' },
    { name: 'Post-Impl Review', path: '/tools/Project Managers/Project Manager Tools/Post-Implementation Review Tool/index.html', reason: 'Evaluate success metrics' }
  ],
  'Lessons Learned Tool': [
    { name: 'Project Closure Report', path: '/tools/Project Managers/Project Manager Tools/Project Closure Report/index.html', reason: 'Include lessons in final report' }
  ],
  'Handover Document Creator': [
    { name: 'Project Closure Report', path: '/tools/Project Managers/Project Manager Tools/Project Closure Report/index.html', reason: 'Complete handover to finalize closure' }
  ],
  'Post-Implementation Review Tool': [
    { name: 'Lessons Learned', path: '/tools/Project Managers/Project Manager Tools/Lessons Learned Tool/index.html', reason: 'Document post-live findings' }
  ],

  // Misc
  'Project Management Plan Creator': [
    { name: 'Project Charter', path: '/tools/Project Managers/Project Manager Tools/Project Charter Generator/index.html', reason: 'Ensure plan aligns with charter' }
  ],
  'SOW Statement Generator': [
    { name: 'Project Charter', path: '/tools/Project Managers/Project Manager Tools/Project Charter Generator/index.html', reason: 'Use SOW details to draft charter' }
  ]
};

if (typeof window !== 'undefined') {
  window.toolRecommendations = toolRecommendations;
}

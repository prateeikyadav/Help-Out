// Tool recommendation mappings - each tool suggests complementary tools
const toolRecommendations = {
  // General Productivity Tools
  'Pomodoro Tracker': [
    { name: 'Goal Tracker', path: './Goal%20Tracker/index.html', reason: 'Set long-term goals and track your progress' },
    { name: 'To do checklist', path: './To%20do%20checklist/index.html', reason: 'Break goals into daily tasks to complete' }
  ],
  'To do checklist': [
    { name: 'Pomodoro Tracker', path: './Pomodoro%20Tracker/index.html', reason: 'Use pomodoro method to tackle tasks faster' },
    { name: 'Goal Tracker', path: './Goal%20Tracker/index.html', reason: 'Link tasks back to your bigger goals' }
  ],
  'Goal Tracker': [
    { name: 'To do checklist', path: './To%20do%20checklist/index.html', reason: 'Break goals into daily actionable tasks' },
    { name: 'Pomodoro Tracker', path: './Pomodoro%20Tracker/index.html', reason: 'Execute with focused work sprints' }
  ],
  'Shopping List': [
    { name: 'Meal Planner', path: '../Medical/Meal%20Planner/index.html', reason: 'Plan meals first, then create shopping list' }
  ],
  'Water Intake Tracker': [
    { name: 'Goal Tracker', path: './Goal%20Tracker/index.html', reason: 'Track health goals alongside hydration' }
  ],
  'Tone Checker': [
    { name: 'LinkedIn Bio Generator', path: './LinkedIn%20Bio%20Generator/index.html', reason: 'Ensure your professional bio matches your tone' }
  ],
  'LinkedIn Bio Generator': [
    { name: 'Tone Checker', path: './Tone%20Checker/index.html', reason: 'Polish your bio tone before publishing' }
  ],

  // Accountants Tools
  'Tax Estimator': [
    { name: 'Expense Tracker', path: './Expense%20Tracker/index.html', reason: 'Track deductible expenses throughout the year' },
    { name: 'SIP Calculator', path: './SIP%20Calculator/index.html', reason: 'Plan tax-efficient investments' }
  ],
  'Expense Tracker': [
    { name: 'Tax Estimator', path: './Tax%20Estimator/index.html', reason: 'Plan for tax obligations based on expenses' },
    { name: 'Loan Calculator', path: './Loan%20Calculator/index.html', reason: 'Account for loan EMI in your monthly budget' }
  ],
  'SIP Calculator': [
    { name: 'Tax Estimator', path: './Tax%20Estimator/index.html', reason: 'Understand tax implications of returns' },
    { name: 'Expense Tracker', path: './Expense%20Tracker/index.html', reason: 'Find surplus funds available for investment' }
  ],
  'Loan Calculator': [
    { name: 'Expense Tracker', path: './Expense%20Tracker/index.html', reason: 'Plan loan payments in your monthly budget' },
    { name: 'Currency Converter', path: './Currency%20Converter/index.html', reason: 'Convert loan rates for international comparison' }
  ],
  'Currency Converter': [
    { name: 'Loan Calculator', path: './Loan%20Calculator/index.html', reason: 'Calculate EMI for international loans' },
    { name: 'Expense Tracker', path: './Expense%20Tracker/index.html', reason: 'Track foreign exchange expenses' }
  ],

  // Medical Tools
  'Meal Planner': [
    { name: 'Shopping List', path: '../General/Shopping%20List/index.html', reason: 'Generate shopping list from meal plan' },
    { name: 'Water Intake Tracker', path: '../General/Water%20Intake%20Tracker/index.html', reason: 'Track hydration alongside meal planning' }
  ],

  // Project Manager Tools
  'Project Charter Generator': [
    { name: 'Business Case Builder', path: './Business%20Case%20Builder/index.html', reason: 'Build business case before creating charter' },
    { name: 'Scope Statement Tool', path: './Scope%20Statement%20Tool/index.html', reason: 'Define detailed scope after charter approval' }
  ],
  'Business Case Builder': [
    { name: 'Project Charter Generator', path: './Project%20Charter%20Generator/index.html', reason: 'Convert approved business case to charter' },
    { name: 'Budget & Cost Plan Tool', path: './Budget%20%26%20Cost%20Plan%20Tool/index.html', reason: 'Detail financial planning from business case' }
  ],
  'SOW Statement Generator': [
    { name: 'Project Charter Generator', path: './Project%20Charter%20Generator/index.html', reason: 'Reference charter when creating SOW' },
    { name: 'Scope Statement Tool', path: './Scope%20Statement%20Tool/index.html', reason: 'Align SOW with detailed scope statement' }
  ],
  'Project Management Plan Creator': [
    { name: 'Project Charter Generator', path: './Project%20Charter%20Generator/index.html', reason: 'Base PM plan on approved charter' },
    { name: 'Risk Register Creator', path: './Risk%20Register%20Creator/index.html', reason: 'Include risk management in PM plan' }
  ],
  'Scope Statement Tool': [
    { name: 'Project Charter Generator', path: './Project%20Charter%20Generator/index.html', reason: 'Reference charter for scope definition' },
    { name: 'WBS Builder', path: './WBS%20Builder/index.html', reason: 'Create WBS from scope statement' }
  ],
  'WBS Builder': [
    { name: 'Scope Statement Tool', path: './Scope%20Statement%20Tool/index.html', reason: 'Reference scope when building WBS' },
    { name: 'Project Schedule Generator', path: './Project%20Schedule%20Generator/index.html', reason: 'Create timeline based on WBS elements' }
  ],
  'Project Schedule Generator': [
    { name: 'WBS Builder', path: './WBS%20Builder/index.html', reason: 'Base schedule on WBS work packages' },
    { name: 'Budget & Cost Plan Tool', path: './Budget%20%26%20Cost%20Plan%20Tool/index.html', reason: 'Align resources with schedule' }
  ],
  'Budget & Cost Plan Tool': [
    { name: 'Project Schedule Generator', path: './Project%20Schedule%20Generator/index.html', reason: 'Align budget with project timeline' },
    { name: 'Risk Register Creator', path: './Risk%20Register%20Creator/index.html', reason: 'Include contingency for budget risks' }
  ],
  'Risk Register Creator': [
    { name: 'Communication Plan Builder', path: './Communication%20Plan%20Builder/index.html', reason: 'Communicate risks to stakeholders' },
    { name: 'Issue Log Tracker', path: './Issue%20Log%20Tracker/index.html', reason: 'Convert materialized risks to issues' }
  ],
  'Stakeholder Register Tool': [
    { name: 'Communication Plan Builder', path: './Communication%20Plan%20Builder/index.html', reason: 'Plan engagement per stakeholder' },
    { name: 'RACI Matrix Creator', path: './RACI%20Matrix%20Creator/index.html', reason: 'Define stakeholder roles and responsibilities' }
  ],
  'Communication Plan Builder': [
    { name: 'Stakeholder Register Tool', path: './Stakeholder%20Register%20Tool/index.html', reason: 'Reference stakeholder analysis' },
    { name: 'Weekly Status Report Generator', path: './Weekly%20Status%20Report%20Generator/index.html', reason: 'Execute communication plan with status reports' }
  ],
  'RACI Matrix Creator': [
    { name: 'Stakeholder Register Tool', path: './Stakeholder%20Register%20Tool/index.html', reason: 'Clarify roles from stakeholder analysis' },
    { name: 'Communication Plan Builder', path: './Communication%20Plan%20Builder/index.html', reason: 'Align communication with role definitions' }
  ],
  'Kickoff Deck Outline': [
    { name: 'Project Charter Generator', path: './Project%20Charter%20Generator/index.html', reason: 'Use charter content in kickoff presentation' },
    { name: 'Stakeholder Register Tool', path: './Stakeholder%20Register%20Tool/index.html', reason: 'Identify who to present to' }
  ],
  'Meeting Minutes Template': [
    { name: 'Decision Log Tool', path: './Decision%20Log%20Tool/index.html', reason: 'Log key decisions made in meetings' },
    { name: 'Issue Log Tracker', path: './Issue%20Log%20Tracker/index.html', reason: 'Track action items and issues from meetings' }
  ],
  'Weekly Status Report Generator': [
    { name: 'Issue Log Tracker', path: './Issue%20Log%20Tracker/index.html', reason: 'Report on open issues and status' },
    { name: 'Decision Log Tool', path: './Decision%20Log%20Tool/index.html', reason: 'Highlight weekly decisions' }
  ],
  'Issue Log Tracker': [
    { name: 'Decision Log Tool', path: './Decision%20Log%20Tool/index.html', reason: 'Track decisions on issue resolution' },
    { name: 'Change Request Form', path: './Change%20Request%20Form/index.html', reason: 'Convert issues into change requests' }
  ],
  'Decision Log Tool': [
    { name: 'Issue Log Tracker', path: './Issue%20Log%20Tracker/index.html', reason: 'Track how decisions resolve issues' },
    { name: 'Weekly Status Report Generator', path: './Weekly%20Status%20Report%20Generator/index.html', reason: 'Report decisions in status updates' }
  ],
  'Change Request Form': [
    { name: 'Issue Log Tracker', path: './Issue%20Log%20Tracker/index.html', reason: 'Link change requests to issues' },
    { name: 'Scope Statement Tool', path: './Scope%20Statement%20Tool/index.html', reason: 'Evaluate impact on scope' }
  ],
  'Sprint Planning Tool': [
    { name: 'Retrospective Notes Generator', path: './Retrospective%20Notes%20Generator/index.html', reason: 'Learn from retrospectives for next sprint' },
    { name: 'Issue Log Tracker', path: './Issue%20Log%20Tracker/index.html', reason: 'Address sprint blockers as issues' }
  ],
  'Retrospective Notes Generator': [
    { name: 'Sprint Planning Tool', path: './Sprint%20Planning%20Tool/index.html', reason: 'Apply lessons to upcoming sprints' },
    { name: 'Lessons Learned Tool', path: './Lessons%20Learned%20Tool/index.html', reason: 'Document improvements for future use' }
  ],
  'Project Closure Report': [
    { name: 'Lessons Learned Tool', path: './Lessons%20Learned%20Tool/index.html', reason: 'Capture learnings for organizational knowledge' },
    { name: 'Handover Document Creator', path: './Handover%20Document%20Creator/index.html', reason: 'Prepare handover before closure' }
  ],
  'Lessons Learned Tool': [
    { name: 'Project Closure Report', path: './Project%20Closure%20Report/index.html', reason: 'Include lessons in closure report' },
    { name: 'Post-Implementation Review Tool', path: './Post-Implementation%20Review%20Tool/index.html', reason: 'Compare learnings against post-implementation results' }
  ],
  'Handover Document Creator': [
    { name: 'Project Closure Report', path: './Project%20Closure%20Report/index.html', reason: 'Reference closure report in handover' },
    { name: 'Post-Implementation Review Tool', path: './Post-Implementation%20Review%20Tool/index.html', reason: 'Track post-handover performance' }
  ],
  'Post-Implementation Review Tool': [
    { name: 'Lessons Learned Tool', path: './Lessons%20Learned%20Tool/index.html', reason: 'Document post-implementation lessons' },
    { name: 'Project Closure Report', path: './Project%20Closure%20Report/index.html', reason: 'Compare against closure expectations' }
  ],
  'Escalation Matrix Builder': [
    { name: 'Risk Register Creator', path: './Risk%20Register%20Creator/index.html', reason: 'Escalate risks using matrix' },
    { name: 'Issue Log Tracker', path: './Issue%20Log%20Tracker/index.html', reason: 'Escalate critical issues' }
  ]
};

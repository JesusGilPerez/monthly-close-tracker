/* =====================================================================
   MONTHLY CLOSE TRACKER - CONTENT
   ---------------------------------------------------------------------
   Demo content: the month-end close of a fictitious company,
   Alder & Finch Ltd. Every name, folder and task here is invented.

   The safe way to change it is from the tracker itself:
   "Edit content" > make changes > "Download tasks.js" > replace this file.

   Task fields
   id            Unique id
   block         One of the block ids below
   name          What appears in the list
   frequency     'monthly', 'quarterly' (quarterlyMonths) or 'yearEnd' (yearEndMonths)
   startDay      Earliest day of the month to start (optional)
   dependsOn     Tasks that must be done first (they block)
   recommended   Tasks that should ideally be done first (they only warn)
   waitsFor      Things that depend on other people (ids from "waits")
   onCompletion  Who to tell or what to send when finished
   video         File name inside the videos/ folder (optional)
   resources     Files and folders used in the task
   summary       What the task is, in one or two sentences
   steps         How to do it, in order
   watchOut      Common mistakes and things not to forget
   ===================================================================== */

window.TRACKER = {
  title: 'Monthly close tracker',

  // Months (1-12) in which quarterly and year-end tasks appear.
  quarterlyMonths: [1, 4, 7, 10],
  yearEndMonths: [1],

  blocks: [
    { id: 'L', name: 'Ledger close' },
    { id: 'R', name: 'Reporting' },
    { id: 'Q', name: 'Quarterly and year-end' }
  ],

  waits: [
    { id: 'W01', name: 'Bank statements available for every account' },
    { id: 'W02', name: 'Payroll report received from HR' },
    { id: 'W03', name: 'Intercompany balances confirmed by the subsidiary' },
    { id: 'W04', name: 'Variance explanations received from budget holders' },
    { id: 'W05', name: 'Query list received from the auditors' }
  ],

  tasks: [
    /* ------------------------------ LEDGER ------------------------------ */
    {
      id: 'L01', block: 'L', frequency: 'monthly', startDay: 1,
      name: 'Bank reconciliations',
      dependsOn: [], recommended: [], waitsFor: ['W01'],
      resources: [{ name: 'Bank reconciliations', location: String.raw`\\alderfinch-fs\Finance\Month-end\Bank` }],
      summary: 'Reconcile the closing balance of every bank account in the ledger to the bank statement.',
      steps: [
        'Download the month-end statement for each account from the banking portal.',
        'Import the statements into the accounting system and run automatic matching.',
        'Match the remaining items by hand and post any bank charges or interest not yet recorded.',
        'List the reconciling items (unpresented payments, deposits in transit) and save the reconciliation.'
      ],
      watchOut: [
        'Reconciling items older than three months need an explanation, not just a carry-forward.',
        'Check the statement date: some banks publish the last day’s movements a day late.'
      ]
    },
    {
      id: 'L02', block: 'L', frequency: 'monthly', startDay: 1,
      name: 'Purchase ledger cut-off',
      dependsOn: [], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Make sure every supplier invoice for goods or services received in the month is recorded in the month.',
      steps: [
        'Post every supplier invoice dated up to month-end that has arrived by day 1.',
        'Run the goods-received-not-invoiced report and send it to the accruals task.',
        'Reconcile the three largest supplier statements to the ledger.'
      ],
      watchOut: ['Invoices dated next month must not be posted into this month, even if they arrive early.']
    },
    {
      id: 'L03', block: 'L', frequency: 'monthly', startDay: 1,
      name: 'Sales ledger and aged debt review',
      dependsOn: [], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Check that all sales are invoiced and review overdue customer balances.',
      steps: [
        'Confirm with the sales team that every delivery in the month has been invoiced.',
        'Run the aged debt report and flag balances more than 60 days overdue.',
        'Agree any bad debt provision with the credit controller.'
      ],
      watchOut: ['Credit notes issued after month-end for sales in the month belong to the month.']
    },
    {
      id: 'L04', block: 'L', frequency: 'monthly',
      name: 'Payroll journal',
      dependsOn: [], recommended: [], waitsFor: ['W02'],
      resources: [{ name: 'Payroll reports', location: String.raw`\\alderfinch-fs\Finance\Month-end\Payroll` }],
      summary: 'Post the month’s salaries, taxes and pension contributions from the payroll report.',
      steps: [
        'Check that the payroll report total matches the amount paid from the bank.',
        'Post the journal by department using the payroll mapping template.',
        'Reconcile the tax and pension control accounts.'
      ],
      watchOut: ['Leavers and new starters often cause differences between the report and the bank payment.']
    },
    {
      id: 'L05', block: 'L', frequency: 'monthly',
      name: 'Accruals and prepayments',
      dependsOn: ['L02'], recommended: [], waitsFor: [],
      resources: [{ name: 'Accruals schedule', location: String.raw`\\alderfinch-fs\Finance\Month-end\Accruals` }],
      summary: 'Record costs incurred but not yet invoiced, and release prepaid costs that belong to the month.',
      steps: [
        'Update the accruals schedule with the goods-received-not-invoiced report.',
        'Add recurring accruals (utilities, audit fee) and reverse last month’s.',
        'Release the monthly share of prepayments (insurance, software licences).'
      ],
      watchOut: ['Every accrual needs a reason and an owner in the schedule.']
    },
    {
      id: 'L06', block: 'L', frequency: 'monthly', startDay: 2,
      name: 'Fixed assets and depreciation',
      dependsOn: [], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Add new assets to the register and run the monthly depreciation.',
      steps: [
        'Capitalise purchases above the threshold coded to capital expenditure.',
        'Run depreciation in the asset register and post the journal.',
        'Reconcile the register to the balance sheet.'
      ],
      watchOut: ['Items below the capitalisation threshold go to expenses, not to the register.']
    },
    {
      id: 'L07', block: 'L', frequency: 'monthly', startDay: 2,
      name: 'Foreign currency revaluation',
      dependsOn: ['L01'], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Revalue foreign currency balances at the month-end exchange rate.',
      steps: [
        'Load the month-end rates published by the central bank.',
        'Run the revaluation for bank accounts, customers and suppliers in foreign currency.',
        'Check that the gain or loss is reasonable compared with the rate movement.'
      ],
      watchOut: ['Use the rate of the last calendar day of the month, not the day you run the task.']
    },
    {
      id: 'L08', block: 'L', frequency: 'monthly',
      name: 'Intercompany reconciliation',
      dependsOn: [], recommended: [], waitsFor: ['W03'],
      resources: [],
      summary: 'Agree balances and transactions with the subsidiary so that they eliminate on consolidation.',
      steps: [
        'Send the subsidiary our intercompany balance on day 1.',
        'Compare it with their confirmation and investigate any difference.',
        'Post agreed adjustments on both sides.'
      ],
      watchOut: ['Differences are usually timing: invoices posted in different months by each company.']
    },
    {
      id: 'L09', block: 'L', frequency: 'monthly',
      name: 'Trial balance review and period lock',
      dependsOn: ['L01', 'L04', 'L05', 'L06', 'L07', 'L08'], recommended: ['L03'], waitsFor: [],
      resources: [],
      summary: 'Review the trial balance for anything unusual and lock the period so no more postings go in.',
      steps: [
        'Compare every account with last month and the same month last year.',
        'Investigate movements above the review threshold.',
        'Confirm that suspense and clearing accounts are at zero.',
        'Lock the period in the accounting system.'
      ],
      watchOut: ['Once the period is locked, corrections go into next month: tell everyone before locking.']
    },

    /* ----------------------------- REPORTING ----------------------------- */
    {
      id: 'R01', block: 'R', frequency: 'monthly',
      name: 'Management accounts',
      dependsOn: ['L09'], recommended: [], waitsFor: [],
      resources: [{ name: 'Management accounts template', location: String.raw`\\alderfinch-fs\Finance\Reporting\Templates` }],
      summary: 'Produce the profit and loss, balance sheet and cash flow for the month.',
      steps: [
        'Refresh the management accounts workbook from the closed trial balance.',
        'Check that the balance sheet balances and that retained earnings roll forward.',
        'Save a PDF version in the month folder.'
      ],
      watchOut: []
    },
    {
      id: 'R02', block: 'R', frequency: 'monthly',
      name: 'Budget versus actual commentary',
      dependsOn: ['R01'], recommended: [], waitsFor: ['W04'],
      resources: [],
      summary: 'Explain the main differences between the month’s results and the budget.',
      steps: [
        'Send each budget holder their department’s variances above the threshold.',
        'Write the commentary from their explanations, starting with the largest variance.'
      ],
      watchOut: ['Explain causes, not numbers: “higher freight costs after the price change” rather than “costs up 12%”.']
    },
    {
      id: 'R03', block: 'R', frequency: 'monthly',
      name: 'KPI dashboard refresh',
      dependsOn: ['L09'], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Refresh the key performance indicators dashboard with the closed month.',
      steps: [
        'Refresh the dashboard data and move the date filter to the closed month.',
        'Check that the headline figures match the management accounts.',
        'Publish the dashboard.'
      ],
      watchOut: ['If a chart does not move when you change the date filter, the refresh did not finish.']
    },
    {
      id: 'R04', block: 'R', frequency: 'monthly',
      name: 'Cash flow forecast',
      dependsOn: ['L01', 'L03'], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Roll the 13-week cash flow forecast forward with actual balances.',
      steps: [
        'Replace last month’s forecast with the actual closing bank balances.',
        'Update expected customer receipts from the aged debt review.',
        'Flag any week where the forecast balance falls below the minimum cash level.'
      ],
      watchOut: []
    },
    {
      id: 'R05', block: 'R', frequency: 'monthly',
      name: 'Send the month-end pack',
      dependsOn: ['R01', 'R02', 'R03'], recommended: ['R04'], waitsFor: [],
      onCompletion: 'Send it to the CFO, with the finance director in copy',
      resources: [],
      summary: 'Send the management accounts, commentary and dashboard link to management.',
      steps: ['Attach the management accounts PDF, paste the commentary into the email and add the dashboard link.'],
      watchOut: []
    },

    /* ----------------------- QUARTERLY AND YEAR-END ----------------------- */
    {
      id: 'Q01', block: 'Q', frequency: 'quarterly',
      name: 'VAT return',
      dependsOn: ['L09'], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Prepare and file the quarterly VAT return.',
      steps: [
        'Run the VAT report for the quarter and reconcile it to the VAT control account.',
        'Have the return reviewed by the finance director.',
        'File the return and schedule the payment before the deadline.'
      ],
      watchOut: ['The filing deadline does not move if the close is late.']
    },
    {
      id: 'Q02', block: 'Q', frequency: 'quarterly',
      name: 'Board pack',
      dependsOn: ['R05'], recommended: [], waitsFor: [],
      onCompletion: 'Send it to the company secretary',
      resources: [],
      summary: 'Prepare the quarterly financial section of the board pack.',
      steps: [
        'Update the quarterly charts and the year-to-date summary.',
        'Add the forecast for the rest of the year.'
      ],
      watchOut: []
    },
    {
      id: 'Q03', block: 'Q', frequency: 'quarterly',
      name: 'Auditor queries',
      dependsOn: ['L09'], recommended: [], waitsFor: ['W05'],
      resources: [],
      summary: 'Answer the auditors’ quarterly review questions.',
      steps: ['Assign each query an owner and a date, and send back the answers with supporting documents.'],
      watchOut: []
    },
    {
      id: 'Q04', block: 'Q', frequency: 'yearEnd',
      name: 'Year-end statutory accounts file',
      dependsOn: ['L09', 'Q01'], recommended: [], waitsFor: [],
      resources: [],
      summary: 'Prepare the working file for the annual statutory accounts.',
      steps: [],
      watchOut: []
    }
  ]
};

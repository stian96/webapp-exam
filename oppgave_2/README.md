## Getting Started
### 1. Install pnpm:
```bash
    npm install -g pnpm
```
### 2. Initialize Database or Seed Data
```bash
    npm run seed
    # or
    yarn seed
    # or
    pnpm run seed
```

### 3. Start the Development Server
```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation for Templates and Questions
### <ins>How to create a template:</ins> 
The dashboard's navbar includes a site for creating templates, as illustrated and highlighted in the screenshot below:

![Create user template](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/CreateTemplate1.png)

It navigates the user to the site for creating a template and gives the opportunity to name the template for reuse, set performance metrics (such as Intensity, Watts, Speed, Pulse), and from a dropdown-menu choose the type of activity. 

The user can also either choose to set the template to a unique performer or chose not to.  If not, the user is able to reuse the template for any performer. 

The user can also choose to set tags, duration, and intensity for an interval, set question and the type of question, as well as set an existing question. The existing questions are accessible through the database and presented to the user in a dropdown menu.

![UserTemplate](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/CreateTemplate2.png)


### <ins>How to reuse a template:</ins> 
When a user visits a performer's session page, they can create a session by clicking a the button “Create New Session”, as seen below. 

![Reuse User-Template](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/UseTp1.png)

This action directs them to a 'Create Session' page, where a session template is displayed. 

The user can either start from scratch or choose to create a session based on an existing template previously made by the user in the “Create template- site”. This can be done by selecting the checkbox labeled “Based on template”.  

Upon activation, a dropdown menu will become available, providing access to the existing templates.

![UserTemplate Img 2](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/UseTp2.png)

If the user chooses to select an existing template, then some inputs will be autocompleted and disabled. Whenever a new session is created, the session's activity details are automatically saved in the database.


## Documentation for Filtering data
### <ins>Filtering session data by activity type/tag and report status:</ins> 

Click the red Show-button to be able to filter session data for one performer.
![Filter data img 1](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/Filter1.png)

Upon initial rendering, the system fetches all session activities from the database associated with a particular performer. It then stores all unique tags and types as state variables in lists. Selecting an option from a dropdown menu filters the displayed list according to the specified criteria.
![Filter data img 2](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/Filter2.png)

Clicking the 'X' button will reset the view to the original full list of activities. Checkboxes are active only for sessions with an existing report. Selecting one will automatically disable any unrelated checkboxes, for example, those not corresponding to the same activity type like 'cycling' or 'swimming'.
When two or more activities are chosen, a floating action button emerges, guiding the user to an analysis page with the selected activities through React navigation.


### <ins>Filtering specific measurement metrics:</ins> 
To be able to filter specific measurement metrics for the analysis page, 
two or more performers needs to be selected, e.g Sven3 and Liv4. 

#### Select users:
![Selected User 1](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/SL.png)

### Checking off the checkboxes
Next step require the user to check off a box in the compare table to each users.
![checkbox](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/FilterSL.png)

![checking off ](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/checkSL.png)

Upon selection by checking off the checkbox, a red button labeled "compare activities" will be shown in the right corner off the screen.
The button:

![Compare Button](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/CompareBtn.png)

By clicking this you will be navigated to the Analysis page.
This page shows the different measurements metrics and give the user the option to filter the shown data.

## Flowchart illustrating the Coach's perspective in the webapp.
![Flowchart of Coach's perspective](https://github.com/stian96/webapp-exam/blob/dev_Lorena/documentation/oppgave_2/Flowchart_Coach.png)

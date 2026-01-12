---
last_update:
    date: "2025-12-02T14:38:43.134Z"
    author: CI/CD Bot
content_hash: 01d9de525338f2a066269b415726e3fe39d506757eddaf56330956a721f7297d
---

# Schedule your campaigns

Fast2 has a module allowing you to schedule your next runs.
This feature is accessible only through the run place. Click on the clock icon at the top banner and you're in.

## Jobs purpose

A table of jobs is displayed, each line representing a job. The latter will be used to plan your next runs. However, a few details are needed in order to let the job perform the given action.

A job is composed as follow :

- A **unique name** composed exclusively of alphanumerical characters. Dash and underscore are accepted, others are forbidden. It's imposible to create two jobs with the same name.
- The map to run : you can pick in the dropdown list any map created earlier.
- A campaign : specify the name the dedicated input field. You can either write the name of an already existing campaign or a new one.
- A CRON expression to schedule precisely your runs.
- An action among `Start as new`, `Rerun`, `Stop` or `Resume`. It's precisely the same actions you can do in the run place.
- A maximum number of executions, if you want to limit the number of times the job will run.
- A boolean _activate_ to indicate if you're job must be ran or not (useful feature to have a job stand by, already configured for later operations).

The other columns are purely indicatives. You will find the number of executions for each job, the date of the last and when the next run has been planned.

Jobs are automatically saved when all their fields are correctly filled. If the name or the CRON expression have errors, you have to fix these errors to make the job savable.

### Jobs creation and deletion

- Button **CREATE**: Located at the end of the first row of the table, this button allows adding the entered values to create a new job. Once clicked, the entered values are used to create a new job, which is then added to the list of already created jobs. Users can then see their new job appear in the list of jobs.

- Button **DELETE**: Found at the end of each row representing an existing job, this button allows users to delete a job from the list. By clicking on this button, users can permanently delete a selected job. Before confirming the deletion, a confirmation is requested to prevent any accidental deletion.

### Caution

Despite Fast2 validates the name and the CRON expression, the match between the campaign and the job action is not tested. It is the user's responsibility to have a clear idea about what to do with which campaign.

If the action of a job is to stop a campaign, nothing will happen if the campaign is not running. The behavior is the same as the run place. See our [run section](/docs/fast2/getting-started/create-workflow#run-a-map) as a reminder in case you need it.

Additionally, it is important to note that when executing a job as _START AS NEW_, the next-to-come campaign will be triggered only once the previous campaign ends (status _FINISHED_). This ensures sequential execution and prevents overlapping campaigns, maintaining the integrity of the workflow.

:::info "For example"

    For example, even if the CRON expression indicates a frequency of 10 seconds with the CRON expression `*/10 * * * * *` between each trigger, the next campaign will only start once the previous one is finished.

:

## Cron expression

A CRON is a String composed of 6 or 7 fields separated by spaces. Each field represents a specific section of time. The 1st field will be the second unit, the 2nd one will concern the minutes and so on. All the fields are listed below with the allowed characters.

| Field Name   |     Mandatory      | Allowed Values   | Allowed Special Characters |
| ------------ | :----------------: | ---------------- | -------------------------- |
| Seconds      | :white_check_mark: | 0-59             | , - \* /                   |
| Minutes      | :white_check_mark: | 0-59             | , - \* /                   |
| Hours        | :white_check_mark: | 0-23             | , - \* /                   |
| Day of month | :white_check_mark: | 1-31             | , - \* ? / L W             |
| Month        | :white_check_mark: | 1-12 or JAN-DEC  | , - \* /                   |
| Day of week  | :white_check_mark: | 1-7 or SUN-SAT   | , - \* ? / L ##            |
| Year         |        :x:         | empty, 1970-2099 | , - \* /                   |

### Examples of cron

These examples are basic ones but they highlight the interest of using cron expressions.

<div class="overflow-x-none" markdown="block">

- Every 2 minutes

| Seconds | Minutes | Hours | Day Of Month | Month | Day Of Week | Year |
| :-----: | :-----: | :---: | :----------: | :---: | :---------: | :--: |
|    0    |   0/2   |  \*   |      ?       |  \*   |     \*      |  \*  |

- Fire at 10:15am every day

| Seconds | Minutes | Hours | Day Of Month | Month | Day Of Week | Year |
| :-----: | :-----: | :---: | :----------: | :---: | :---------: | :--: |
|    0    |   15    |  10   |      ?       |  \*   |     \*      |  \*  |

- Fire every Sunday at noon

| Seconds | Minutes | Hours | Day Of Month | Month | Day Of Week | Year |
| :-----: | :-----: | :---: | :----------: | :---: | :---------: | :--: |
|    0    |    0    |  12   |      ?       |  \*   |     SUN     |  \*  |

</div>

Cron expressions can be really useful but might quite hard to use.

:::tip "Build it yourself"

    To generate your own cron expressions easily, we suggest you to use some web generator (like [freeformatter.com](https://www.freeformatter.com/cron-expression-generator-quartz.html).

:::

## Maximum number of executions

The **Max # of executions** input field allows users to specify the maximum number of times a campaign should be executed.

- Blank: If left blank, the campaign will be executed indefinitely.

- Invalid Input: If the user enters a number that is equal to or less than the number of runs already completed, an error message "Must be higher than actual # of executions" will be displayed. The input field will retain its last valid entry.

- Valid Input: A valid input is one where the number entered is greater than the number of executions already performed, or left blank. Upon entering a valid number, the value will be saved. If the "Active" checkbox was disabled and all other fields are valid, it will become enabled.

- Execution Limit Reached: Once the number of runs reaches the value entered in this field, returning to the scheduler will display the message "Number of executions reached."

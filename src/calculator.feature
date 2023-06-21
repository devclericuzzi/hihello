Feature: A simple four functions calculator with an interactive command line interface
    Rule: "AC" button should ne entered as "c"
    Rule: The "+/-" button should ne entered as "!"
    Rule: The sum button should ne entered as "+"
    Rule: The diff button should ne entered as "-"
    Rule: The times button should ne entered as "*"
    Rule: The division button should ne entered as "/"
    Rule: The "=" will prompt the system to print the stored value
    Rule: The calculator operates based on it's current value and arrays of operators and params
    Rule: When you have one operator and one param, the operation must be excecuted as follows "operation(currentValue, param)"
    Rule: The input validation will first check for any non-allowed chars "[^\d\+\-\*\/!=c]", which will invalidate the input
    Rule: Then the input validation will look for two operators in a row "[\+\-\/\*]{2,}", which will invalidate the input
    Rule: The next validation is to look for two "=" within the input "=.*="
    Rule: Lastly the input validation will check if the input ends with an "=", if so there will be a console.log(currentValue) after the input actions
    Rule: The "AC" command can never be mixed with more input, it has to be a single char input

        Scenario: Simple single input
            Given a list user inputs that looks like this "2+45"
            When parsing and consuming the inputs
            Then the calculator state should be as follows
            """
            {
                "currentValue": 2,
                "params": [ 45 ],
                "operators": [ "+" ]
            }
            """

        Scenario: Simple single input with exclamation operator
            Given a list user inputs that looks like this "!4+3"
            When parsing and consuming the inputs
            Then the calculator state should be as follows
            """
            {
                "currentValue": -4,
                "params": [ 3 ],
                "operators": [ "+" ]
            }
            """

        Scenario: Simple single input, ending with equals
            Given a list user inputs that looks like this "2+45="
            When parsing and consuming the inputs
            Then the calculator state should be as follows
            """
            {
                "currentValue": 47,
                "params": [],
                "operators": []
            }
            """
            And console.log has been called 1 times

        Scenario: Multiple inputs, ending with equals
            Given a list user inputs that looks like this "2+45,="
            When parsing and consuming the inputs
            Then the calculator state should be as follows
                """
                {
                    "currentValue": 47,
                    "params": [],
                    "operators": []
                }
                """
            And console.log has been called 1 times

        Scenario: Multiple inputs, clearing in the end
            Given a list user inputs that looks like this "2+45,c"
            When parsing and consuming the inputs
            Then the calculator state should be as follows
                """
                {
                    "currentValue": 0,
                    "params": [],
                    "operators": []
                }
                """
            And console.log has been called 1 times

        Scenario: Handling errors, multiple equals
            Given a list user inputs that looks like this "2+4=5="
            When parsing and consuming the inputs, with errors
            Then the error must include the following message "You cannot have more than one '=' on your input"

        Scenario: Handling errors, double exclamations
            Given a list user inputs that looks like this "2+45!!"
            When parsing and consuming the inputs, with errors
            Then the error must include the following message "You cannot have two '!' in a row on your input"

        Scenario: Handling errors, dangling exclamations
            Given a list user inputs that looks like this "2+45!+"
            When parsing and consuming the inputs, with errors
            Then the error must include the following message "An '!' has to come before a number on your input"

        Scenario: Handling errors, chained exclamated params
            Given a list user inputs that looks like this "!2!45"
            When parsing and consuming the inputs, with errors
            Then the error must include the following message "You cannot add two sequential params, even if using an '!' between them"

        Scenario: Division by zero
            Given a list user inputs that looks like this "2+45/0="
            When parsing and consuming the inputs, with errors
            Then the error must include the following message "There is no division by zero"
            Then the calculator state should be as follows
            """
            {
                "currentValue": 47,
                "params": [],
                "operators": []
            }
            """
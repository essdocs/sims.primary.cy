---
title: IF
---

~~~ sql
IF(something_is_true, then do_this, otherwise_do_this)
~~~

## Purpose

This formula enables you to generate an either/or outcome based upon the conditions you select. 

You need to specify the two values to be compared, then define the two possible outcomes depending on whether the comparison is true or false. 

You can make a nested If formula by using the IF formula as an outcome. 

E.g. IF([Teacher Assessment - Autumn] < [Teacher Assessment - Spring], "Progress", IF([Teacher Assessment - Autumn] = "U", "Poor Result","No Progress")). 

This formula supports =, <=, >=, <, > conditions. 

You can also reference AND and OR operations by using the keyword "AND" or "OR" at the beginning of the IF. E.g. IF(AND(something_is_true, something_is_true),then_do_this, otherwise_do_this)

## Returns

Any

## Arguments

something_is_true
: This argument defines the condition for the IF formula. 

For grade or pupil information the value must be supplied using quotation marks, "A". Pupil information can only be used with the = operator. 

For marks, no quotation is required 100.

then_do_this
: The outcome that applies if the condition is evaluated to true. 

For a grade or text output, the value must be supplied using quotation marks, "A". 

For a mark output, no quotation is required 100. A formula can be an outcome.

otherwise_do_this
: The outcome that applies if the condition is evaluated to false. 

For a grade or text output, the value must be supplied using quotation marks, "A". 

For a mark output, no quotation is required 100. 

A formula can be an outcome.
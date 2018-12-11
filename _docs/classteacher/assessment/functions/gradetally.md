---
title: GRADETALLY
---

~~~ sql
GRADETALLY(Array, Aspect X, [Aspect Y])
~~~

## Purpose

This formula searches across the given set of columns and return the number of results, matching the given criteria.

Grade Tally for Grade Aspects: You need to identify the grade(s) in which you're interested. 

These grades must be specified in the array argument like {'A','B','C'}.

If the search finds 3 x A, 4 x B, 7 x C then the outcome is 14. NOTE: You must include every grade that you want tallied.

Entering 'A' only counts the number of 'A's.

If you also want to count A+ and A-, you must include these in your list. 

E.g., GRADETALLY({'A', 'B', 'C'}, [ASPECT X], [ASPECT Y]) Grade Tally for Marks Aspects: You need to identify the window/range of marks in which you're interested.

The window of marks needs to be specified in the array argument, separated by a semi-colon.

E.g., {10:20}. If seven results are falling between 10 and 20, the outcome is 7.

E.g., GRADETALLY({10:20}, [ASPECT X], [ASPECT Y])

## Returns

Number

## Arguments

Array
: This argument defines the search criteria for the Grade Tally formula. For grade aspects, grade(s) must be specified {'A','B',C'}.For marks aspects, a window of marks must be specified {10:20}.

Aspect X
: Any aspect from the template.

Aspect Y [optional] repeatable
: To include any other aspect from the template. You can append more aspects separated by commas (,).
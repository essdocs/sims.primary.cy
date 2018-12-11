---
title: Formulas
---

A formula performs calculations or other actions on the data in your Marksheet.

Formula columns are indicated by an {% include icon.html url="formula-function" title="Formula Icon" %} symbol in the column header.

To see details of the formula, open the {% include glossarytooltip.html explain="Column Menu" %} and click {% include icon.html url="formula" title="Take Formula" %} **View Formula**.

A formula can contain any or all of the following: functions, references, operators, and constants.

## Functions

Functions are predefined formulas that do calculations by using values passed in, called arguments.

* [GRADETALLY](functions/gradetally)
* [IF](functions/if)
* [LARGE](functions/large)
* [MARKSTOGRADE](functions/markstograde)
* [MAX](functions/max)
* [MEAN](functions/mean)
* [MEDIAN](functions/median)
* [PERCENT](functions/percentage)
* [POSITION](functions/position)
* [RANGE](functions/range)

## Operator

Operators specify the type of calculation that you want to perform on the Assessment.

There are two different types of calculation operators: arithmetic and comparison.

### Arithmetic operators

To perform mathematical operations, such as addition, subtraction, multiplication, or division; combine numbers use the following arithmetic operators.

| Arithmetic operator | Meaning              | Example |
| ------------------- | -------------------- | ------- |
| + (plus sign)       | Addition             | 3+3     |
| – (minus sign)      | Subtraction Negation | 3–1–1   |
| * (asterisk)        | Multiplication       | 3*3     |
| / (forward slash)   | Division             | 3/3     |

### Comparison operators  

You can compare two values with the following operators. Comparing two values returns either TRUE or FALSE.

| Comparison operator                | Meaning                  | Example |
| ---------------------------------- | ------------------------ | ------- |
| = (equal sign)                     | Equal to                 | [Column 1]=[Column 2]   |
| > (greater than sign)              | Greater than             | [Column 1]>[Column 2]   |
| < (less than sign)                 | Less than                | [Column 1]<[Column 2]   |
| >= (greater than or equal to sign) | Greater than or equal to | [Column 1]>=[Column 2]  |
| <= (less than or equal to sign)    | Less than or equal to    | [Column 1]<=[Column 2]  |
| <> (not equal to sign)             | Not equal to             | [Column 1]<>[Column 2]  |

## Parentheses

There are cases where the order in which a calculation is performed affects the return value of the formula.

To change the order of evaluation, enclose in parentheses the part of the formula to be calculated first. For example:

~~~ math
1 + 2 * 3 = 7
~~~

In contrast, using parentheses to change the precedence you get:

~~~ sql
(1 + 2) * 3 = 9
~~~
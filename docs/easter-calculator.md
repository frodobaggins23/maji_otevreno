# Easter Calculator Documentation

## Overview

The Easter Calculator Service implements the **Gregorian Easter Algorithm** by Jean Meeus to calculate the date of Easter Sunday for any given year. This algorithm is widely regarded as the most accurate method for computing Easter dates in the Gregorian calendar system.

## What is Easter and Why is it Complex?

Easter is a Christian holiday that celebrates the resurrection of Jesus Christ. Unlike fixed holidays (like Christmas on December 25), Easter is a **moveable feast** - its date changes every year based on astronomical calculations.

The rules for determining Easter date were established at the **Council of Nicaea in 325 AD**:

> Easter is celebrated on the first Sunday after the first full moon that occurs on or after the vernal equinox (March 21).

This seemingly simple rule becomes mathematically complex because it involves:
- The lunar calendar (moon phases)
- The solar calendar (seasons and equinox)
- The weekly calendar (finding the next Sunday)

## The Jean Meeus Algorithm

**Jean Meeus** is a Belgian astronomer who developed precise astronomical algorithms. His Easter calculation method, published in "Astronomical Algorithms" (1991), is the gold standard for Easter date computation.

### Why This Algorithm?

1. **Accuracy**: Works correctly for all years in the Gregorian calendar
2. **Simplicity**: Pure mathematical calculation, no lookup tables needed
3. **Efficiency**: Fast computation suitable for software applications
4. **Reliability**: Widely tested and used in astronomical software

## Step-by-Step Algorithm Explanation

Let's walk through the algorithm using **2025** as an example:

### Step 1: Golden Number
```
goldenNumber = year % 19
```
**Example**: `2025 % 19 = 15`

**What it means**: The Golden Number represents the position of the year in the 19-year **Metonic cycle**. Ancient astronomers discovered that lunar phases repeat almost exactly every 19 years. This cycle helps predict when full moons will occur.

### Step 2: Century Calculations
```
centuryIndex = Math.floor(year / 100)
yearInCentury = year % 100
```
**Example**: 
- `Math.floor(2025 / 100) = 20`
- `2025 % 100 = 25`

**What it means**: We separate the year into century (20) and position within century (25). This is needed because the Gregorian calendar has different leap year rules for century years.

### Step 3: Century Leap Year Adjustments
```
centuryLeapAdjustment = Math.floor(centuryIndex / 4)
centuryRemainder = centuryIndex % 4
```
**Example**:
- `Math.floor(20 / 4) = 5`
- `20 % 4 = 0`

**What it means**: Century years (like 1900, 2000) have special leap year rules. Only centuries divisible by 4 are leap years. This adjustment accounts for those exceptions.

### Step 4: Gregorian Calendar Corrections
```
gregorianCorrection = Math.floor((centuryIndex + 8) / 25)
lunarCorrection = Math.floor((centuryIndex - gregorianCorrection + 1) / 3)
```
**Example**:
- `Math.floor((20 + 8) / 25) = Math.floor(28 / 25) = 1`
- `Math.floor((20 - 1 + 1) / 3) = Math.floor(20 / 3) = 6`

**What it means**: The Gregorian calendar was introduced in 1582 to correct drift in the Julian calendar. These values adjust for the accumulated error and ensure lunar calculations remain accurate.

### Step 5: Paschal Full Moon Calculation
```
paschalFullMoon = (19 * goldenNumber + centuryIndex - centuryLeapAdjustment - lunarCorrection + 15) % 30
```
**Example**: `(19 * 15 + 20 - 5 - 6 + 15) % 30 = 309 % 30 = 9`

**What it means**: This calculates the "ecclesiastical" full moon date in March. The number represents days after March 21. So `9` means March 30th would be the Paschal full moon.

### Step 6: Year Leap Adjustments
```
yearLeapAdjustment = Math.floor(yearInCentury / 4)
yearRemainder = yearInCentury % 4
```
**Example**:
- `Math.floor(25 / 4) = 6`
- `25 % 4 = 1`

**What it means**: We need to account for leap years within the current century to properly calculate what day of the week dates fall on.

### Step 7: Weekday Calculation
```
weekdayAdjustment = (32 + 2 * centuryRemainder + 2 * yearLeapAdjustment - paschalFullMoon - yearRemainder) % 7
```
**Example**: `(32 + 2*0 + 2*6 - 9 - 1) % 7 = 34 % 7 = 6`

**What it means**: This determines what day of the week the Paschal full moon falls on. Since Easter must be on Sunday, we need this to find the next Sunday.

### Step 8: Special Case Adjustment
```
specialCaseAdjustment = Math.floor((goldenNumber + 11 * paschalFullMoon + 22 * weekdayAdjustment) / 451)
```
**Example**: `Math.floor((15 + 11*9 + 22*6) / 451) = Math.floor(246 / 451) = 0`

**What it means**: This handles special cases where the calculated date would fall outside the valid Easter range (March 22 - April 25).

### Step 9: Final Month and Day
```
easterMonth = Math.floor((paschalFullMoon + weekdayAdjustment - 7 * specialCaseAdjustment + 114) / 31)
easterDay = ((paschalFullMoon + weekdayAdjustment - 7 * specialCaseAdjustment + 114) % 31) + 1
```
**Example**:
- `Math.floor((9 + 6 - 0 + 114) / 31) = Math.floor(129 / 31) = 4` (April)
- `(129 % 31) + 1 = 5 + 1 = 20` (20th day)

**Result**: Easter 2025 falls on **April 20, 2025**

## Algorithm Validation

The algorithm ensures Easter always falls within the correct range:
- **Earliest possible**: March 22
- **Latest possible**: April 25
- **Always on Sunday**: The weekday calculations guarantee this

## Implementation in Our Service

Our `EasterCalculatorService` implements this algorithm with:

```typescript
calculateEasterSunday(year: number): Date
calculateGoodFriday(year: number): Date    // Easter Sunday - 2 days
calculateEasterMonday(year: number): Date  // Easter Sunday + 1 day
```

## References

- Meeus, Jean. "Astronomical Algorithms" (1991)
- Gregorian Calendar Reform documentation
- Council of Nicaea historical records
- International Organization for Standardization (ISO) date standards
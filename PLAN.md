# Anesthesia billing assistant

This document describes the rationale and user interface for an application which is meant to help anesthesiologists with their billing decisions. 

## Rationale for application

When an anesthesiologist completes their day, they must fill in billing cards. To optimize billing, these cards are filled out in a certain way - each 15 minute increment past the start of a surgery represents a billing "unit". To be safe, anesthesiologists usually tag on 5 minutes to the end of the last unit to be sure that it is billed correctly. The current state is that anesthesiologists must manually calculate this every time depending on the start time of the surgery. 

Alternatively, an anestesia assistant or resident will fill in the billing card, but sometimes they do it wrong. In this case, the anestesiologist must understand how long the resident billed for in terms of units and what the actual optimal time windows would have been (different options on the 15 minute + 5 minutes at the end scale) as well as how many units those correspond to. 

Billing units work as follows: 

```
import math

def billing_units(minutes: float) -> int:
    """
    Surgical billing units as a function of elapsed minutes.
    
    Rate structure:
      0–60 min:  1 unit per 15-min block (or part thereof)
     60–90 min:  2 units per 15-min block
        90+ min: 3 units per 15-min block
    """
    if minutes <= 0:
        return 0

    total = 0

    tier1 = min(minutes, 60)
    total += math.ceil(tier1 / 15) * 1

    if minutes > 60:
        tier2 = min(minutes - 60, 30)
        total += math.ceil(tier2 / 15) * 2

    if minutes > 90:
        tier3 = minutes - 90
        total += math.ceil(tier3 / 15) * 3

    return total
```

### Desired UX 

The two major components are the start time and the end time. There should be a modal that displays the units computed from the start and end time as well as the actual number of minutes (in minutes and hours). 

The end time should be autofilled to the current time. But it should be easy to adjust to account for when someone else has filled in a card and you need to check how much time has elapsed. 

Beyond this, the UX needs to be clean and mobile-friendly. I want people to be able to use safari's "add shortcut" to the app to make an "app". In other words, this should be a Progressive Web App. 

### Deployment

Here I don't know. Would this work as a static website that I could put on Github pages? Or would I need to have a cloud run service? 

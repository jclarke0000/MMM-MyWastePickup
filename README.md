# MMM-MyWastePickup

This a module for [MagicMirror](https://github.com/MichMich/MagicMirror).

This displays your schedule for Toronto curbside waste pickup.

![Screenshot](/../screenshots/screenshot.png?raw=true "Screenshot")


## Installation
1. Navigate into your MagicMirror `modules` folder and execute<br>
`git clone https://github.com/jclarke0000/MMM-MyWastePickup.git`.
2. Enter the new `MMM-MyWastePickup` directory and execute `npm install`.

## Configuration

Go to http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=3f3cbf3b6e156510VgnVCM10000071d60f89RCRD
to determine your collection calendar, and configure it as below:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collectionCalendar</code></td>
      <td><strong>REQUIRED</strong> The schedule for your curbside pickup, as dertmined above.<br><br><strong>String</strong> <code>Array</code><br />Valid values are <code>MondayNight</code>, <code>Tuesday1</code>, <code>Tuesday2</code>, <code>Wednesday1</code>, <code>Wednesday2</code>, <code>Thursday1</code>, <code>Thursday2</code>, <code>Friday1</code>, or <code>Friday2</code>.<br />It is also possible to specify <code>Custom</code> in case you want to use your own custom pickup schedule.  See below for more information about using your own schedule.<br /><br />Any other value will be ignored and the module will default to <code>Tuesday1</code>.</td>
    </tr>
  </tbody>
</table>

### Example config

```
{
  module: 'MMM-MyWastePickup',
  position: 'top_left',
  header: 'My Waste Collection',
  config: {
    collectionCalendar: 'Tuesday1'
  }
},
```

## Note

This works off of a static CSV file obtained from the city of Toronto's website here:
https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/garbage-and-recycling/#8e932504-cabb-71b1-b23a-6cf504f7c474

As such, this module currently only has data until the end of the year 2018.  I'll be updating this
to include 2019's data when it's available, but if I forget to do it, download the CSV for 2019, and
copy it over the existing schedule.csv file in this module's directory.



## Using Your Own Custom Schedule

If you live outside of Toronto and you'd like to use this module, you can create your own schedule to use with this module.

1. First, in your config specify `collectionCalendar: 'Custom'`.
2. Create a CSV based on the following template:

```
Calendar,WeekStarting,GreenBin,Garbage,Recycling,YardWaste,ChristmasTree
Custom,03/07/18,1,0,1,0,0
Custom,03/14/18,1,1,1,0,0
Custom,03/21/18,1,0,1,0,0
Custom,03/28/18,1,1,1,0,0
```
Add lines for each pickup date as needed

The following points are very important:
* The CSV file must be delimited using commas
* The first line containing the headers must appear exactly as above.  If the module is stuck on "Loading..." after you've created your custom schedule, double-check that none of the headers are misspelled.
* You MUST use the schedule name `Custom` at the beginning of each line.
* The date format needs to be specified as `MM/DD/YY` (e.g.: 05/28/18 for 28-May-2018)
* The last five fields of each line specify whether the particular waste product is scheduled to be picked up on the given date. A value of `0` means no pick up. A value of ANYTHING ELSE means the product will be picked up.  Using the first pick up date entry in the template above, `1,0,1,0,0` means that `GreenBin` and `Recycling` will be picked up on that date, while `Garbage`, `YardWaste`, and `ChristmasTree` will not be picked up.



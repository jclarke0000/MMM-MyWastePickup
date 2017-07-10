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
      <td><strong>REQUIRED</strong> The schedule for your curbside pickup, as dertmined above.<br><br><strong>String</strong> <code>Array</code><br />Valid values are <code>MondayNight</code>, <code>Tuesday1</code>, <code>Tuesday2</code>, <code>Wednesday1</code>, <code>Wednesday2</code>, <code>Thursday1</code>, <code>Thursday2</code>, <code>Friday1</code>, or <code>Friday2</code>.<br />Any other value will be ignored and the module will default to <code>Tuesday1</code>.</td>
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
http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=2ee34b5073cfa310VgnVCM10000071d60f89RCRD&vgnextchannel=bcb6e03bb8d1e310VgnVCM10000071d60f89RCRD

As such, this module currently only has data until the end of the year 2017.  I'll be updating this
to include 2018's data when it's available, but if I forget to do it, download the CSV for 2018, and
copy it over the existing schedule.csv file in this module's directory.


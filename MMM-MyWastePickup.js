Module.register('MMM-MyWastePickup', {

  defaults: {
    collectionCalendar: 'Tuesday1'
  },

  validCollectionCalendars: [
    "MondayNight",
    "Tuesday1",
    "Tuesday2",
    "Wednesday1",
    "Wednesday2",
    "Thursday1",
    "Thursday2",
    "Friday1",
    "Friday2",
    "Custom"
  ],

  // Define required styles.
  getStyles: function () {
    return ["MMM-MyWastePickup.css"];
  },  

  start: function() {
    Log.info('Starting module: ' + this.name);

    this.nextPickups = [];

    if (this.validCollectionCalendars.indexOf(this.config.collectionCalendar) == -1) {
      this.config.collectionCalendar = "Tuesday1";
    }

    this.getPickups();

    this.timer = null;

  },

  getPickups: function() {

    clearTimeout(this.timer);
    this.timer = null;

    this.sendSocketNotification("MMM-MYWASTEPICKUP-GET", {collectionCalendar: this.config.collectionCalendar, instanceId: this.identifier});

    //set alarm to check again tomorrow
    var self = this;
    this.timer = setTimeout( function() {
      self.getPickups();
    }, 60 * 60 * 1000); //update once an hour
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification == "MMM-MYWASTEPICKUP-RESPONSE" + this.identifier && payload.length > 0) {
      this.nextPickups = payload;
      this.updateDom(1000);
    }
  },

  svgIconFactory: function(glyph) {

    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttributeNS(null, "class", "waste-pickup-icon " + glyph);
    var use = document.createElementNS('http://www.w3.org/2000/svg', "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.file("icon_sprite.svg#") + glyph);
    svg.appendChild(use);
    
    return(svg);
  },   

  getDom: function() {
    var wrapper = document.createElement("div");

    if (this.nextPickups.length == 0) {
      wrapper.innerHTML = this.translate('LOADING');
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    var self = this;

    this.nextPickups.forEach( function(pickup) {

      var pickupContainer = document.createElement("div");
      pickupContainer.classList.add("pickup-container");

      //add pickup date
      var dateContainer = document.createElement("span");
      dateContainer.classList.add("pickup-date");

      //determine how close pickup day is and formats accordingly.
      var today = moment().startOf("day");
      var pickUpDate = moment(pickup.pickupDate);
      if (today.isSame(pickUpDate)) {
        dateContainer.innerHTML = "Today";
      } else if (moment(today).add(1, "days").isSame(pickUpDate)) {
        dateContainer.innerHTML = "Tomorrow";
      } else if (moment(today).add(7, "days").isAfter(pickUpDate)) {
        dateContainer.innerHTML = pickUpDate.format("dddd");
      } else {
        dateContainer.innerHTML = pickUpDate.format("MMMM D");
      }

      pickupContainer.appendChild(dateContainer);

      //add icons 
      var iconContainer = document.createElement("span");
      iconContainer.classList.add("waste-pickup-icon-container");

      if (pickup.GreenBin) {
        iconContainer.appendChild(self.svgIconFactory("compost"));
      }
      if (pickup.Garbage) {
        iconContainer.appendChild(self.svgIconFactory("garbage"));
      }
      if (pickup.Recycling) {
        iconContainer.appendChild(self.svgIconFactory("recycle"));
      }
      if (pickup.YardWaste) {
        iconContainer.appendChild(self.svgIconFactory("yard_waste"));
      }
      if (pickup.ChristmasTree) {
        iconContainer.appendChild(self.svgIconFactory("christmas_tree"));
      }

      pickupContainer.appendChild(iconContainer);

      wrapper.appendChild(pickupContainer);

    });

    return wrapper;
  }

});
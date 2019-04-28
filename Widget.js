// Pattern: Wrap Your Widgets
// Video explanation: https://youtu.be/WpA5ld-EGp4?t=1649
define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  './subwidget/TwitterStreamWidget3x'
],
function(declare, BaseWidget, SubWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'twitter-stream-timeline',
    // this property is set by the framework when widget is loaded.
    // name: 'TwitterStreamTimeline',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('TwitterStreamTimeline::postCreate');
      this.subWidget = new SubWidget({
        serviceUrl: this.config.serviceUrl,
        map: this.map
      });
    },

    startup: function() {
      this.inherited(arguments);
      this.subWidget.startup();
      console.log('TwitterStreamTimeline::startup');
    },

    onOpen: function(){
      console.log('TwitterStreamTimeline::onOpen');
    },

    onClose: function(){
      console.log('TwitterStreamTimeline::onClose');
    },

    onMinimize: function(){
      console.log('TwitterStreamTimeline::onMinimize');
    },

    onMaximize: function(){
      console.log('TwitterStreamTimeline::onMaximize');
    },

    onSignIn: function(credential){
      console.log('TwitterStreamTimeline::onSignIn', credential);
    },

    onSignOut: function(){
      console.log('TwitterStreamTimeline::onSignOut');
    },

    onPositionChange: function(){
      console.log('TwitterStreamTimeline::onPositionChange');
    },

    resize: function(){
      console.log('TwitterStreamTimeline::resize');
    },

    formatDate: function(d){

      var month = d.getMonth()+ 1,
          day = d.getDate(),
          year = d.getFullYear(),
          t = {
            hour: d.getHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds()
          };

      ["hour", "minutes", "seconds"].forEach(function(elem, i){

        t[elem] = (t[elem] < 10)? "0" + t[elem] : t[elem];

      });

      return [day, month ,year].join('/')+' '+
        [t.hour, t.minutes, t.seconds].join(':');
    },

    linkify: function (inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

      return replacedText;
    }

    //methods to communication between widgets:

  });

});

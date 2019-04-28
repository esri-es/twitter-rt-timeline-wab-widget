// Scaffold created using https://github.com/tomwayson/generator-esri-widget
define([
  'dojo/text!./templates/TwitterStreamWidget3x.html',

  'dojo/_base/declare',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin'
], function(
  template,

  declare,

  _WidgetBase,
  _TemplatedMixin
) {
  return declare([_WidgetBase, _TemplatedMixin], {
    // description:
    //

    templateString: template,
    baseClass: 'twitter-stream-widget3x',

    constructor: function(options){
        options = options || {};

        this.serviceUrl = options.serviceUrl;
        this.filter = options.filter;
        this.map = options.map;

        that = this;
    },
    // Properties to be sent into constructor

    postCreate: function() {
      // summary:
      //    Overrides method of same name in dijit._Widget.
      // tags:
      //    private
      console.log('app.TwitterStreamWidget3x::postCreate', arguments);

      this.setupConnections();

      this.inherited(arguments);

      var serviceUrl = that.serviceUrl;

      // serviceUrl = this.config.serviceUrl;
      serviceUrl = (serviceUrl.indexOf("http") === 0)? serviceUrl.replace("http","ws"): serviceUrl;
      serviceUrl = (serviceUrl.indexOf("ws:") === 0)? serviceUrl.replace("ws:","wss:"): serviceUrl;
      serviceUrl = (serviceUrl.indexOf("/subscribe") === -1)? serviceUrl + "/subscribe":serviceUrl;

      var exampleSocket = new WebSocket(serviceUrl);

      exampleSocket.onopen = function() {
        exampleSocket.send(JSON.stringify({filter: that.filter}));
      };

      that = this;

      exampleSocket.onmessage = function (event) {
        // console.log(event.data);
        var attr = JSON.parse(event.data).attributes;
        var d = new Date(attr.created_at);

        // $('#').prepend(
        let tweet = `
          <li class="tweet">
            <a href="https://www.twitter.com/${attr.screename}" target="_blank">
              <img src="${attr.profile_image_url_https}">
            </a>
            <div class="block">
              <span class="usename">
                <a href="https://www.twitter.com/${attr.screename}" target="_blank">
                  ${attr.username}
                </a>:
                ${that.linkify(attr.text)}
              </span><br>
              <span
                class="place"
                data-dojo-attach-point="id-${attr.id_str}"
                data-dojo-attach-event="click: clicked">
                ${attr.location}
              </span>
              <small>${that.formatDate(d)} | <a href="${attr.tweet_url}" target="_blank">View original</a></small>
              </div>
          </li>
        `;
        let parent = document.getElementById('tweet-list');
        // elChild = document.createElement('div');
        // elChild.innerHTML = parent;
        var el= document.createElement('li');
        el.classList.add("tweet");
        el.innerHTML = tweet.trim();
        parent.insertBefore( el.firstChild, parent.firstChild);
      }
    },

    setupConnections: function() {
      // summary:
      //    wire events, and such
      //
      console.log('app.TwitterStreamWidget3x::setupConnections', arguments);

    },

    clicked: function(e) {
        // handle event
        debugger
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
  });
});

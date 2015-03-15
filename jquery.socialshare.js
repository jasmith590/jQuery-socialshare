;(function ($, window, document, undefined) {

    var pluginName = "socialSharer";

    // The actual plugin constructor
    function SocialSharer(element, options) {
        this.element = element;
        this.defaults = {
            debug: false,
            success: false,
            url: document.URL,
            networks: {
                google_plus: {
                    enabled: true,
                    url: 'https://plus.google.com/share'
                },
                twitter: {
                    enabled: true,
                    url: 'https://twitter.com/intent/tweet',
                    description: null
                },
                facebook: {
                    enabled: true,
                    url: 'https://www.facebook.com/sharer/sharer.php',
                    app_id: null,
                    title: null,
                    caption: null,
                    description: null,
                    image: null
                },
                pinterest: {
                    enabled: true,
                    url: 'https://www.pinterest.com/pin/create/button/',
                    image: null,
                    description: null
                }
            }
        };

        this.init(options);
    }

    /**
     * Initiation of plugin object scope.
     * Will accept an element and options
     *
     * @param element
     *  jQuery element to act upon
     * @param options
     *  Optional options to override defaults that determine
     *  what and how this pluing works
     */
    SocialSharer.prototype = {

        init: function(options) {
            // Overrides the default settings
            this.overrideDefaults(options);
            this.initObservers();
            this.setupInstance();

            // Start the debugger
            if (this.options.debug === true) {
                this.setupDebugging();
            }
        },

        initObservers : function() {
            $(document).on('click:socialcon', this.triggerSharing.bind(this));
        },

        setupInstance : function() {
            var self = this;
            if(this.element.childElementCount > 0){
                $.each(this.element.children, function(index, ele) {
                    var network = $(ele).data('network'),
                        desc = $(ele).data('description');

                    // Set the network description
                    if(typeof desc !== 'undefined'){
                        self.options.networks[network].description = desc;
                    }else {
                        self.options.networks[network].description = self.getDefaultMessage();
                    }

                    // Setup Click Event
                    $(ele).on('click', function(){
                        $(document).trigger('click:socialcon', [$(this)]);
                    });
                });
            }
        },

        triggerSharing : function(event, ele) {
            var network = ele.data('network');

            if(typeof network !== "string"){
                return;
            }
            if(typeof this["network" + this.stringCapitalize(network)] === 'function'){
                this["network" + this.stringCapitalize(network)](network);
            }
        },

        stringCapitalize : function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        networkFacebook : function() {
            return this.popup(this.options.networks.facebook.url, {
                u: this.options.url,
                t: this.options.networks.facebook.description
            });
        },

        networkTwitter : function() {
            return this.popup(this.options.networks.twitter.url, {
                text: this.options.networks.twitter.description,
                url: this.options.url
            });
        },

        networkGoogle_plus : function() {
            return this.popup(this.options.networks.google_plus.url, {
                url: this.options.url
            });
        },

        networkPinterest : function() {
            return this.popup(this.options.networks.pinterest.url, {
                url: this.options.url,
                description: this.options.networks.pinterest.description
            });
        },

        getDefaultMessage : function() {
            if(document.title){
                return document.title;
            }
        },

        /**
         * Popup generator. Lets you supply and url and parameters to
         * the URL. Will be positions to middle of window based on calculations
         * taken from page load.
         *
         * @params url
         *  The URL to be used in popup
         * @params params
         *  Object of parameters to be passed into string as GET parameters.
         *  Will be URL encoded.
         */
        popup : function(url, params) {
            var k, popup, qs, v;

            if (params == null) {
                params = {};
            }
            popup = {
                width: 500,
                height: 350
            };

            // Set popup position
            popup.top = (screen.height / 2) - (popup.height / 2);
            popup.left = (screen.width / 2) - (popup.width / 2);

            // Do a quick loop return to get parameters
            // in a manner in which we can use them in a URL
            qs = ((function() {
                var _results = [];

                for (k in params) {
                    v = params[k];
                    _results.push("" + k + "=" + (this.encode(v)));
                }
                return _results;
            }).call(this)).join('&');

            if (qs) {
                qs = "?" + qs;
            }
            return window.open(url + qs, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
        },

        isEncoded : function(str) {
            str = this.toUrlKey(str);
            return decodeURIComponent(str) !== str;
        },

        encode : function(str) {
            if (typeof str === "undefined" || this.isEncoded(str)) {
                return str;
            } else {
                return this.toUrlKey(str);
            }
        },

        /**
         * Takes a string and returns a url encoded parsable
         * string
         */
        toUrlKey : function(str) {
            var tmp;
            tmp = encodeURIComponent(str);
            return tmp.replace(/[!'()*]/g, function(c) {
                return "%" + c.charCodeAt(0).toString(16);
            });
        },

        /**
         * Takes default settings in object scope, and
         * merges the optional object passed in on initiation
         * of the class. New object is created so we do not
         * accidently overwrite others.
         */
        overrideDefaults: function (options) {
            this.options = $.extend({}, this.defaults, options);
        },

        setupDebugging: function () {
            this.watchConsole('Plugin ' + pluginName + ' started!');
            this.watchConsole(this);
        },

        /**
         * Adds console log if degubbing is true
         * @param string
         */
        watchConsole: function (message) {
            if (this.options.debug === true) {
                console.log(message);
            }
        }
    };

    /**
     * Lightweight wrapper arond constructor preventing
     * against multiple instatiations
     * @param options
     */
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new SocialSharer(this, options));
            }
        });
    };

})(jQuery, window, document);
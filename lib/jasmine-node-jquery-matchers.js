(function() {
  var handler, hasProperty, jQueryMatchers, matchers, name, options, registerMatcher;

  exports.options = options = {
    hiddenClass: 'hidden'
  };

  jQueryMatchers = {
    toHaveClass: function(className) {
      return this.actual.hasClass(className);
    },
    toBeVisible: function() {
      return this.actual.is(':visible');
    },
    toBeHidden: function() {
      return this.actual.is(':hidden');
    },
    toBeAllVisible: function() {
      return !this.actual.filter(':hidden').length;
    },
    toBeAllHidden: function() {
      return !this.actual.filter(':visible').length;
    },
    toBeCssHidden: function(hiddenClass) {
      return this.actual.hasClass(hiddenClass || options.hiddenClass);
    },
    toBeCssVisible: function(hiddenClass) {
      return !this.actual.hasClass(hiddenClass || options.hiddenClass);
    },
    toBeAllCssVisible: function(hiddenClass) {
      return !this.actual.filter("." + (hiddenClass || options.hiddenClass)).length;
    },
    toBeAllCssHidden: function(hiddenClass) {
      return !this.actual.filter(":not(." + (hiddenClass || options.hiddenClass) + ")").length;
    },
    toBeSelected: function() {
      return this.actual.is(':selected');
    },
    toBeChecked: function() {
      return this.actual.is(':checked');
    },
    toBeEmpty: function() {
      return this.actual.is(':empty');
    },
    toExist: function() {
      return this.actual.length;
    },
    toHaveAttr: function(attributeName, expectedAttributeValue) {
      return hasProperty(this.actual.attr(attributeName), expectedAttributeValue);
    },
    toHaveId: function(id) {
      return this.actual.attr('id') === id;
    },
    toHaveHtml: function(html) {
      return this.actual.html() === options.jQuery('<div/>').append(html).html();
    },
    toHaveText: function(text) {
      if (typeof (text != null ? text.test : void 0) === "function") {
        return text.test(this.actual.text());
      } else {
        return this.actual.text() === text;
      }
    },
    toHaveValue: function(value) {
      return this.actual.val() === value;
    },
    toHaveData: function(key, expectedValue) {
      return hasProperty(this.actual.data(key), expectedValue);
    },
    toBe: function(selector) {
      return this.actual.is(selector);
    },
    toContain: function(selector) {
      return this.actual.find(selector).length;
    },
    toBeDisabled: function(selector) {
      return this.actual.is(':disabled');
    },
    toHandle: function(eventName) {
      var events;
      events = this.actual.data("events");
      return events && events[eventName].length;
    },
    toHandleWith: function(eventName, eventHandler) {
      var ev, _i, _len, _ref;
      _ref = this.actual.data("events")[eventName];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ev = _ref[_i];
        if (ev.handler === eventHandler) return true;
      }
      return false;
    }
  };

  hasProperty = function(actualValue, expectedValue) {
    if (expectedValue === void 0) return actualValue !== void 0;
    return actualValue === expectedValue;
  };

  exports.matchers = matchers = {};

  registerMatcher = function(name, handler) {
    var builtInMatcher;
    builtInMatcher = jasmine.Matchers.prototype[name];
    return matchers[name] = function() {
      var result, _ref;
      if (this.actual instanceof options.jQuery) {
        result = handler.apply(this, arguments);
        this.actual = ((_ref = this.actual[0]) != null ? _ref.outerHTML : void 0) || '[empty jQuery selection]';
        return result;
      }
      if (builtInMatcher) return builtInMatcher.apply(this, arguments);
      return false;
    };
  };

  for (name in jQueryMatchers) {
    handler = jQueryMatchers[name];
    registerMatcher(name, handler);
  }

}).call(this);

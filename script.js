(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  jQuery(function() {
    var Item, ItemView, List, ListView, list_view;
    Item = (function(superClass) {
      extend(Item, superClass);

      function Item() {
        return Item.__super__.constructor.apply(this, arguments);
      }

      Item.prototype.defaults = {
        part1: 'Hello',
        part2: 'Backbone'
      };

      return Item;

    })(Backbone.Model);
    List = (function(superClass) {
      extend(List, superClass);

      function List() {
        return List.__super__.constructor.apply(this, arguments);
      }

      List.prototype.model = Item;

      return List;

    })(Backbone.Collection);
    ItemView = (function(superClass) {
      extend(ItemView, superClass);

      function ItemView() {
        return ItemView.__super__.constructor.apply(this, arguments);
      }

      ItemView.prototype.tagName = 'li';

      ItemView.prototype.initialize = function() {
        return _.bindAll(this);
      };

      ItemView.prototype.render = function() {
        $(this.el).html("<span>" + (this.model.get('part1')) + " " + (this.model.get('part2')) + "!</span>");
        return this;
      };

      return ItemView;

    })(Backbone.View);
    ListView = (function(superClass) {
      extend(ListView, superClass);

      function ListView() {
        return ListView.__super__.constructor.apply(this, arguments);
      }

      ListView.prototype.el = $('body');

      ListView.prototype.initialize = function() {
        _.bindAll(this);
        this.collection = new List;
        this.collection.bind('add', this.appendItem);
        this.counter = 0;
        return this.render();
      };

      ListView.prototype.render = function() {
        console.log('render for listview called');
        $(this.el).append('<button>Add List Item</button>');
        return $(this.el).append('<ul></ul>');
      };

      ListView.prototype.addItem = function() {
        var item;
        console.log('add item called');
        this.counter++;
        item = new Item;
        item.set({
          part2: (item.get('part2')) + " " + this.counter
        });
        return this.collection.add(item);
      };

      ListView.prototype.appendItem = function(item) {
        var item_view;
        console.log('append item called');
        item_view = new ItemView({
          model: item
        });
        return $('ul').append(item_view.render().el);
      };

      ListView.prototype.events = {
        'click button': 'addItem'
      };

      return ListView;

    })(Backbone.View);
    return list_view = new ListView;
  });

}).call(this);

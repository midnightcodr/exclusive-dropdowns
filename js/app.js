// Generated by CoffeeScript 1.6.3
var Exdropdown;

Exdropdown = function(list, config) {
  var App, B, render;
  config || (config = {});
  B = Backbone;
  App = {
    M: {},
    V: {},
    C: {}
  };
  App.M.Item = B.Model.extend({
    defaults: {
      itemid: '',
      label: ''
    }
  });
  App.C.Items = B.Collection.extend({
    model: App.M.Item,
    initialize: function(models, options) {
      options || (options = {});
      return this.selected = options.title || '';
    },
    comparator: function(q) {
      return q.get('itemid');
    }
  });
  App.V.Item = B.View.extend({
    tagName: 'option',
    template: doT.template('{{! it.label }}'),
    render: function() {
      this.$el.html(this.template(this.model.toJSON())).val(this.model.get('itemid'));
      return this;
    }
  });
  App.V.ItemsCollection = B.View.extend({
    tagName: 'select',
    events: {
      'change': 'changeSelect'
    },
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      return this.collection.on('sort', this.render, this);
    },
    render: function() {
      var prompt;
      prompt = config.prompt || 'Please choose one of the items';
      this.$el.html('<option value="">' + prompt + '</option>');
      this.collection.each(this.addOne, this);
      this.$el.val(this.collection.selected);
      return this;
    },
    addOne: function(item) {
      var itemview;
      itemview = new App.V.Item({
        model: item
      });
      return this.$el.append(itemview.render().el);
    },
    changeSelect: function(e) {
      var arr, itemid;
      itemid = this.$el.val();
      this.collection.selected = itemid;
      arr = [];
      if (itemid !== '') {
        arr.push(itemid);
      }
      _.each(this.options.othercollections, function(o, i) {
        if (o.selected !== '') {
          return arr.push(o.selected);
        }
      });
      return _.each(this.options.othercollections, function(o, i) {
        var to_remove;
        to_remove = _.difference(arr, (o.selected === '' ? [] : [o.selected]));
        return o.set(_.filter(list, function(el) {
          return _.indexOf(to_remove, el.itemid) === -1;
        }));
      });
    }
  });
  render = function() {
    var items1, items2, items3, itemsview1, itemsview2, itemsview3;
    items1 = new App.C.Items(list);
    items2 = new App.C.Items(list);
    items3 = new App.C.Items(list);
    itemsview1 = new App.V.ItemsCollection({
      collection: items1,
      othercollections: [items2, items3]
    });
    itemsview2 = new App.V.ItemsCollection({
      collection: items2,
      othercollections: [items1, items3]
    });
    itemsview3 = new App.V.ItemsCollection({
      collection: items3,
      othercollections: [items1, items2]
    });
    $('#dd-wr1').html(itemsview1.render().el);
    $('#dd-wr2').html(itemsview2.render().el);
    $('#dd-wr3').html(itemsview3.render().el);
    return this;
  };
  return {
    render: render
  };
};
